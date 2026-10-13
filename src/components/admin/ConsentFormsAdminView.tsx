import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CoachingConsentRecord } from '../../types/admin';
import { 
  FileText, 
  Search, 
  Filter, 
  Printer, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  User, 
  Phone, 
  Calendar, 
  IndianRupee, 
  Eye, 
  Trash2, 
  MessageCircle, 
  Sparkles, 
  Activity, 
  HeartPulse, 
  Dumbbell, 
  Utensils, 
  Lock,
  ExternalLink,
  ChevronRight,
  X,
  FileCheck,
  RefreshCw,
  Edit3
} from 'lucide-react';

export const ConsentFormsAdminView: React.FC = () => {
  const { 
    consentForms, 
    updateConsentFormStatus, 
    deleteConsentForm,
    setActiveSubtab
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgramFilter, setSelectedProgramFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [activeModalConsent, setActiveModalConsent] = useState<CoachingConsentRecord | null>(null);
  const [printingConsent, setPrintingConsent] = useState<CoachingConsentRecord | null>(null);
  
  // Review modal state
  const [editingStatus, setEditingStatus] = useState<'SIGNED' | 'VERIFIED' | 'REVIEWED'>('SIGNED');
  const [editingNotes, setEditingNotes] = useState('');
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const safeForms = Array.isArray(consentForms) ? consentForms : [];

  const filteredForms = safeForms.filter(f => {
    if (!f) return false;
    const term = searchTerm.toLowerCase().trim();
    const matchSearch = !term || 
      (f.clientName || '').toLowerCase().includes(term) ||
      (f.clientPhone || '').toLowerCase().includes(term) ||
      (f.clientEmail || '').toLowerCase().includes(term) ||
      (f.signatureText || '').toLowerCase().includes(term) ||
      (f.signaturePlace || '').toLowerCase().includes(term);

    const matchProgram = selectedProgramFilter === 'ALL' || f.program === selectedProgramFilter;
    const matchStatus = selectedStatusFilter === 'ALL' || f.status === selectedStatusFilter;

    return matchSearch && matchProgram && matchStatus;
  });

  // Calculate Metrics
  const totalAgreements = safeForms.length;
  const pendingVerification = safeForms.filter(f => f.status === 'SIGNED' || !f.status).length;
  const verifiedCount = safeForms.filter(f => f.status === 'VERIFIED' || f.status === 'REVIEWED').length;

  // Approximate total portfolio value from signed agreements
  const totalContractValue = safeForms.reduce((acc, f) => {
    const rawPrice = (f.programPrice || '').replace(/[^0-9]/g, '');
    const num = parseInt(rawPrice, 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const handleOpenReviewModal = (consent: CoachingConsentRecord) => {
    setActiveModalConsent(consent);
    setEditingStatus(consent.status || 'SIGNED');
    setEditingNotes(consent.coachNotes || '');
    setActionSuccessMsg(null);
  };

  const handleSaveStatus = async () => {
    if (!activeModalConsent) return;
    setIsSavingStatus(true);
    try {
      await updateConsentFormStatus(activeModalConsent.id, editingStatus, editingNotes);
      setActiveModalConsent(prev => prev ? { ...prev, status: editingStatus, coachNotes: editingNotes } : null);
      setActionSuccessMsg('Consent form status updated in Realtime Database.');
      setTimeout(() => setActionSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingStatus(false);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete the signed consent form for ${clientName}? This action will permanently remove it from Realtime Database.`)) {
      await deleteConsentForm(id);
      if (activeModalConsent?.id === id) {
        setActiveModalConsent(null);
      }
    }
  };

  const handlePrintPdf = (consent: CoachingConsentRecord) => {
    setPrintingConsent(consent);
    // Allow React to render print modal and trigger print
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const handleDownloadHtmlFile = (consent: CoachingConsentRecord) => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>COACH NEETU FIT - Coaching Consent Form - ${consent.clientName}</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 40px; color: #111; line-height: 1.5; font-size: 13px; }
    .header { border-bottom: 2px solid #000; padding-bottom: 16px; margin-bottom: 20px; }
    .title { font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 0; }
    .subtitle { font-size: 12px; color: #555; text-transform: uppercase; letter-spacing: 1px; }
    .badge { display: inline-block; background: #eee; padding: 3px 8px; font-size: 11px; font-weight: bold; margin-top: 5px; }
    .section { margin-bottom: 18px; }
    .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; background: #f4f4f4; padding: 6px 10px; border-left: 4px solid #111; margin-bottom: 8px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .field { margin-bottom: 6px; }
    .field strong { color: #333; }
    .box { border: 1px solid #ddd; padding: 12px; background: #fafafa; border-radius: 4px; margin-top: 10px; }
    .highlight-box { border: 2px solid #d97706; padding: 12px; background: #fffbeb; border-radius: 4px; margin: 12px 0; }
    .signature-area { margin-top: 24px; padding-top: 16px; border-top: 1px solid #ccc; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .sig-line { border-bottom: 1px dashed #333; padding-bottom: 4px; font-family: monospace; font-size: 15px; font-weight: bold; }
    .footer { font-size: 10px; color: #777; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="subtitle">COACH NEETU FIT • CONFIDENTIAL CLIENT AGREEMENT</div>
    <h1 class="title">COACHING CONSENT FORM</h1>
    <div style="font-size: 12px; color: #444; margin-top: 4px;">
      For Online Coaching, Bespoke Nutrition Programming & Virtual 1-on-1 Training
    </div>
    <div style="margin-top: 8px; font-size: 11px; color: #555;">
      <strong>Coach Desk:</strong> Coach Neetu • Phone / WhatsApp: 07420082838 • Instagram: @coachneetu.fit
    </div>
  </div>

  <div class="section">
    <div class="section-title">Client Information & Program Enrolled</div>
    <div class="grid">
      <div class="field"><strong>Client Full Name:</strong> ${consent.clientName}</div>
      <div class="field"><strong>Age:</strong> ${consent.clientAge || 'N/A'}</div>
      <div class="field"><strong>Phone / WhatsApp:</strong> ${consent.clientPhone}</div>
      <div class="field"><strong>Email:</strong> ${consent.clientEmail || 'N/A'}</div>
      <div class="field"><strong>Program Selected:</strong> ${consent.program.replace('_', ' ')} (Both Workout & Nutrition Included)</div>
      <div class="field"><strong>Program Fee:</strong> ${consent.programPrice || '₹18,000'}</div>
      <div class="field"><strong>Pause Allowance:</strong> ${consent.pauseAllowance || 'Applicable as per tier'}</div>
      <div class="field"><strong>Start Date:</strong> ${consent.startDate}</div>
    </div>
  </div>

  <div class="highlight-box">
    <strong>5. STRICT NO-REFUND POLICY & MEMBERSHIP PAUSE RULES (ACKNOWLEDGED):</strong><br>
    • <strong>NO REFUND POLICY:</strong> All payments are 100% NON-REFUNDABLE once coaching has commenced. There is strictly no refund if the client has personal issues, work commitments, family obligations, travel, lack of time, lack of motivation, change of mind, or is unable to follow the plan.<br>
    • <strong>PAUSE RULES:</strong> 3 Months (No pause), 6 Months (20 days), 9 Months (30 days), 12 Months (40 days). Any days beyond the allocated days are chargeable at ₹199 per day, and pause will be lifted only after payment of the extended days.
  </div>

  <div class="section">
    <div class="section-title">10. Health & Emergency Information Disclosed</div>
    <div class="field"><strong>Medical Conditions / Health Concerns:</strong> ${consent.medicalConditions || 'None disclosed / Medically cleared'}</div>
    <div class="field"><strong>Current Medications / Supplements:</strong> ${consent.medications || 'None'}</div>
    <div class="field"><strong>Allergies / Food Intolerances:</strong> ${consent.allergies || 'None'}</div>
    <div class="field"><strong>Injuries / Recurring Pain / Surgery:</strong> ${consent.injuries || 'None'}</div>
    <div class="grid" style="margin-top: 8px;">
      <div class="field"><strong>Emergency Contact:</strong> ${consent.emergencyContact || 'Provided on intake'}</div>
      <div class="field"><strong>Relationship:</strong> ${consent.emergencyRelationship || 'Family'}</div>
      <div class="field"><strong>Emergency Phone:</strong> ${consent.emergencyPhone || 'N/A'}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Client Acknowledgements & Declarations</div>
    <ul style="padding-left: 18px; margin: 4px 0;">
      <li>[✓] Medically cleared / confirmed fit to participate in fitness and nutrition protocols.</li>
      <li>[✓] Informed consent for exercise inherent physical exertion and technique guidelines.</li>
      <li>[✓] Nutrition coaching acknowledgement (does not replace medical clinical therapy).</li>
      <li>[✓] Strict No-Refund Policy accepted: personal issues do not qualify for a refund.</li>
      <li>[✓] Pause policy accepted: overstay charged at ₹199/day.</li>
      <li>[✓] Proprietary material protection: customized workout splits and macro plans are non-transferable.</li>
    </ul>
  </div>

  <div class="signature-area">
    <div>
      <div style="font-size: 11px; text-transform: uppercase; color: #555; margin-bottom: 6px;">Client Digital Signature</div>
      <div class="sig-line">${consent.signatureText}</div>
      <div style="font-size: 11px; margin-top: 4px; color: #666;">
        Place: ${consent.signaturePlace} • Signed At: ${new Date(consent.signedAt).toLocaleString()}
      </div>
      <div style="font-size: 10px; color: #16a34a; font-weight: bold; margin-top: 4px;">
        ✓ Legally Binding Electronic Acceptance Confirmed
      </div>
    </div>
    <div>
      <div style="font-size: 11px; text-transform: uppercase; color: #555; margin-bottom: 6px;">Coach Verification & Countersignature</div>
      <div class="sig-line">Coach Neetu (Founder, Coach Neetu Fit)</div>
      <div style="font-size: 11px; margin-top: 4px; color: #666;">
        Status: ${consent.status || 'SIGNED'} • Verified: ${consent.verifiedAt ? new Date(consent.verifiedAt).toLocaleDateString() : 'Auto-recorded'}
      </div>
      ${consent.coachNotes ? `<div style="font-size: 10px; color: #444; margin-top: 4px;">Coach Notes: ${consent.coachNotes}</div>` : ''}
    </div>
  </div>

  <div class="footer">
    COACH NEETU FIT • OFFICIAL CLIENT CONTRACT • PHONE: 07420082838 • INSTAGRAM: @coachneetu.fit
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Coach_Neetu_Fit_Consent_${(consent.clientName || 'Athlete').replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-20 font-mono-num text-xs">
      
      {/* Top Header Card */}
      <div className="bg-[#0e0e12] border border-white/10 p-6 rounded-sm shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#FFC515] uppercase font-bold tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              REALTIME DATABASE: /consent_forms
            </span>
            <span className="text-[10px] text-zinc-500">•</span>
            <span className="text-[10px] text-zinc-400">Legal Coaching Consent Protocol</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-white font-display tracking-tight flex items-center gap-2">
            <FileText className="text-[#FFC515]" size={24} />
            <span>Coaching Consent Forms & Agreements</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl font-sans">
            Review digitally signed athlete agreements, health declarations, emergency contacts, strict no-refund acknowledgements, and download printable PDF contracts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/917420082838"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs rounded font-bold uppercase flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle size={14} />
            <span>Coach Desk WhatsApp</span>
          </a>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 rounded transition-colors"
            title="Refresh Realtime Database"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e0e12] border border-white/10 p-4 rounded-sm">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">TOTAL SIGNED FORMS</span>
            <FileCheck size={16} className="text-[#FFC515]" />
          </div>
          <div className="text-2xl font-black text-white mt-2 font-display">{totalAgreements}</div>
          <div className="text-[10px] text-zinc-500 mt-1">Live in Firebase Realtime DB</div>
        </div>

        <div className="bg-[#0e0e12] border border-amber-500/30 p-4 rounded-sm">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">NEEDS REVIEW</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 mt-2 font-display">{pendingVerification}</div>
          <div className="text-[10px] text-amber-500/80 mt-1">Awaiting Coach Counter-check</div>
        </div>

        <div className="bg-[#0e0e12] border border-emerald-500/30 p-4 rounded-sm">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">VERIFIED & CLEARED</span>
            <ShieldCheck size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-300 mt-2 font-display">{verifiedCount}</div>
          <div className="text-[10px] text-emerald-500/80 mt-1">Health & Terms Approved</div>
        </div>

        <div className="bg-[#0e0e12] border border-[#FFC515]/30 p-4 rounded-sm">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[#FFC515] uppercase font-bold tracking-wider">SIGNED CONTRACT VALUE</span>
            <IndianRupee size={16} className="text-[#FFC515]" />
          </div>
          <div className="text-2xl font-black text-[#FFC515] mt-2 font-display">
            ₹{totalContractValue.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-zinc-400 mt-1">Both Workout & Nutrition Tiers</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0e0e12] border border-white/10 p-4 rounded-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, phone, signature..."
            className="w-full bg-[#14141a] border border-white/10 pl-9 pr-3 py-2 text-white text-xs rounded outline-none focus:border-[#FFC515]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-zinc-500" />
            <select
              value={selectedProgramFilter}
              onChange={(e) => setSelectedProgramFilter(e.target.value)}
              className="bg-[#14141a] border border-white/10 px-2.5 py-1.5 text-xs text-zinc-300 rounded outline-none focus:border-[#FFC515]"
            >
              <option value="ALL">All Programs</option>
              <option value="3_MONTHS">3 Months (₹8k • No Pause)</option>
              <option value="6_MONTHS">6 Months (₹18k • 20d Pause)</option>
              <option value="9_MONTHS">9 Months (₹20k • 30d Pause)</option>
              <option value="12_MONTHS">12 Months (₹25k • 40d Pause)</option>
            </select>
          </div>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-[#14141a] border border-white/10 px-2.5 py-1.5 text-xs text-zinc-300 rounded outline-none focus:border-[#FFC515]"
          >
            <option value="ALL">All Statuses</option>
            <option value="SIGNED">Signed (Pending Review)</option>
            <option value="VERIFIED">Verified</option>
            <option value="REVIEWED">Reviewed</option>
          </select>
        </div>
      </div>

      {/* Main Table / List */}
      <div className="bg-[#0e0e12] border border-white/10 rounded-sm overflow-hidden shadow-xl">
        {filteredForms.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText size={36} className="text-zinc-600 mx-auto" />
            <div className="text-sm font-bold uppercase text-zinc-300 font-display">
              No Coaching Consent Forms Found
            </div>
            <p className="text-xs text-zinc-500 max-w-md mx-auto font-sans">
              Signed consent forms from the client policy page will automatically sync in real-time here via Firebase Realtime Database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-950/80 text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                  <th className="p-3.5">Athlete / Client</th>
                  <th className="p-3.5">Program & Fee</th>
                  <th className="p-3.5">Start Date</th>
                  <th className="p-3.5">Health Disclosures</th>
                  <th className="p-3.5">Digital Signature</th>
                  <th className="p-3.5">Signed Timestamp</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredForms.map((consent) => {
                  const hasConditions = 
                    (consent.medicalConditions && consent.medicalConditions !== 'None disclosed / Medically cleared') ||
                    (consent.injuries && consent.injuries !== 'None') ||
                    (consent.allergies && consent.allergies !== 'None');

                  const statusColor = 
                    consent.status === 'VERIFIED' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                    consent.status === 'REVIEWED' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
                    'text-amber-400 bg-amber-500/10 border-amber-500/30';

                  return (
                    <tr key={consent.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Athlete */}
                      <td className="p-3.5">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{consent.clientName}</span>
                          {consent.clientAge && (
                            <span className="text-[10px] text-zinc-500 font-normal">({consent.clientAge} yrs)</span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                          <a 
                            href={`https://wa.me/${consent.clientPhone.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#FFC515] hover:underline flex items-center gap-1"
                          >
                            <Phone size={10} />
                            <span>{consent.clientPhone}</span>
                          </a>
                        </div>
                      </td>

                      {/* Program & Price */}
                      <td className="p-3.5">
                        <div className="font-bold text-[#FFC515]">
                          {consent.program.replace('_', ' ')}
                        </div>
                        <div className="text-[10px] text-zinc-400">
                          {consent.programPrice || '₹18,000'} • {consent.pauseAllowance || 'Pause rules'}
                        </div>
                      </td>

                      {/* Start Date */}
                      <td className="p-3.5 text-zinc-300">
                        {consent.startDate || 'Immediate'}
                      </td>

                      {/* Health Disclosures */}
                      <td className="p-3.5">
                        {hasConditions ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                            <AlertTriangle size={10} />
                            <span>Conditions Noted</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                            <CheckCircle2 size={10} />
                            <span>Medically Cleared</span>
                          </span>
                        )}
                      </td>

                      {/* Digital Signature */}
                      <td className="p-3.5">
                        <div className="font-bold text-zinc-200">
                          {consent.signatureText}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {consent.signaturePlace || 'Online'}
                        </div>
                      </td>

                      {/* Signed Timestamp */}
                      <td className="p-3.5 text-zinc-400 text-[11px]">
                        <div>{new Date(consent.signedAt).toLocaleDateString()}</div>
                        <div className="text-[10px] text-zinc-500">{new Date(consent.signedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${statusColor}`}>
                          {consent.status || 'SIGNED'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenReviewModal(consent)}
                            className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Review full consent and medical declaration"
                          >
                            <Eye size={12} />
                            <span>Review</span>
                          </button>

                          <button
                            onClick={() => handlePrintPdf(consent)}
                            className="px-2 py-1 bg-[#FFC515]/15 hover:bg-[#FFC515]/25 border border-[#FFC515]/30 text-[#FFC515] rounded text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Print / Save PDF"
                          >
                            <Printer size={12} />
                            <span>PDF</span>
                          </button>

                          <button
                            onClick={() => handleDownloadHtmlFile(consent)}
                            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                            title="Download agreement document"
                          >
                            <Download size={13} />
                          </button>

                          <button
                            onClick={() => handleDelete(consent.id, consent.clientName)}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                            title="Delete agreement record"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================
          FULL LEGAL REVIEW & COACH VERIFICATION MODAL
          ======================================================== */}
      {activeModalConsent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e12] border-2 border-[#FFC515]/50 w-full max-w-4xl max-h-[90vh] rounded-sm flex flex-col shadow-2xl overflow-hidden font-mono-num">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-zinc-950 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#FFC515] font-bold uppercase tracking-widest">
                    COACH NEETU FIT • CLIENT CONSENT REVIEW
                  </span>
                  <span className="text-[10px] px-2 py-0.2 bg-zinc-800 text-zinc-300 rounded border border-white/10">
                    ID: {activeModalConsent.id}
                  </span>
                </div>
                <h2 className="text-xl font-black uppercase text-white font-display mt-0.5">
                  {activeModalConsent.clientName} — {activeModalConsent.program.replace('_', ' ')}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrintPdf(activeModalConsent)}
                  className="px-3 py-1.5 bg-[#FFC515] hover:bg-[#eab308] text-black text-xs uppercase font-extrabold rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={13} />
                  <span>Download / Print PDF</span>
                </button>
                <button
                  onClick={() => setActiveModalConsent(null)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-300">
              
              {/* Program & Fee Banner */}
              <div className="p-4 bg-zinc-950 border border-[#FFC515]/40 rounded grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">PROGRAM TIER</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{activeModalConsent.program.replace('_', ' ')}</span>
                  <span className="text-[10px] text-emerald-400">Workout + Nutrition</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">AGREED INVESTMENT</span>
                  <span className="text-[#FFC515] font-extrabold text-sm block mt-0.5">{activeModalConsent.programPrice || '₹18,000'}</span>
                  <span className="text-[10px] text-zinc-400">Paid in Full</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">PAUSE ALLOWANCE</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{activeModalConsent.pauseAllowance || 'Tier policy'}</span>
                  <span className="text-[10px] text-amber-400">+₹199/day overstay</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">START DATE</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{activeModalConsent.startDate}</span>
                  <span className="text-[10px] text-zinc-400">Official Protocol Launch</span>
                </div>
              </div>

              {/* Client & Emergency Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950 border border-white/10 rounded space-y-2">
                  <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                    <User size={13} className="text-[#FFC515]" />
                    <span>CLIENT IDENTIFICATION</span>
                  </h3>
                  <div className="space-y-1">
                    <div><strong>Legal Full Name:</strong> {activeModalConsent.clientName}</div>
                    <div><strong>Age:</strong> {activeModalConsent.clientAge || 'N/A'}</div>
                    <div>
                      <strong>Phone / WhatsApp:</strong>{' '}
                      <a href={`tel:${activeModalConsent.clientPhone}`} className="text-[#FFC515] hover:underline">
                        {activeModalConsent.clientPhone}
                      </a>
                    </div>
                    <div><strong>Email:</strong> {activeModalConsent.clientEmail || 'N/A'}</div>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 border border-white/10 rounded space-y-2">
                  <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                    <Phone size={13} className="text-[#FFC515]" />
                    <span>EMERGENCY CONTACT INFORMATION</span>
                  </h3>
                  <div className="space-y-1">
                    <div><strong>Contact Name:</strong> {activeModalConsent.emergencyContact || 'Not provided'}</div>
                    <div><strong>Relationship:</strong> {activeModalConsent.emergencyRelationship || 'N/A'}</div>
                    <div>
                      <strong>Emergency Phone:</strong>{' '}
                      {activeModalConsent.emergencyPhone ? (
                        <a href={`tel:${activeModalConsent.emergencyPhone}`} className="text-[#FFC515] hover:underline">
                          {activeModalConsent.emergencyPhone}
                        </a>
                      ) : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Health & Medical Disclosures */}
              <div className="p-4 bg-zinc-950 border border-white/10 rounded space-y-3">
                <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                  <HeartPulse size={14} className="text-red-400" />
                  <span>10. HEALTH & MEDICAL DECLARATIONS DISCLOSED BY CLIENT</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2.5 bg-[#14141a] rounded border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">MEDICAL CONDITIONS / HEALTH CONCERNS</span>
                    <span className="text-white block mt-0.5">{activeModalConsent.medicalConditions || 'None disclosed / Medically cleared'}</span>
                  </div>
                  <div className="p-2.5 bg-[#14141a] rounded border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">CURRENT MEDICATIONS / SUPPLEMENTS</span>
                    <span className="text-white block mt-0.5">{activeModalConsent.medications || 'None'}</span>
                  </div>
                  <div className="p-2.5 bg-[#14141a] rounded border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">ALLERGIES & FOOD INTOLERANCES</span>
                    <span className="text-white block mt-0.5">{activeModalConsent.allergies || 'None'}</span>
                  </div>
                  <div className="p-2.5 bg-[#14141a] rounded border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">INJURIES / PAIN / PREVIOUS SURGERY</span>
                    <span className="text-white block mt-0.5">{activeModalConsent.injuries || 'None'}</span>
                  </div>
                </div>
              </div>

              {/* Strict No-Refund & Pause Acknowledged */}
              <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded space-y-2 text-amber-200">
                <div className="font-bold uppercase tracking-wider text-[#FFC515] flex items-center gap-1.5">
                  <AlertTriangle size={14} />
                  <span>5. STRICT NO-REFUND POLICY & MEMBERSHIP PAUSE RULES (LEGALLY ACKNOWLEDGED)</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  • <strong>NO REFUND POLICY:</strong> All payments are 100% NON-REFUNDABLE. Strictly no refund if the client has personal issues, work commitments, family obligations, travel, lack of time, lack of motivation, change of mind, or is unable to follow the plan.<br />
                  • <strong>PAUSE CLAUSE:</strong> 6 Months (20 days), 9 Months (30 days), 12 Months (40 days). Anything beyond allocated days will be chargeable at ₹199 per day, and pause will be lifted only after payment of extended pause days.
                </p>
              </div>

              {/* Signature Proof Block */}
              <div className="p-4 bg-zinc-950 border border-white/10 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">ELECTRONIC DIGITAL SIGNATURE</span>
                  <div className="text-lg font-bold text-[#FFC515] tracking-wide mt-0.5">
                    "{activeModalConsent.signatureText}"
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">
                    Signed Place: {activeModalConsent.signaturePlace || 'Online / India'}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">OFFICIAL TIMESTAMP</span>
                  <div className="text-xs text-white font-bold mt-0.5">
                    {new Date(activeModalConsent.signedAt).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center justify-end gap-1">
                    <CheckCircle2 size={11} />
                    <span>Digital Consent Authenticated</span>
                  </div>
                </div>
              </div>

              {/* Coach Verification Controls */}
              <div className="p-4 bg-[#14141a] border border-[#FFC515]/30 rounded space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase text-[#FFC515] tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    <span>COACH NEETU VERIFICATION & STATUS UPDATE</span>
                  </h3>
                  {actionSuccessMsg && (
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ✓ {actionSuccessMsg}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase block mb-1 font-bold">
                      VERIFICATION STATUS *
                    </label>
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value as any)}
                      className="w-full bg-zinc-950 border border-white/15 p-2 text-white text-xs rounded outline-none focus:border-[#FFC515]"
                    >
                      <option value="SIGNED">SIGNED (Pending Review)</option>
                      <option value="VERIFIED">VERIFIED (Health Cleared & Terms Validated)</option>
                      <option value="REVIEWED">REVIEWED (Ready for Programming)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase block mb-1 font-bold">
                      COACH INTERNAL NOTES / PROTOCOL REMARKS
                    </label>
                    <input
                      type="text"
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      placeholder="e.g. Cleared for hypertrophy. Lower back soreness to monitor."
                      className="w-full bg-zinc-950 border border-white/15 p-2 text-white text-xs rounded outline-none focus:border-[#FFC515]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={handleSaveStatus}
                    disabled={isSavingStatus}
                    className="px-4 py-2 bg-[#FFC515] hover:bg-[#eab308] text-black font-extrabold uppercase text-xs rounded transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 size={13} />
                    <span>{isSavingStatus ? 'Saving to Database...' : 'Save Verification Status'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-xs">
              <a
                href={`https://wa.me/${activeModalConsent.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${activeModalConsent.clientName}! Coach Neetu here. I have received and reviewed your Coaching Consent Form for the ${activeModalConsent.program.replace('_', ' ')} protocol. Welcome aboard!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase rounded flex items-center gap-1.5"
              >
                <MessageCircle size={14} />
                <span>Message Athlete on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadHtmlFile(activeModalConsent)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white font-bold uppercase rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Export HTML</span>
                </button>
                <button
                  onClick={() => handlePrintPdf(activeModalConsent)}
                  className="px-4 py-1.5 bg-[#FFC515] hover:bg-[#eab308] text-black font-extrabold uppercase rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={13} />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          PRINTABLE PDF DOCUMENT CONTAINER (RENDERED FOR PRINT)
          ======================================================== */}
      {printingConsent && (
        <div id="printable-consent-pdf-modal" className="hidden print:block fixed inset-0 z-[9999] bg-white text-black p-8 font-sans">
          <div className="max-w-3xl mx-auto space-y-6 text-black">
            
            {/* Header */}
            <div className="border-b-2 border-black pb-4 text-center">
              <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">
                COACH NEETU FIT • CONFIDENTIAL CLIENT DOCUMENT
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tight mt-1">
                COACHING CONSENT FORM
              </h1>
              <div className="text-xs text-zinc-600 mt-0.5">
                For Online Coaching, Bespoke Nutrition Programming & Virtual 1-on-1 Training
              </div>
              <div className="text-[11px] text-zinc-700 mt-2 font-mono">
                Coach Desk: 07420082838 • Instagram: @coachneetu.fit
              </div>
            </div>

            {/* Client Info Grid */}
            <div className="border border-zinc-300 p-4 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><strong>Client Full Name:</strong> {printingConsent.clientName}</div>
                <div><strong>Age:</strong> {printingConsent.clientAge || 'N/A'}</div>
                <div><strong>Phone / WhatsApp:</strong> {printingConsent.clientPhone}</div>
                <div><strong>Email:</strong> {printingConsent.clientEmail || 'N/A'}</div>
                <div><strong>Program Enrolled:</strong> {printingConsent.program.replace('_', ' ')} (Workout & Nutrition)</div>
                <div><strong>Total Investment:</strong> {printingConsent.programPrice || '₹18,000'}</div>
                <div><strong>Pause Allowance:</strong> {printingConsent.pauseAllowance || 'Per tier'}</div>
                <div><strong>Commencement / Start Date:</strong> {printingConsent.startDate}</div>
              </div>
            </div>

            {/* Health Information Disclosed */}
            <div className="border border-zinc-300 p-4 text-xs space-y-2">
              <div className="font-bold uppercase text-[11px] border-b border-zinc-200 pb-1">
                10. HEALTH & EMERGENCY INFORMATION DISCLOSED
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><strong>Medical Conditions:</strong> {printingConsent.medicalConditions || 'None disclosed / Medically cleared'}</div>
                <div><strong>Current Medications:</strong> {printingConsent.medications || 'None'}</div>
                <div><strong>Allergies / Intolerances:</strong> {printingConsent.allergies || 'None'}</div>
                <div><strong>Injuries / Previous Surgery:</strong> {printingConsent.injuries || 'None'}</div>
              </div>
              <div className="pt-2 border-t border-zinc-200 grid grid-cols-3 gap-2 text-[11px]">
                <div><strong>Emergency Contact:</strong> {printingConsent.emergencyContact || 'Provided'}</div>
                <div><strong>Relationship:</strong> {printingConsent.emergencyRelationship || 'Family'}</div>
                <div><strong>Emergency Phone:</strong> {printingConsent.emergencyPhone || 'N/A'}</div>
              </div>
            </div>

            {/* Strict Refund and Pause Terms */}
            <div className="border-2 border-zinc-800 p-4 text-xs space-y-2 bg-zinc-50">
              <div className="font-extrabold uppercase text-[11px]">
                5. STRICT NO-REFUND POLICY & MEMBERSHIP PAUSE RULES (ACKNOWLEDGED)
              </div>
              <p className="text-[11px] leading-relaxed">
                • <strong>NO REFUND POLICY:</strong> All payments are 100% NON-REFUNDABLE once coaching has commenced. There is strictly no refund if the client has personal issues, work commitments, family obligations, travel, lack of time, lack of motivation, change of mind, or is unable to follow the plan.<br />
                • <strong>PAUSE POLICY:</strong> 3 Months (No pause), 6 Months (20 days), 9 Months (30 days), 12 Months (40 days). Any days beyond these allocated days will be chargeable at ₹199 per day, and the pause will be lifted only after payment of the extended pause days.
              </p>
            </div>

            {/* Legal Declarations Checked */}
            <div className="text-[11px] space-y-1 text-zinc-700">
              <div>[✓] Health & Medical Declaration: Medically cleared and disclosed all relevant conditions.</div>
              <div>[✓] Exercise & Training Consent: Inherent physical risks acknowledged.</div>
              <div>[✓] Nutrition & Lifestyle Consent: Non-medical nutritional guidance acknowledged.</div>
              <div>[✓] Proprietary Material: Training splits and nutrition matrices are for client personal use only.</div>
            </div>

            {/* Signature Area */}
            <div className="pt-6 border-t-2 border-black grid grid-cols-2 gap-8 text-xs">
              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-600 mb-1">Client Digital Signature</div>
                <div className="text-base font-bold font-mono border-b border-black pb-1">
                  {printingConsent.signatureText}
                </div>
                <div className="text-[10px] text-zinc-600 mt-1">
                  Place: {printingConsent.signaturePlace || 'Online / India'} • Date: {new Date(printingConsent.signedAt).toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-600 mb-1">Coach Neetu / Head Coach</div>
                <div className="text-base font-bold font-mono border-b border-black pb-1">
                  Coach Neetu (Founder, Coach Neetu Fit)
                </div>
                <div className="text-[10px] text-zinc-600 mt-1">
                  Verified Status: {printingConsent.status || 'VERIFIED'} • Phone: 07420082838
                </div>
              </div>
            </div>

            <div className="text-center text-[9px] text-zinc-500 pt-4 uppercase tracking-widest border-t border-zinc-200">
              COACH NEETU FIT • CONFIDENTIAL CLIENT DOCUMENT • ALL RIGHTS RESERVED
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
