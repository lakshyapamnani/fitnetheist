import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { BlogPost, FAQItem } from '../../types/admin';
import { 
  FileText, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Globe,
  Tag
} from 'lucide-react';

export const BlogAndFaqCmsView: React.FC = () => {
  const { 
    blogPosts, 
    saveBlogPost, 
    deleteBlogPost, 
    faqs, 
    saveFaq, 
    deleteFaq 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'BLOG' | 'FAQ'>('BLOG');
  
  // Blog form state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogCategory, setBlogCategory] = useState('Nutrition');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('Fitnetheist Research Group');
  const [blogStatus, setBlogStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  // FAQ form state
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState<'CHALLENGES' | 'NUTRITION' | 'TRAINING' | 'MEMBERSHIP' | 'GENERAL'>('GENERAL');

  const startEditBlog = (post: BlogPost) => {
    setEditingPost(post);
    setBlogTitle(post.title);
    setBlogSlug(post.slug);
    setBlogCategory(post.category);
    setBlogExcerpt(post.excerpt);
    setBlogContent(post.content);
    setBlogAuthor(post.author);
    setBlogStatus(post.status);
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) return;

    saveBlogPost({
      id: editingPost ? editingPost.id : undefined,
      title: blogTitle,
      slug: blogSlug || blogTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category: blogCategory,
      excerpt: blogExcerpt,
      content: blogContent,
      author: blogAuthor,
      status: blogStatus,
      seoTitle: blogTitle,
      seoDescription: blogExcerpt
    });

    setIsBlogModalOpen(false);
    setEditingPost(null);
    setBlogTitle('');
    setBlogContent('');
  };

  const handleSaveFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;

    saveFaq({
      question: faqQuestion,
      answer: faqAnswer,
      category: faqCategory,
      isPublished: true
    });

    setIsFaqModalOpen(false);
    setFaqQuestion('');
    setFaqAnswer('');
  };

  return (
    <div id="blog-faq-cms" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              EDITORIAL & KNOWLEDGE MANAGEMENT
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            BLOG & FAQ REPOSITORY
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Publish scientific training protocols, dietary guides, and customer support answer banks.
          </p>
        </div>

        {/* Tab & New Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-900 border border-white/10 p-1">
            <button
              onClick={() => setActiveTab('BLOG')}
              className={`px-3.5 py-1.5 uppercase font-bold text-[10px] ${
                activeTab === 'BLOG' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              ARTICLES ({blogPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('FAQ')}
              className={`px-3.5 py-1.5 uppercase font-bold text-[10px] ${
                activeTab === 'FAQ' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              FAQS ({faqs.length})
            </button>
          </div>

          {activeTab === 'BLOG' ? (
            <button
              onClick={() => {
                setEditingPost(null);
                setBlogTitle('');
                setBlogSlug('');
                setBlogExcerpt('');
                setBlogContent('');
                setIsBlogModalOpen(true);
              }}
              className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-1.5 transition-colors"
            >
              <Plus size={14} />
              <span>NEW ARTICLE</span>
            </button>
          ) : (
            <button
              onClick={() => setIsFaqModalOpen(true)}
              className="px-4 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-bold uppercase flex items-center gap-1.5 transition-colors"
            >
              <Plus size={14} />
              <span>NEW FAQ</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'BLOG' ? (
        /* Blog Articles Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-zinc-950 border border-white/10 overflow-hidden flex flex-col justify-between">
              
              <div>
                <div className="h-44 bg-zinc-900 relative">
                  <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[#d8ff38] font-bold text-[9px] uppercase border border-[#d8ff38]/30">
                    {post.category}
                  </span>
                  <span className={`absolute top-2 right-2 px-2 py-0.5 font-bold text-[9px] uppercase ${
                    post.status === 'PUBLISHED' ? 'bg-[#d8ff38] text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {post.status}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-base font-bold uppercase text-white font-display line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-xs line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-2 text-[10px] text-zinc-500">
                    <span>By {post.author} • {post.publishDate}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">/{post.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditBlog(post)}
                    className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white uppercase text-[10px] font-bold border border-white/10"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete article "${post.title}"?`)) {
                        deleteBlogPost(post.id);
                      }
                    }}
                    className="p-1 bg-zinc-950 hover:bg-red-950 text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* FAQ Grid */
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map(faq => (
            <div key={faq.id} className="bg-zinc-950 border border-white/10 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-[#d8ff38] font-bold text-[9px] uppercase">
                    {faq.category}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold">ORDER #{faq.order}</span>
                </div>

                <h3 className="font-bold text-white text-sm">
                  {faq.question}
                </h3>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => {
                    if (confirm(`Delete FAQ: "${faq.question}"?`)) {
                      deleteFaq(faq.id);
                    }
                  }}
                  className="text-zinc-500 hover:text-red-400 text-[10px] uppercase font-bold"
                >
                  DELETE FAQ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Article Editor Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-2xl w-full font-mono-num text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase text-white">
                {editingPost ? 'EDIT SCIENTIFIC PROTOCOL ARTICLE' : 'CREATE PROTOCOL ARTICLE'}
              </h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">ARTICLE TITLE *</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="e.g. The Science of High Protein Plant Synthesis"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">CATEGORY</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  >
                    <option value="Nutrition">NUTRITION</option>
                    <option value="Workout">WORKOUT & HYPERTROPHY</option>
                    <option value="Science">METABOLIC SCIENCE</option>
                    <option value="Mindset">DISCIPLINE & HABITS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">AUTHOR</label>
                  <input
                    type="text"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">EXCERPT (SHORT SUMMARY)</label>
                <textarea
                  rows={2}
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="Key takeaways for quick scannability..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">FULL ARTICLE BODY (MARKDOWN / TEXT)</label>
                <textarea
                  rows={6}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="Full scientific breakdown..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8ff38] text-black font-bold uppercase"
                >
                  PUBLISH POST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ Creation Modal */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-white/20 p-6 sm:p-8 max-w-md w-full font-mono-num text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase text-white">ADD FAQ QUESTION</h3>
              <button onClick={() => setIsFaqModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveFaqSubmit} className="space-y-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">CATEGORY</label>
                <select
                  value={faqCategory}
                  onChange={(e) => setFaqCategory(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                >
                  <option value="CHALLENGES">CHALLENGES</option>
                  <option value="NUTRITION">NUTRITION & MACROS</option>
                  <option value="TRAINING">TRAINING & WORKOUTS</option>
                  <option value="MEMBERSHIP">MEMBERSHIP & BILLING</option>
                  <option value="GENERAL">GENERAL INQUIRIES</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">QUESTION *</label>
                <input
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="e.g. How does the 1:1 macro swap work?"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">ANSWER *</label>
                <textarea
                  rows={4}
                  required
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Clear scientific answer..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8ff38] text-black font-bold uppercase"
                >
                  SAVE FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
