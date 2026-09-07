'use client';

import React, { useState } from 'react';
import { Palette, Plus, Trash2, Edit } from 'lucide-react';
import { DEMO_PORTFOLIO } from '@/lib/demoData';

export default function AdminPortfolioPage() {
  const [portfolio, setPortfolio] = useState(DEMO_PORTFOLIO);

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">Portfolio Management</h1>
          <p className="text-xs text-slate-400">Manage featured artworks and client project showcases</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolio.map((p) => (
          <div key={p.id} className="p-4 bg-[#121824] border border-slate-800 rounded-3xl space-y-3 shadow-xl">
            <img src={p.cover_image} alt={p.title} className="w-full aspect-video rounded-2xl object-cover" />
            <h3 className="text-base font-bold text-white font-display line-clamp-1">{p.title}</h3>
            <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-amber-400 font-bold">{p.client_name || 'Personal Project'}</span>
              <button
                onClick={() => setPortfolio(portfolio.filter((item) => item.id !== p.id))}
                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
