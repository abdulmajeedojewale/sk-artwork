'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Filter,
  User,
  Calendar
} from 'lucide-react';
import { getBookings, updateBookingStatus, getCommissionSetting } from '@/lib/marketplaceStore';
import { siteConfig } from '@/config/site';
import { Booking, BookingStatus } from '@/types/database';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(() => getBookings());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');

  const commSetting = getCommissionSetting();

  const handleRefresh = () => {
    setBookings(getBookings());
  };

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    updateBookingStatus(id, newStatus);
    handleRefresh();
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.booking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.artist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.service_title && b.service_title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Aggregated totals
  const totalVolume = filteredBookings.reduce((sum, b) => sum + b.total_amount, 0);
  const totalCommission = filteredBookings.reduce((sum, b) => sum + b.commission_amount, 0);
  const totalArtistEarnings = filteredBookings.reduce((sum, b) => sum + b.artist_earnings, 0);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              Financial & Operations CMS
            </span>
            <span className="text-xs text-slate-400 font-semibold">SK Commission Engine Tracked</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-display mt-1">Bookings & Financial Ledger</h1>
          <p className="text-xs text-slate-400">Track client-artist booking requests, monitor 15% platform commissions, and manage fulfillment workflow</p>
        </div>
      </div>

      {/* Financial Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-slate-400">Total Bookings Volume</div>
          <div className="text-2xl font-extrabold text-white font-display">{siteConfig.currency.format(totalVolume)}</div>
          <div className="text-[11px] text-slate-500">{filteredBookings.length} total bookings recorded</div>
        </div>

        <div className="p-6 bg-[#121824] border border-amber-500/40 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">SK Artworks Commission ({commSetting.commission_percentage}%)</div>
          <div className="text-2xl font-extrabold text-amber-400 font-display">{siteConfig.currency.format(totalCommission)}</div>
          <div className="text-[11px] text-amber-300 font-semibold">Platform retained commission</div>
        </div>

        <div className="p-6 bg-[#121824] border border-emerald-500/40 rounded-3xl space-y-2 shadow-xl">
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Total Artist Earnings ({100 - commSetting.commission_percentage}%)</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-display">{siteConfig.currency.format(totalArtistEarnings)}</div>
          <div className="text-[11px] text-emerald-300 font-semibold">Disbursed to marketplace artists</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search booking #, client, artist, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500 shrink-0 hidden sm:inline" />
          {(['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st === 'all' ? 'All Statuses' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Ledger Table */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Booking Ref</th>
                <th className="p-4">Client Details</th>
                <th className="p-4">Assigned Artist</th>
                <th className="p-4">Requested Service</th>
                <th className="p-4">Total Payment</th>
                <th className="p-4">SK Commission (15%)</th>
                <th className="p-4">Artist Earnings</th>
                <th className="p-4">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                  
                  <td className="p-4 font-bold text-white font-mono">#{b.booking_number}</td>

                  <td className="p-4">
                    <div className="font-bold text-white">{b.client_name}</div>
                    <div className="text-[11px] text-slate-400">{b.client_email}</div>
                    <div className="text-[10px] text-slate-500">{b.client_phone}</div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={b.artist_avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
                        alt={b.artist_name}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-amber-500/30"
                      />
                      <span className="font-semibold text-white">{b.artist_name}</span>
                    </div>
                  </td>

                  <td className="p-4 font-medium text-slate-200">
                    {b.service_title || 'Custom Commission'}
                  </td>

                  <td className="p-4 font-bold text-white font-display">
                    {siteConfig.currency.format(b.total_amount)}
                  </td>

                  <td className="p-4 font-bold text-amber-400 font-display">
                    {siteConfig.currency.format(b.commission_amount)}
                  </td>

                  <td className="p-4 font-bold text-emerald-400 font-display">
                    {siteConfig.currency.format(b.artist_earnings)}
                  </td>

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
