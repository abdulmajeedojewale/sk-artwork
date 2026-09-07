'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  MapPin, 
  DollarSign, 
  ShoppingBag, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  Package,
  Mail,
  Phone
} from 'lucide-react';
import { getArtistProfiles, getBookings, getCommissionSetting } from '@/lib/marketplaceStore';
import { DEMO_PRODUCTS, DEMO_SERVICES } from '@/lib/demoData';
import { siteConfig } from '@/config/site';

export default function AdminArtistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const artists = getArtistProfiles();
  const artist = artists.find(a => a.id === id || a.user_id === id) || artists[0];

  const commSetting = getCommissionSetting();
  const bookings = getBookings().filter(b => b.artist_id === artist.user_id || b.artist_id === artist.id);

  // Financial calculations
  const totalGross = bookings.reduce((sum, b) => sum + b.total_amount, 0) || (artist.total_earnings || 1650000);
  const totalCommission = Math.round((totalGross * commSetting.commission_percentage) / 100);
  const netEarnings = totalGross - totalCommission;

  const products = DEMO_PRODUCTS.filter(p => p.artist_id === artist.user_id || p.artist_id === artist.id);

  return (
    <div className="space-y-8">
      
      {/* Back Button */}
      <Link href="/admin/artists" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Artists CMS Directory
      </Link>

      {/* Profile Header */}
      <div className="p-8 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={artist.avatar_url || '/founder.jpg'}
              alt={artist.artist_name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-500/40 shadow-2xl shrink-0"
            />

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  VERIFIED MARKETPLACE ARTIST
                </span>
                {artist.is_featured && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured Curation
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-extrabold text-white font-display flex items-center justify-center md:justify-start gap-2">
                {artist.artist_name}
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </h1>

              <p className="text-xs font-bold text-amber-400">{artist.studio_name || 'SK Partner Atelier'}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" /> {artist.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-500" /> {artist.phone || '+234...'}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {artist.location || 'Lagos, Nigeria'}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/artists/${artist.id}`}
            target="_blank"
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-lg"
          >
            View Public Profile ↗
          </Link>

        </div>
      </div>

      {/* Financial Ledger & Commission Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-slate-400">Total Client Payments</div>
          <div className="text-2xl font-extrabold text-white font-display">{siteConfig.currency.format(totalGross)}</div>
          <div className="text-[11px] text-slate-500">Gross bookings and sales revenue</div>
        </div>

        <div className="p-6 bg-[#121824] border border-amber-500/40 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">SK Artworks Commission ({commSetting.commission_percentage}%)</div>
          <div className="text-2xl font-extrabold text-amber-400 font-display">{siteConfig.currency.format(totalCommission)}</div>
          <div className="text-[11px] text-amber-300 font-semibold">Retained by SK Artworks platform</div>
        </div>

        <div className="p-6 bg-[#121824] border border-emerald-500/40 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Artist Net Earnings ({100 - commSetting.commission_percentage}%)</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-display">{siteConfig.currency.format(netEarnings)}</div>
          <div className="text-[11px] text-emerald-300 font-semibold">Eligible for weekly automated payout</div>
        </div>

      </div>

      {/* Bookings Ledger for this Artist */}
      <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white font-display">Client Bookings Ledger ({bookings.length})</h2>
          <span className="text-xs text-slate-400">Live Commission Engine Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Booking Ref</th>
                <th className="p-3">Client Name</th>
                <th className="p-3">Service Title</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">SK Commission (15%)</th>
                <th className="p-3">Artist Net (85%)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-white font-mono">#{b.booking_number}</td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{b.client_name}</div>
                    <div className="text-[10px] text-slate-400">{b.client_email}</div>
                  </td>
                  <td className="p-3 font-medium text-slate-200">{b.service_title || 'Custom Service'}</td>
                  <td className="p-3 font-bold text-white font-display">{siteConfig.currency.format(b.total_amount)}</td>
                  <td className="p-3 font-bold text-amber-400 font-display">{siteConfig.currency.format(b.commission_amount)}</td>
                  <td className="p-3 font-bold text-emerald-400 font-display">{siteConfig.currency.format(b.artist_earnings)}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-[10px] font-bold uppercase">
                      {b.status}
                    </span>
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
