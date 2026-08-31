import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { OrderStatus, SubscriptionStatus } from '../../types/admin';
import { 
  ShoppingBag, 
  CreditCard, 
  Search, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  RefreshCw,
  XCircle
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

  const totalSettledRevenue = orders
    .filter(o => o.paymentStatus === 'PAID')
    .reduce((sum, o) => sum + o.amount, 0);

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubscriptions = subscriptions.filter(s =>
    s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.planName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="orders-subscriptions-admin" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              PAYMENT SETTLEMENT & BILLING
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            ORDERS & SUBSCRIPTIONS
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Settled checkout transactions, payment gateway attribution (Stripe, Razorpay, UPI), and recurring billing.
          </p>
        </div>

        {/* Total Settled Box */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-zinc-900 border border-white/10 text-center">
            <span className="text-[10px] text-zinc-500 uppercase block font-bold">TOTAL VERIFIED VOLUME</span>
            <span className="text-xl font-extrabold text-[#d8ff38] font-mono-num">
              ${totalSettledRevenue.toLocaleString()} USD
            </span>
          </div>

          <div className="flex bg-zinc-900 border border-white/10 p-1">
            <button
              onClick={() => setActiveTab('ORDERS')}
              className={`px-3 py-1.5 uppercase font-bold text-[10px] ${
                activeTab === 'ORDERS' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              ORDERS ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('SUBSCRIPTIONS')}
              className={`px-3 py-1.5 uppercase font-bold text-[10px] ${
                activeTab === 'SUBSCRIPTIONS' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              SUBSCRIPTIONS ({subscriptions.length})
            </button>
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
          placeholder="Search by order ID, athlete name, email, or product..."
          className="w-full bg-zinc-950 border border-white/10 pl-9 pr-4 py-2 text-white placeholder-zinc-500"
        />
      </div>

      {activeTab === 'ORDERS' ? (
        /* Orders Table */
        <div className="bg-zinc-950 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                  <th className="p-3.5">ORDER ID</th>
                  <th className="p-3.5">ATHLETE</th>
                  <th className="p-3.5">PRODUCT / CHALLENGE</th>
                  <th className="p-3.5">AMOUNT</th>
                  <th className="p-3.5">GATEWAY</th>
                  <th className="p-3.5">PAYMENT STATUS</th>
                  <th className="p-3.5">TIMESTAMP</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-3.5 font-bold text-[#d8ff38]">{order.id}</td>

                    <td className="p-3.5">
                      <span className="font-bold text-white block">{order.customerName}</span>
                      <span className="text-[10px] text-zinc-500">{order.customerEmail}</span>
                    </td>

                    <td className="p-3.5 text-zinc-300 font-bold">
                      {order.productTitle}
                    </td>

                    <td className="p-3.5 font-bold text-white text-sm">
                      ${order.amount} {order.currency}
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300 font-bold uppercase text-[10px]">
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-[10px] font-bold px-2 py-1 uppercase bg-zinc-900 border focus:outline-none ${
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

                    <td className="p-3.5 text-zinc-500 text-[11px]">
                      {new Date(order.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>

                    <td className="p-3.5 text-right">
                      {order.paymentStatus === 'PAID' && (
                        <button
                          onClick={() => {
                            if (confirm(`Simulate refund for ${order.id}?`)) {
                              updateOrderStatus(order.id, 'REFUNDED');
                            }
                          }}
                          className="px-2 py-1 bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-300 uppercase text-[10px] font-bold border border-white/10 transition-colors"
                        >
                          REFUND
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Subscriptions Table */
        <div className="bg-zinc-950 border border-white/10 overflow-hidden">
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

                    <td className="p-3.5 font-bold text-[#d8ff38]">{sub.planName}</td>

                    <td className="p-3.5 font-bold text-white">${sub.amountPerMonth} / mo</td>

                    <td className="p-3.5">
                      <select
                        value={sub.status}
                        onChange={(e) => updateSubscriptionStatus(sub.id, e.target.value as SubscriptionStatus)}
                        className={`text-[10px] font-bold px-2 py-1 uppercase bg-zinc-900 border focus:outline-none ${
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
                          className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 uppercase text-[10px] font-bold border border-white/10"
                        >
                          PAUSE
                        </button>
                      ) : (
                        <button
                          onClick={() => updateSubscriptionStatus(sub.id, 'ACTIVE')}
                          className="px-2 py-1 bg-[#d8ff38] text-black uppercase text-[10px] font-bold"
                        >
                          ACTIVATE
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
