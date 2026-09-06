'use client';

import React, { useState } from 'react';
import { Ticket, Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Coupon } from '@/types/database';

const DEMO_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'SK10',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_value: 5000,
    max_uses: 100,
    current_uses: 24,
    expires_at: '2027-01-01T00:00:00Z',
    is_active: true,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'c-2',
    code: 'VIP5000',
    discount_type: 'fixed',
    discount_value: 5000,
    min_order_value: 20000,
    max_uses: 50,
    current_uses: 8,
    expires_at: '2026-12-31T00:00:00Z',
    is_active: true,
    created_at: '2026-07-15T00:00:00Z',
  },
  {
    id: 'c-3',
    code: 'WELCOME10',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_value: 0,
    max_uses: 500,
    current_uses: 142,
    expires_at: null,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(DEMO_COUPONS);
  const [showForm, setShowForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: 10,
    min_order_value: 0,
    max_uses: 100,
    expires_at: '',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const coupon: Coupon = {
      id: `c-${Date.now()}`,
      code: newCoupon.code.toUpperCase(),
      discount_type: newCoupon.discount_type,
      discount_value: newCoupon.discount_value,
      min_order_value: newCoupon.min_order_value,
      max_uses: newCoupon.max_uses,
      current_uses: 0,
      expires_at: newCoupon.expires_at || null,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setCoupons([coupon, ...coupons]);
    setShowForm(false);
    setNewCoupon({ code: '', discount_type: 'percentage', discount_value: 10, min_order_value: 0, max_uses: 100, expires_at: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this coupon permanently?')) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, is_active: !c.is_active } : c)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">Coupons & Discount Vouchers</h1>
          <p className="text-xs text-slate-400">Create promo codes for customer percentage or fixed ₦ discounts</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Create Coupon Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="p-6 bg-[#121824] border border-amber-500/40 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white font-display">New Coupon Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. SUMMER20"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Discount Type</label>
              <select
                value={newCoupon.discount_type}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount_type: e.target.value as 'percentage' | 'fixed' })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₦)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Discount Value ({newCoupon.discount_type === 'percentage' ? '%' : '₦'}) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={newCoupon.discount_value}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount_value: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400">
              Save Coupon
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Coupons Table */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-display">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Min Order</th>
                <th className="p-4">Usage</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-amber-400 font-display bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                      {coupon.code}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">
                    {coupon.discount_type === 'percentage'
                      ? `${coupon.discount_value}%`
                      : siteConfig.currency.format(coupon.discount_value)}
                  </td>
                  <td className="p-4 text-slate-400">
                    {coupon.min_order_value > 0 ? siteConfig.currency.format(coupon.min_order_value) : 'None'}
                  </td>
                  <td className="p-4 text-slate-300">
                    {coupon.current_uses} / {coupon.max_uses}
                  </td>
                  <td className="p-4">
                    <button onClick={() => toggleActive(coupon.id)}>
                      {coupon.is_active ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <XCircle className="w-3 h-3" /> Disabled
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      aria-label="Delete coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
