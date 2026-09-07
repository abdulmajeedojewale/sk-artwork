'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UploadCloud, 
  Palette, 
  CreditCard, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  ArrowRight,
  Sparkles,
  Plus,
  Edit3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  getArtistProfileByUserId, 
  getArtworkSubmissions, 
  getSubscriptionPlans,
  getMarketplaceMessages 
} from '@/lib/marketplaceStore';
import { siteConfig } from '@/config/site';

export default function ArtistDashboardPage() {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr-artist-1';
  
  const [profile, setProfile] = useState(() => getArtistProfileByUserId(currentUserId));
  const [submissions, setSubmissions] = useState(() => 
    getArtworkSubmissions().filter(s => s.artist_id === currentUserId || s.artist_id === 'usr-artist-1')
  );
  const [messages, setMessages] = useState(() => 
    getMarketplaceMessages().filter(m => m.receiver_id === currentUserId || m.sender_id === currentUserId)
  );

  const plans = getSubscriptionPlans();
  const currentPlan = plans.find(p => p.id === profile.current_plan_id) || plans[1];

  const pendingCount = submissions.filter(s => s.status === 'pending_approval').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const changesCount = submissions.filter(s => s.status === 'changes_requested').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

  return (
    <div className="space-y-8">
      
      {/* Header Greeting & Submit Action */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Managed Marketplace Artist
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Welcome back, {profile.artist_name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Submit your fine artwork for review by Abdulmajeed Olasunkanmi O. (Founder) and track your moderation status.
          </p>
        </div>

        <Link
          href="/artist/submit"
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center gap-2 shrink-0 transition-transform transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Submit New Artwork
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        
        <div className="p-5 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-lg hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pending Review</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-display">{pendingCount}</div>
          <div className="text-[11px] text-amber-400">Awaiting Founder approval</div>
        </div>

        <div className="p-5 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-lg hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Approved & Live</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-display">{approvedCount}</div>
          <div className="text-[11px] text-emerald-400">Active in marketplace</div>
        </div>

        <div className="p-5 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-lg hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Client Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-display">{profile.bookings_count || 12}</div>
          <div className="text-[11px] text-purple-300">
            <Link href="/artist/bookings" className="underline hover:text-white">View Bookings →</Link>
          </div>
        </div>

        <div className="p-5 bg-[#121824] border border-emerald-500/40 rounded-3xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
            <span>Your Net Earnings (85%)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-emerald-400 font-display">
            {siteConfig.currency.format(profile.total_earnings || 1402500)}
          </div>
          <div className="text-[10px] text-slate-400">After 15% SK commission</div>
        </div>

        <div className="p-5 bg-[#121824] border border-slate-800 rounded-3xl space-y-2 shadow-lg hover:border-pink-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Membership Plan</span>
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-extrabold text-white font-display truncate">{currentPlan.name}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">{profile.subscription_status} status</div>
        </div>

      </div>

      {/* Subscription & Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Details */}
        <div className="lg:col-span-7 p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white font-display">Artist Profile & Studio</h2>
            <Link href="/artist/subscription" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
              Manage Subscription <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Artist Name</span>
                <span className="font-bold text-white text-sm font-display">{profile.artist_name}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Studio Atelier</span>
                <span className="font-bold text-white text-sm font-display">{profile.studio_name || 'SK Partner Studio'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-slate-400 text-[11px] block">Artist Bio</span>
              <p className="text-slate-300 leading-relaxed text-xs">{profile.bio}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-slate-400 text-[11px] block">Specialities</span>
              <div className="flex flex-wrap gap-2">
                {profile.specialties?.map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Plan Card */}
        <div className="lg:col-span-5 p-6 bg-gradient-to-b from-[#121824] to-[#0a0d14] border border-amber-500/30 rounded-3xl space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                Active Membership Plan
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentPlan.billing_period.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white font-display">{currentPlan.name}</h3>
              <div className="text-2xl font-black text-amber-400 font-display mt-1">
                {siteConfig.currency.format(currentPlan.price)} <span className="text-xs font-normal text-slate-400">/ {currentPlan.billing_period}</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Up to {currentPlan.max_submissions} artwork submissions allowed
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Up to {currentPlan.max_listings} active marketplace listings
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Direct review & pricing confirmation by Founder
              </li>
            </ul>
          </div>

          <Link
            href="/artist/subscription"
            className="w-full py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 text-center transition-colors shadow-lg"
          >
            Change / Upgrade Plan
          </Link>
        </div>

      </div>

      {/* Recent Submissions Preview */}
      <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white font-display">Recent Submissions Status</h2>
            <p className="text-xs text-slate-400">Track your artwork through the Founder approval & publishing pipeline</p>
          </div>

          <Link href="/artist/submissions" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
            View All Submissions ({submissions.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {submissions.slice(0, 4).map((sub) => (
            <div key={sub.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
              <img
                src={sub.images?.[0] || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300'}
                alt={sub.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 ring-1 ring-slate-700"
              />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold text-white truncate font-display">{sub.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    sub.status === 'pending_approval' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    sub.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    sub.status === 'changes_requested' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {sub.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="text-[11px] text-amber-400 font-bold font-display">
                  Proposed: {siteConfig.currency.format(sub.proposed_price)}
                </div>

                {sub.admin_feedback && (
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-200">
                    <span className="font-bold text-purple-400">Founder Feedback:</span> {sub.admin_feedback}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
