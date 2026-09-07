'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';
import { DEMO_ORDERS } from '@/lib/demoData';
import { siteConfig } from '@/config/site';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [search, setSearch] = useState('');

  const handleStatusChange = (id: string, status: any) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, order_status: status } : o)));
  };

  return (
    <div className="space-y-6">
      
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white font-display">Customer Order Management</h1>
        <p className="text-xs text-slate-400">Review transactions, verify Paystack references, and manage dispatch status</p>
      </div>

      <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-display">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 font-bold text-white font-display">#{ord.order_number}</td>
                  <td className="p-4">
                    <div className="font-bold text-white">{ord.customer_name}</div>
                    <div className="text-[10px] text-slate-500">{ord.customer_email}</div>
                  </td>
                  <td className="p-4 font-bold text-amber-400 font-display">
                    {siteConfig.currency.format(ord.net_amount)}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                      {ord.payment_status} ({ord.payment_provider})
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={ord.order_status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
