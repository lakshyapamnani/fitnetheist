import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAdmin } from '../../context/AdminContext';
import { 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  Star, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export const TransformationsAndTestimonialsView: React.FC = () => {
  const { transformations } = useApp();
  const { testimonials, updateTestimonialStatus, logAuditAction } = useAdmin();

  const [activeTab, setActiveTab] = useState<'TESTIMONIALS' | 'TRANSFORMATIONS'>('TESTIMONIALS');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

  const filteredTestimonials = testimonials.filter(t => filterStatus === 'ALL' || t.status === filterStatus);

  return (
    <div id="transformations-testimonials-admin" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              SOCIAL PROOF & ATHLETE EVIDENCE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            TRANSFORMATIONS & REVIEWS
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Moderate athlete review submissions, verify photo consent authenticity, and manage before/after cases.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-zinc-900 border border-white/10 p-1">
          <button
            onClick={() => setActiveTab('TESTIMONIALS')}
            className={`px-3.5 py-2 uppercase font-bold text-[10px] ${
              activeTab === 'TESTIMONIALS' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            TESTIMONIALS QUEUE ({testimonials.filter(t => t.status === 'PENDING').length} PENDING)
          </button>
          <button
            onClick={() => setActiveTab('TRANSFORMATIONS')}
            className={`px-3.5 py-2 uppercase font-bold text-[10px] ${
              activeTab === 'TRANSFORMATIONS' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            TRANSFORMATIONS ({transformations.length})
          </button>
        </div>
      </div>

      {activeTab === 'TESTIMONIALS' ? (
        <div className="space-y-4">
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">STATUS FILTER:</span>
            {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 uppercase font-bold text-[10px] border ${
                  filterStatus === st 
                    ? 'bg-zinc-800 text-[#d8ff38] border-[#d8ff38]' 
                    : 'bg-zinc-950 text-zinc-500 border-white/5 hover:border-white/20'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Testimonials List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTestimonials.map(item => (
              <div key={item.id} className="bg-zinc-950 border border-white/10 p-5 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-zinc-800 border border-white/10">
                        <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[10px] text-zinc-500">{item.challengeName}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase border ${
                      item.status === 'APPROVED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : item.status === 'PENDING' 
                          ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30' 
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-zinc-300 text-xs italic leading-relaxed">
                    "{item.quote}"
                  </p>

                  <div className="flex items-center gap-1 text-[#d8ff38]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                    <span className="text-[10px] text-zinc-500 ml-1">Submitted {item.submittedDate}</span>
                  </div>
                </div>

                {/* Moderate buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  {item.status !== 'APPROVED' && (
                    <button
                      onClick={() => updateTestimonialStatus(item.id, 'APPROVED')}
                      className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-black border border-emerald-500/40 uppercase font-bold flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 size={12} />
                      <span>APPROVE</span>
                    </button>
                  )}

                  {item.status !== 'REJECTED' && (
                    <button
                      onClick={() => updateTestimonialStatus(item.id, 'REJECTED')}
                      className="px-2.5 py-1 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 uppercase font-bold flex items-center gap-1 transition-colors"
                    >
                      <XCircle size={12} />
                      <span>REJECT</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Transformations Grid */
        <div className="grid md:grid-cols-3 gap-6">
          {transformations.map(tr => (
            <div key={tr.id} className="bg-zinc-950 border border-white/10 overflow-hidden space-y-3">
              <div className="grid grid-cols-2 h-44 bg-zinc-900 border-b border-white/10">
                <div className="relative">
                  <img src={tr.beforeImage} alt="Before" className="h-full w-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-zinc-400">
                    BEFORE ({tr.startWeight}kg)
                  </span>
                </div>
                <div className="relative">
                  <img src={tr.afterImage} alt="After" className="h-full w-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-[#d8ff38] px-1.5 py-0.5 text-[9px] font-bold text-black">
                    AFTER ({tr.currentWeight}kg)
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm uppercase">{tr.name}</span>
                  <span className="text-[#d8ff38] font-bold">{tr.timeframe}</span>
                </div>

                <div className="p-2 bg-zinc-900 border border-white/5 flex justify-between text-[11px]">
                  <span className="text-zinc-400">NET CHANGE:</span>
                  <span className="text-[#d8ff38] font-bold">{tr.delta}</span>
                </div>

                <p className="text-zinc-400 text-xs italic line-clamp-2">
                  "{tr.quote}"
                </p>

                <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck size={12} /> Consent Verified
                  </span>
                  <span className="text-white uppercase font-bold">{tr.challengeName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
