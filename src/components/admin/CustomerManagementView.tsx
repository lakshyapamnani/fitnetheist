import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Customer } from '../../types/admin';
import { 
  UserCheck, 
  Search, 
  Trophy, 
  Dumbbell, 
  CreditCard, 
  Mail, 
  Phone, 
  IndianRupee,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const CustomerManagementView: React.FC = () => {
  const { customers, updateCustomer, orders } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const safeCustomers = Array.isArray(customers) ? customers : [];

  const filteredCustomers = safeCustomers.filter(c => {
    if (!c) return false;
    const term = (searchTerm || '').toLowerCase();
    const nameMatch = (c.name || '').toLowerCase().includes(term);
    const emailMatch = (c.email || '').toLowerCase().includes(term);
    const phoneMatch = (c.phone || '').includes(searchTerm);
    return !term || nameMatch || emailMatch || phoneMatch;
  });

  const activeCustomer = safeCustomers.find(c => c.id === selectedCustomerId) || safeCustomers[0];

  return (
    <div id="customer-management-view" className="space-y-6 font-mono-num text-xs max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-widest text-[#FFC515]">
              ATHLETE ROSTER
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-display text-white">
            ACTIVE ATHLETES
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Enrolled athletes with active challenge cohorts, recurring retainers, and accountability streaks.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-zinc-950 border border-white/10 text-center rounded-sm">
            <span className="text-[10px] text-zinc-400 uppercase block font-bold">TOTAL ATHLETES</span>
            <span className="text-lg font-extrabold text-white">{customers.length}</span>
          </div>
          <div className="px-4 py-2 bg-zinc-950 border border-white/10 text-center rounded-sm">
            <span className="text-[10px] text-zinc-400 uppercase block font-bold">ACTIVE SUBSCRIPTIONS</span>
            <span className="text-lg font-extrabold text-[#FFC515]">
              {customers.filter(c => c.activeSubscription?.status === 'ACTIVE').length}
            </span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by athlete name, email, or phone..."
          className="w-full bg-zinc-950 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 rounded-sm focus:border-[#FFC515] focus:outline-none"
        />
      </div>

      {/* Main Customers List */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Customer List Table (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 border border-white/10 overflow-hidden rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                  <th className="p-3.5">ATHLETE</th>
                  <th className="p-3.5">ACTIVE COHORT</th>
                  <th className="p-3.5">STREAK</th>
                  <th className="p-3.5">TOTAL SPENT</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-500">
                      No active athletes found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map(customer => {
                    const isSelected = activeCustomer?.id === customer.id;

                    return (
                      <tr
                        key={customer.id}
                        onClick={() => setSelectedCustomerId(customer.id)}
                        className={`hover:bg-zinc-900/50 cursor-pointer transition-colors ${
                          isSelected ? 'bg-zinc-900/80 border-l-2 border-[#FFC515]' : ''
                        }`}
                      >
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-zinc-800 border border-white/10 flex-shrink-0">
                              {customer.avatarUrl ? (
                                <img src={customer.avatarUrl} alt={customer.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center font-bold text-zinc-400">
                                  {customer.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="font-bold text-white block">{customer.name}</span>
                              <span className="text-[10px] text-zinc-400">{customer.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="text-white font-bold block">{customer.activeChallengeName || 'General Routine'}</span>
                          <span className="text-[10px] text-zinc-500">Joined {customer.joinedDate}</span>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-[#FFC515]/10 text-[#FFC515] font-bold border border-[#FFC515]/30 rounded-xs">
                            {customer.streakDays} DAYS
                          </span>
                        </td>

                        <td className="p-3.5 font-bold text-white">
                          ₹{customer.totalSpent.toLocaleString('en-IN')}
                        </td>

                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedCustomerId(customer.id)}
                            className="px-2.5 py-1 bg-zinc-900 border border-white/10 text-white hover:bg-white hover:text-black uppercase text-[10px] font-bold transition-colors rounded-xs"
                          >
                            PROFILE
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Selected Customer Profile Dossier (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-950 border border-white/10 p-6 space-y-6 rounded-sm">
          {activeCustomer ? (
            <>
              {/* Profile Header */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                <div className="h-14 w-14 rounded-full overflow-hidden bg-zinc-800 border-2 border-[#FFC515]">
                  {activeCustomer.avatarUrl ? (
                    <img src={activeCustomer.avatarUrl} alt={activeCustomer.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center font-bold text-xl text-white">
                      {activeCustomer.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold uppercase text-white font-display">{activeCustomer.name}</h3>
                  <p className="text-zinc-400 text-xs">{activeCustomer.email} • {activeCustomer.phone}</p>
                  <span className="text-[10px] text-zinc-500 uppercase mt-1 block">
                    Athlete ID: {activeCustomer.id}
                  </span>
                </div>
              </div>

              {/* Training & Diet Program */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                  <Dumbbell size={14} className="text-[#FFC515]" />
                  ACTIVE ATHLETE PROTOCOL
                </h4>

                <div className="p-3.5 bg-zinc-900 border border-white/5 space-y-2 text-xs rounded-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">COHORT PROGRAM</span>
                    <span className="text-white font-bold">{activeCustomer.activeChallengeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">WORKOUT SPLIT</span>
                    <span className="text-white font-bold">{activeCustomer.workoutSplit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">DIET GOAL</span>
                    <span className="text-[#FFC515] font-bold">{activeCustomer.dietGoal.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">ACCOUNTABILITY STREAK</span>
                    <span className="text-[#FFC515] font-bold">{activeCustomer.streakDays} CONSECUTIVE DAYS</span>
                  </div>
                </div>
              </div>

              {/* Membership Subscription */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                  <CreditCard size={14} className="text-[#FFC515]" />
                  BILLING & REVENUE
                </h4>

                <div className="p-3.5 bg-zinc-900 border border-white/5 space-y-2 text-xs rounded-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">MEMBERSHIP PLAN</span>
                    <span className="text-white font-bold">{activeCustomer.activeSubscription?.plan || 'Coaching Retainer'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">STATUS</span>
                    <span className="text-emerald-400 font-bold uppercase">
                      {activeCustomer.activeSubscription?.status || 'ACTIVE'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">NEXT RENEWAL</span>
                    <span className="text-white font-bold">{activeCustomer.activeSubscription?.renewalDate || '2026-09-14'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">LIFETIME REVENUE</span>
                    <span className="text-[#FFC515] font-bold">₹{activeCustomer.totalSpent.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Orders on File */}
              <div className="space-y-2">
                <span className="text-[10px] text-zinc-400 uppercase font-bold">SETTLED TRANSACTIONS:</span>
                <div className="flex flex-wrap gap-2">
                  {activeCustomer.orderIds.map(oid => (
                    <span key={oid} className="px-2 py-1 bg-zinc-900 border border-white/10 text-zinc-300 text-[11px] rounded-xs">
                      {oid} (Settled)
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-zinc-500 text-center py-8">Select an athlete to view complete dossier.</p>
          )}
        </div>

      </div>

    </div>
  );
};
