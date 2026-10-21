import React, { useState, useMemo, useEffect } from 'react';
import { DEFAULT_DRIVE_VIDEOS, DriveVideoItem } from '../../data/driveVideoBankData';
import { ExerciseVideoPlayer } from '../ExerciseVideoPlayer';
import { 
  Video, 
  Search, 
  Film, 
  Check, 
  FolderOpen, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  X,
  ChevronDown,
  Layers
} from 'lucide-react';

interface VideoBankSelectorProps {
  onSelectVideo: (video: DriveVideoItem) => void;
  selectedVideoUrl?: string;
  currentExerciseName?: string;
}

export const VideoBankSelector: React.FC<VideoBankSelectorProps> = ({
  onSelectVideo,
  selectedVideoUrl,
  currentExerciseName
}) => {
  // Load videos from custom sync in localStorage or default 638 videos
  const allVideos = useMemo<DriveVideoItem[]>(() => {
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
  }, []);

  // Category folders list from videos
  const categoryFolders = useMemo(() => {
    const map = new Map<string, number>();
    allVideos.forEach(v => {
      const cat = v.subfolderCategory || 'General';
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
  }, [allVideos]);

  // Selected Category Folder state
  const [selectedFolder, setSelectedFolder] = useState<string>('ALL');
  const [genderFilter, setGenderFilter] = useState<'ALL' | 'MEN' | 'WOMEN'>('ALL');
  const [videoSearchTerm, setVideoSearchTerm] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState<string>('');
  const [showLivePreview, setShowLivePreview] = useState(true);

  // Sync selected video if selectedVideoUrl matches one of the videos
  useEffect(() => {
    if (selectedVideoUrl) {
      const match = allVideos.find(v => v.driveUrl === selectedVideoUrl || v.embedUrl === selectedVideoUrl || (v.id && selectedVideoUrl.includes(v.id)));
      if (match) {
        setSelectedVideoId(match.id);
        if (selectedFolder === 'ALL') {
          setSelectedFolder(match.subfolderCategory);
        }
      }
    }
  }, [selectedVideoUrl, allVideos]);

  // Videos filtered by Folder + Gender + Search
  const filteredVideos = useMemo(() => {
    return allVideos.filter(v => {
      // 1. Folder
      if (selectedFolder !== 'ALL' && v.subfolderCategory.toLowerCase() !== selectedFolder.toLowerCase()) {
        return false;
      }
      // 2. Gender / Angle
      if (genderFilter !== 'ALL' && v.gender !== genderFilter) {
        return false;
      }
      // 3. Search term
      if (videoSearchTerm.trim()) {
        const q = videoSearchTerm.toLowerCase().trim();
        const nameMatch = v.name.toLowerCase().includes(q);
        const muscleMatch = v.targetMuscles.toLowerCase().includes(q);
        const equipMatch = v.equipment.toLowerCase().includes(q);
        if (!nameMatch && !muscleMatch && !equipMatch) return false;
      }
      return true;
    });
  }, [allVideos, selectedFolder, genderFilter, videoSearchTerm]);

  // Active selected video object
  const activeVideo = useMemo(() => {
    if (!selectedVideoId) return null;
    return allVideos.find(v => v.id === selectedVideoId) || null;
  }, [selectedVideoId, allVideos]);

  // Handle video dropdown change
  const handleVideoSelectChange = (videoId: string) => {
    setSelectedVideoId(videoId);
    if (!videoId) return;
    const chosen = allVideos.find(v => v.id === videoId);
    if (chosen) {
      onSelectVideo(chosen);
    }
  };

  const handleClearSelection = () => {
    setSelectedVideoId('');
  };

  return (
    <div className="p-4 bg-[#0a0a0d] border border-[#FFC515]/40 rounded-[6px] space-y-3.5 font-mono-num text-xs">
      
      {/* Header with badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#FFC515]/15 border border-[#FFC515]/40 flex items-center justify-center text-[#FFC515]">
            <Film size={13} />
          </div>
          <div>
            <span className="text-[#FFC515] font-bold uppercase text-[11px] tracking-wider block">
              VIDEO BANK SELECTOR
            </span>
            <span className="text-[10px] text-zinc-400">
              Pick from 638 Google Drive clips to auto-fill name, muscles, sets, reps & 16:9 demo
            </span>
          </div>
        </div>

        {activeVideo && (
          <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase rounded-[2px] flex items-center gap-1 self-start sm:self-auto">
            <Check size={11} />
            <span>Clip Selected</span>
          </span>
        )}
      </div>

      {/* Row 1: Category Subfolder Dropdown & Gender Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Category Subfolder Dropdown */}
        <div>
          <label className="text-zinc-300 uppercase font-bold text-[10px] mb-1 flex items-center gap-1.5">
            <FolderOpen size={12} className="text-[#FFC515]" />
            <span>1. Category Folder ({categoryFolders.length} Folders) *</span>
          </label>
          <select
            value={selectedFolder}
            onChange={(e) => {
              setSelectedFolder(e.target.value);
              // reset video search to see all videos in the new category
              setVideoSearchTerm('');
            }}
            className="w-full bg-[#141418] border border-white/20 hover:border-[#FFC515]/60 px-3 py-2 text-white font-mono-num text-xs rounded focus:outline-none focus:border-[#FFC515] transition-colors"
          >
            <option value="ALL">📁 ALL CATEGORIES ({allVideos.length} Videos)</option>
            {categoryFolders.map(c => (
              <option key={c.name} value={c.name}>
                📁 {c.name.toUpperCase()} ({c.count} Videos)
              </option>
            ))}
          </select>
        </div>

        {/* Gender / Angle Filter */}
        <div>
          <label className="text-zinc-300 uppercase font-bold text-[10px] mb-1 flex items-center gap-1.5">
            <Layers size={12} className="text-[#FFC515]" />
            <span>Angle / Talent Folder</span>
          </label>
          <div className="grid grid-cols-3 gap-1 bg-[#141418] p-1 border border-white/10 rounded">
            <button
              type="button"
              onClick={() => setGenderFilter('ALL')}
              className={`py-1 text-[10px] font-bold uppercase rounded transition-colors ${
                genderFilter === 'ALL' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Angles
            </button>
            <button
              type="button"
              onClick={() => setGenderFilter('WOMEN')}
              className={`py-1 text-[10px] font-bold uppercase rounded transition-colors ${
                genderFilter === 'WOMEN' ? 'bg-fuchsia-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Women
            </button>
            <button
              type="button"
              onClick={() => setGenderFilter('MEN')}
              className={`py-1 text-[10px] font-bold uppercase rounded transition-colors ${
                genderFilter === 'MEN' ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Men
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Search Within Folder & Video Dropdown */}
      <div className="space-y-2">
        
        {/* Search bar for quick filtering */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-2.5 text-zinc-500" />
          <input
            type="text"
            value={videoSearchTerm}
            onChange={(e) => setVideoSearchTerm(e.target.value)}
            placeholder={`Search ${filteredVideos.length} video demonstrations (e.g. Incline, Cable, Dumbbell, Barbell, Press)...`}
            className="w-full bg-[#141418] border border-white/20 pl-8 pr-8 py-2 text-xs text-white placeholder-zinc-500 rounded focus:outline-none focus:border-[#FFC515]"
          />
          {videoSearchTerm && (
            <button
              type="button"
              onClick={() => setVideoSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Video Dropdown */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-zinc-300 uppercase font-bold text-[10px] flex items-center gap-1.5">
              <Video size={12} className="text-[#FFC515]" />
              <span>2. Select Video Demonstration ({filteredVideos.length} Available) *</span>
            </label>
            {filteredVideos.length > 0 && (
              <span className="text-[10px] text-zinc-400">
                {selectedFolder !== 'ALL' ? `In "${selectedFolder}" folder` : 'Across all folders'}
              </span>
            )}
          </div>

          <select
            value={selectedVideoId}
            onChange={(e) => handleVideoSelectChange(e.target.value)}
            className="w-full bg-[#141418] border border-white/25 hover:border-[#FFC515] px-3 py-2.5 text-white font-mono-num text-xs rounded focus:outline-none focus:border-[#FFC515] transition-colors"
          >
            <option value="">-- Choose Video Demonstration from Video Bank --</option>
            {filteredVideos.map((v) => (
              <option key={v.id} value={v.id}>
                ▶ {v.name} ({v.gender} · {v.subfolderCategory} · {v.equipment.replace('_', ' ')})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Selected Video Details & 16:9 Live Preview Card */}
      {activeVideo && (
        <div className="p-3.5 bg-black/80 border border-white/15 rounded-[4px] space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-[2px] font-bold uppercase text-[9px] ${
                activeVideo.gender === 'WOMEN'
                  ? 'bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-500/30'
                  : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
              }`}>
                {activeVideo.gender}
              </span>
              <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-[#FFC515] font-bold uppercase text-[9px] rounded-[2px]">
                {activeVideo.subfolderCategory}
              </span>
              <span className="text-white font-bold text-xs truncate max-w-[200px] sm:max-w-md">
                {activeVideo.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowLivePreview(!showLivePreview)}
                className="text-zinc-400 hover:text-white text-[10px] flex items-center gap-1 transition-colors"
              >
                <Eye size={12} />
                <span>{showLivePreview ? 'Hide Preview' : 'Show 16:9 Preview'}</span>
              </button>
              <button
                type="button"
                onClick={handleClearSelection}
                className="text-zinc-400 hover:text-rose-400 text-[10px] flex items-center gap-0.5 transition-colors"
                title="Clear selected video"
              >
                <X size={12} />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* 16:9 Live Preview Player */}
          {showLivePreview && (
            <div className="space-y-2">
              <div className="w-full bg-black rounded-[4px] overflow-hidden border border-white/10">
                <ExerciseVideoPlayer
                  videoUrl={activeVideo.driveUrl}
                  exerciseName={activeVideo.name}
                  aspectRatio="16/9"
                  autoPlay={false}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono-num text-zinc-400">
                <div className="bg-zinc-900/60 p-1.5 rounded border border-white/5">
                  <span className="text-zinc-500 block text-[9px]">TARGET</span>
                  <span className="text-white font-bold truncate block">{activeVideo.targetMuscles}</span>
                </div>
                <div className="bg-zinc-900/60 p-1.5 rounded border border-white/5">
                  <span className="text-zinc-500 block text-[9px]">SETS</span>
                  <span className="text-white font-bold">{activeVideo.suggestedSets}</span>
                </div>
                <div className="bg-zinc-900/60 p-1.5 rounded border border-white/5">
                  <span className="text-zinc-500 block text-[9px]">REPS</span>
                  <span className="text-white font-bold">{activeVideo.suggestedReps}</span>
                </div>
                <div className="bg-zinc-900/60 p-1.5 rounded border border-white/5">
                  <span className="text-zinc-500 block text-[9px]">REST</span>
                  <span className="text-[#FFC515] font-bold">{activeVideo.suggestedRestSeconds}s</span>
                </div>
              </div>

              {activeVideo.keyFormTip && (
                <p className="text-[10px] text-zinc-300 italic bg-[#141418] p-2 border-l border-[#FFC515] rounded-[1px]">
                  <strong>Coach Cue:</strong> "{activeVideo.keyFormTip}"
                </p>
              )}
            </div>
          )}

          <div className="text-[10px] text-emerald-400/90 flex items-center gap-1.5 pt-1">
            <Sparkles size={11} className="text-[#FFC515]" />
            <span>Form fields below have been auto-filled with calibrated specifications from this clip. You can edit any field before saving.</span>
          </div>
        </div>
      )}

    </div>
  );
};
