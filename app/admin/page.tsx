'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2,
  Clock,
  Filter,
  Eye,
  Download,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';
import { DEMO_ORDERS, DEMO_PRODUCTS } from '@/lib/demoData';
import { siteConfig } from '@/config/site';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 420000, orders: 18 },
  { month: 'Feb', revenue: 580000, orders: 24 },
  { month: 'Mar', revenue: 740000, orders: 31 },
  { month: 'Apr', revenue: 690000, orders: 28 },
  { month: 'May', revenue: 920000, orders: 39 },
  { month: 'Jun', revenue: 1150000, orders: 46 },
  { month: 'Jul', revenue: 1380000, orders: 54 },
];

export default function AdminDashboardPage() {
  const [orderFilter, setOrderFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const totalSales = DEMO_ORDERS.reduce((sum, ord) => sum + ord.net_amount, 0);
  const totalOrders = DEMO_ORDERS.length;
  const totalProducts = DEMO_PRODUCTS.length;

  const lowStockProducts = DEMO_PRODUCTS.filter(p => !p.is_digital && (p.stock ?? 0) <= 3);

  const filteredOrders = DEMO_ORDERS.filter(ord => {
    if (orderFilter === 'verified') return ord.payment_status === 'Paid';
    if (orderFilter === 'pending') return ord.payment_status === 'Pending';
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              Executive View
            </span>
            <span className="text-xs text-slate-400">Updated Live</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-display mt-1">Executive Sales & Operations Dashboard</h1>
          <p className="text-xs text-slate-400">Real-time overview of revenue performance, payment verification, and gallery inventory</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Artwork / Product
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-xl hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Sales Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-display">
            {siteConfig.currency.format(totalSales + 1250000)}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +24.8% growth vs last month
          </div>
        </div>

        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-xl hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Marketplace Commission</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-display">
            {siteConfig.currency.format((totalSales + 1250000) * 0.15)}
          </div>
          <div className="text-[11px] text-purple-300 font-semibold">
            15% SK Artworks Commission
          </div>
        </div>

        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-xl hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Marketplace Artists</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-display">5 Active</div>
          <div className="text-[11px] text-emerald-400 font-semibold">
            <Link href="/admin/artists" className="underline hover:text-white">Manage Profiles →</Link>
          </div>
        </div>

        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-xl hover:border-blue-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gallery & Assets</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-display">{totalProducts} active</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" /> Physical Canvas & Digital
          </div>
        </div>

        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-xl hover:border-pink-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Client Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-display">12 Bookings</div>
          <div className="text-[11px] text-pink-300 font-semibold">
            <Link href="/admin/bookings" className="underline hover:text-white">View Bookings →</Link>
          </div>
        </div>

      </div>

      {/* Interactive Revenue Chart & Inventory Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue Performance Area Chart */}
        <div className="lg:col-span-8 p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-display">Monthly Revenue Performance</h2>
              <p className="text-xs text-slate-400">Gross transaction revenue from digital downloads & physical artwork</p>
            </div>
            <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 2026 Financial Year
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => `₦${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value: any) => [`₦${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock & Gallery Alerts */}
        <div className="lg:col-span-4 p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Physical Stock Alerts
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                {lowStockProducts.length} Items Low
              </span>
            </div>

            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <img src={p.images?.[0]?.image_url} alt={p.title} className="w-9 h-9 rounded-lg object-cover" />
                    <div className="truncate">
                      <div className="font-bold text-white truncate">{p.title}</div>
                      <div className="text-[10px] text-slate-400">Stock: {p.stock ?? 1} remaining</div>
                    </div>
                  </div>
                  <Link href={`/admin/products`} className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-[11px] font-bold shrink-0 hover:bg-amber-500 hover:text-slate-950 transition-colors">
                    Restock
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
            <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> Digital Asset Vault Status
            </div>
            <p className="text-[11px] text-slate-300">
              All digital download links are secured via Supabase signed URLs with automated payload verification.
            </p>
          </div>
        </div>

      </div>

      {/* Recent Orders Table & Filter Tabs */}
      <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white font-display">Recent Customer Transactions</h2>
            <p className="text-xs text-slate-400">Verified purchases, customer details, and order statuses</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setOrderFilter('all')}
              className={`px-3 py-1.5 font-bold rounded-lg transition-colors ${
                orderFilter === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({DEMO_ORDERS.length})
            </button>
            <button
              onClick={() => setOrderFilter('verified')}
              className={`px-3 py-1.5 font-bold rounded-lg transition-colors ${
                orderFilter === 'verified' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Paid / Verified
            </button>
            <button
              onClick={() => setOrderFilter('pending')}
              className={`px-3 py-1.5 font-bold rounded-lg transition-colors ${
                orderFilter === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5 rounded-l-xl">Order Ref</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-3.5 font-bold text-white font-display">#{ord.order_number}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-white">{ord.customer_name}</div>
                    <div className="text-[11px] text-slate-400">{ord.customer_email}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] uppercase">
                      {ord.payment_provider}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-amber-400 font-display">
                    {siteConfig.currency.format(ord.net_amount)}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                      {ord.payment_status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 font-semibold inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-display">Order #{selectedOrder.order_number}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="text-white font-semibold">{selectedOrder.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-semibold">{selectedOrder.customer_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gateway Provider:</span>
                <span className="text-amber-400 font-bold uppercase">{selectedOrder.payment_provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Net Amount:</span>
                <span className="text-amber-400 font-bold text-sm font-display">{siteConfig.currency.format(selectedOrder.net_amount)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

