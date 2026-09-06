'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  getArtistProfileByUserId, 
  getSubscriptionPlans, 
  updateArtistSubscriptionPlan 
} from '@/lib/marketplaceStore';
import { siteConfig } from '@/config/site';

export default function ArtistSubscriptionPage() {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr-artist-1';
  const [profile, setProfile] = useState(() => getArtistProfileByUserId(currentUserId));
  const [plans, setPlans] = useState(() => getSubscriptionPlans());
  const [selectedPlanId, setSelectedPlanId] = useState(profile.current_plan_id || plans[1].id);
  const [updating, setUpdating] = useState(false);
  const [msg, setMsg] = useState('');

  const currentPlan = plans.find(p => p.id === profile.current_plan_id) || plans[1];

  const handleSubscribe = (planId: string) => {
    setUpdating(true);
    setTimeout(() => {
      const updated = updateArtistSubscriptionPlan(currentUserId, planId);
      if (updated) {
        setProfile(updated);
        setSelectedPlanId(planId);
        setMsg(`Subscription plan successfully updated to ${plans.find(p => p.id === planId)?.name}!`);
      }
      setUpdating(false);
    }, 400);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
          <CreditCard className="w-3.5 h-3.5" /> Artist Membership Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Artist Membership & Billing Plans
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Maintain an active subscription to submit artwork, receive founder curation, and list pieces on the SK Artworks marketplace.
        </p>
      </div>

      {/* Success Notification */}
      {msg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {msg}
          </span>
          <button onClick={() => setMsg('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Current Active Plan Status Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-950/60 via-[#121824] to-purple-950/60 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block font-display">
              Current Active Status
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-white font-display">{currentPlan.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                profile.subscription_status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {profile.subscription_status}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Renews / Expires: <strong className="text-white">{new Date(profile.subscription_expires_at || Date.now()).toLocaleDateString()}</strong>
            </p>
          </div>

          <div className="text-right sm:text-right shrink-0">
            <div className="text-2xl font-black text-amber-400 font-display">
              {siteConfig.currency.format(currentPlan.price)}
            </div>
            <div className="text-xs text-slate-400 uppercase font-mono">
              Billed {currentPlan.billing_period}
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans Grid (Founder Configured) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display">Available Subscription Plans</h2>
          <p className="text-xs text-slate-400">Choose the billing period that fits your studio publishing volume</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlan.id;
            return (
              <div
                key={plan.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 transition-all shadow-xl ${
                  isCurrent 
                    ? 'bg-[#121824] border-amber-500 ring-2 ring-amber-500/30 shadow-amber-500/10' 
                    : 'bg-[#121824]/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                      {plan.billing_period}
                    </span>
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                        ACTIVE PLAN
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-display">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-3xl font-black text-white font-display">
                      {siteConfig.currency.format(plan.price)}
                    </div>
                    <div className="text-[11px] text-slate-400">per {plan.billing_period}</div>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    <li className="flex items-center gap-2 text-slate-300 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Up to {plan.max_submissions} artwork submissions
                    </li>
                    <li className="flex items-center gap-2 text-slate-300 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Up to {plan.max_listings} active listings
                    </li>
                    {plan.features?.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrent || updating}
                  className={`w-full py-3 rounded-2xl font-bold text-xs transition-all ${
                    isCurrent 
                      ? 'bg-slate-900 border border-slate-700 text-slate-400 cursor-default' 
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20'
                  }`}
                >
                  {isCurrent ? 'Current Active Plan' : `Subscribe (${siteConfig.currency.format(plan.price)})`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
