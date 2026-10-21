import React, { useState, useMemo, useEffect } from 'react';
import { 
  DEFAULT_DRIVE_VIDEOS, 
  DriveVideoItem, 
  ORIGINAL_DRIVE_FOLDER_URL, 
  convertDriveVideoToExercise 
} from '../../data/driveVideoBankData';
import { ExerciseVideoPlayer } from '../ExerciseVideoPlayer';
import { Exercise, MuscleGroup } from '../../types';
import { 
  Video, 
  Search, 
  ExternalLink, 
  Plus, 
  Check, 
  RefreshCw, 
  Download, 
  Filter, 
  Layers, 
  FolderOpen, 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Users,
  Copy,
  FolderGit2
} from 'lucide-react';

interface DriveVideoBankSectionProps {
  exercises: Exercise[];
  onAddExercise: (exercise: Exercise) => void;
  logAuditAction: (action: string, details?: string) => void;
}

export const DriveVideoBankSection: React.FC<DriveVideoBankSectionProps> = ({
  exercises,
  onAddExercise,
  logAuditAction
}) => {
  // All video items, persisted in localStorage if custom synced
  const [videos, setVideos] = useState<DriveVideoItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fitnetheist_custom_drive_videos');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return DEFAULT_DRIVE_VIDEOS;
  });

  const [activeFolderUrl, setActiveFolderUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fitnetheist_active_drive_folder_url') || ORIGINAL_DRIVE_FOLDER_URL;
    }
    return ORIGINAL_DRIVE_FOLDER_URL;
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'ALL' | 'MEN' | 'WOMEN'>('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');
  const [libraryFilter, setLibraryFilter] = useState<'ALL' | 'NOT_IN_LIBRARY' | 'IN_LIBRARY'>('ALL');

  // Preview Modal
  const [previewVideo, setPreviewVideo] = useState<DriveVideoItem | null>(null);

  // Sync / Import Modal
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState(activeFolderUrl);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Bulk Import State
  const [bulkNotification, setBulkNotification] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Set of already imported exercise names for instant O(1) duplicate detection
  const existingNamesSet = useMemo(() => {
    const s = new Set<string>();
    (exercises || []).forEach(ex => {
      if (ex && ex.name) s.add(ex.name.toLowerCase().trim());
      if (ex && ex.id) s.add(ex.id.toLowerCase());
    });
    return s;
  }, [exercises]);

  // Derived subcategories list from current videos
  const subCategoriesList = useMemo(() => {
    const set = new Set<string>();
    videos.forEach(v => {
      if (v.subfolderCategory) set.add(v.subfolderCategory);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [videos]);

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      // 1. Gender filter
      if (selectedGender !== 'ALL' && v.gender !== selectedGender) return false;

      // 2. Subcategory filter
      if (selectedSubCategory !== 'ALL') {
        const matchesSub = v.subfolderCategory.toLowerCase() === selectedSubCategory.toLowerCase();
        const matchesMuscle = v.muscleGroup.toLowerCase() === selectedSubCategory.toLowerCase();
        if (!matchesSub && !matchesMuscle) return false;
      }

      // 3. Search query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const nameMatch = v.name.toLowerCase().includes(q);
        const muscleMatch = v.targetMuscles.toLowerCase().includes(q);
        const catMatch = v.subfolderCategory.toLowerCase().includes(q);
        if (!nameMatch && !muscleMatch && !catMatch) return false;
      }

      // 4. In library filter
      const inLibrary = existingNamesSet.has(v.name.toLowerCase().trim()) || existingNamesSet.has(('ex_drive_' + v.id).toLowerCase());
      if (libraryFilter === 'NOT_IN_LIBRARY' && inLibrary) return false;
      if (libraryFilter === 'IN_LIBRARY' && !inLibrary) return false;

      return true;
    });
  }, [videos, selectedGender, selectedSubCategory, searchTerm, libraryFilter, existingNamesSet]);

  // Add single video to library
  const handleAddVideoToLibrary = (video: DriveVideoItem) => {
    const newEx = convertDriveVideoToExercise(video);
    const inLib = existingNamesSet.has(newEx.name.toLowerCase().trim()) || existingNamesSet.has(newEx.id.toLowerCase());
    if (inLib) return;

    onAddExercise(newEx);
    logAuditAction('IMPORT_DRIVE_EXERCISE', `Imported "${video.name}" (${video.subfolderCategory}) from Google Drive Video Bank`);
    setBulkNotification(`"${video.name}" added to Exercise Library!`);
    setTimeout(() => setBulkNotification(null), 3500);
  };

  // Bulk import filtered videos
  const handleBulkImportFiltered = () => {
    const toAdd = filteredVideos.filter(v => {
      const clean = v.name.toLowerCase().trim();
      const idKey = ('ex_drive_' + v.id).toLowerCase();
      return !existingNamesSet.has(clean) && !existingNamesSet.has(idKey);
    });

    if (toAdd.length === 0) {
      alert('All selected exercises in this filter are already added to your Exercise Library.');
      return;
    }

    if (!confirm(`Import ${toAdd.length} exercises from Google Drive into your Exercise Library?`)) {
      return;
    }

    toAdd.forEach(v => {
      const newEx = convertDriveVideoToExercise(v);
      onAddExercise(newEx);
    });

    logAuditAction('BULK_IMPORT_DRIVE_EXERCISES', `Imported ${toAdd.length} exercises from Google Drive`);
    setBulkNotification(`Successfully imported ${toAdd.length} exercises into your Exercise Library!`);
    setTimeout(() => setBulkNotification(null), 4000);
  };

  // Live Sync from Google Drive Folder Link
  const handlePerformDriveSync = async () => {
    if (!customInputUrl.trim()) return;
    setIsSyncing(true);
    setSyncStatusMsg({ text: 'Crawling Google Drive folder and category subfolders...', type: 'info' });

    try {
      const res = await fetch('/api/drive/sync-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderUrl: customInputUrl.trim() })
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
        setVideos(data.videos);
        setActiveFolderUrl(customInputUrl.trim());
        localStorage.setItem('fitnetheist_custom_drive_videos', JSON.stringify(data.videos));
        localStorage.setItem('fitnetheist_active_drive_folder_url', customInputUrl.trim());

        const catCount = Object.keys(data.categories || {}).length;
        setSyncStatusMsg({
          text: `Success! Extracted ${data.videos.length} videos across ${catCount} category subfolders.`,
          type: 'success'
        });
        logAuditAction('SYNC_GOOGLE_DRIVE_FOLDER', `Extracted ${data.videos.length} videos from ${customInputUrl}`);
      } else {
        setSyncStatusMsg({
          text: data.error || 'No video files found in the specified Google Drive folder.',
          type: 'error'
        });
      }
    } catch (err: any) {
      setSyncStatusMsg({
        text: `Network / Server error: ${err.message}`,
        type: 'error'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Reset to default 638 videos
  const handleResetToDefault = () => {
    setVideos(DEFAULT_DRIVE_VIDEOS);
    setActiveFolderUrl(ORIGINAL_DRIVE_FOLDER_URL);
    setCustomInputUrl(ORIGINAL_DRIVE_FOLDER_URL);
    localStorage.removeItem('fitnetheist_custom_drive_videos');
    localStorage.removeItem('fitnetheist_active_drive_folder_url');
    setSyncStatusMsg({ text: 'Restored original 638 video repository.', type: 'success' });
    logAuditAction('RESET_DRIVE_VIDEOS', 'Restored 638 original Google Drive exercise videos');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeFolderUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { ALL: videos.length };
    videos.forEach(v => {
      const cat = v.subfolderCategory;
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [videos]);

  const menCount = useMemo(() => videos.filter(v => v.gender === 'MEN').length, [videos]);
  const womenCount = useMemo(() => videos.filter(v => v.gender === 'WOMEN').length, [videos]);

  return (
    <div id="drive-video-bank-module" className="space-y-6">
      
      {/* Top Banner & Drive Link Control */}
      <div className="bg-[#0e0e12] border border-white/10 p-5 rounded-[6px] relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC515]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-[#FFC515]/10 border border-[#FFC515]/40 text-[#FFC515] text-[10px] font-mono-num font-bold uppercase tracking-wider rounded-[2px] flex items-center gap-1.5">
                <FolderGit2 size={12} />
                <span>GOOGLE DRIVE REPOSITORY SYNC</span>
              </span>
              <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono-num font-bold uppercase rounded-[2px] flex items-center gap-1">
                <CheckCircle2 size={11} />
                <span>{videos.length} Videos Extracted</span>
              </span>
              <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300 text-[10px] font-mono-num font-bold uppercase rounded-[2px]">
                {subCategoriesList.length} Subfolder Categories
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-display tracking-tight text-white flex items-center gap-2">
              <span>GOOGLE DRIVE VIDEO BANK</span>
            </h2>

            <p className="text-zinc-400 text-xs font-mono-num leading-relaxed">
              Direct cloud repository with all form demonstration clips extracted from your Google Drive folder and category subfolders.
              One-click import into your active Exercise Library with calibrated muscle targeting, sets, reps, and form tips.
            </p>

            {/* Folder link bar */}
            <div className="flex items-center gap-2 pt-1">
              <div className="bg-black/60 border border-white/10 px-3 py-1.5 rounded-[3px] text-xs font-mono-num text-zinc-300 flex items-center gap-2 max-w-full overflow-hidden">
                <span className="text-[#FFC515] font-bold shrink-0">Source Folder:</span>
                <span className="truncate text-zinc-400 text-[11px]">{activeFolderUrl}</span>
              </div>
              <button
                onClick={handleCopyLink}
                title="Copy Google Drive folder URL"
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white rounded-[3px] transition-colors"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <a
                href={activeFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in Google Drive"
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-[#FFC515] rounded-[3px] transition-colors flex items-center gap-1 text-[11px] font-mono-num"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 hover:border-white/30 rounded-[4px] text-xs font-mono-num font-bold uppercase transition-all flex items-center gap-2"
            >
              <RefreshCw size={13} className="text-[#FFC515]" />
              <span>Sync Drive Folder</span>
            </button>

            <button
              onClick={handleBulkImportFiltered}
              className="px-4 py-2 bg-[#FFC515] hover:bg-[#eab308] text-black font-mono-num font-bold text-xs uppercase rounded-[4px] transition-all flex items-center gap-2 shadow-sm"
            >
              <Download size={14} />
              <span>Import Filtered ({filteredVideos.length}) to Library</span>
            </button>
          </div>
        </div>

        {/* Bulk notification banner */}
        {bulkNotification && (
          <div className="mt-4 p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-[4px] flex items-center gap-2 text-xs font-mono-num text-emerald-300 animate-fadeIn">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>{bulkNotification}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0e0e12] border border-white/10 p-4 rounded-[6px] space-y-4">
        
        {/* Row 1: Search & Angle / Gender Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Gender / Folder Filter */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1 border border-white/10 rounded-[4px] text-xs font-mono-num">
            <button
              onClick={() => setSelectedGender('ALL')}
              className={`px-3 py-1 font-bold uppercase rounded-[3px] transition-colors ${
                selectedGender === 'ALL' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Angles ({videos.length})
            </button>
            <button
              onClick={() => setSelectedGender('WOMEN')}
              className={`px-3 py-1 font-bold uppercase rounded-[3px] transition-colors flex items-center gap-1.5 ${
                selectedGender === 'WOMEN' ? 'bg-fuchsia-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-300" />
              <span>Women / Girl ({womenCount})</span>
            </button>
            <button
              onClick={() => setSelectedGender('MEN')}
              className={`px-3 py-1 font-bold uppercase rounded-[3px] transition-colors flex items-center gap-1.5 ${
                selectedGender === 'MEN' ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
              <span>Men ({menCount})</span>
            </button>
          </div>

          {/* Search bar & Library status dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-2.5 top-2.5 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by exercise name or muscle..."
                className="w-full bg-[#141418] border border-white/10 pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 rounded-[3px] focus:outline-none focus:border-[#FFC515] font-mono-num"
              />
            </div>

            <select
              value={libraryFilter}
              onChange={(e) => setLibraryFilter(e.target.value as any)}
              className="bg-[#141418] border border-white/10 px-3 py-1.5 text-xs text-zinc-300 rounded-[3px] focus:outline-none focus:border-[#FFC515] font-mono-num uppercase"
            >
              <option value="ALL">All Library Status</option>
              <option value="NOT_IN_LIBRARY">Not in Library</option>
              <option value="IN_LIBRARY">Already Added (✓)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Subfolder Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs font-mono-num">
          <button
            onClick={() => setSelectedSubCategory('ALL')}
            className={`px-3 py-1 font-bold uppercase rounded-[3px] whitespace-nowrap transition-colors ${
              selectedSubCategory === 'ALL'
                ? 'bg-[#FFC515] text-black'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            All Categories ({videos.length})
          </button>

          {subCategoriesList.map(cat => {
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setSelectedSubCategory(cat)}
                className={`px-3 py-1 font-bold uppercase rounded-[3px] whitespace-nowrap transition-colors ${
                  selectedSubCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#FFC515] text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredVideos.map((v) => {
          const isAdded = existingNamesSet.has(v.name.toLowerCase().trim()) || existingNamesSet.has(('ex_drive_' + v.id).toLowerCase());
          const isWomen = v.gender === 'WOMEN';

          return (
            <div
              key={v.id}
              className={`bg-[#0e0e12] border rounded-[5px] p-4 flex flex-col justify-between hover:border-[#FFC515]/50 transition-all group relative ${
                isAdded ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-white/10'
              }`}
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between text-[10px] font-mono-num">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-[2px] font-bold uppercase ${
                      isWomen 
                        ? 'bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-500/30' 
                        : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {v.gender}
                    </span>
                    <span className="px-2 py-0.5 bg-zinc-900 text-[#FFC515] font-bold uppercase rounded-[2px] border border-white/10">
                      {v.subfolderCategory}
                    </span>
                  </div>
                  <span className="text-zinc-500 uppercase">
                    {v.equipment.replace('_', ' ')}
                  </span>
                </div>

                {/* Exercise Video Title */}
                <div>
                  <h3 className="text-sm font-bold uppercase font-display text-white group-hover:text-[#FFC515] transition-colors leading-snug line-clamp-2">
                    {v.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono-num mt-1 line-clamp-1">
                    {v.targetMuscles}
                  </p>
                </div>

                {/* Suggested Protocol Metrics */}
                <div className="grid grid-cols-3 gap-1.5 py-1.5 px-2 bg-zinc-900/60 border border-white/5 rounded-[3px] text-center text-[11px] font-mono-num">
                  <div>
                    <span className="text-[9px] text-zinc-500 block">SETS</span>
                    <span className="font-bold text-white">{v.suggestedSets}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 block">REPS</span>
                    <span className="font-bold text-white">{v.suggestedReps}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 block">REST</span>
                    <span className="font-bold text-[#FFC515]">{v.suggestedRestSeconds}s</span>
                  </div>
                </div>

                {/* Form tip preview */}
                <p className="text-[10px] text-zinc-400 italic line-clamp-2 bg-black/40 p-1.5 border-l border-[#FFC515] rounded-[1px]">
                  "{v.keyFormTip}"
                </p>
              </div>

              {/* Actions Bottom Bar */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-4 text-xs font-mono-num">
                <button
                  onClick={() => setPreviewVideo(v)}
                  className="text-zinc-300 hover:text-[#FFC515] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Watch Video Demonstration"
                >
                  <Play size={13} className="text-[#FFC515] fill-[#FFC515]" />
                  <span>Preview</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={v.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-zinc-400 hover:text-white"
                    title="Open Video in Google Drive"
                  >
                    <ExternalLink size={13} />
                  </a>

                  {isAdded ? (
                    <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase rounded-[3px] flex items-center gap-1">
                      <Check size={12} />
                      <span>In Library</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAddVideoToLibrary(v)}
                      className="px-2.5 py-1 bg-[#FFC515] hover:bg-[#eab308] text-black font-bold text-[10px] uppercase rounded-[3px] flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                    >
                      <Plus size={12} />
                      <span>Add to Lib</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVideos.length === 0 && (
        <div className="p-12 text-center bg-[#0e0e12] border border-white/10 rounded-[6px] space-y-3">
          <AlertCircle size={32} className="mx-auto text-zinc-500" />
          <p className="text-white font-bold font-mono-num">No videos match your active filter.</p>
          <p className="text-zinc-400 text-xs font-mono-num">
            Try resetting your search term or switching the category/gender filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGender('ALL');
              setSelectedSubCategory('ALL');
              setLibraryFilter('ALL');
            }}
            className="px-4 py-1.5 bg-[#FFC515] text-black font-bold uppercase text-xs font-mono-num rounded-[3px]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIDEO PREVIEW MODAL (16:9 WIDESCREEN)                                     */}
      {/* ========================================================================= */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101014] border border-white/15 rounded-[6px] max-w-3xl sm:max-w-4xl w-full overflow-hidden shadow-2xl animate-scaleUp my-auto">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#14141a] border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#FFC515]/20 text-[#FFC515] text-[10px] font-mono-num font-bold uppercase rounded">
                    {previewVideo.gender} · {previewVideo.subfolderCategory}
                  </span>
                  <span className="text-zinc-400 text-xs font-mono-num">
                    {previewVideo.equipment.replace('_', ' ')} · 16:9 Widescreen
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold font-display uppercase text-white mt-1">
                  {previewVideo.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewVideo(null)}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player */}
            <div className="p-4 sm:p-5 bg-black flex justify-center">
              <ExerciseVideoPlayer
                videoUrl={previewVideo.driveUrl}
                exerciseName={previewVideo.name}
                aspectRatio="16/9"
                className="w-full shadow-2xl"
              />
            </div>

            {/* Video Details & Form Tips */}
            <div className="p-5 space-y-4 font-mono-num text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-[#18181f] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">TARGET MUSCLES</span>
                  <span className="font-bold text-white text-[11px] truncate block">{previewVideo.targetMuscles}</span>
                </div>
                <div className="bg-[#18181f] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">SETS</span>
                  <span className="font-bold text-white">{previewVideo.suggestedSets}</span>
                </div>
                <div className="bg-[#18181f] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">REPS</span>
                  <span className="font-bold text-white">{previewVideo.suggestedReps}</span>
                </div>
                <div className="bg-[#18181f] p-2 rounded border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">REST</span>
                  <span className="font-bold text-[#FFC515]">{previewVideo.suggestedRestSeconds}s</span>
                </div>
              </div>

              <div className="bg-[#141418] p-3 rounded border-l-2 border-[#FFC515]">
                <span className="text-[10px] text-[#FFC515] font-bold block uppercase tracking-wider mb-1">
                  COACHING FORM KEY:
                </span>
                <p className="text-zinc-300 text-xs italic">
                  "{previewVideo.keyFormTip}"
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <a
                  href={previewVideo.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors text-xs"
                >
                  <ExternalLink size={14} />
                  <span>Open in Google Drive</span>
                </a>

                {existingNamesSet.has(previewVideo.name.toLowerCase().trim()) ? (
                  <span className="px-4 py-2 bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold uppercase rounded flex items-center gap-1.5">
                    <Check size={14} />
                    <span>Already in Library</span>
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleAddVideoToLibrary(previewVideo);
                      setPreviewVideo(null);
                    }}
                    className="px-4 py-2 bg-[#FFC515] hover:bg-[#eab308] text-black font-bold uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add to Exercise Library</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SYNC / EXTRACT FROM DRIVE MODAL                                           */}
      {/* ========================================================================= */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101014] border border-white/15 rounded-[6px] max-w-xl w-full p-6 space-y-5 animate-scaleUp font-sans">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <FolderOpen size={18} className="text-[#FFC515]" />
                <h3 className="text-lg font-bold font-display uppercase text-white">
                  SYNC GOOGLE DRIVE FOLDER
                </h3>
              </div>
              <button
                onClick={() => setIsSyncModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-zinc-400 text-xs font-mono-num leading-relaxed">
              Paste any shared Google Drive folder link containing category subfolders and exercise videos.
              The backend will recursively crawl and index all video demonstrations into your admin Video Bank.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-mono-num text-zinc-300 font-bold uppercase">
                Google Drive Folder Link:
              </label>
              <input
                type="text"
                value={customInputUrl}
                onChange={(e) => setCustomInputUrl(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full bg-[#18181f] border border-white/15 px-3 py-2 text-xs font-mono-num text-white rounded focus:outline-none focus:border-[#FFC515]"
              />
            </div>

            {syncStatusMsg && (
              <div className={`p-3 rounded text-xs font-mono-num flex items-center gap-2 ${
                syncStatusMsg.type === 'success' 
                  ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300' 
                  : syncStatusMsg.type === 'error'
                  ? 'bg-rose-950/70 border border-rose-500/50 text-rose-300'
                  : 'bg-zinc-900 border border-white/10 text-zinc-300'
              }`}>
                {syncStatusMsg.type === 'success' && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                {syncStatusMsg.type === 'error' && <AlertCircle size={16} className="text-rose-400 shrink-0" />}
                {syncStatusMsg.type === 'info' && <RefreshCw size={14} className="animate-spin text-[#FFC515] shrink-0" />}
                <span>{syncStatusMsg.text}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-zinc-400 hover:text-white text-xs font-mono-num uppercase underline"
              >
                Reset to Default 638 Videos
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsSyncModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono-num font-bold uppercase rounded"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handlePerformDriveSync}
                  disabled={isSyncing}
                  className="px-4 py-2 bg-[#FFC515] hover:bg-[#eab308] text-black text-xs font-mono-num font-bold uppercase rounded flex items-center gap-2 disabled:opacity-50"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Crawling Drive...</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>Extract Videos</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
