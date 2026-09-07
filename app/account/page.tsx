'use client';

import React from 'react';
import Link from 'next/link';
import { User, ShoppingBag, Download, Heart, MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { siteConfig } from '@/config/site';
import { DEMO_ORDERS } from '@/lib/demoData';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Info */}
      <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={user?.full_name || 'Profile'}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40"
          />
          <div>
            <h1 className="text-2xl font-bold text-white font-display">{user?.full_name || 'Collector Account'}</h1>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {user?.role === 'artist' ? 'VERIFIED ARTIST' : 'COLLECTOR ACCOUNT'}
            </span>
          </div>
        </div>
      </div>

      {/* Account Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Link
          href="/account/orders"
          className="p-6 bg-[#121824] border border-slate-800 rounded-3xl hover:border-amber-500/50 transition-all space-y-3 shadow-xl group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display group-hover:text-amber-400">Order History</h3>
          <p className="text-xs text-slate-400">Track artwork shipments, receipts, and order status</p>
        </Link>

        <Link
          href="/account/downloads"
          className="p-6 bg-[#121824] border border-slate-800 rounded-3xl hover:border-purple-500/50 transition-all space-y-3 shadow-xl group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display group-hover:text-purple-400">Digital Deliverables</h3>
          <p className="text-xs text-slate-400">Access high-resolution digital art proofs & certificates</p>
        </Link>

        <Link
          href="/wishlist"
          className="p-6 bg-[#121824] border border-slate-800 rounded-3xl hover:border-pink-500/50 transition-all space-y-3 shadow-xl group"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display group-hover:text-pink-400">Saved Wishlist</h3>
          <p className="text-xs text-slate-400">Manage bookmarked paintings and custom artwork</p>
        </Link>

        <Link
          href="/artist"
          className="p-6 bg-gradient-to-b from-[#121824] to-[#0a0d14] border border-amber-500/30 rounded-3xl hover:border-amber-400 transition-all space-y-3 shadow-xl group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <User className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-base font-bold text-white font-display group-hover:text-amber-400">Artist Portal</h3>
          <p className="text-xs text-slate-400">Submit original artwork & manage listings</p>
        </Link>

      </div>

      {/* Recent Orders Overview */}
      <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white font-display">Recent Artwork Orders</h2>
          <Link href="/account/orders" className="text-xs text-amber-400 font-bold hover:underline">View All</Link>
        </div>

        <div className="space-y-3">
          {DEMO_ORDERS.map((ord) => (
            <div key={ord.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-white">Order #{ord.order_number}</div>
                <div className="text-[11px] text-slate-400">{new Date(ord.created_at).toLocaleDateString()}</div>
              </div>
              <div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
                  {ord.payment_status}: Confirmed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
