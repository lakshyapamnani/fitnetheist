import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { OrderStatus, SubscriptionStatus } from '../../types/admin';
import { 
  ShoppingBag, 
  CreditCard, 
  Search, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RefreshCw,
  XCircle,
  ArrowUpRight
} from 'lucide-react';

export const OrdersAndSubscriptionsView: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    subscriptions, 
    updateSubscriptionStatus, 
    logAuditAction 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'ORDERS' | 'SUBSCRIPTIONS'>('ORDERS');
  const [searchTerm, setSearchTerm] = useState('');

  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeSubscriptions = Array.isArray(subscriptions) ? subscriptions : [];

  const totalSettledRevenue = safeOrders
    .filter(o => o?.paymentStatus === 'PAID')
    .reduce((sum, o) => sum + (o?.amount || 0), 0);

  const filteredOrders = safeOrders.filter(o => {
    if (!o) return false;
    const term = (searchTerm || '').toLowerCase();
    return !term ||
      (o.id || '').toLowerCase().includes(term) ||
      (o.customerName || '').toLowerCase().includes(term) ||
      (o.customerEmail || '').toLowerCase().includes(term) ||
      (o.productTitle || '').toLowerCase().includes(term);
  });

  const filteredSubscriptions = safeSubscriptions.filter(s => {
    if (!s) return false;
    const term = (searchTerm || '').toLowerCase();
    return !term ||
      (s.customerName || '').toLowerCase().includes(term) ||
      (s.customerEmail || '').toLowerCase().includes(term) ||
      (s.planName || '').toLowerCase().includes(term);
  });

  return (
    <div id="orders-subscriptions-admin" className="space-y-6 font-mono-num text-xs max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FFC515]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-widest text-[#FFC515]">
              REVENUE & BILLING
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-display text-white">
            ORDERS & SUBSCRIPTIONS
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Settled checkout transactions, payment gateways (Razorpay, UPI, Cards), and recurring retainers.
          </p>
        </div>

        {/* Total Settled Box */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-sm">
            <span className="text-[10px] text-zinc-400 uppercase block font-bold">TOTAL VERIFIED REVENUE</span>
            <span className="text-xl font-extrabold text-white font-mono-num flex items-center gap-1">
              ₹{totalSettledRevenue.toLocaleString('en-IN')} <span className="text-xs text-[#FFC515] font-bold">INR</span>
            </span>
          </div>

          <div className="flex bg-zinc-950 border border-white/10 p-1 rounded-sm">
            <button
              onClick={() => setActiveTab('ORDERS')}
              className={`px-3.5 py-2 uppercase font-bold text-xs transition-colors rounded-sm ${
                activeTab === 'ORDERS' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('SUBSCRIPTIONS')}
              className={`px-3.5 py-2 uppercase font-bold text-xs transition-colors rounded-sm ${
                activeTab === 'SUBSCRIPTIONS' ? 'bg-[#FFC515] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Subscriptions ({subscriptions.length})
            </button>
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
          placeholder="Search by order ID, athlete name, email, or product..."
          className="w-full bg-zinc-950 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 rounded-sm focus:border-[#FFC515] focus:outline-none text-xs"
        />
      </div>

      {activeTab === 'ORDERS' ? (
        /* Orders Table */
        <div className="bg-zinc-950 border border-white/10 overflow-hidden rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                  <th className="p-3.5">ORDER ID</th>
                  <th className="p-3.5">ATHLETE</th>
                  <th className="p-3.5">PRODUCT / CHALLENGE</th>
                  <th className="p-3.5">AMOUNT</th>
                  <th className="p-3.5">GATEWAY</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5">TIMESTAMP</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-zinc-500">
                      No orders matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="p-3.5 font-bold text-[#FFC515]">{order.id}</td>

                      <td className="p-3.5">
                        <span className="font-bold text-white block">{order.customerName}</span>
                        <span className="text-[10px] text-zinc-500">{order.customerEmail}</span>
                      </td>

                      <td className="p-3.5 text-zinc-300 font-bold">
                        {order.productTitle}
                      </td>

                      <td className="p-3.5 font-extrabold text-white text-sm">
                        ₹{order.amount.toLocaleString('en-IN')}
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300 font-bold uppercase text-[10px] rounded-xs">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`text-[10px] font-bold px-2 py-1 uppercase bg-zinc-900 border rounded-xs focus:outline-none ${
                            order.paymentStatus === 'PAID'
                              ? 'text-emerald-400 border-emerald-500/40'
                              : order.paymentStatus === 'PENDING'
                                ? 'text-yellow-300 border-yellow-500/40'
                                : 'text-red-400 border-red-500/40'
                          }`}
                        >
                          <option value="PAID">PAID</option>
                          <option value="PENDING">PENDING</option>
                          <option value="FAILED">FAILED</option>
                          <option value="REFUNDED">REFUNDED</option>
                        </select>
                      </td>

                      <td className="p-3.5 text-zinc-400 text-[11px]">
                        {new Date(order.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </td>

                      <td className="p-3.5 text-right">
                        {order.paymentStatus === 'PAID' && (
                          <button
                            onClick={() => {
                              if (confirm(`Process refund for ${order.id}?`)) {
                                updateOrderStatus(order.id, 'REFUNDED');
                              }
                            }}
                            className="px-2.5 py-1 bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-300 uppercase text-[10px] font-bold border border-white/10 transition-colors rounded-xs"
                          >
                            REFUND
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Subscriptions Table */
        <div className="bg-zinc-950 border border-white/10 overflow-hidden rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                  <th className="p-3.5">SUBSCRIPTION ID</th>
                  <th className="p-3.5">ATHLETE</th>
                  <th className="p-3.5">MEMBERSHIP PLAN</th>
                  <th className="p-3.5">MONTHLY RATE</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5">RENEWAL DATE</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSubscriptions.map(sub => (
                  <tr key={sub.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-3.5 font-bold text-white">{sub.id}</td>

                    <td className="p-3.5">
                      <span className="font-bold text-white block">{sub.customerName}</span>
                      <span className="text-[10px] text-zinc-500">{sub.customerEmail}</span>
                    </td>

                    <td className="p-3.5 font-bold text-[#FFC515]">{sub.planName}</td>

                    <td className="p-3.5 font-extrabold text-white">₹{sub.amountPerMonth.toLocaleString('en-IN')} / mo</td>

                    <td className="p-3.5">
                      <select
                        value={sub.status}
                        onChange={(e) => updateSubscriptionStatus(sub.id, e.target.value as SubscriptionStatus)}
                        className={`text-[10px] font-bold px-2 py-1 uppercase bg-zinc-900 border rounded-xs focus:outline-none ${
                          sub.status === 'ACTIVE' 
                            ? 'text-emerald-400 border-emerald-500/40' 
                            : sub.status === 'PAUSED' 
                              ? 'text-yellow-300 border-yellow-500/40' 
                              : 'text-zinc-500 border-white/10'
                        }`}
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="PAUSED">PAUSED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-zinc-400">{sub.renewalDate}</td>

                    <td className="p-3.5 text-right">
                      {sub.status === 'ACTIVE' ? (
                        <button
                          onClick={() => updateSubscriptionStatus(sub.id, 'PAUSED')}
                          className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 uppercase text-[10px] font-bold border border-white/10 rounded-xs"
                        >
                          PAUSE
                        </button>
                      ) : (
                        <button
                          onClick={() => updateSubscriptionStatus(sub.id, 'ACTIVE')}
                          className="px-2.5 py-1 bg-[#FFC515] text-black uppercase text-[10px] font-bold rounded-xs"
                        >
                          RESUME
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
