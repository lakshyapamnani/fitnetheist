import React, { useState, useEffect } from 'react';
import { Camera, Upload, Check, Sparkles, RefreshCw, Eye, Sliders } from 'lucide-react';

const STORAGE_KEY = 'fitnetheist_coach_neetu_photo';
const FILTER_KEY = 'fitnetheist_coach_photo_filter_mode';
const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=85';

export const useCoachNeetuPhoto = () => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    }
    return DEFAULT_PHOTO;
  });

  const [filterMode, setFilterMode] = useState<'NATURAL' | 'MONO'>(() => {
    if (typeof window !== 'undefined') {
      const savedFilter = localStorage.getItem(FILTER_KEY);
      if (savedFilter === 'MONO' || savedFilter === 'NATURAL') return savedFilter;
    }
    return 'NATURAL';
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPhotoUrl(saved);
      const savedFilter = localStorage.getItem(FILTER_KEY);
      if (savedFilter === 'MONO' || savedFilter === 'NATURAL') setFilterMode(savedFilter);
    };

    const handleCustomEvent = (e: any) => {
      if (e.detail?.url) setPhotoUrl(e.detail.url);
      if (e.detail?.filter) setFilterMode(e.detail.filter);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('fitnetheist_coach_photo_update' as any, handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('fitnetheist_coach_photo_update' as any, handleCustomEvent);
    };
  }, []);

  const updatePhoto = (newUrl: string, newFilter?: 'NATURAL' | 'MONO') => {
    setPhotoUrl(newUrl);
    localStorage.setItem(STORAGE_KEY, newUrl);
    if (newFilter) {
      setFilterMode(newFilter);
      localStorage.setItem(FILTER_KEY, newFilter);
    }
    window.dispatchEvent(
      new CustomEvent('fitnetheist_coach_photo_update', {
        detail: { url: newUrl, filter: newFilter || filterMode }
      })
    );
  };

  const updateFilter = (newFilter: 'NATURAL' | 'MONO') => {
    setFilterMode(newFilter);
    localStorage.setItem(FILTER_KEY, newFilter);
    window.dispatchEvent(
      new CustomEvent('fitnetheist_coach_photo_update', {
        detail: { url: photoUrl, filter: newFilter }
      })
    );
  };

  return { photoUrl, filterMode, updatePhoto, updateFilter, defaultPhoto: DEFAULT_PHOTO };
};

interface CoachNeetuPhotoProps {
  className?: string;
  showBadge?: boolean;
  allowEdit?: boolean;
}

