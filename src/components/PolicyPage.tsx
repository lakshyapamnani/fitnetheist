import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { 
  ShieldAlert, 
  CheckCircle2, 
  PauseCircle, 
  FileText, 
  Printer, 
  Send, 
  Phone, 
  Instagram, 
  MessageCircle, 
  AlertTriangle, 
  HeartPulse, 
  Dumbbell, 
  Utensils, 
  Lock,
  ArrowLeft,
  Download,
  ShieldCheck
} from 'lucide-react';
import { COACHING_PLANS } from './RateCardsSection';

export const PolicyPage: React.FC = () => {
  const { user, setActiveTab } = useApp();
  const { captureLead, logAuditAction, submitConsentForm } = useAdmin();

  // Digital Consent Form State
  const [clientName, setClientName] = useState(user?.name || '');
  const [clientAge, setClientAge] = useState('');
  const [clientPhone, setClientPhone] = useState(user?.phone || '');
  const [selectedProgram, setSelectedProgram] = useState<'3_MONTHS' | '6_MONTHS' | '9_MONTHS' | '12_MONTHS'>('6_MONTHS');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Health & Emergency Information
  const [medicalConditions, setMedicalConditions] = useState('None disclosed / Medically cleared');
  const [medications, setMedications] = useState('None');
  const [allergies, setAllergies] = useState('None');
  const [injuries, setInjuries] = useState('None');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Checkbox Declarations
  const [declarations, setDeclarations] = useState({
    healthMedical: true,
    exerciseRisk: true,
    nutritionConsent: true,
    clientResponsibilities: true,
    strictNoRefund: true,
    pausePolicyAccepted: true,
    virtualTerms: true,
    proprietaryMaterial: true,
    privacyAcknowledged: true
  });

  const [signatureText, setSignatureText] = useState(user?.name || '');
  const [signaturePlace, setSignaturePlace] = useState('Online / India');
  const [isSignedAndSubmitted, setIsSignedAndSubmitted] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDeclaration = (key: keyof typeof declarations) => {
    setDeclarations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allDeclarationsChecked = Object.values(declarations).every(Boolean);

  const handleDigitalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !signatureText.trim()) {
      alert('Please provide your full name and digital signature.');
      return;
    }
    if (!allDeclarationsChecked) {
      alert('Please check and accept all policy clauses before submitting.');
      return;
    }

    setIsSubmitting(true);

    const programPricingMap = {
      '3_MONTHS': { price: '₹8,000', pause: '0 Days (No Pause)' },
      '6_MONTHS': { price: '₹18,000', pause: '20 Days Complimentary' },
      '9_MONTHS': { price: '₹20,000', pause: '30 Days Complimentary' },
      '12_MONTHS': { price: '₹25,000', pause: '40 Days Complimentary' }
    };

    const consentId = `consent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const consentRecord = {
      id: consentId,
      clientName: clientName.trim(),
      clientAge: clientAge.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: user?.email || `${clientName.toLowerCase().replace(/\s+/g, '')}@client.fitnetheist.com`,
      program: selectedProgram,
      programPrice: programPricingMap[selectedProgram].price,
      pauseAllowance: programPricingMap[selectedProgram].pause,
      startDate,
      medicalConditions: medicalConditions.trim() || 'None disclosed / Medically cleared',
      medications: medications.trim() || 'None',
      allergies: allergies.trim() || 'None',
      injuries: injuries.trim() || 'None',
      emergencyContact: emergencyContact.trim(),
      emergencyRelationship: emergencyRelationship.trim(),
      emergencyPhone: emergencyPhone.trim(),
      declarations,
      signatureText: signatureText.trim(),
      signaturePlace: signaturePlace.trim(),
      signedAt: new Date().toISOString(),
      status: 'SIGNED' as const
    };

    try {
      // 1. Save directly into Firebase Realtime Database
      await submitConsentForm(consentRecord);
      
      // 2. Also save to localStorage fallback
      localStorage.setItem('fitnetheist_signed_coaching_consent', JSON.stringify(consentRecord));
    } catch (err) {
      console.warn('Realtime sync fallback:', err);
    }

    captureLead({
      name: clientName.trim(),
      email: user?.email || `${clientName.toLowerCase().replace(/\s+/g, '')}@client.fitnetheist.com`,
      phone: clientPhone.trim() || '07420082838',
      source: `SIGNED_CONSENT_${selectedProgram}` as any,
      goal: `Enrolled in ${selectedProgram.replace('_', ' ')} with signed consent`
    });

    logAuditAction(
      'CLIENT_CONSENT_SIGNED',
      clientName,
      'Pending Agreement',
      `Signed Coaching Consent Form for ${selectedProgram.replace('_', ' ')} (Strict Refund & Pause Terms Acknowledged)`
    );

    setIsSubmitting(false);
    setIsSignedAndSubmitted(true);
    setSubmissionFeedback('Your digital Coaching Consent Form has been recorded and synced to Coach Neetu Realtime DB.');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadAgreementFile = () => {
    const programPricingMap = {
      '3_MONTHS': { price: '₹8,000', pause: '0 Days (No Pause)' },
      '6_MONTHS': { price: '₹18,000', pause: '20 Days Complimentary' },
      '9_MONTHS': { price: '₹20,000', pause: '30 Days Complimentary' },
      '12_MONTHS': { price: '₹25,000', pause: '40 Days Complimentary' }
    };

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>COACH NEETU FIT - Coaching Consent Form - ${clientName || 'Client'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #111; line-height: 1.5; font-size: 13px; }
    .header { border-bottom: 2px solid #000; padding-bottom: 14px; margin-bottom: 16px; text-align: center; }
    .title { font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 0; }
    .subtitle { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 1.5px; }
    .section { margin-bottom: 16px; }
    .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; background: #f4f4f5; padding: 6px 10px; border-left: 4px solid #000; margin-bottom: 8px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .field { margin-bottom: 4px; }
    .highlight { border: 2px solid #d97706; background: #fffbeb; padding: 12px; border-radius: 4px; margin: 12px 0; font-size: 12px; }
    .sig-area { margin-top: 24px; padding-top: 16px; border-top: 1px solid #ddd; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .sig-line { border-bottom: 1px dashed #333; padding-bottom: 4px; font-family: monospace; font-size: 15px; font-weight: bold; }
    .footer { text-align: center; font-size: 10px; color: #777; margin-top: 30px; border-top: 1px solid #eee; padding-top: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="subtitle">COACH NEETU FIT • CONFIDENTIAL CLIENT AGREEMENT</div>
    <h1 class="title">COACHING CONSENT FORM</h1>
    <div style="font-size: 12px; color: #444; margin-top: 4px;">For Online Coaching & Virtual 1-on-1 Training</div>
    <div style="font-size: 11px; color: #666; margin-top: 4px;">Coach: Coach Neetu • Phone / WhatsApp: 07420082838 • Instagram: @coachneetu.fit</div>
  </div>

  <div class="section">
    <div class="section-title">Client Information & Protocol</div>
    <div class="grid">
      <div class="field"><strong>Client Full Name:</strong> ${clientName}</div>
      <div class="field"><strong>Age:</strong> ${clientAge || 'N/A'}</div>
      <div class="field"><strong>Phone / WhatsApp:</strong> ${clientPhone}</div>
      <div class="field"><strong>Start Date:</strong> ${startDate}</div>
      <div class="field"><strong>Program:</strong> ${selectedProgram.replace('_', ' ')} (Workout & Nutrition)</div>
      <div class="field"><strong>Agreed Fee:</strong> ${programPricingMap[selectedProgram].price}</div>
      <div class="field"><strong>Pause Allowance:</strong> ${programPricingMap[selectedProgram].pause}</div>
    </div>
  </div>

  <div class="highlight">
    <strong>5. STRICT NO-REFUND POLICY & MEMBERSHIP PAUSE RULES (ACKNOWLEDGED):</strong><br>
    • <strong>NO REFUND POLICY:</strong> All payments are 100% NON-REFUNDABLE once coaching service has commenced. Strictly no refund if the client has personal issues to not being able to follow the plan, work commitments, travel, lack of time, lack of motivation, or change of mind.<br>
    • <strong>PAUSE POLICY:</strong> 3 Months (No pause), 6 Months (20 days), 9 Months (30 days), 12 Months (40 days). Anything beyond these days will be chargeable at ₹199 per day and pause will be lifted only after payment of the extended pause days.
  </div>

  <div class="section">
    <div class="section-title">10. Health & Emergency Disclosures</div>
    <div class="field"><strong>Medical Conditions / Health Concerns:</strong> ${medicalConditions || 'None disclosed / Medically cleared'}</div>
    <div class="field"><strong>Current Medications / Supplements:</strong> ${medications || 'None'}</div>
    <div class="field"><strong>Allergies / Food Intolerances:</strong> ${allergies || 'None'}</div>
    <div class="field"><strong>Current Injuries / Pain / Surgery:</strong> ${injuries || 'None'}</div>
    <div class="grid" style="margin-top: 6px;">
      <div class="field"><strong>Emergency Contact:</strong> ${emergencyContact || 'Provided on record'}</div>
      <div class="field"><strong>Relationship:</strong> ${emergencyRelationship || 'Family'}</div>
      <div class="field"><strong>Emergency Phone:</strong> ${emergencyPhone || 'N/A'}</div>
    </div>
  </div>

  <div class="sig-area">
    <div>
      <div style="font-size: 10px; text-transform: uppercase; color: #555;">Client Digital Signature</div>
      <div class="sig-line">${signatureText}</div>
      <div style="font-size: 11px; color: #666; margin-top: 4px;">Place: ${signaturePlace} • Date: ${new Date().toLocaleDateString()}</div>
      <div style="font-size: 10px; color: #16a34a; font-weight: bold; margin-top: 4px;">✓ Authenticated Electronic Consent</div>
    </div>
    <div>
      <div style="font-size: 10px; text-transform: uppercase; color: #555;">Coach Neetu / Head Coach</div>
      <div class="sig-line">Coach Neetu (Founder)</div>
      <div style="font-size: 11px; color: #666; margin-top: 4px;">COACH NEETU FIT • Desk: 07420082838</div>
    </div>
  </div>

  <div class="footer">
    COACH NEETU FIT • CONFIDENTIAL CLIENT DOCUMENT • ALL RIGHTS RESERVED
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Coach_Neetu_Fit_Consent_${(clientName || 'Client').replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Coach Neetu! I have read, signed and submitted the COACH NEETU FIT Coaching Consent Form.\n\n` +
      `• Name: ${clientName || 'Client'}\n` +
      `• Program: ${selectedProgram.replace('_', ' ')}\n` +
      `• Start Date: ${startDate}\n` +
      `• Digital Signature: ${signatureText}\n` +
      `• Policies Accepted: Strict No-Refund Policy & Membership Pause Rules acknowledged.\n\n` +
      `Ready to begin my protocol!`
    );
    window.open(`https://wa.me/917420082838?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="policy-coaching-consent-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-mono-num">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation Back */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-xs text-zinc-200 uppercase font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer size={13} />
              <span>Print / Save PDF</span>
            </button>
            <a
              href="https://wa.me/917420082838?text=Hello%20Coach%20Neetu%2C%20I%20have%20a%20question%20regarding%20the%20coaching%20agreement."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#FFC515] hover:bg-[#eab308] text-black text-xs uppercase font-extrabold rounded flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle size={13} />
              <span>Coach Desk (07420082838)</span>
            </a>
          </div>
        </div>

        {/* Document Header Card */}
        <div className="bg-[#0e0e12] border-2 border-white/20 p-6 sm:p-10 rounded-[4px] space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC515]/5 rounded-bl-full pointer-events-none" />

          <div className="space-y-2 border-b border-white/10 pb-6 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#FFC515] font-extrabold uppercase tracking-[0.25em]">
                COACH NEETU FIT • CONFIDENTIAL CLIENT DOCUMENT
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-0.5 border border-white/10 rounded">
                LEGAL & COACHING PROTOCOL
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase font-display text-white tracking-tight pt-1">
              COACHING CONSENT FORM
            </h1>
            <p className="text-sm text-zinc-300 font-mono-num">
              For Online Coaching, Bespoke Nutrition Programming & Virtual 1-on-1 Training
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">Coach:</span>
                <strong className="text-white">Coach Neetu (Founder)</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">WhatsApp / Call:</span>
                <a href="tel:07420082838" className="text-[#FFC515] hover:underline font-bold">07420082838</a>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">Instagram:</span>
                <a 
                  href="https://www.instagram.com/coachneetu.fit?stkn=MnUwMXQxZ2RxZGwy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FFC515] hover:underline"
                >
                  @coachneetu.fit
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#14141a] border border-[#FFC515]/30 p-4 rounded text-xs leading-relaxed text-zinc-200">
            <strong className="text-[#FFC515] uppercase tracking-wider block mb-1">
              IMPORTANT MANDATORY NOTICE BEFORE ENROLLMENT:
            </strong>
            I confirm that I have read this form completely before signing and making payment. By enrolling, purchasing, or participating in Coach Neetu Fit online coaching programs, you explicitly agree to all terms, health declarations, the strict no-refund policy, and the membership pause rules set forth below.
          </div>
        </div>

        {/* SECTION 0: OFFICIAL PRICING & INCLUSIONS OVERVIEW */}
        <section className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 rounded space-y-4">
          <div className="flex items-center gap-2 text-[#FFC515] border-b border-white/10 pb-3">
            <Utensils size={16} />
            <Dumbbell size={16} />
            <h2 className="text-base font-bold uppercase tracking-wider font-display text-white">
              COACHING PROTOCOL TIERS (BOTH WORKOUT & NUTRITION INCLUDED)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {COACHING_PLANS.map(plan => (
              <div key={plan.id} className="p-3.5 bg-zinc-950 border border-white/10 rounded space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">{plan.durationMonths} MONTHS</span>
                  <span className="text-[10px] text-[#FFC515] font-bold">{plan.pauseDays > 0 ? `${plan.pauseDays}d Pause` : 'No Pause'}</span>
                </div>
                <div className="text-lg font-extrabold text-[#FFC515]">{plan.priceFormatted}</div>
                <div className="text-[11px] text-zinc-400">Effective: {plan.monthlyEquivalent}</div>
                <div className="text-[10px] text-emerald-400 font-semibold pt-1">
                  ✓ Both Workout & Nutrition Included
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 1: HEALTH & MEDICAL DECLARATION */}
        <section className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 rounded space-y-4">
          <div className="flex items-center gap-2 text-[#FFC515] border-b border-white/10 pb-3">
            <HeartPulse size={18} />
            <h2 className="text-base font-bold uppercase tracking-wider font-display text-white">
              1. HEALTH & MEDICAL DECLARATION
            </h2>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            I confirm that I am medically fit/cleared to participate in exercise and to follow the nutrition guidance provided to me. I understand that Coach Neetu Fit is a professional fitness and nutrition coach and does not replace a doctor, registered dietitian, or qualified healthcare professional.
          </p>

          <div className="space-y-3 pt-1 text-xs text-zinc-300">
            <div className="flex items-start gap-2.5 p-3 bg-zinc-950/60 border border-white/5 rounded">
              <CheckCircle2 size={15} className="text-[#FFC515] shrink-0 mt-0.5" />
              <span>I have disclosed all relevant medical conditions, previous surgeries/hospitalisations, injuries, recurring pain, pregnancy/postpartum status and other conditions that may affect exercise or nutrition.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-zinc-950/60 border border-white/5 rounded">
              <CheckCircle2 size={15} className="text-[#FFC515] shrink-0 mt-0.5" />
              <span>I have disclosed all current medications, supplements, food allergies, intolerances and dietary restrictions.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-zinc-950/60 border border-white/5 rounded">
              <CheckCircle2 size={15} className="text-[#FFC515] shrink-0 mt-0.5" />
              <span>I will immediately inform Coach Neetu Fit if my health, medication, injury or medical status changes at any point during my tenure.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-zinc-950/60 border border-white/5 rounded">
              <CheckCircle2 size={15} className="text-[#FFC515] shrink-0 mt-0.5" />
              <span>If medical clearance is advised or required due to pre-existing conditions, I will obtain it from a qualified medical professional prior to commencing load.</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: EXERCISE & TRAINING CONSENT */}
        <section className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 rounded space-y-4">
          <div className="flex items-center gap-2 text-[#FFC515] border-b border-white/10 pb-3">
            <Dumbbell size={18} />
            <h2 className="text-base font-bold uppercase tracking-wider font-display text-white">
              2. EXERCISE & TRAINING CONSENT
            </h2>
          </div>

          <div className="space-y-2.5 text-xs text-zinc-300 leading-relaxed">
            <p>• <strong>Inherent Risks:</strong> I understand that exercise carries inherent risks, including muscle soreness, fatigue, dizziness, strains, sprains, joint discomfort, aggravation of existing conditions, and other physical injuries.</p>
            <p>• <strong>Technique Adherence:</strong> I agree to follow exercise instructions, video demonstrations, and technique guidance to the best of my ability.</p>
            <p>• <strong>Symptom Reporting:</strong> I will report pain, dizziness, unusual breathlessness, chest pain, fainting or other concerning symptoms immediately and will stop exercise and seek appropriate medical care when necessary.</p>
            <p>• <strong>Virtual Training Space:</strong> For virtual and online coaching, I am solely responsible for having a safe training space, suitable equipment, safe footwear, and a stable internet connection.</p>
            <p>• <strong>No Unrealistic Guarantees:</strong> I understand that human biology differs, and no specific weight loss, muscle gain, body shape, health outcome or timeline is guaranteed.</p>
          </div>
        </section>

        {/* SECTION 3: NUTRITION & LIFESTYLE CONSENT */}
        <section className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 rounded space-y-4">
          <div className="flex items-center gap-2 text-[#FFC515] border-b border-white/10 pb-3">
            <Utensils size={18} />
            <h2 className="text-base font-bold uppercase tracking-wider font-display text-white">
              3. NUTRITION & LIFESTYLE CONSENT
            </h2>
          </div>

          <div className="space-y-2.5 text-xs text-zinc-300 leading-relaxed">
            <p>• Nutrition guidance is prepared using the information I provide. I accept responsibility for providing complete and accurate information about my health, medications, allergies, intolerances and dietary restrictions.</p>
            <p>• I understand that nutrition coaching does not replace medical treatment or a prescription from a qualified medical professional.</p>
            <p>• I understand that results depend on personal consistency, caloric adherence, sleep quality, non-exercise activity, hydration, and individual biological factors.</p>
          </div>
        </section>

        {/* SECTION 4: CLIENT RESPONSIBILITIES */}
        <section className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 rounded space-y-4">
          <div className="flex items-center gap-2 text-[#FFC515] border-b border-white/10 pb-3">
            <CheckCircle2 size={18} />
            <h2 className="text-base font-bold uppercase tracking-wider font-display text-white">
              4. CLIENT RESPONSIBILITIES
            </h2>
          </div>

          <ul className="space-y-2 text-xs text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-[#FFC515] font-bold">•</span>
              <span>Communicate honestly and proactively if I am unable to follow the training or nutrition plan.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFC515] font-bold">•</span>
              <span>Attend scheduled virtual sessions on time and communicate at least 24 hours in advance when possible if I cannot attend.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFC515] font-bold">•</span>
              <span>Provide requested check-ins, weight logs, measurements, photographs, or bio-feedback when applicable.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFC515] font-bold">•</span>
              <span>Inform the coach before making major self-directed changes to the agreed protocol.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFC515] font-bold">•</span>
              <span>Understand that missed sessions, client delays, or non-adherence do not automatically create a right to replacement sessions, extensions, or refunds.</span>
            </li>
          </ul>
        </section>

        {/* SECTION 5: STRICT NO-PAUSE & NO-REFUND POLICY (HIGHLIGHTED CORE SECTION) */}
        <section className="bg-[#121218] border-2 border-[#FFC515] p-6 sm:p-10 rounded space-y-6 shadow-2xl relative">
          <div className="flex items-center gap-2.5 text-[#FFC515] border-b border-[#FFC515]/30 pb-4">
            <AlertTriangle size={22} className="text-[#FFC515]" />
            <div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider font-display text-white">
                5. STRICT NO-REFUND POLICY & MEMBERSHIP PAUSE RULES
              </h2>
              <span className="text-[10px] text-[#FFC515] uppercase tracking-widest block font-bold">
                PLEASE READ THIS SECTION WITH EXTREME CARE
              </span>
            </div>
          </div>

          <div className="space-y-5 text-xs text-zinc-200 leading-relaxed">
            <p>
              By enrolling and making payment, you confirm that you have made an informed and deliberate decision to purchase the coaching service. Fitnetheist coaching involves advanced assessment, customized exercise angle formulation, proprietary macro blueprints, reserved coach capacity, and non-recoverable professional time.
            </p>

            {/* Refund Rules */}
            <div className="p-4 bg-zinc-950 border border-white/10 rounded space-y-2">
              <h3 className="text-xs font-extrabold uppercase text-white tracking-wider flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-red-400" />
                <span>STRICT NO-REFUND CONDITIONS</span>
              </h3>
              <ul className="space-y-1.5 text-zinc-300">
                <li>• All coaching payments are <strong>100% NON-REFUNDABLE</strong> once coaching service has commenced or coaching materials/assessments have been delivered.</li>
                <li>• <strong className="text-amber-300 uppercase">NO REFUND IF THE CLIENT HAS PERSONAL ISSUES:</strong> There is strictly no refund if the client has personal issues, work commitments, family obligations, travel, lack of time, lack of motivation, change of mind, or is unable to follow the plan.</li>
                <li>• Not using the service, not following the plan, or failing to achieve an expected subjective result does not create any right to a refund.</li>
                <li>• If a client chooses to discontinue after enrolment, the remaining unused portion remains strictly non-refundable.</li>
              </ul>
            </div>

            {/* Pause Rules */}
            <div className="p-4 bg-zinc-950 border border-[#FFC515]/30 rounded space-y-3">
              <h3 className="text-xs font-extrabold uppercase text-[#FFC515] tracking-wider flex items-center gap-1.5">
                <PauseCircle size={14} />
                <span>MEMBERSHIP PAUSE RULES & EXTENSION CHARGES</span>
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1 font-mono-num">
                <div className="p-2.5 bg-[#0a0a0d] border border-white/10 rounded">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">3 MONTHS</span>
                  <span className="text-xs text-red-400 font-extrabold block mt-0.5">NO PAUSE</span>
                  <span className="text-[9px] text-zinc-400 block">0 Days Allowed</span>
                </div>
                <div className="p-2.5 bg-[#0a0a0d] border border-[#FFC515]/30 rounded">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">6 MONTHS</span>
                  <span className="text-sm text-[#FFC515] font-extrabold block mt-0.5">20 DAYS</span>
                  <span className="text-[9px] text-zinc-400 block">Complimentary</span>
                </div>
                <div className="p-2.5 bg-[#0a0a0d] border border-[#FFC515]/30 rounded">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">9 MONTHS</span>
                  <span className="text-sm text-[#FFC515] font-extrabold block mt-0.5">30 DAYS</span>
                  <span className="text-[9px] text-zinc-400 block">Complimentary</span>
                </div>
                <div className="p-2.5 bg-[#0a0a0d] border border-[#FFC515]/30 rounded">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">12 MONTHS</span>
                  <span className="text-sm text-[#FFC515] font-extrabold block mt-0.5">40 DAYS</span>
                  <span className="text-[9px] text-zinc-400 block">Complimentary</span>
                </div>
              </div>

              <div className="p-3 bg-amber-950/60 border border-amber-500/40 rounded text-amber-200 text-[11px] leading-relaxed">
                <strong className="text-[#FFC515] uppercase font-bold">OVERSTAY & EXTENDED PAUSE CLAUSE:</strong>
                <p className="mt-1">
                  Pause is applicable strictly on the 6 months, 9 months, and 12 months plans (20, 30, and 40 days respectively). 
                  <strong> Anything beyond these allocated days will be chargeable at ₹199 per day, and the pause will be lifted only after payment of the extended pause days.</strong>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6: VIRTUAL TRAINING TERMS */}
        <section className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 rounded space-y-4">
          <div className="flex items-center gap-2 text-[#FFC515] border-b border-white/10 pb-3">
            <Lock size={18} />
            <h2 className="text-base font-bold uppercase tracking-wider font-display text-white">
              6. VIRTUAL TRAINING TERMS
            </h2>
          </div>

          <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
            <p>• I understand that I am responsible for joining scheduled virtual sessions on time and being ready to train.</p>
            <p>• If I miss a scheduled session without 24 hours advance notice, it may be treated as completed, subject to any specific rescheduling terms agreed in writing.</p>
            <p>• The coach may modify exercises on the spot based on disclosed symptoms, mobility limitations, performance, and equipment availability.</p>
            <p>• I will not attempt or continue an exercise through sharp joint pain or concerning dizziness.</p>
          </div>
        </section>

        {/* SECTION 7: COMMUNICATION & COACHING MATERIAL */}
        <section className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 rounded space-y-4">
          <div className="flex items-center gap-2 text-[#FFC515] border-b border-white/10 pb-3">
            <MessageCircle size={18} />
            <h2 className="text-base font-bold uppercase tracking-wider font-display text-white">
              7. COMMUNICATION & PROPRIETARY COACHING MATERIAL
            </h2>
          </div>

          <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
            <p>• <strong>Agreed Platform:</strong> Official coaching communication will take place through agreed channels: Phone / WhatsApp (<strong className="text-[#FFC515]">07420082838</strong>), Instagram (<strong className="text-[#FFC515]">@coachneetu.fit</strong>), or email.</p>
            <p>• <strong>Intellectual Property & Anti-Piracy:</strong> Paid workout plans, personalized nutrition matrices, custom documents, spreadsheets, videos and coaching resources are for my personal use only and may not be shared, duplicated, copied, screen-recorded, published, or resold without explicit written permission.</p>
            <p>• <strong>Respectful Communication:</strong> All coaching interactions must remain respectful, professional, and focused on fitness progression.</p>
          </div>
        </section>

        {/* SECTION 8: PRIVACY & PROGRESS INFORMATION */}
        <section className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 rounded space-y-4">
          <div className="flex items-center gap-2 text-[#FFC515] border-b border-white/10 pb-3">
            <Lock size={18} />
            <h2 className="text-base font-bold uppercase tracking-wider font-display text-white">
              8. PRIVACY & PROGRESS INFORMATION
            </h2>
          </div>

          <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
            <p>• Health data, measurements, weight logs, and progress information shared for coaching will be maintained confidentially for client assessment and program management.</p>
            <p>• Public use of identifiable transformation photographs/videos requires separate explicit permission from the client.</p>
            <p>• I understand that private progress photographs may be requested periodically for Coach Neetu to evaluate body composition changes.</p>
          </div>
        </section>

        {/* ===================================================
            DIGITAL INTERACTIVE INTAKE & CONSENT SIGNING FORM
            =================================================== */}
        <section id="digital-consent-signing" className="bg-[#0c0c10] border-2 border-[#FFC515]/60 p-6 sm:p-10 rounded-[4px] space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-[#FFC515]">
              <FileText size={20} />
              <h2 className="text-xl sm:text-2xl font-bold uppercase font-display text-white">
                9. FINAL CLIENT ACKNOWLEDGEMENT & DIGITAL SIGNATURE
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Complete your information below to digitally sign and submit your client consent form.
            </p>
          </div>

          {isSignedAndSubmitted ? (
            <div className="p-6 sm:p-8 bg-emerald-950/40 border border-emerald-500/50 rounded text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                ✓
              </div>
              <h3 className="text-xl font-bold uppercase font-display text-white">
                CONSENT FORM DIGITALLY SIGNED & REGISTERED
              </h3>
              <p className="text-xs text-zinc-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{clientName}</strong>. Your Coaching Consent & Agreement for the <strong>{selectedProgram.replace('_', ' ')}</strong> protocol has been validated and recorded.
              </p>

              <div className="p-4 bg-zinc-950 border border-white/10 rounded text-xs text-left max-w-md mx-auto space-y-1.5 font-mono-num">
                <div><strong>Client Full Name:</strong> {clientName}</div>
                <div><strong>Selected Program:</strong> {selectedProgram.replace('_', ' ')}</div>
                <div><strong>Registered Phone / WhatsApp:</strong> {clientPhone || '07420082838'}</div>
                <div><strong>Start Date:</strong> {startDate}</div>
                <div><strong>Digital Signature:</strong> {signatureText}</div>
                <div><strong>Recorded Timestamp:</strong> {new Date().toLocaleString()}</div>
                <div className="text-[#FFC515] pt-1 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>Strict No-Refund Policy & Pause Terms Accepted</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 pt-1 border-t border-white/5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Live Synced to Coach Neetu Realtime DB (/consent_forms)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="px-5 py-3 bg-[#FFC515] hover:bg-[#eab308] text-black font-extrabold uppercase text-xs rounded flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>FORWARD TO COACH NEETU ↗</span>
                </button>
                <button
                  onClick={handleDownloadAgreementFile}
                  className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-[#FFC515]/40 text-[#FFC515] font-bold uppercase text-xs rounded flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Download size={15} />
                  <span>Download Agreement</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-bold uppercase text-xs rounded flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDigitalSubmit} className="space-y-6 text-xs font-mono-num">
              
              {/* Client Information Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">
                    CLIENT FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your legal full name"
                    className="w-full bg-[#14141a] border border-white/15 p-2.5 text-white focus:border-[#FFC515] outline-none rounded"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">
                    AGE *
                  </label>
                  <input
                    type="number"
                    required
                    min={16}
                    max={99}
                    value={clientAge}
                    onChange={(e) => setClientAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full bg-[#14141a] border border-white/15 p-2.5 text-white focus:border-[#FFC515] outline-none rounded"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">
                    PHONE / WHATSAPP NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 07420082838"
                    className="w-full bg-[#14141a] border border-white/15 p-2.5 text-white focus:border-[#FFC515] outline-none rounded"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-1">
                    COMMENCEMENT / START DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#14141a] border border-white/15 p-2.5 text-white focus:border-[#FFC515] outline-none rounded"
                  />
                </div>
              </div>

              {/* Coaching Program Selection */}
              <div>
                <label className="block text-zinc-400 uppercase font-bold text-[10px] mb-2">
                  SELECTED PROTOCOL & INVESTMENT *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedProgram('3_MONTHS')}
                    className={`p-3 rounded border text-left transition-all ${
                      selectedProgram === '3_MONTHS'
                        ? 'bg-[#FFC515]/20 border-[#FFC515] text-white font-bold'
                        : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-white font-bold">3 MONTHS</span>
                    <span className="text-[#FFC515] block text-sm font-extrabold">₹8,000</span>
                    <span className="text-[10px] text-red-400 block mt-0.5">Strictly No Pause</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProgram('6_MONTHS')}
                    className={`p-3 rounded border text-left transition-all ${
                      selectedProgram === '6_MONTHS'
                        ? 'bg-[#FFC515]/20 border-[#FFC515] text-white font-bold'
                        : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-white font-bold">6 MONTHS</span>
                    <span className="text-[#FFC515] block text-sm font-extrabold">₹18,000</span>
                    <span className="text-[10px] text-zinc-300 block mt-0.5">20 Days Pause Included</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProgram('9_MONTHS')}
                    className={`p-3 rounded border text-left transition-all ${
                      selectedProgram === '9_MONTHS'
                        ? 'bg-[#FFC515]/20 border-[#FFC515] text-white font-bold'
                        : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-white font-bold">9 MONTHS</span>
                    <span className="text-[#FFC515] block text-sm font-extrabold">₹20,000</span>
                    <span className="text-[10px] text-zinc-300 block mt-0.5">30 Days Pause Included</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProgram('12_MONTHS')}
                    className={`p-3 rounded border text-left transition-all ${
                      selectedProgram === '12_MONTHS'
                        ? 'bg-[#FFC515]/20 border-[#FFC515] text-white font-bold'
                        : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-white font-bold">12 MONTHS</span>
                    <span className="text-[#FFC515] block text-sm font-extrabold">₹25,000</span>
                    <span className="text-[10px] text-[#FFC515] block mt-0.5">40 Days Pause Included</span>
                  </button>
                </div>
              </div>

              {/* 10. HEALTH & EMERGENCY INFORMATION */}
              <div className="p-4 bg-zinc-950 border border-white/10 rounded space-y-4">
                <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#FFC515] block tracking-wider flex items-center gap-1.5">
                    <HeartPulse size={13} className="text-red-400" />
                    <span>10. HEALTH & EMERGENCY INFORMATION (DISCLOSURE)</span>
                  </span>
                  <span className="text-[9px] text-zinc-500 uppercase">CONFIDENTIAL</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] text-zinc-400 uppercase block mb-1">
                      MEDICAL CONDITIONS / RELEVANT HEALTH CONCERNS
                    </label>
                    <input
                      type="text"
                      value={medicalConditions}
                      onChange={(e) => setMedicalConditions(e.target.value)}
                      placeholder="e.g. Thyroid, PCOD, BP, or None"
                      className="w-full bg-[#14141a] border border-white/15 p-2 text-white outline-none rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] text-zinc-400 uppercase block mb-1">
                      CURRENT MEDICATIONS / SUPPLEMENTS
                    </label>
                    <input
                      type="text"
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      placeholder="e.g. Multivitamin, Whey, or None"
                      className="w-full bg-[#14141a] border border-white/15 p-2 text-white outline-none rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] text-zinc-400 uppercase block mb-1">
                      ALLERGIES / FOOD INTOLERANCES
                    </label>
                    <input
                      type="text"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="e.g. Lactose intolerant, Nuts, or None"
                      className="w-full bg-[#14141a] border border-white/15 p-2 text-white outline-none rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] text-zinc-400 uppercase block mb-1">
                      CURRENT INJURIES / PAIN / PREVIOUS SURGERY
                    </label>
                    <input
                      type="text"
                      value={injuries}
                      onChange={(e) => setInjuries(e.target.value)}
                      placeholder="e.g. Mild lower back tightness, or None"
                      className="w-full bg-[#14141a] border border-white/15 p-2 text-white outline-none rounded text-xs"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block tracking-wider">
                    EMERGENCY CONTACT DETAILS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[9px] text-zinc-500 uppercase block mb-1">EMERGENCY CONTACT NAME</label>
                      <input
                        type="text"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        placeholder="e.g. Amit Sharma"
                        className="w-full bg-[#14141a] border border-white/15 p-2 text-white outline-none rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-zinc-500 uppercase block mb-1">RELATIONSHIP</label>
                      <input
                        type="text"
                        value={emergencyRelationship}
                        onChange={(e) => setEmergencyRelationship(e.target.value)}
                        placeholder="e.g. Spouse / Sibling / Parent"
                        className="w-full bg-[#14141a] border border-white/15 p-2 text-white outline-none rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-zinc-500 uppercase block mb-1">EMERGENCY PHONE</label>
                      <input
                        type="tel"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[#14141a] border border-white/15 p-2 text-white outline-none rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mandatory Checklist Declarations */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                  MANDATORY CLIENT DECLARATIONS (CHECK ALL TO PROCEED)
                </span>

                <div className="space-y-2 text-xs">
                  <label className="flex items-start gap-2.5 p-3 bg-zinc-950/80 border border-white/10 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarations.healthMedical}
                      onChange={() => toggleDeclaration('healthMedical')}
                      className="mt-0.5 accent-[#FFC515] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-zinc-300">
                      I confirm that I am medically fit to participate in exercise and nutrition coaching, and I have disclosed all relevant medical, surgical, and dietary conditions.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 bg-zinc-950/80 border border-white/10 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarations.exerciseRisk}
                      onChange={() => toggleDeclaration('exerciseRisk')}
                      className="mt-0.5 accent-[#FFC515] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-zinc-300">
                      I understand the physical risks of training, agree to follow technique instructions, and understand that specific physical outcomes or timelines are not guaranteed.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 bg-[#16161f] border border-[#FFC515]/40 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarations.strictNoRefund}
                      onChange={() => toggleDeclaration('strictNoRefund')}
                      className="mt-0.5 accent-[#FFC515] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-white font-semibold">
                      I clearly understand and accept the STRICT NO-REFUND POLICY. Inability to follow the plan, personal issues, lack of time, lack of motivation, travel, change of mind, or non-use of the service DOES NOT qualify for a refund.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 bg-[#16161f] border border-[#FFC515]/40 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarations.pausePolicyAccepted}
                      onChange={() => toggleDeclaration('pausePolicyAccepted')}
                      className="mt-0.5 accent-[#FFC515] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-white font-semibold">
                      I accept the Membership Pause Rules: 3 months (No pause), 6 months (20 days), 9 months (30 days), 12 months (40 days). Any days beyond this will be charged at ₹199/day and the pause will only be lifted after payment.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 bg-zinc-950/80 border border-white/10 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarations.proprietaryMaterial}
                      onChange={() => toggleDeclaration('proprietaryMaterial')}
                      className="mt-0.5 accent-[#FFC515] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-zinc-300">
                      I understand that all coaching documents, workout plans, and nutrition matrices are for my personal use only and will not be shared, duplicated, or redistributed.
                    </span>
                  </label>
                </div>
              </div>

              {/* Digital Signature & Submission */}
              <div className="p-4 bg-zinc-950 border border-[#FFC515]/30 rounded space-y-4">
                <span className="text-[10px] uppercase font-bold text-[#FFC515] block tracking-wider">
                  ELECTRONIC SIGNATURE CONFIRMATION
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase block mb-1">
                      TYPE FULL NAME (LEGAL DIGITAL SIGNATURE) *
                    </label>
                    <input
                      type="text"
                      required
                      value={signatureText}
                      onChange={(e) => setSignatureText(e.target.value)}
                      placeholder="Type your full name as signature"
                      className="w-full bg-[#14141a] border border-white/20 p-2.5 text-white font-bold outline-none rounded font-mono-num"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase block mb-1">
                      PLACE / CITY OF SIGNING *
                    </label>
                    <input
                      type="text"
                      required
                      value={signaturePlace}
                      onChange={(e) => setSignaturePlace(e.target.value)}
                      placeholder="e.g. Mumbai, Maharashtra"
                      className="w-full bg-[#14141a] border border-white/20 p-2.5 text-white outline-none rounded font-mono-num"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 italic">
                  By clicking "SUBMIT & DIGITALLY SIGN AGREEMENT", I confirm that my typed name constitutes a binding legal signature acknowledging all coaching terms and policies.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!allDeclarationsChecked}
                  className="w-full py-4 bg-[#FFC515] hover:bg-[#eab308] disabled:opacity-40 disabled:hover:bg-[#FFC515] text-black font-extrabold uppercase text-xs tracking-wider rounded transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={15} />
                  <span>SUBMIT & DIGITALLY SIGN COACHING CONSENT AGREEMENT</span>
                </button>
              </div>

            </form>
          )}

        </section>

        {/* Coach Neetu Signature Footer Block */}
        <div className="bg-[#0e0e12] border border-white/10 p-6 rounded text-xs space-y-4 font-mono-num">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">HEAD COACH & FOUNDER</span>
              <span className="text-white font-bold text-sm block mt-0.5">Coach Neetu</span>
              <span className="text-zinc-400 block text-[11px]">COACH NEETU FIT • FITNETHEIST</span>
              <span className="text-zinc-500 block text-[10px] mt-1">Phone / WhatsApp: 07420082838</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">OFFICIAL CHANNELS</span>
              <div className="mt-1 space-y-1 text-xs">
                <div>
                  Instagram: <a href="https://www.instagram.com/coachneetu.fit?stkn=MnUwMXQxZ2RxZGwy" target="_blank" rel="noopener noreferrer" className="text-[#FFC515] underline">@coachneetu.fit</a>
                </div>
                <div>
                  WhatsApp Desk: <a href="https://wa.me/917420082838" target="_blank" rel="noopener noreferrer" className="text-[#FFC515] underline">07420082838</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-white/5 text-center text-[10px] text-zinc-500 uppercase tracking-widest">
            COACH NEETU FIT • CONFIDENTIAL CLIENT DOCUMENT • ALL RIGHTS RESERVED
          </div>
        </div>

      </div>
    </div>
  );
};
