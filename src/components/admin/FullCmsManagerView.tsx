import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CmsPageBuilderView } from './CmsPageBuilderView';
import { BlogAndFaqCmsView } from './BlogAndFaqCmsView';
import { MediaAndNavigationCmsView } from './MediaAndNavigationCmsView';
import { TransformationsAndTestimonialsView } from './TransformationsAndTestimonialsView';
import { 
  Layers, 
  FileText, 
  HelpCircle, 
  Image as ImageIcon, 
  Sparkles, 
  Compass, 
  Search, 
  Megaphone, 
  CheckCircle2, 
  Globe, 
  Save, 
  ExternalLink 
} from 'lucide-react';

export const FullCmsManagerView: React.FC = () => {
  const { 
    activePage, 
    publishPage, 
    blogPosts, 
    faqs, 
    mediaLibrary,
    testimonials
  } = useAdmin();

  const [cmsTab, setCmsTab] = useState<'SECTIONS' | 'BLOG' | 'FAQ' | 'MEDIA' | 'PROOF' | 'NAVIGATION'>('SECTIONS');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handlePublishAll = () => {
    publishPage(activePage.id);
    showNotification('ALL CMS CONTENT & HOMEPAGE SECTIONS PUBLISHED LIVE.');
  };

  return (
    <div id="full-cms-manager" className="space-y-6 font-mono-num text-xs max-w-7xl mx-auto">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFC515] text-black font-mono-num font-bold px-4 py-2.5 rounded-sm shadow-2xl border border-black flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Main CMS Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-widest text-[#FFC515]">
              CONTENT ARCHITECTURE ENGINE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-display text-white">
            PRODUCTION CMS & ASSETS
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Complete publishing suite for homepage sections, blog articles, FAQ database, media library, and social proof.
          </p>
        </div>

        {/* Global CMS Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePublishAll}
            className="px-5 py-2.5 bg-[#FFC515] hover:bg-[#e5b112] text-black font-extrabold uppercase text-xs rounded-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <Globe size={15} /> Publish Live Site
          </button>
        </div>
      </div>

      {/* CMS Sub-navigation Tabs */}
      <div className="flex bg-zinc-950 border border-white/10 p-1.5 rounded-sm overflow-x-auto gap-1">
        <button
          onClick={() => setCmsTab('SECTIONS')}
          className={`px-3.5 py-2 uppercase font-bold text-xs transition-colors rounded-sm flex items-center gap-1.5 shrink-0 ${
            cmsTab === 'SECTIONS' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers size={14} />
          <span>Page & Sections ({activePage?.sections?.length || 0})</span>
        </button>

        <button
          onClick={() => setCmsTab('BLOG')}
          className={`px-3.5 py-2 uppercase font-bold text-xs transition-colors rounded-sm flex items-center gap-1.5 shrink-0 ${
            cmsTab === 'BLOG' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <FileText size={14} />
          <span>Articles & Blog ({blogPosts?.length || 0})</span>
        </button>

        <button
          onClick={() => setCmsTab('FAQ')}
          className={`px-3.5 py-2 uppercase font-bold text-xs transition-colors rounded-sm flex items-center gap-1.5 shrink-0 ${
            cmsTab === 'FAQ' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <HelpCircle size={14} />
          <span>FAQ Knowledge Base ({faqs?.length || 0})</span>
        </button>

        <button
          onClick={() => setCmsTab('PROOF')}
          className={`px-3.5 py-2 uppercase font-bold text-xs transition-colors rounded-sm flex items-center gap-1.5 shrink-0 ${
            cmsTab === 'PROOF' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles size={14} />
          <span>Transformations & Proof</span>
        </button>

        <button
          onClick={() => setCmsTab('MEDIA')}
          className={`px-3.5 py-2 uppercase font-bold text-xs transition-colors rounded-sm flex items-center gap-1.5 shrink-0 ${
            cmsTab === 'MEDIA' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ImageIcon size={14} />
          <span>Media Assets ({mediaLibrary?.length || 0})</span>
        </button>

        <button
          onClick={() => setCmsTab('NAVIGATION')}
          className={`px-3.5 py-2 uppercase font-bold text-xs transition-colors rounded-sm flex items-center gap-1.5 shrink-0 ${
            cmsTab === 'NAVIGATION' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Compass size={14} />
          <span>Navigation & SEO</span>
        </button>
      </div>

      {/* Render Active CMS View */}
      <div className="pt-2">
        {cmsTab === 'SECTIONS' && <CmsPageBuilderView />}
        {cmsTab === 'BLOG' && <BlogAndFaqCmsView />}
        {cmsTab === 'FAQ' && <BlogAndFaqCmsView />}
        {cmsTab === 'PROOF' && <TransformationsAndTestimonialsView />}
        {cmsTab === 'MEDIA' && <MediaAndNavigationCmsView />}
        {cmsTab === 'NAVIGATION' && <MediaAndNavigationCmsView />}
      </div>

    </div>
  );
};