export const CoachNeetuPhoto: React.FC<CoachNeetuPhotoProps> = ({
  className = '',
  showBadge = true,
  allowEdit = true
}) => {
  const { photoUrl, filterMode, updatePhoto, updateFilter } = useCoachNeetuPhoto();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'NATURAL' | 'MONO'>(filterMode);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
          setTempUrl('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const targetUrl = previewUrl || tempUrl.trim();
    if (targetUrl) {
      updatePhoto(targetUrl, selectedFilter);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setShowUploadModal(false);
        setPreviewUrl(null);
        setTempUrl('');
      }, 700);
    } else if (selectedFilter !== filterMode) {
      updateFilter(selectedFilter);
      setShowUploadModal(false);
    }
  };

  const handleResetDefault = () => {
    updatePhoto(DEFAULT_PHOTO, 'NATURAL');
    setPreviewUrl(null);
    setTempUrl('');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowUploadModal(false);
    }, 500);
  };

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {/* Background Image / Render */}
      <img
        src={photoUrl}
        alt="Coach Neetu - Founder & Head Coach of Fitnetheist"
        className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] ${
          filterMode === 'MONO'
            ? 'filter grayscale contrast-125 brightness-95'
            : 'filter contrast-105 brightness-100'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* Subtle Vignette & Framing Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/20 to-transparent pointer-events-none" />

      {/* Floating Badge */}
      {showBadge && (
        <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none">
          <div className="p-3.5 bg-[#08080a]/90 backdrop-blur-md border border-white/10 rounded-[3px] font-mono-num shadow-2xl">
            <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest block">
              FOUNDER & HEAD COACH
            </span>
            <h3 className="text-xl font-bold font-display uppercase text-white mt-0.5 tracking-tight flex items-center justify-between">
              <span>COACH NEETU</span>
              <span className="text-[10px] text-zinc-400 font-mono-num font-normal uppercase tracking-normal">
                {filterMode === 'NATURAL' ? 'Authentic' : 'Editorial Mono'}
              </span>
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              Natural Transformation Specialist • 1-on-1 Personalized Coaching
            </p>
          </div>
        </div>
      )}

      {/* Edit / Change Photo Button */}
      {allowEdit && (
        <button
          type="button"
          onClick={() => {
            setSelectedFilter(filterMode);
            setShowUploadModal(true);
          }}
          className="absolute top-4 right-4 z-20 px-3 py-2 bg-black/85 hover:bg-[#FFC515] text-white hover:text-black border border-white/20 hover:border-[#FFC515] rounded-[4px] transition-all flex items-center gap-1.5 text-xs font-mono-num font-bold uppercase shadow-lg cursor-pointer"
          title="Upload or Change Coach Neetu Photo"
        >
          <Camera size={14} />
          <span>Update Coach Photo</span>
        </button>
      )}

      {/* Photo Update Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 max-w-lg w-full rounded-[6px] space-y-5 shadow-2xl font-mono-num text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
                  <Camera size={16} className="text-[#FFC515]" />
                  Coach Neetu Profile Image
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Upload Coach Neetu's photo or provide an image link to show across the entire platform.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  setPreviewUrl(null);
                  setTempUrl('');
                }}
                className="text-zinc-400 hover:text-white text-base px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Current / Live Preview */}
            <div className="flex items-center gap-4 bg-zinc-950 p-3 rounded border border-white/10">
              <div className="w-20 h-24 shrink-0 rounded overflow-hidden border border-white/20 bg-zinc-900">
                <img
                  src={previewUrl || tempUrl || photoUrl}
                  alt="Coach Neetu Preview"
                  className={`w-full h-full object-cover object-top ${
                    selectedFilter === 'MONO' ? 'grayscale contrast-125' : 'contrast-105'
                  }`}
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-wider block">
                  Active Display Preview
                </span>
                <p className="text-white text-xs font-bold">Coach Neetu Visual Asset</p>
                <p className="text-[11px] text-zinc-400">
                  {previewUrl
                    ? 'Uploaded local file ready to save'
                    : tempUrl
                    ? 'Custom URL entered'
                    : 'Currently displayed image'}
                </p>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-zinc-300 font-bold uppercase tracking-wider block">
                Visual Filter Style:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFilter('NATURAL')}
                  className={`p-2 rounded text-left border transition-all ${
                    selectedFilter === 'NATURAL'
                      ? 'bg-[#FFC515]/20 border-[#FFC515] text-white font-bold'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="block text-white">Authentic Natural Color</span>
                  <span className="text-[10px] text-zinc-400 block">Displays full true-to-life colors</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter('MONO')}
                  className={`p-2 rounded text-left border transition-all ${
                    selectedFilter === 'MONO'
                      ? 'bg-[#FFC515]/20 border-[#FFC515] text-white font-bold'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="block text-white">Editorial Monochrome</span>
                  <span className="text-[10px] text-zinc-400 block">Classic Fitnetheist B&W styling</span>
                </button>
              </div>
            </div>

            {/* Upload Method 1: Local File */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-zinc-300 font-bold uppercase tracking-wider block">
                Option 1: Upload Image File from Device
              </label>
              <label className="flex items-center justify-center gap-2 p-3.5 border-2 border-dashed border-white/20 hover:border-[#FFC515] rounded cursor-pointer bg-zinc-900/60 hover:bg-zinc-900 transition-colors">
                <Upload size={16} className="text-[#FFC515]" />
                <span className="text-xs text-zinc-200 font-semibold">Choose photo (PNG, JPG, JPEG, WEBP)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Upload Method 2: Direct URL */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-zinc-300 font-bold uppercase tracking-wider block">
                Option 2: Direct Image URL
              </label>
              <input
                type="url"
                value={tempUrl}
                onChange={(e) => {
                  setTempUrl(e.target.value);
                  setPreviewUrl(null);
                }}
                placeholder="https://.../coach-neetu.jpg"
                className="w-full bg-[#14141a] border border-white/15 px-3 py-2 text-xs text-white focus:border-[#FFC515] focus:outline-none rounded"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={handleResetDefault}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 underline"
              >
                Reset to default portrait
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setPreviewUrl(null);
                    setTempUrl('');
                  }}
                  className="px-3.5 py-1.5 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#FFC515] hover:bg-[#e5b112] text-black text-xs font-bold uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isSuccess ? <Check size={14} /> : <Sparkles size={14} />}
                  <span>{isSuccess ? 'Saved Photo!' : 'Apply Photo Across App'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
