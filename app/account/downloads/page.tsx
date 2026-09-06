'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, ShieldCheck, FileArchive, Lock } from 'lucide-react';
import { DEMO_ORDERS } from '@/lib/demoData';

export default function AccountDownloadsPage() {
  const digitalItems = DEMO_ORDERS.flatMap((ord) => 
    (ord.items || [])
      .filter((item) => item.is_digital)
      .map((item) => ({ ...item, orderNumber: ord.order_number, date: ord.created_at }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
        <Link href="/account" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">Digital Downloads Library</h1>
          <p className="text-xs text-slate-400">Lifetime access to your paid 3D icon packs, vector grids, and PSD mockups</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {digitalItems.map((item) => (
          <div key={item.id} className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-1">
                  <FileArchive className="w-3.5 h-3.5 text-purple-400" />
                  ZIP Master Bundle
                </span>
                <span className="text-slate-400 font-medium">Order #{item.orderNumber}</span>
              </div>

              <h3 className="text-lg font-bold text-white font-display">{item.product_title}</h3>
              <p className="text-xs text-slate-400">Includes commercial use license and source files (.blend, .obj, .psd, .ai)</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Purchase Access
              </span>

              <a
                href={`/api/downloads/${item.download_token || 'dl-token-cyberpunk-9941'}`}
                download
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download ZIP
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
