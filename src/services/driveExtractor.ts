import https from 'https';
import { MuscleGroup, ExperienceLevel, EquipmentType, Exercise } from '../types';
import { DEFAULT_DRIVE_VIDEOS, DriveVideoItem, ORIGINAL_DRIVE_FOLDER_ID } from '../data/driveVideoBankData';

const muscleMap: Record<string, { group: MuscleGroup; muscles: string; rep: string; rest: number; tip: string }> = {
  abs: { group: 'CORE', muscles: 'Rectus Abdominis, Obliques & Deep Core', rep: '15-20', rest: 45, tip: 'Brace abdomen, avoid pulling on neck, control contraction.' },
  back: { group: 'BACK', muscles: 'Lats, Upper Back & Rhomboids', rep: '8-12', rest: 90, tip: 'Initiate pull from the scapula, drive elbows down and back.' },
  biceps: { group: 'ARMS', muscles: 'Biceps Brachii & Brachialis', rep: '10-12', rest: 60, tip: 'Pin elbows at sides, squeeze hard at peak contraction.' },
  calves: { group: 'LEGS', muscles: 'Gastrocnemius & Soleus', rep: '15-20', rest: 45, tip: 'Pause 2 seconds at full stretch, drive through ball of big toe.' },
  cardio: { group: 'CARDIO', muscles: 'Cardiovascular System & Full Body Conditioning', rep: '45-60s', rest: 30, tip: 'Maintain continuous rhythm, keep core tight and breathe rhythmically.' },
  chest: { group: 'CHEST', muscles: 'Pectoralis Major & Minor', rep: '8-12', rest: 90, tip: 'Retract and depress shoulder blades, control eccentric descent.' },
  forearms: { group: 'ARMS', muscles: 'Brachioradialis, Wrist Flexors & Extensors', rep: '15-20', rest: 45, tip: 'Control both flexion and extension without swinging momentum.' },
  hips: { group: 'LEGS', muscles: 'Gluteus Maximus, Medius & Hamstrings', rep: '10-15', rest: 75, tip: 'Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.' },
  shoulders: { group: 'SHOULDERS', muscles: 'Anterior, Lateral & Rear Deltoids', rep: '10-15', rest: 60, tip: 'Lead with elbows on lateral moves, keep traps depressed.' },
  trapezius: { group: 'BACK', muscles: 'Upper, Middle & Lower Trapezius', rep: '12-15', rest: 60, tip: 'Elevate shoulders straight up toward ears, pause at the top.' },
  triceps: { group: 'ARMS', muscles: 'Triceps Brachii (Lateral, Long & Medial Heads)', rep: '10-12', rest: 60, tip: 'Lock elbows in place, extend fully without flaring out.' },
  mix: { group: 'FULL_BODY', muscles: 'Full Body Kinetic Chain & Stability', rep: '10-12', rest: 75, tip: 'Coordinate breathing with movement, maintain core engagement.' }
};

function detectEquipment(name: string): EquipmentType {
  const n = name.toLowerCase();
  if (n.includes('dumbbell')) return 'DUMBBELLS';
  if (n.includes('barbell') || n.includes('cable') || n.includes('smith') || n.includes('machine') || n.includes('bench') || n.includes('pulldown') || n.includes('press') || n.includes('dip') || n.includes('hyperextension') || n.includes('row')) return 'FULL_GYM';
  if (n.includes('band')) return 'HOME_GYM';
  if (n.includes('bodyweight') || n.includes('crunch') || n.includes('push-up') || n.includes('sit-up') || n.includes('plank') || n.includes('jump') || n.includes('jack') || n.includes('burpee') || n.includes('twist') || n.includes('air')) return 'NO_EQUIPMENT';
  return 'FULL_GYM';
}

function detectDifficulty(name: string, equipment: EquipmentType): ExperienceLevel {
  const n = name.toLowerCase();
  if (n.includes('barbell') || n.includes('decline') || n.includes('overhead') || n.includes('clean') || n.includes('snatch') || n.includes('pistol') || n.includes('weighted')) return 'ADVANCED';
  if (n.includes('band') || n.includes('air') || n.includes('machine') || n.includes('easy') || equipment === 'NO_EQUIPMENT') return 'BEGINNER';
  return 'INTERMEDIATE';
}

export function extractDriveFolderId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  const folderMatch = trimmed.match(/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) return folderMatch[1];
  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];
  const idOnlyMatch = trimmed.match(/^[a-zA-Z0-9_-]{20,}$/);
  if (idOnlyMatch) return trimmed;
  return null;
}

function fetchDriveHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseDriveIvd(html: string): any[] {
  const match = html.match(/window\[\x27_DRIVE_ivd\x27\]\s*=\s*\x27(.*?)\x27;/);
  if (!match) return [];
  const jsonStr = match[1].replace(/\\x([0-9A-Fa-f]{2})/g, (_, c) => String.fromCharCode(parseInt(c, 16)));
  try {
    const parsed = JSON.parse(jsonStr);
    return parsed[0] || [];
  } catch (e) {
    return [];
  }
}

export async function crawlGoogleDriveFolder(folderId: string, currentPath: string[] = []): Promise<DriveVideoItem[]> {
  // If the user is requesting the original folder or subfolder, we already have the full dataset
  if (folderId === ORIGINAL_DRIVE_FOLDER_ID && currentPath.length === 0) {
    return DEFAULT_DRIVE_VIDEOS;
  }

  const html = await fetchDriveHtml(`https://drive.google.com/drive/folders/${folderId}`);
  const items = parseDriveIvd(html);
  const results: DriveVideoItem[] = [];

  for (const it of items) {
    const id = it[0];
    const name = it[2];
    const mime = it[3];

    if (mime === 'application/vnd.google-apps.folder') {
      const subItems = await crawlGoogleDriveFolder(id, [...currentPath, name]);
      results.push(...subItems);
    } else if (mime && (mime.startsWith('video/') || /\.(mp4|mov|webm)$/i.test(name))) {
      const cleanName = name.replace(/\.(mp4|mov|webm)$/i, '').trim();
      const rawCat = (currentPath[currentPath.length - 1] || '').toLowerCase();
      const isWomen = currentPath.some(p => p.toLowerCase().includes('girl') || p.toLowerCase().includes('women'));
      const isMen = currentPath.some(p => p.toLowerCase().includes('men'));
      const gender = isWomen ? 'WOMEN' : (isMen ? 'MEN' : 'UNISEX');
      const meta = muscleMap[rawCat] || { group: 'FULL_BODY', muscles: 'Compound Movement', rep: '10-12', rest: 60, tip: 'Execute with strict tempo and controlled form.' };
      const eq = detectEquipment(cleanName);
      const diff = detectDifficulty(cleanName, eq);

      results.push({
        id,
        fileName: name,
        name: cleanName,
        gender,
        subfolderCategory: currentPath[currentPath.length - 1] || 'General',
        muscleGroup: meta.group,
        targetMuscles: meta.muscles,
        equipment: eq,
        difficulty: diff,
        suggestedSets: '3-4',
        suggestedReps: meta.rep,
        suggestedRestSeconds: meta.rest,
        instructions: [
          `01 Setup: Stabilize body posture and engage core brace for ${cleanName}.`,
          `02 Movement: Perform controlled execution targeting ${meta.muscles}.`,
          `03 Form lock: ${meta.tip}`
        ],
        keyFormTip: meta.tip,
        driveUrl: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
        embedUrl: `https://drive.google.com/file/d/${id}/preview`,
        path: currentPath
      });
    }
  }

  return results;
}
