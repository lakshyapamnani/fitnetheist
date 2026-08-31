import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CMSSection } from '../../types/admin';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Check, 
  Save, 
  Sparkles, 
  Globe, 
  Search,
  ExternalLink
} from 'lucide-react';

export const CmsPageBuilderView: React.FC = () => {
  const { 
    activePage, 
    toggleSection, 
    reorderSection, 
    updateSection, 
    publishPage,
    savePageDraft,
    seoConfig,
    updateSeoConfig
  } = useAdmin();

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editHeading, setEditHeading] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editCtaText, setEditCtaText] = useState('');
  const [editCtaActionTab, setEditCtaActionTab] = useState('');
  const [editEyebrow, setEditEyebrow] = useState('');
  const [isSeoDrawerOpen, setIsSeoDrawerOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const startEdit = (section: CMSSection) => {
    setEditingSectionId(section.id);
    setEditHeading(section.heading || '');
    setEditSubtitle(section.subtitle || '');
    setEditCtaText(section.ctaText || '');
    setEditCtaActionTab(section.ctaActionTab || 'calculate');
    setEditEyebrow(section.eyebrowText || '');
  };

  const handleSaveSectionEdit = (sectionId: string) => {
    updateSection(activePage.id, sectionId, {
      heading: editHeading,
      subtitle: editSubtitle,
      ctaText: editCtaText,
      ctaActionTab: editCtaActionTab,
      eyebrowText: editEyebrow
    });
    setEditingSectionId(null);
    setNotificationMsg('Section content updated.');
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const handlePublishAll = () => {
    publishPage(activePage.id);
    setNotificationMsg('HOMEPAGE PUBLISHED LIVE TO PUBLIC VISITORS.');
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const sortedSections = [...activePage.sections].sort((a, b) => a.order - b.order);

  return (
    <div id="cms-page-builder" className="space-y-6 font-mono-num text-xs">
      
      {/* Header & Publish Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              VISUAL CONTENT MANAGEMENT SYSTEM
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            HOMEPAGE ARCHITECTURE
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Configure, reorder, toggle, and edit all 13 core sections of the Fitnetheist public website.
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSeoDrawerOpen(!isSeoDrawerOpen)}
            className="px-3.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white uppercase font-bold flex items-center gap-1.5 transition-colors"
          >
            <Search size={14} />
            <span>PAGE SEO</span>
          </button>

          <button
            onClick={handlePublishAll}
            className="px-5 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-extrabold uppercase flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(216,255,56,0.25)]"
          >
            <Sparkles size={14} />
            <span>PUBLISH LIVE CHANGES</span>
          </button>
        </div>
      </div>

      {/* Notification toast */}
      {notificationMsg && (
        <div className="p-3 bg-[#d8ff38] text-black font-extrabold uppercase flex items-center justify-between">
          <span>{notificationMsg}</span>
          <button onClick={() => setNotificationMsg(null)} className="text-black font-bold">✕</button>
        </div>
      )}

      {/* Page SEO Metadata Drawer (if open) */}
      {isSeoDrawerOpen && (
        <div className="bg-zinc-950 border border-white/15 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold uppercase text-white flex items-center gap-2">
              <Globe size={16} className="text-[#d8ff38]" />
              HOMEPAGE METADATA & SEARCH ENGINE INDEXING
            </h3>
            <button onClick={() => setIsSeoDrawerOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 uppercase mb-1">PAGE META TITLE</label>
              <input
                type="text"
                value={seoConfig.siteTitle}
                onChange={(e) => updateSeoConfig({ siteTitle: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-zinc-400 uppercase mb-1">CANONICAL BASE URL</label>
              <input
                type="text"
                value={seoConfig.canonicalBaseUrl}
                onChange={(e) => updateSeoConfig({ canonicalBaseUrl: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 uppercase mb-1">META DESCRIPTION</label>
            <textarea
              rows={2}
              value={seoConfig.defaultDescription}
              onChange={(e) => updateSeoConfig({ defaultDescription: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
            />
          </div>
        </div>
      )}

      {/* Sections List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] text-zinc-400 font-bold px-2 uppercase">
          <span>PAGE SECTIONS ({sortedSections.length})</span>
          <span>STATUS / ORDER / ACTIONS</span>
        </div>

        {sortedSections.map((section, index) => {
          const isEditing = editingSectionId === section.id;

          return (
            <div 
              key={section.id} 
              className={`bg-zinc-950 border transition-all ${
                section.enabled ? 'border-white/10 hover:border-white/20' : 'border-white/5 opacity-50 bg-zinc-950/40'
              }`}
            >
              {/* Section Header Row */}
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left info */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center h-10 w-10 bg-zinc-900 border border-white/10 text-white font-bold text-sm">
                    {section.order}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm uppercase">{section.name}</h3>
                      <span className={`text-[9px] px-1.5 py-0.2 font-extrabold uppercase border ${
                        section.enabled 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-zinc-800 text-zinc-500 border-white/5'
                      }`}>
                        {section.enabled ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </div>

                    {section.heading && (
                      <p className="text-zinc-400 text-xs mt-0.5 line-clamp-1">
                        Heading: <strong className="text-white">"{section.heading}"</strong>
                      </p>
                    )}
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  
                  {/* Toggle Visibility */}
                  <button
                    onClick={() => toggleSection(activePage.id, section.id)}
                    className={`p-2 border transition-colors ${
                      section.enabled 
                        ? 'bg-zinc-900 border-white/20 text-white hover:bg-zinc-800' 
                        : 'bg-zinc-950 border-white/10 text-zinc-500 hover:text-zinc-300'
                    }`}
                    title={section.enabled ? 'Disable section' : 'Enable section'}
                  >
                    {section.enabled ? <Eye size={15} className="text-[#d8ff38]" /> : <EyeOff size={15} />}
                  </button>

                  {/* Reorder Up */}
                  <button
                    disabled={index === 0}
                    onClick={() => reorderSection(activePage.id, section.id, 'UP')}
                    className="p-2 bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-300"
                    title="Move Up"
                  >
                    <ArrowUp size={15} />
                  </button>

                  {/* Reorder Down */}
                  <button
                    disabled={index === sortedSections.length - 1}
                    onClick={() => reorderSection(activePage.id, section.id, 'DOWN')}
                    className="p-2 bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-300"
                    title="Move Down"
                  >
                    <ArrowDown size={15} />
                  </button>

                  {/* Edit Toggle */}
                  <button
                    onClick={() => isEditing ? setEditingSectionId(null) : startEdit(section)}
                    className={`px-3 py-2 border uppercase font-bold text-[10px] flex items-center gap-1.5 transition-colors ${
                      isEditing 
                        ? 'bg-[#d8ff38] text-black border-[#d8ff38]' 
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border-white/10'
                    }`}
                  >
                    <Edit3 size={13} />
                    <span>{isEditing ? 'CLOSE' : 'EDIT CONTENT'}</span>
                  </button>

                </div>

              </div>

              {/* Expandable In-Place Editor */}
              {isEditing && (
                <div className="border-t border-white/10 p-5 bg-zinc-900/80 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 uppercase mb-1">SECTION EYEBROW / BADGE TEXT</label>
                      <input
                        type="text"
                        value={editEyebrow}
                        onChange={(e) => setEditEyebrow(e.target.value)}
                        placeholder="e.g. 04 // SCIENTIFIC PRECISION"
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase mb-1">MAIN HEADLINE</label>
                      <input
                        type="text"
                        value={editHeading}
                        onChange={(e) => setEditHeading(e.target.value)}
                        placeholder="e.g. TRAIN WITH PURPOSE."
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">SUBTITLE / PARAGRAPH TEXT</label>
                    <textarea
                      rows={2}
                      value={editSubtitle}
                      onChange={(e) => setEditSubtitle(e.target.value)}
                      placeholder="Brief editorial explanation..."
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-white"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 uppercase mb-1">CALL TO ACTION BUTTON TEXT</label>
                      <input
                        type="text"
                        value={editCtaText}
                        onChange={(e) => setEditCtaText(e.target.value)}
                        placeholder="e.g. START TODAY"
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase mb-1">CTA DESTINATION TAB</label>
                      <select
                        value={editCtaActionTab}
                        onChange={(e) => setEditCtaActionTab(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-white uppercase font-bold"
                      >
                        <option value="calculate">CALORIE CALCULATOR</option>
                        <option value="nutrition">7-DAY DIET GENERATOR</option>
                        <option value="train">WORKOUT PLANNER</option>
                        <option value="challenges">FITNESS CHALLENGES</option>
                        <option value="transform">TRANSFORMATIONS</option>
                        <option value="community">THE TRIBE</option>
                        <option value="coach">THE COACH</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingSectionId(null)}
                      className="px-4 py-2 bg-zinc-800 text-zinc-400 uppercase font-bold"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={() => handleSaveSectionEdit(section.id)}
                      className="px-5 py-2 bg-[#d8ff38] text-black font-bold uppercase flex items-center gap-1.5"
                    >
                      <Save size={14} />
                      <span>SAVE SECTION CHANGES</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
