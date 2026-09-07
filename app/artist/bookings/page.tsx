'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  User, 
  Phone, 
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getBookings, updateBookingStatus, getCommissionSetting } from '@/lib/marketplaceStore';
import { siteConfig } from '@/config/site';
import { Booking, BookingStatus } from '@/types/database';

export default function ArtistBookingsPage() {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr-artist-1';

  const [bookings, setBookings] = useState<Booking[]>(() => 
    getBookings().filter(b => b.artist_id === currentUserId || b.artist_id === 'usr-artist-1')
  );

  const commSetting = getCommissionSetting();

  const handleRefresh = () => {
    setBookings(getBookings().filter(b => b.artist_id === currentUserId || b.artist_id === 'usr-artist-1'));
  };

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    updateBookingStatus(id, newStatus);
    handleRefresh();
  };

  const totalGross = bookings.reduce((sum, b) => sum + b.total_amount, 0);
  const totalCommission = bookings.reduce((sum, b) => sum + b.commission_amount, 0);
  const totalNet = bookings.reduce((sum, b) => sum + b.artist_earnings, 0);

  return (
    <div className="space-y-8">
      
      {/* Back Link */}
      <Link href="/artist" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Artist Portal Dashboard
      </Link>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold mb-1">
            <Palette className="w-3.5 h-3.5" /> Client Direct Bookings
          </div>
          <h1 className="text-3xl font-extrabold text-white font-display">My Client Bookings & Earnings</h1>
          <p className="text-xs text-slate-400">View client requests, update fulfillment statuses, and track your 85% net earnings payout</p>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-slate-400">Total Bookings Gross</div>
          <div className="text-2xl font-extrabold text-white font-display">{siteConfig.currency.format(totalGross)}</div>
          <div className="text-[11px] text-slate-500">{bookings.length} client bookings</div>
        </div>

        <div className="p-6 bg-[#121824] border border-amber-500/40 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">SK Platform Commission ({commSetting.commission_percentage}%)</div>
          <div className="text-2xl font-extrabold text-amber-400 font-display">{siteConfig.currency.format(totalCommission)}</div>
          <div className="text-[11px] text-amber-300 font-semibold">Quality & Payment Protection Fee</div>
        </div>

        <div className="p-6 bg-[#121824] border border-emerald-500/40 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Your Take-Home Net (85%)</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-display">{siteConfig.currency.format(totalNet)}</div>
          <div className="text-[11px] text-emerald-300 font-semibold">Eligible for weekly bank transfer</div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Booking Ref</th>
                <th className="p-4">Client Contact</th>
                <th className="p-4">Service Details</th>
                <th className="p-4">Requested Date</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Your Net Earnings (85%)</th>
                <th className="p-4">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4 font-bold text-white font-mono">#{b.booking_number}</td>

                  <td className="p-4">
                    <div className="font-bold text-white">{b.client_name}</div>
                    <div className="text-[11px] text-slate-400">{b.client_email}</div>
                    <div className="text-[10px] text-slate-500">{b.client_phone}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-white">{b.service_title || 'Custom Service'}</div>
                    {b.notes && <div className="text-[11px] text-slate-400 line-clamp-1">"{b.notes}"</div>}
                  </td>

                  <td className="p-4 font-semibold text-amber-400">{b.date}</td>

                  <td className="p-4 font-bold text-white font-display">{siteConfig.currency.format(b.total_amount)}</td>

                  <td className="p-4 font-bold text-emerald-400 font-display">{siteConfig.currency.format(b.artist_earnings)}</td>

                  <td className="p-4">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold focus:outline-none cursor-pointer ${
                        b.status === 'completed'
                          ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-400'
                          : b.status === 'in_progress'
                          ? 'bg-purple-950/80 border border-purple-500/50 text-purple-300'
                          : b.status === 'confirmed'
                          ? 'bg-blue-950/80 border border-blue-500/50 text-blue-300'
                          : b.status === 'cancelled'
                          ? 'bg-red-950/80 border border-red-500/50 text-red-400'
                          : 'bg-amber-950/80 border border-amber-500/50 text-amber-400'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
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
