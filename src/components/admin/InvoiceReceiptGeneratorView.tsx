import React, { useState, useRef } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Invoice, InvoiceItem, InvoiceType, InvoiceStatus } from '../../types/admin';
import { 
  FileText, 
  Receipt, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  Share2, 
  Copy, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  IndianRupee, 
  Search, 
  Filter, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building2,
  User,
  CreditCard,
  Calendar,
  Send,
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';

const SERVICE_PRESETS = [
  {
    title: '90-Day VIP 1-on-1 Physique Transformation Protocol',
    category: 'COACHING',
    price: 19999,
    description: 'Weekly video check-ins, custom hypertrophy split, macro engineering, and priority 24/7 WhatsApp guidance.'
  },
  {
    title: '60-Day Body Recomposition Elite Coaching Pass',
    category: 'COACHING',
    price: 12999,
    description: 'Periodized progressive overload split, customized Indian vegetarian/non-vegetarian macro plan, bi-weekly adjustments.'
  },
  {
    title: '21-Day Ignite Shred Challenge Enrollment',
    category: 'CHALLENGE',
    price: 3499,
    description: 'Instant challenge dashboard access, daily metabolic meal swap engine, and community leaderboard entry.'
  },
  {
    title: 'Custom 7-Day Nutrition & Meal Swap Blueprint',
    category: 'NUTRITION',
    price: 4499,
    description: 'Full micronutrient & macronutrient tailored plan with Indian grocery list and restaurant swap guide.'
  },
  {
    title: '1-on-1 Biomechanics & Form Check Video Consultation',
    category: 'CONSULTATION',
    price: 2499,
    description: '45-minute live movement screening, squat/bench/deadlift form analysis, and injury-prevention cues.'
  }
];

export const InvoiceReceiptGeneratorView: React.FC = () => {
  const { 
    invoices, 
    createInvoice, 
    updateInvoiceStatus, 
    deleteInvoice, 
    leads, 
    customers 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'GENERATOR' | 'HISTORY'>('GENERATOR');
  const [selectedInvoiceForPreview, setSelectedInvoiceForPreview] = useState<Invoice | null>(null);
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | InvoiceStatus>('ALL');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Form State for Active Generator
  const [docType, setDocType] = useState<InvoiceType>('TAX_INVOICE');
  const [docStatus, setDocStatus] = useState<InvoiceStatus>('PAID');
  const [invoiceNumber, setInvoiceNumber] = useState<string>(() => `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [issueDate, setIssueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Business Information
  const [businessName, setBusinessName] = useState('FITNETHEIST ELITE PERFORMANCE & NUTRITION');
  const [businessGstin, setBusinessGstin] = useState('07AAACF8899Q1ZX');
  const [businessPan, setBusinessPan] = useState('AAACF8899Q');
  const [businessAddress, setBusinessAddress] = useState('Plot 42, Sector 18, Commercial Hub, Cyber City, Gurugram, HR 122002');
  const [businessEmail, setBusinessEmail] = useState('billing@fitnetheist.com');
  const [businessPhone, setBusinessPhone] = useState('+91 98100 45678');

  // Client Information
  const [clientName, setClientName] = useState('Rohan Sharma');
  const [clientEmail, setClientEmail] = useState('rohan.sharma@example.com');
  const [clientPhone, setClientPhone] = useState('+91 98201 44521');
  const [clientAddress, setClientAddress] = useState('Saket, New Delhi, DL 110017');
  const [clientGstinPan, setClientGstinPan] = useState('');

  // Payment Details
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'RAZORPAY' | 'BANK_TRANSFER' | 'CREDIT_DEBIT_CARD' | 'CASH'>('UPI');
  const [transactionReference, setTransactionReference] = useState('UPI-AXIS-99382104');
  
  // Custom Notes & Terms
  const [notes, setNotes] = useState('Thank you for choosing Fitnetheist. Your custom coaching portal and metabolic blueprint are fully activated.');
  const [terms, setTerms] = useState('All digital workout splits, customized meal protocols, and 1-on-1 coaching passes are non-refundable once deployed.');

  // Line items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item_1',
      description: '90-Day VIP 1-on-1 Physique Transformation Protocol (Weekly Video Check-ins, Custom Hypertrophy Split, Macro Engineering)',
      category: 'COACHING',
      quantity: 1,
      unitPrice: 19999,
      discountAmount: 2000,
      taxRatePercent: 18,
      total: 21238.82
    }
  ]);

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Recalculate Item
  const updateItem = (index: number, updates: Partial<InvoiceItem>) => {
    setItems(prev => {
      const updated = [...prev];
      const cur = { ...updated[index], ...updates };
      const basePrice = (cur.quantity || 1) * (cur.unitPrice || 0);
      const afterDiscount = Math.max(0, basePrice - (cur.discountAmount || 0));
      const taxAmt = afterDiscount * ((cur.taxRatePercent || 0) / 100);
      cur.total = afterDiscount + taxAmt;
      updated[index] = cur;
      return updated;
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: `item_${Date.now()}`,
      description: 'Custom Fitness Coaching Service',
      quantity: 1,
      unitPrice: 4999,
      discountAmount: 0,
      taxRatePercent: 18,
      total: 5898.82
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) {
      showNotification('Invoice must have at least one line item.');
      return;
    }
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: typeof SERVICE_PRESETS[0]) => {
    const basePrice = preset.price;
    const taxAmt = basePrice * 0.18;
    const newItem: InvoiceItem = {
      id: `item_${Date.now()}`,
      description: `${preset.title} - ${preset.description}`,
      category: preset.category,
      quantity: 1,
      unitPrice: preset.price,
      discountAmount: 0,
      taxRatePercent: 18,
      total: basePrice + taxAmt
    };
    setItems(prev => [...prev, newItem]);
    showNotification(`Added ${preset.title} to invoice items.`);
  };

  // Quick Autocomplete Client from Leads or Customers
  const handleAutofillClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;

    if (val.startsWith('lead_')) {
      const lead = leads.find(l => l.id === val);
      if (lead) {
        setClientName(lead.name);
        setClientEmail(lead.email);
        setClientPhone(lead.phone || '');
        setClientAddress('India');
        showNotification(`Loaded lead information: ${lead.name}`);
      }
    } else if (val.startsWith('cust_')) {
      const cust = customers.find(c => c.id === val);
      if (cust) {
        setClientName(cust.name);
        setClientEmail(cust.email);
        setClientPhone(cust.phone || '');
        setClientAddress('India');
        showNotification(`Loaded customer information: ${cust.name}`);
      }
    }
  };

  // Financial Computations
  const subtotal = items.reduce((sum, it) => sum + ((it.quantity || 1) * (it.unitPrice || 0) - (it.discountAmount || 0)), 0);
  const discountTotal = items.reduce((sum, it) => sum + (it.discountAmount || 0), 0);
  const taxTotal = items.reduce((sum, it) => {
    const base = Math.max(0, (it.quantity || 1) * (it.unitPrice || 0) - (it.discountAmount || 0));
    return sum + (base * ((it.taxRatePercent || 0) / 100));
  }, 0);
  const totalAmount = Math.max(0, subtotal + taxTotal);

  // Active Invoice Object
  const currentInvoiceData: Invoice = {
    id: `inv_${Date.now()}`,
    invoiceNumber,
    type: docType,
    status: docStatus,
    issueDate,
    dueDate,
    businessName,
    businessGstin,
    businessPan,
    businessAddress,
    businessEmail,
    businessPhone,
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
    clientGstinPan,
    items,
    subtotal,
    discountTotal,
    taxTotal,
    totalAmount,
    currency: 'INR',
    paymentMethod,
    transactionReference,
    paymentDate,
    notes,
    terms,
    createdAt: new Date().toISOString()
  };

  const handleSaveAndIssue = () => {
    if (!clientName.trim()) {
      showNotification('Please provide a Client Name.');
      return;
    }
    createInvoice(currentInvoiceData);
    showNotification(`Invoice ${invoiceNumber} issued and saved to repository!`);
    // Generate new invoice number for next
    setInvoiceNumber(`INV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = (inv: Invoice) => {
    const text = `*OFFICIAL ${inv.type.replace('_', ' ')} - FITNETHEIST*\n\n` +
      `Invoice #: ${inv.invoiceNumber}\n` +
      `Athlete: ${inv.clientName}\n` +
      `Status: ${inv.status}\n` +
      `Total Amount: Rs ${inv.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}\n` +
      `Payment Mode: ${inv.paymentMethod}\n` +
      `Ref ID: ${inv.transactionReference || 'N/A'}\n\n` +
      `Thank you for trusting Fitnetheist Elite Coaching. View your personalized plan in your dashboard!`;
    const cleanPhone = (inv.clientPhone || '').replace(/[^0-9]/g, '');
    const url = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopySummary = (inv: Invoice) => {
    const text = `FITNETHEIST ${inv.type.replace('_', ' ')}\nInvoice #: ${inv.invoiceNumber}\nClient: ${inv.clientName} (${inv.clientEmail})\nTotal: Rs ${inv.totalAmount.toLocaleString('en-IN')}\nStatus: ${inv.status}\nPayment Mode: ${inv.paymentMethod}`;
    navigator.clipboard.writeText(text);
    showNotification('Invoice summary copied to clipboard.');
  };

  // Safe History Filter
  const safeInvoices = Array.isArray(invoices) ? invoices : [];
  const filteredInvoices = safeInvoices.filter(inv => {
    if (!inv) return false;
    const term = historySearchTerm.toLowerCase();
    const matchesSearch = !term ||
      (inv.invoiceNumber || '').toLowerCase().includes(term) ||
      (inv.clientName || '').toLowerCase().includes(term) ||
      (inv.clientEmail || '').toLowerCase().includes(term) ||
      (inv.clientPhone || '').includes(historySearchTerm);
    const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInvoicedSum = safeInvoices.reduce((sum, inv) => sum + (inv?.totalAmount || 0), 0);
  const totalSettledSum = safeInvoices.filter(i => i?.status === 'PAID').reduce((sum, inv) => sum + (inv?.totalAmount || 0), 0);
  const totalPendingSum = safeInvoices.filter(i => i?.status === 'PENDING' || i?.status === 'OVERDUE').reduce((sum, inv) => sum + (inv?.totalAmount || 0), 0);

  return (
    <div id="invoice-receipt-generator" className="space-y-6 font-mono-num text-xs max-w-7xl mx-auto">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFC515] text-black font-mono-num font-bold px-4 py-2.5 rounded-sm shadow-2xl border border-black flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-widest text-[#FFC515]">
              COMMERCIAL OPERATIONS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-display text-white">
            INVOICE & RECEIPT GENERATOR
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Generate GST-compliant tax invoices, payment receipts, and payment confirmations for elite athlete enrollments.
          </p>
        </div>

        {/* Action Toggle & Summary */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex bg-zinc-950 border border-white/10 p-1 rounded-sm">
            <button
              onClick={() => setActiveTab('GENERATOR')}
              className={`px-4 py-2 uppercase font-bold text-xs transition-colors rounded-sm flex items-center gap-1.5 ${
                activeTab === 'GENERATOR' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Plus size={14} />
              <span>Create Invoice</span>
            </button>
            <button
              onClick={() => setActiveTab('HISTORY')}
              className={`px-4 py-2 uppercase font-bold text-xs transition-colors rounded-sm flex items-center gap-1.5 ${
                activeTab === 'HISTORY' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Receipt size={14} />
              <span>Invoices Repository ({safeInvoices.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:hidden">
        <div className="bg-zinc-950 border border-white/10 p-4 rounded-sm">
          <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">TOTAL INVOICED</span>
          <span className="text-xl sm:text-2xl font-extrabold text-white font-mono-num">
            ₹{totalInvoicedSum.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          <span className="text-[10px] text-zinc-400 block mt-1">{safeInvoices.length} Documents Issued</span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/20 p-4 rounded-sm">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">SETTLED & COLLECTED</span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono-num">
            ₹{totalSettledSum.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          <span className="text-[10px] text-zinc-400 block mt-1">
            {safeInvoices.filter(i => i?.status === 'PAID').length} Paid Receipts
          </span>
        </div>

        <div className="bg-zinc-950 border border-amber-500/20 p-4 rounded-sm">
          <span className="text-[10px] text-amber-400 uppercase font-bold block mb-1">PENDING RECEIVABLES</span>
          <span className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono-num">
            ₹{totalPendingSum.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          <span className="text-[10px] text-zinc-400 block mt-1">
            {safeInvoices.filter(i => i?.status === 'PENDING').length} Invoices Pending
          </span>
        </div>

        <div className="bg-zinc-950 border border-[#FFC515]/20 p-4 rounded-sm">
          <span className="text-[10px] text-[#FFC515] uppercase font-bold block mb-1">ACTIVE ATHLETES</span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#FFC515] font-mono-num">
            {customers.length + leads.length}
          </span>
          <span className="text-[10px] text-zinc-400 block mt-1">Available for Direct Billing</span>
        </div>
      </div>

      {activeTab === 'GENERATOR' ? (
        /* ======================== GENERATOR VIEW ======================== */
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Generator Form Controls */}
          <div className="lg:col-span-6 space-y-6 print:hidden">
            
            {/* Document Header Controls */}
            <div className="bg-zinc-950 border border-white/10 p-5 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#FFC515] flex items-center gap-1.5">
                  <FileText size={14} /> 1. DOCUMENT SPECIFICATIONS
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as InvoiceType)}
                    className="bg-zinc-900 border border-white/15 px-2.5 py-1 text-white font-bold rounded-sm text-xs focus:border-[#FFC515] focus:outline-none"
                  >
                    <option value="TAX_INVOICE">TAX INVOICE</option>
                    <option value="PAYMENT_RECEIPT">PAYMENT RECEIPT</option>
                    <option value="BILL_OF_SUPPLY">BILL OF SUPPLY</option>
                  </select>

                  <select
                    value={docStatus}
                    onChange={(e) => setDocStatus(e.target.value as InvoiceStatus)}
                    className={`border px-2.5 py-1 font-bold rounded-sm text-xs focus:outline-none ${
                      docStatus === 'PAID' ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' :
                      docStatus === 'PENDING' ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' :
                      'bg-red-950/60 text-red-300 border-red-500/40'
                    }`}
                  >
                    <option value="PAID">PAID (SETTLED)</option>
                    <option value="PENDING">PENDING PAYMENT</option>
                    <option value="OVERDUE">OVERDUE</option>
                    <option value="REFUNDED">REFUNDED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">INVOICE NUMBER</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs font-mono-num font-bold focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">ISSUE DATE</label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs font-mono-num focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">DUE / SETTLE DATE</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs font-mono-num focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Client / Athlete Details */}
            <div className="bg-zinc-950 border border-white/10 p-5 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#FFC515] flex items-center gap-1.5">
                  <User size={14} /> 2. CLIENT & ATHLETE INFORMATION
                </span>

                {/* Quick Auto-fill Dropdown */}
                <select
                  onChange={handleAutofillClient}
                  defaultValue=""
                  className="bg-zinc-900 border border-white/15 px-2.5 py-1 text-[#FFC515] font-bold rounded-sm text-xs focus:border-[#FFC515] focus:outline-none max-w-[200px]"
                >
                  <option value="" disabled>⚡ Autofill from CRM...</option>
                  <optgroup label="Active Leads">
                    {leads.slice(0, 8).map(l => (
                      <option key={l.id} value={l.id}>{l.name} ({l.goal.replace('_', ' ')})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Enrolled Customers">
                    {customers.slice(0, 8).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">ATHLETE NAME *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="alex.mercer@gmail.com"
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">PHONE NUMBER (WHATSAPP)</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98200 11223"
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">CLIENT GSTIN / PAN (OPTIONAL)</label>
                  <input
                    type="text"
                    value={clientGstinPan}
                    onChange={(e) => setClientGstinPan(e.target.value)}
                    placeholder="e.g. 07AAAAA0000A1Z5"
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">BILLING ADDRESS & STATE</label>
                  <input
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="e.g. B-402, Highline Residency, Bandra West, Mumbai, MH 400050"
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Line Items & Service Selection */}
            <div className="bg-zinc-950 border border-white/10 p-5 rounded-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#FFC515] flex items-center gap-1.5">
                  <CreditCard size={14} /> 3. LINE ITEMS & COACHING PACKAGES
                </span>
                <button
                  onClick={addItem}
                  className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white rounded-sm text-xs font-bold flex items-center gap-1 self-start"
                >
                  <Plus size={12} /> Add Row
                </button>
              </div>

              {/* Quick Presets Carousel */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-zinc-500 uppercase font-bold">QUICK SERVICE PRESETS:</span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {SERVICE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyPreset(preset)}
                      className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-left rounded-sm shrink-0 hover:border-[#FFC515]/40 transition-colors"
                    >
                      <span className="text-[11px] font-bold text-white block">{preset.title.split('(')[0]}</span>
                      <span className="text-[10px] text-[#FFC515] font-mono-num font-bold">₹{preset.price.toLocaleString('en-IN')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 pt-2">
                {items.map((item, index) => (
                  <div key={item.id || index} className="p-3 bg-zinc-900 border border-white/10 rounded-sm space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(index, { description: e.target.value })}
                        placeholder="Item / Service description..."
                        className="w-full bg-zinc-950 border border-white/10 px-2.5 py-1.5 text-white text-xs rounded-sm focus:border-[#FFC515] focus:outline-none"
                      />
                      <button
                        onClick={() => removeItem(index)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded-sm transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <label className="text-[9px] text-zinc-400 uppercase font-bold block mb-0.5">QTY</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, { quantity: parseInt(e.target.value) || 1 })}
                          className="w-full bg-zinc-950 border border-white/10 px-2 py-1 text-white rounded-sm text-center font-mono-num"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-zinc-400 uppercase font-bold block mb-0.5">UNIT RATE (₹)</label>
                        <input
                          type="number"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, { unitPrice: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-zinc-950 border border-white/10 px-2 py-1 text-white rounded-sm text-right font-mono-num"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-zinc-400 uppercase font-bold block mb-0.5">DISCOUNT (₹)</label>
                        <input
                          type="number"
                          min="0"
                          value={item.discountAmount || 0}
                          onChange={(e) => updateItem(index, { discountAmount: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-zinc-950 border border-white/10 px-2 py-1 text-amber-400 rounded-sm text-right font-mono-num"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-zinc-400 uppercase font-bold block mb-0.5">GST %</label>
                        <select
                          value={item.taxRatePercent ?? 18}
                          onChange={(e) => updateItem(index, { taxRatePercent: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-zinc-950 border border-white/10 px-1.5 py-1 text-white rounded-sm text-center font-mono-num"
                        >
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] pt-1 text-zinc-400 border-t border-white/5 font-mono-num">
                      <span>Row Total:</span>
                      <span className="font-extrabold text-white">
                        ₹{(item.total || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Settlement Details */}
            <div className="bg-zinc-950 border border-white/10 p-5 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#FFC515] flex items-center gap-1.5">
                  <IndianRupee size={14} /> 4. SETTLEMENT & PAYMENT DETAILS
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">PAYMENT GATEWAY / MODE</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs font-bold focus:border-[#FFC515] focus:outline-none"
                  >
                    <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                    <option value="RAZORPAY">Razorpay Payment Gateway</option>
                    <option value="BANK_TRANSFER">Bank Transfer (NEFT / IMPS)</option>
                    <option value="CREDIT_DEBIT_CARD">Credit / Debit Card</option>
                    <option value="CASH">Cash / Direct</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">TRANSACTION / UTR REFERENCE ID</label>
                  <input
                    type="text"
                    value={transactionReference}
                    onChange={(e) => setTransactionReference(e.target.value)}
                    placeholder="e.g. UPI-AXIS-99382104"
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs font-mono-num focus:border-[#FFC515] focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">NOTES TO ATHLETE</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-1.5 text-white rounded-sm text-xs focus:border-[#FFC515] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleSaveAndIssue}
                className="px-6 py-3 bg-[#FFC515] hover:bg-[#e5b112] text-black font-extrabold uppercase text-xs tracking-wider rounded-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <CheckCircle2 size={16} /> Save & Issue Invoice
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white font-bold uppercase text-xs rounded-sm flex items-center gap-2 transition-colors"
              >
                <Printer size={15} /> Print / Download PDF
              </button>

              <button
                onClick={() => handleWhatsAppShare(currentInvoiceData)}
                className="px-4 py-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold uppercase text-xs rounded-sm flex items-center gap-2 transition-colors"
              >
                <Share2 size={15} /> WhatsApp Athlete
              </button>
            </div>
          </div>

          {/* Right Column: Live Printable Invoice Sheet */}
          <div className="lg:col-span-6">
            <div className="sticky top-20">
              
              {/* Paper Preview Box Container */}
              <div className="bg-white text-zinc-900 p-8 sm:p-10 rounded-sm shadow-2xl border border-zinc-200 font-sans print:p-0 print:border-none print:shadow-none">
                
                {/* Invoice Top Header */}
                <div className="flex justify-between items-start border-b-2 border-zinc-900 pb-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-extrabold text-2xl tracking-tighter text-black font-display">FITNETHEIST</span>
                      <span className="text-[9px] font-mono-num font-bold px-1.5 py-0.5 bg-black text-[#FFC515] uppercase tracking-wider">
                        ELITE COACHING
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 max-w-xs leading-relaxed font-mono-num">
                      {businessAddress}<br />
                      GSTIN: <span className="font-bold text-zinc-900">{businessGstin}</span> | PAN: <span className="font-bold text-zinc-900">{businessPan}</span><br />
                      Email: {businessEmail} | Phone: {businessPhone}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="text-xs uppercase font-mono-num font-extrabold tracking-widest text-zinc-500 block">
                      {docType.replace('_', ' ')}
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold font-mono-num text-black block">
                      {invoiceNumber}
                    </span>
                    <div className="inline-block mt-1">
                      <span className={`px-2.5 py-0.5 text-[10px] font-mono-num font-extrabold uppercase rounded-xs border ${
                        docStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        docStatus === 'PENDING' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        'bg-red-100 text-red-800 border-red-300'
                      }`}>
                        ● {docStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Billed To & Dates */}
                <div className="grid grid-cols-2 gap-6 mb-6 font-mono-num text-xs">
                  <div className="space-y-1 bg-zinc-50 p-3 rounded-xs border border-zinc-200">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">BILLED TO (ATHLETE):</span>
                    <span className="font-extrabold text-sm text-black block">{clientName || 'Athlete Name'}</span>
                    <span className="text-zinc-600 block">{clientEmail}</span>
                    <span className="text-zinc-600 block">{clientPhone}</span>
                    <span className="text-zinc-600 block text-[11px]">{clientAddress}</span>
                    {clientGstinPan && (
                      <span className="text-[10px] text-zinc-800 font-bold block pt-1">GSTIN/PAN: {clientGstinPan}</span>
                    )}
                  </div>

                  <div className="space-y-2 bg-zinc-50 p-3 rounded-xs border border-zinc-200">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Issue Date:</span>
                      <span className="font-bold text-zinc-900">{issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Due / Settle Date:</span>
                      <span className="font-bold text-zinc-900">{dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Payment Mode:</span>
                      <span className="font-bold text-zinc-900">{paymentMethod}</span>
                    </div>
                    {transactionReference && (
                      <div className="flex justify-between text-[11px]">
                        <span className="text-zinc-500">Ref ID:</span>
                        <span className="font-mono-num font-bold text-zinc-800">{transactionReference}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-left font-mono-num text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-zinc-900 bg-zinc-100 text-zinc-800 text-[10px] uppercase">
                        <th className="py-2 px-2 font-extrabold">Item Description</th>
                        <th className="py-2 px-2 text-center font-extrabold">Qty</th>
                        <th className="py-2 px-2 text-right font-extrabold">Unit Rate</th>
                        <th className="py-2 px-2 text-right font-extrabold">Discount</th>
                        <th className="py-2 px-2 text-right font-extrabold">GST</th>
                        <th className="py-2 px-2 text-right font-extrabold">Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-[11px]">
                      {items.map((it, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50/50">
                          <td className="py-2.5 px-2 font-medium text-zinc-900 max-w-[220px]">
                            {it.description}
                          </td>
                          <td className="py-2.5 px-2 text-center text-zinc-700">{it.quantity}</td>
                          <td className="py-2.5 px-2 text-right text-zinc-700">₹{(it.unitPrice || 0).toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-2 text-right text-amber-700">
                            {it.discountAmount ? `-₹${it.discountAmount.toLocaleString('en-IN')}` : '—'}
                          </td>
                          <td className="py-2.5 px-2 text-right text-zinc-600">{it.taxRatePercent || 0}%</td>
                          <td className="py-2.5 px-2 text-right font-bold text-zinc-900">
                            ₹{(it.total || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Financial Summary */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t-2 border-zinc-200 pt-4 mb-6 font-mono-num text-xs">
                  <div className="space-y-1.5 max-w-xs text-[10px] text-zinc-500">
                    <p className="font-bold text-zinc-700 uppercase">COACHING TERMS & NOTICE:</p>
                    <p className="italic leading-relaxed">{terms}</p>
                    <p className="pt-2 text-zinc-600"><strong>Note:</strong> {notes}</p>
                  </div>

                  <div className="w-full sm:w-64 space-y-2 bg-zinc-50 p-4 rounded-xs border border-zinc-200">
                    <div className="flex justify-between text-zinc-600">
                      <span>Subtotal (Net):</span>
                      <span className="font-bold">₹{subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    {discountTotal > 0 && (
                      <div className="flex justify-between text-amber-700">
                        <span>Total Discount:</span>
                        <span className="font-bold">-₹{discountTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-zinc-600">
                      <span>GST (CGST+SGST / IGST):</span>
                      <span className="font-bold">₹{taxTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-zinc-900 border-t-2 border-zinc-900 pt-2">
                      <span>Grand Total:</span>
                      <span className="text-[#c79800]">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Signature Stamp */}
                <div className="flex justify-between items-end border-t border-zinc-200 pt-4 text-[10px] text-zinc-500 font-mono-num">
                  <div>
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <ShieldCheck size={13} /> Digitally Certified Commercial Receipt
                    </span>
                    <span className="block mt-0.5">Computer generated invoice. No physical signature required.</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-zinc-900 block">FOR FITNETHEIST PERFORMANCE</span>
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider block mt-4">Authorized Signatory</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ======================== HISTORY / REPOSITORY VIEW ======================== */
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-zinc-950 border border-white/10 p-4 rounded-sm">
            
            {/* Search input */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={historySearchTerm}
                onChange={(e) => setHistorySearchTerm(e.target.value)}
                placeholder="Search by invoice #, athlete name, email, or phone..."
                className="w-full bg-zinc-900 border border-white/10 pl-10 pr-4 py-2 text-white placeholder-zinc-500 rounded-sm text-xs focus:border-[#FFC515] focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-[10px] uppercase font-bold">Status:</span>
              {(['ALL', 'PAID', 'PENDING', 'OVERDUE', 'REFUNDED'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-sm border ${
                    statusFilter === st
                      ? 'bg-[#FFC515] text-black border-[#FFC515]'
                      : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/20'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices List Table */}
          <div className="bg-zinc-950 border border-white/10 overflow-hidden rounded-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono-num text-xs divide-y divide-white/10">
                <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Athlete / Client</th>
                    <th className="py-3 px-4">Service Package</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Payment Mode</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-zinc-500">
                        No invoices found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map(inv => (
                      <tr key={inv.id} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">
                          <span className="font-mono-num">{inv.invoiceNumber}</span>
                          <span className="block text-[9px] text-zinc-500 uppercase">{inv.type.replace('_', ' ')}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-white block">{inv.clientName}</span>
                          <span className="text-[10px] text-zinc-400 block">{inv.clientEmail}</span>
                        </td>
                        <td className="py-3 px-4 max-w-[220px]">
                          <span className="truncate block font-medium">
                            {inv.items?.[0]?.description || 'Custom Coaching Pass'}
                          </span>
                          {inv.items?.length > 1 && (
                            <span className="text-[9px] text-[#FFC515]">+{inv.items.length - 1} more items</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-extrabold text-white">
                          ₹{inv.totalAmount?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={inv.status}
                            onChange={(e) => updateInvoiceStatus(inv.id, e.target.value as InvoiceStatus)}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-xs uppercase border focus:outline-none ${
                              inv.status === 'PAID' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' :
                              inv.status === 'PENDING' ? 'bg-amber-950 text-amber-300 border-amber-500/40' :
                              'bg-red-950 text-red-300 border-red-500/40'
                            }`}
                          >
                            <option value="PAID">PAID</option>
                            <option value="PENDING">PENDING</option>
                            <option value="OVERDUE">OVERDUE</option>
                            <option value="REFUNDED">REFUNDED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-zinc-300 block">{inv.paymentMethod}</span>
                          <span className="text-[9px] text-zinc-500 font-mono-num block truncate max-w-[120px]">
                            {inv.transactionReference || '—'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-zinc-400 text-[11px]">
                          {inv.issueDate}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleWhatsAppShare(inv)}
                              className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-sm"
                              title="Share on WhatsApp"
                            >
                              <Share2 size={13} />
                            </button>
                            <button
                              onClick={() => handleCopySummary(inv)}
                              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-sm"
                              title="Copy details"
                            >
                              <Copy size={13} />
                            </button>
                            <button
                              onClick={() => {
                                // Load into editor
                                setDocType(inv.type);
                                setDocStatus(inv.status);
                                setInvoiceNumber(inv.invoiceNumber);
                                setIssueDate(inv.issueDate);
                                setDueDate(inv.dueDate);
                                setClientName(inv.clientName);
                                setClientEmail(inv.clientEmail);
                                setClientPhone(inv.clientPhone);
                                setClientAddress(inv.clientAddress || '');
                                setClientGstinPan(inv.clientGstinPan || '');
                                setItems(inv.items || []);
                                setPaymentMethod(inv.paymentMethod as any);
                                setTransactionReference(inv.transactionReference || '');
                                setNotes(inv.notes || '');
                                setTerms(inv.terms || '');
                                setActiveTab('GENERATOR');
                                showNotification(`Loaded invoice ${inv.invoiceNumber} for editing.`);
                              }}
                              className="p-1.5 text-zinc-400 hover:text-[#FFC515] hover:bg-zinc-800 rounded-sm"
                              title="Edit invoice in generator"
                            >
                              <Eye size={13} />
                            </button>
                            <button
                              onClick={() => deleteInvoice(inv.id)}
                              className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded-sm"
                              title="Delete invoice"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
