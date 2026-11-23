import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TransformationStory } from '../../types';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Link as LinkIcon, 
  FileText, 
  Video, 
  Eye, 
  X, 
  Save, 
  AlertCircle,
  Instagram 
} from 'lucide-react';

export const TestimonialsAdminView: React.FC = () => {
  const { transformations, addTransformation, updateTransformation, deleteTransformation, setActiveTab } = useApp();

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  
  // Modal states
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [isQuickLinkModalOpen, setIsQuickLinkModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TransformationStory | null>(null);

  // Form states for full modal
  const [formData, setFormData] = useState<Partial<TransformationStory>>({
    name: '',
    title: '',
    age: 30,
    duration: '2 Months',
    category: 'WEIGHT_LOSS',
    statChange: '',
    quote: '',
    description: '',
    hrefLink: '',
    videoUrl: '/testimonials/testimonial-1.mp4',
    posterUrl: '/testimonials/testimonial-1.jpg',
    keyStrategy: ''
  });

  // Form states for quick link & description modal
  const [quickLinkId, setQuickLinkId] = useState<string>('');
  const [quickHrefLink, setQuickHrefLink] = useState<string>('');
  const [quickDescription, setQuickDescription] = useState<string>('');
  const [quickTitle, setQuickTitle] = useState<string>('');

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      title: '',
      age: 30,
      duration: '2 Months',
      category: 'WEIGHT_LOSS',
      statChange: '',
      quote: '',
      description: '',
      hrefLink: '',
      videoUrl: '/testimonials/testimonial-1.mp4',
      posterUrl: '/testimonials/testimonial-1.jpg',
      keyStrategy: ''
    });
    setIsFullModalOpen(true);
  };

  const openEditModal = (item: TransformationStory) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsFullModalOpen(true);
  };

  const openQuickLinkModal = (item: TransformationStory) => {
    setQuickLinkId(item.id);
    setQuickTitle(item.title || item.name);
    setQuickHrefLink(item.hrefLink || '');
    setQuickDescription(item.description || '');
    setIsQuickLinkModalOpen(true);
  };

  const handleSaveFull = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please enter a client name or title.');
      return;
    }

    if (editingItem) {
      updateTransformation(editingItem.id, {
        ...formData
      });
      showNotification(`Testimonial "${formData.name}" updated successfully!`);
    } else {
      const newStory: TransformationStory = {
        id: `testi_${Date.now()}`,
        name: formData.name || 'Client Story',
        title: formData.title || '',
        age: formData.age || 28,
        duration: formData.duration || '2 Months',
        category: formData.category || 'WEIGHT_LOSS',
        statChange: formData.statChange || '',
        quote: formData.quote || '',
        description: formData.description || '',
        hrefLink: formData.hrefLink || '',
        videoUrl: formData.videoUrl || '',
        posterUrl: formData.posterUrl || '',
        keyStrategy: formData.keyStrategy || '',
        createdAt: new Date().toISOString()
      };
      addTransformation(newStory);
      showNotification(`New testimonial "${formData.name}" added successfully!`);
    }

    setIsFullModalOpen(false);
  };

  const handleSaveQuickLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickLinkId) return;

    updateTransformation(quickLinkId, {
      hrefLink: quickHrefLink.trim(),
      description: quickDescription.trim()
    });

    showNotification('Href Link and Description saved! Live on homepage.');
    setIsQuickLinkModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete testimonial "${name}"?`)) {
      deleteTransformation(id);
      showNotification(`Testimonial "${name}" deleted.`);
    }
  };

  const safeList = Array.isArray(transformations) ? transformations : [];
  const videoCount = safeList.filter(t => Boolean(t.videoUrl)).length;
  const linkCount = safeList.filter(t => Boolean(t.hrefLink && t.hrefLink.trim().length > 0)).length;

  return (
    <div id="testimonials-admin-view" className="space-y-6 font-mono-num text-xs max-w-7xl mx-auto pb-16">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFC515] text-black font-mono-num font-bold px-4 py-3 rounded-sm shadow-2xl border border-black flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
              PROOF & SOCIAL TESTIMONIALS
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            TESTIMONIALS MANAGER
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1 max-w-2xl">
            Add and manage client video testimonials, customize external href links (Instagram Reels, YouTube, etc.), and maintain detailed case descriptions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 uppercase font-bold text-xs flex items-center gap-2 transition-colors rounded-sm"
          >
            <Eye size={14} />
            <span>View on Homepage</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#FFC515] hover:bg-[#e0ad10] text-black uppercase font-extrabold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(255,197,21,0.25)] transition-all rounded-sm"
          >
            <Plus size={15} />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-white/10 p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-bold block">TOTAL TESTIMONIALS</span>
            <span className="text-2xl font-bold font-display text-white">{safeList.length}</span>
          </div>
          <div className="p-2.5 bg-[#FFC515]/10 border border-[#FFC515]/30 text-[#FFC515]">
            <Sparkles size={18} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-white/10 p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-bold block">VIDEO STORIES</span>
            <span className="text-2xl font-bold font-display text-[#FFC515]">{videoCount}</span>
          </div>
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Video size={18} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-white/10 p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-bold block">HREF LINKS CONNECTED</span>
            <span className="text-2xl font-bold font-display text-emerald-400">{linkCount} / {safeList.length}</span>
          </div>
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <LinkIcon size={18} />
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-xs uppercase font-bold tracking-wider text-white">
            ACTIVE TESTIMONIAL CARDS ({safeList.length})
          </span>
          <span className="text-[11px] text-zinc-500">
            Changes save instantly to live homepage
          </span>
        </div>

        {safeList.length === 0 ? (
          <div className="bg-zinc-950 border border-white/10 p-12 text-center space-y-4">
            <Sparkles size={32} className="mx-auto text-zinc-600" />
            <p className="text-zinc-400 text-sm">No testimonials configured yet.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-[#FFC515] text-black font-bold uppercase text-xs inline-flex items-center gap-1.5"
            >
              <Plus size={14} /> Add First Testimonial
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeList.map((item) => (
              <div 
                key={item.id}
                className="bg-zinc-950 border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
              >
                {/* Card Top: Media Preview & Badges */}
                <div>
                  <div className="relative bg-black aspect-[16/9] border-b border-white/10 overflow-hidden flex items-center justify-center">
                    {item.videoUrl ? (
                      <video
                        src={item.videoUrl}
                        poster={item.posterUrl}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : item.beforePhoto ? (
                      <img 
                        src={item.afterPhoto || item.beforePhoto} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-zinc-600 flex flex-col items-center gap-2">
                        <Video size={28} />
                        <span>No media uploaded</span>
                      </div>
                    )}

                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/85 backdrop-blur-md text-[9px] font-bold uppercase border border-white/20 text-[#FFC515]">
                      {item.category.replace('_', ' ')}
                    </div>

                    {item.duration && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#FFC515] text-black text-[9px] font-extrabold uppercase">
                        {item.duration}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-4">
                    
                    {/* Header info */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold uppercase text-white font-display">
                            {item.name}
                          </h3>
                          {item.hrefLink?.includes('instagram.com') && (
                            <span className="px-1.5 py-0.5 rounded-sm bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 border border-pink-500/30 text-pink-300 text-[9px] font-bold flex items-center gap-1">
                              <Instagram size={10} className="text-pink-400" />
                              <span>REEL</span>
                            </span>
                          )}
                        </div>
                        {item.statChange && (
                          <span className="text-[#FFC515] font-bold text-xs">
                            {item.statChange}
                          </span>
                        )}
                      </div>
                      {item.title && (
                        <p className="text-xs text-[#FFC515] font-semibold mt-0.5">
                          {item.title}
                        </p>
                      )}
                    </div>

                    {/* Href Link Highlight Box */}
                    <div className="p-3 bg-zinc-900 border border-white/10 rounded-sm space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
                          <LinkIcon size={12} className="text-[#FFC515]" />
                          <span>HREF LINK:</span>
                        </span>
                        <button
                          onClick={() => openQuickLinkModal(item)}
                          className="text-[10px] text-[#FFC515] hover:underline uppercase font-bold"
                        >
                          {item.hrefLink ? 'Edit Link' : '+ Add Link'}
                        </button>
                      </div>

                      {item.hrefLink && item.hrefLink.trim().length > 0 ? (
                        <a 
                          href={item.hrefLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#FFC515] hover:underline flex items-center gap-1.5 break-all font-mono"
                        >
                          <span className="truncate">{item.hrefLink}</span>
                          <ExternalLink size={12} className="shrink-0" />
                        </a>
                      ) : (
                        <div className="text-[11px] text-amber-300/80 italic flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>No href link added yet. Click "+ Add Link" to paste URL.</span>
                        </div>
                      )}
                    </div>

                    {/* Description Box */}
                    <div className="p-3 bg-white/[0.02] border-l-2 border-[#FFC515] space-y-1 rounded-r-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
                          <FileText size={12} className="text-[#FFC515]" />
                          <span>CASE DESCRIPTION:</span>
                        </span>
                        <button
                          onClick={() => openQuickLinkModal(item)}
                          className="text-[10px] text-[#FFC515] hover:underline uppercase font-bold"
                        >
                          Edit Description
                        </button>
                      </div>

                      {item.description && item.description.trim().length > 0 ? (
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {item.description}
                        </p>
                      ) : (
                        <p className="text-[11px] text-zinc-500 italic">
                          No description added yet.
                        </p>
                      )}
                    </div>

                    {/* Quote */}
                    {item.quote && (
                      <p className="text-xs text-zinc-400 italic border-l border-zinc-700 pl-2">
                        "{item.quote}"
                      </p>
                    )}

                    {/* Protocol */}
                    {item.keyStrategy && (
                      <div className="text-[11px] text-zinc-400">
                        <span className="text-zinc-500 uppercase">Protocol: </span>
                        {item.keyStrategy}
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 border-t border-white/10 bg-zinc-900/50 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openQuickLinkModal(item)}
                    className="px-3 py-1.5 bg-[#FFC515]/10 hover:bg-[#FFC515] text-[#FFC515] hover:text-black border border-[#FFC515]/40 uppercase font-bold text-[11px] flex items-center gap-1.5 transition-colors rounded-sm"
                  >
                    <LinkIcon size={12} />
                    <span>Quick Link & Description</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-white/15 transition-colors rounded-sm"
                      title="Edit full testimonial"
                    >
                      <Edit3 size={15} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors rounded-sm"
                      title="Delete testimonial"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK LINK & DESCRIPTION MODAL */}
      {isQuickLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 w-full max-w-xl rounded-sm shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-[#FFC515] uppercase font-bold tracking-widest block">
                  QUICK CONTENT UPDATE
                </span>
                <h3 className="text-lg font-bold uppercase font-display text-white">
                  Update Href Link & Description
                </h3>
                <p className="text-xs text-zinc-400">{quickTitle}</p>
              </div>
              <button 
                onClick={() => setIsQuickLinkModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveQuickLink} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <LinkIcon size={13} className="text-[#FFC515]" />
                  <span>HREF LINK (URL)</span>
                </label>
                <input
                  type="url"
                  value={quickHrefLink}
                  onChange={(e) => setQuickHrefLink(e.target.value)}
                  placeholder="https://www.instagram.com/reel/... or https://youtube.com/..."
                  className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none font-mono"
                />
                <p className="text-[10px] text-zinc-500">
                  When clients click "View Original Story" on the homepage, this link will open in a new tab.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <FileText size={13} className="text-[#FFC515]" />
                  <span>TRANSFORMATION DESCRIPTION</span>
                </label>
                <textarea
                  rows={4}
                  value={quickDescription}
                  onChange={(e) => setQuickDescription(e.target.value)}
                  placeholder="Type or paste the client transformation description, journey highlights, diastasis recti results, etc..."
                  className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none font-sans"
                />
                <p className="text-[10px] text-zinc-500">
                  This detailed description is highlighted right underneath the progress metric on the homepage.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsQuickLinkModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 uppercase font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC515] hover:bg-[#e0ad10] text-black font-extrabold uppercase text-xs flex items-center gap-1.5 shadow-lg"
                >
                  <Save size={14} />
                  <span>Save Link & Description</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL ADD / EDIT MODAL */}
      {isFullModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e12] border border-white/20 w-full max-w-2xl rounded-sm shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-[#FFC515] uppercase font-bold tracking-widest block">
                  {editingItem ? 'EDIT TESTIMONIAL' : 'CREATE NEW TESTIMONIAL'}
                </span>
                <h3 className="text-xl font-bold uppercase font-display text-white">
                  {editingItem ? `Editing: ${editingItem.name}` : 'Add New Client Testimonial'}
                </h3>
              </div>
              <button 
                onClick={() => setIsFullModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveFull} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              
              {/* Row 1: Name & Headline */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white">Client Name / Label *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Pooja M. or Client Journey"
                    className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white">Title / Headline</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 8 KG Down • 21 Inches Lost"
                    className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Category, Duration, Stat Metric */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white">Category</label>
                  <select
                    value={formData.category || 'WEIGHT_LOSS'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none uppercase"
                  >
                    <option value="POSTPARTUM">POSTPARTUM</option>
                    <option value="WEIGHT_LOSS">WEIGHT LOSS</option>
                    <option value="RECOMP">RECOMP</option>
                    <option value="MUSCLE_GAIN">MUSCLE GAIN</option>
                    <option value="LIFESTYLE">LIFESTYLE</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white">Duration</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 2 Months or 60 Days"
                    className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white">Progress Metric</label>
                  <input
                    type="text"
                    value={formData.statChange || ''}
                    onChange={(e) => setFormData({ ...formData, statChange: e.target.value })}
                    placeholder="e.g. -8 KG & 21 Inches Lost"
                    className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none"
                  />
                </div>
              </div>

              {/* Href Link input */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <LinkIcon size={13} className="text-[#FFC515]" />
                    <span>Href Link (URL)</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-normal">Optional external link</span>
                </label>
                <input
                  type="url"
                  value={formData.hrefLink || ''}
                  onChange={(e) => setFormData({ ...formData, hrefLink: e.target.value })}
                  placeholder="https://instagram.com/reel/... or https://youtube.com/..."
                  className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none font-mono"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <FileText size={13} className="text-[#FFC515]" />
                  <span>Transformation Description</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter detailed transformation description..."
                  className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none"
                />
              </div>

              {/* Quote */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-white">Client Quote</label>
                <textarea
                  rows={2}
                  value={formData.quote || ''}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="In their own words: 'Motherhood changed my body, but Coach Neetu...'"
                  className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none"
                />
              </div>

              {/* Video URL & Poster URL */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white flex items-center gap-1">
                    <Video size={13} className="text-[#FFC515]" />
                    <span>Video URL / Path</span>
                  </label>
                  <input
                    type="text"
                    value={formData.videoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="/testimonials/testimonial-1.mp4"
                    className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none font-mono"
                  />
                  <div className="flex gap-2 pt-1 text-[10px] text-zinc-500">
                    <button 
                      type="button" 
                      onClick={() => setFormData({ ...formData, videoUrl: '/testimonials/testimonial-1.mp4', posterUrl: '/testimonials/testimonial-1.jpg' })}
                      className="hover:text-[#FFC515] underline"
                    >
                      Use Video 1
                    </button>
                    <span>•</span>
                    <button 
                      type="button" 
                      onClick={() => setFormData({ ...formData, videoUrl: '/testimonials/testimonial-2.mp4', posterUrl: '/testimonials/testimonial-2.jpg' })}
                      className="hover:text-[#FFC515] underline"
                    >
                      Use Video 2
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white">Poster Thumbnail URL</label>
                  <input
                    type="text"
                    value={formData.posterUrl || ''}
                    onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                    placeholder="/testimonials/testimonial-1.jpg"
                    className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none font-mono"
                  />
                </div>
              </div>

              {/* Strategy Protocol */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-white">Key Coaching Strategy</label>
                <input
                  type="text"
                  value={formData.keyStrategy || ''}
                  onChange={(e) => setFormData({ ...formData, keyStrategy: e.target.value })}
                  placeholder="e.g. Diastasis recti safe core rehabilitation + customized calorie deficit"
                  className="w-full bg-zinc-950 border border-white/15 p-2.5 text-xs text-white focus:border-[#FFC515] outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFullModalOpen(false)}
                  className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 uppercase font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FFC515] hover:bg-[#e0ad10] text-black font-extrabold uppercase text-xs flex items-center gap-2 shadow-lg"
                >
                  <Save size={15} />
                  <span>{editingItem ? 'Save Changes' : 'Create Testimonial'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
