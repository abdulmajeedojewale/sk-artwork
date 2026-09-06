'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Palette, 
  UploadCloud, 
  CreditCard, 
  MessageSquare, 
  User, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getArtistProfileByUserId, getSubscriptionPlans } from '@/lib/marketplaceStore';

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isArtist, isAdmin, login } = useAuth();

  // If user is logged in as customer or not logged in, prompt to activate artist mode
  const currentUserId = user?.id || 'usr-artist-1';
  const profile = getArtistProfileByUserId(currentUserId);
  const plans = getSubscriptionPlans();
  const currentPlan = plans.find(p => p.id === profile.current_plan_id) || plans[1];

  const navItems = [
    { name: 'Overview', href: '/artist', icon: LayoutDashboard },
    { name: 'Submit Artwork', href: '/artist/submit', icon: UploadCloud },
    { name: 'My Submissions', href: '/artist/submissions', icon: Palette },
    { name: 'Membership & Subscription', href: '/artist/subscription', icon: CreditCard },
    { name: 'Founder Messages', href: '/artist/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 pb-16">
      
      {/* Top Banner for Role Status */}
      <div className="bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
              alt={profile.artist_name}
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-amber-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-white font-display">{profile.artist_name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase">
                  Verified Artist
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {profile.studio_name || 'Independent Fine Artist'} • {profile.specialties?.join(', ') || 'Oil Painting, Canvas'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 text-[10px] block">Subscription</span>
                <span className="font-bold text-white text-[11px]">{profile.subscription_status} ({currentPlan.name})</span>
              </div>
            </div>

            {!isArtist && (
              <button
                onClick={() => login('elena.rostova@skartwork.com', 'artist')}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md"
              >
                Switch to Artist Mode
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Artist Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-[#121824] border border-slate-800/90 rounded-3xl p-3 shadow-xl space-y-1">
              <div className="px-4 py-3 border-b border-slate-800/80 mb-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-display">
                  Artist Studio Portal
                </span>
                <span className="text-xs text-slate-400">Manage submissions & reviews</span>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Managed Marketplace Policy Box */}
            <div className="p-5 bg-gradient-to-b from-purple-950/40 to-[#121824] border border-purple-500/30 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold font-display">
                <Sparkles className="w-4 h-4" /> Marketplace Workflow
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                All submitted artwork is reviewed by the founder before being published to customers. Artists cannot directly publish listings.
              </p>
              <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                Artist → Founder Review → Customer Shop
              </div>
            </div>
          </aside>

          {/* Page Content */}
          <main className="lg:col-span-9">
            {children}
          </main>

        </div>
      </div>

    </div>
  );
}
