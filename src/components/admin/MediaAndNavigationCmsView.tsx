import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { MediaItem, NavigationItem } from '../../types/admin';
import { 
  Image as ImageIcon, 
  Compass, 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  FileCode,
  Search,
  ExternalLink
} from 'lucide-react';

export const MediaAndNavigationCmsView: React.FC = () => {
  const { 
    mediaLibrary, 
    addMediaItem, 
    deleteMediaItem, 
    navItems, 
    updateNavItems,
    logAuditAction 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'MEDIA' | 'NAVIGATION'>('MEDIA');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Simulated media upload state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newFileType, setNewFileType] = useState<'IMAGE' | 'VIDEO' | 'EXERCISE_CLIP' | 'DOCUMENT'>('IMAGE');

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    addMediaItem({
      filename: `${newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
      title: newTitle,
      url: newUrl,
      fileType: newFileType,
      fileSizeMb: 1.5,
      dimensions: '1920x1080',
      usedIn: ['CMS Page Section']
    });

    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewUrl('');
  };

  const moveNavItem = (index: number, direction: 'UP' | 'DOWN') => {
    const items = [...navItems];
    if (direction === 'UP' && index > 0) {
      const temp = items[index];
      items[index] = items[index - 1];
      items[index - 1] = temp;
    } else if (direction === 'DOWN' && index < items.length - 1) {
      const temp = items[index];
      items[index] = items[index + 1];
      items[index + 1] = temp;
    }
    updateNavItems(items.map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  return (
    <div id="media-navigation-cms" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              ASSET & NAVIGATION INFRASTRUCTURE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            MEDIA & SITE ARCHITECTURE
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Global image CDN assets, exercise video clips, and header/footer navigation order.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-900 border border-white/10 p-1">
            <button
              onClick={() => setActiveTab('MEDIA')}
              className={`px-3.5 py-1.5 uppercase font-bold text-[10px] ${
                activeTab === 'MEDIA' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              MEDIA ASSETS ({mediaLibrary.length})
            </button>
            <button
              onClick={() => setActiveTab('NAVIGATION')}
              className={`px-3.5 py-1.5 uppercase font-bold text-[10px] ${
                activeTab === 'NAVIGATION' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              NAV LINKS ({navItems.length})
            </button>
          </div>

          {activeTab === 'MEDIA' && (
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-1.5 transition-colors"
            >
              <Upload size={14} />
              <span>UPLOAD ASSET</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'MEDIA' ? (
        /* Media Assets Grid */
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaLibrary.map(item => (
            <div key={item.id} className="bg-zinc-950 border border-white/10 overflow-hidden flex flex-col justify-between group">
              <div className="h-40 bg-zinc-900 relative overflow-hidden">
                {item.fileType === 'EXERCISE_CLIP' ? (
                  <div className="h-full w-full flex items-center justify-center bg-zinc-900 text-zinc-400">
                    <span className="text-[10px] font-bold text-[#d8ff38]">MP4 EXERCISE CLIP</span>
                  </div>
                ) : (
                  <img src={item.url} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                )}
                <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 text-white font-bold text-[9px] uppercase border border-white/10">
                  {item.fileType}
                </span>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-zinc-400 text-[9px]">
                  {item.fileSizeMb} MB
                </span>
              </div>

              <div className="p-3 space-y-1.5">
                <span className="font-bold text-white block truncate">{item.title}</span>
                <span className="text-[10px] text-zinc-500 block truncate">{item.filename}</span>
                <span className="text-[9px] text-[#d8ff38] block">Used in: {item.usedIn?.join(', ') || 'Global'}</span>
              </div>

              <div className="p-2.5 bg-zinc-900/60 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => handleCopyUrl(item)}
                  className="text-zinc-400 hover:text-white flex items-center gap-1 text-[10px] font-bold uppercase"
                >
                  {copiedId === item.id ? <Check size={12} className="text-[#d8ff38]" /> : <Copy size={12} />}
                  <span>{copiedId === item.id ? 'COPIED URL' : 'COPY URL'}</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete media asset "${item.title}"?`)) {
                      deleteMediaItem(item.id);
                    }
                  }}
                  className="text-zinc-500 hover:text-red-400"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Navigation Links Manager */
        <div className="bg-zinc-950 border border-white/10 p-6 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-bold text-white text-sm uppercase">HEADER & FOOTER LINK MATRIX</h3>
            <p className="text-zinc-400 text-xs mt-0.5">Control order and destination triggers for all public navigation tabs.</p>
          </div>

          <div className="space-y-2">
            {navItems.map((nav, index) => (
              <div key={nav.id} className="p-3 bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-[10px]">
                    {nav.order}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{nav.label}</span>
                    <span className="text-[10px] text-zinc-500">Destination: #{nav.targetTab}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={index === 0}
                    onClick={() => moveNavItem(index, 'UP')}
                    className="p-1.5 bg-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    disabled={index === navItems.length - 1}
                    onClick={() => moveNavItem(index, 'DOWN')}
                    className="p-1.5 bg-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-md w-full font-mono-num text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase text-white">ADD MEDIA ASSET</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">ASSET TITLE *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Hero Editorial Banner"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">IMAGE OR VIDEO CDN URL *</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">ASSET TYPE</label>
                <select
                  value={newFileType}
                  onChange={(e) => setNewFileType(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white uppercase font-bold"
                >
                  <option value="IMAGE">IMAGE (PNG / JPG / WEBP)</option>
                  <option value="EXERCISE_CLIP">EXERCISE VIDEO CLIP (MP4)</option>
                  <option value="DOCUMENT">DOCUMENTATION (PDF)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8ff38] text-black font-bold uppercase"
                >
                  INDEX ASSET
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
