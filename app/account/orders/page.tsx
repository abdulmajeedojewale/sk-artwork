'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, CheckCircle2, Download, Package } from 'lucide-react';
import { DEMO_ORDERS } from '@/lib/demoData';
import { siteConfig } from '@/config/site';

export default function AccountOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
        <Link href="/account" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">My Orders</h1>
          <p className="text-xs text-slate-400">Track fulfillment status and view order details</p>
        </div>
      </div>

      <div className="space-y-6">
        {DEMO_ORDERS.map((ord) => (
          <div key={ord.id} className="bg-[#121824] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className="text-base font-bold text-white font-display">Order #{ord.order_number}</div>
                <div className="text-xs text-slate-400">Placed on {new Date(ord.created_at).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                  {ord.payment_status} ({ord.payment_provider})
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold">
                  {ord.order_status}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {ord.items?.map((item) => (
                <div key={item.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {item.is_digital ? <Download className="w-4 h-4 text-purple-400" /> : <Package className="w-4 h-4 text-blue-400" />}
                    <div>
                      <div className="font-bold text-white">{item.product_title}</div>
                      <div className="text-[11px] text-slate-400">Qty: {item.quantity} • {siteConfig.currency.format(item.price)}</div>
                    </div>
                  </div>

                  {item.is_digital && (
                    <Link
                      href="/account/downloads"
                      className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-[11px] hover:bg-purple-500"
                    >
                      Download Assets
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between text-xs font-bold text-slate-300 border-t border-slate-800">
              <span>Total Paid:</span>
              <span className="text-amber-400 text-base">{siteConfig.currency.format(ord.net_amount)}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
