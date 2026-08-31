import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Customer } from '../../types/admin';
import { 
  UserCheck, 
  Search, 
  Trophy, 
  Dumbbell, 
  Utensils, 
  CreditCard, 
  Mail, 
  Phone, 
  Calendar, 
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Clock
} from 'lucide-react';

export const CustomerManagementView: React.FC = () => {
  const { customers, updateCustomer, orders } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const activeCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  return (
    <div id="customer-management-view" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              ACTIVE ATHLETE ROSTER
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            CUSTOMER MANAGEMENT
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Enrolled athletes with active challenge cohorts, recurring memberships, and daily training logs.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-zinc-900 border border-white/10 text-center">
            <span className="text-[10px] text-zinc-500 uppercase block font-bold">TOTAL ATHLETES</span>
            <span className="text-lg font-bold text-white">{customers.length}</span>
          </div>
          <div className="px-4 py-2 bg-zinc-900 border border-white/10 text-center">
            <span className="text-[10px] text-zinc-500 uppercase block font-bold">ACTIVE SUBSCRIPTIONS</span>
            <span className="text-lg font-bold text-[#d8ff38]">
              {customers.filter(c => c.activeSubscription?.status === 'ACTIVE').length}
            </span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer name, email, or phone..."
          className="w-full bg-zinc-950 border border-white/10 pl-9 pr-4 py-2.5 text-white placeholder-zinc-500 focus:border-[#d8ff38] focus:outline-none"
        />
      </div>

      {/* Main Customers List */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Customer List Table (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                  <th className="p-3.5">ATHLETE</th>
                  <th className="p-3.5">ACTIVE COHORT</th>
                  <th className="p-3.5">STREAK</th>
                  <th className="p-3.5">LTV SPENT</th>
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
                          isSelected ? 'bg-zinc-900/80 border-l-2 border-[#d8ff38]' : ''
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
                              <span className="text-[10px] text-zinc-500">{customer.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="text-white font-bold block">{customer.activeChallengeName || 'General Routine'}</span>
                          <span className="text-[10px] text-zinc-500">Joined {customer.joinedDate}</span>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-[#d8ff38]/10 text-[#d8ff38] font-bold border border-[#d8ff38]/30">
                            {customer.streakDays} DAYS
                          </span>
                        </td>

                        <td className="p-3.5 font-bold text-[#d8ff38]">
                          ${customer.totalSpent}
                        </td>

                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedCustomerId(customer.id)}
                            className="px-2 py-1 bg-zinc-900 border border-white/10 text-white hover:bg-white hover:text-black uppercase text-[10px] font-bold transition-colors"
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
        <div className="lg:col-span-5 bg-zinc-950 border border-white/10 p-6 space-y-6">
          {activeCustomer ? (
            <>
              {/* Profile Header */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                <div className="h-14 w-14 rounded-full overflow-hidden bg-zinc-800 border-2 border-[#d8ff38]">
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
                  <Dumbbell size={14} className="text-[#d8ff38]" />
                  ACTIVE ATHLETE REGIMEN
                </h4>

                <div className="p-3.5 bg-zinc-900 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">CHALLENGE COHORT</span>
                    <span className="text-white font-bold">{activeCustomer.activeChallengeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">WORKOUT SPLIT</span>
                    <span className="text-white font-bold">{activeCustomer.workoutSplit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">DIET GOAL</span>
                    <span className="text-[#d8ff38] font-bold">{activeCustomer.dietGoal.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">ACCOUNTABILITY STREAK</span>
                    <span className="text-[#d8ff38] font-bold">{activeCustomer.streakDays} CONSECUTIVE DAYS</span>
                  </div>
                </div>
              </div>

              {/* Membership Subscription */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                  <CreditCard size={14} className="text-[#d8ff38]" />
                  SUBSCRIPTION & BILLING
                </h4>

                <div className="p-3.5 bg-zinc-900 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">MEMBERSHIP PLAN</span>
                    <span className="text-white font-bold">{activeCustomer.activeSubscription?.plan || 'Standard Cohort Pass'}</span>
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
                    <span className="text-[#d8ff38] font-bold">${activeCustomer.totalSpent}</span>
                  </div>
                </div>
              </div>

              {/* Orders on File */}
              <div className="space-y-2">
                <span className="text-[10px] text-zinc-500 uppercase font-bold">ORDER HISTORY ON FILE:</span>
                <div className="flex flex-wrap gap-2">
                  {activeCustomer.orderIds.map(oid => (
                    <span key={oid} className="px-2 py-1 bg-zinc-900 border border-white/10 text-zinc-300 text-[11px]">
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
