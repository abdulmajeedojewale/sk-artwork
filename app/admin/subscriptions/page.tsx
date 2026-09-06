'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  ShieldCheck,
  Save,
  Layers
} from 'lucide-react';
import { 
  getSubscriptionPlans, 
  saveSubscriptionPlans, 
  upsertSubscriptionPlan, 
  getArtistProfiles 
} from '@/lib/marketplaceStore';
import { SubscriptionPlan, BillingPeriod } from '@/types/database';
import { siteConfig } from '@/config/site';

export default function AdminSubscriptionsPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(() => getSubscriptionPlans());
  const [artistProfiles] = useState(() => getArtistProfiles());

  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Plan Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [maxSubmissions, setMaxSubmissions] = useState(10);
  const [maxListings, setMaxListings] = useState(10);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');

  const openCreateModal = () => {
    setEditingPlan(null);
    setIsCreatingNew(true);
    setName('');
    setPrice('');
    setBillingPeriod('monthly');
    setMaxSubmissions(10);
    setMaxListings(10);
    setDescription('Artist membership plan with full gallery curation.');
    setFeatures('Submit artworks, Priority founder review, Artist profile page');
  };

  const openEditModal = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setIsCreatingNew(false);
    setName(plan.name);
    setPrice(plan.price);
    setBillingPeriod(plan.billing_period);
    setMaxSubmissions(plan.max_submissions);
    setMaxListings(plan.max_listings);
    setDescription(plan.description);
    setFeatures(plan.features ? plan.features.join(', ') : '');
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const featureArr = features.split(',').map(f => f.trim()).filter(Boolean);

    const updatedPlans = upsertSubscriptionPlan({
      id: editingPlan?.id,
      name,
      price: Number(price),
      billing_period: billingPeriod,
      max_submissions: Number(maxSubmissions),
      max_listings: Number(maxListings),
      description,
      features: featureArr,
      is_active: true,
    });

    if (updatedPlans) {
      setPlans(updatedPlans);
      setEditingPlan(null);
      setIsCreatingNew(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              Dynamic Pricing Engine
            </span>
            <span className="text-xs text-slate-400">NO HARDCODED PRICES</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-display mt-1">Artist Subscription Plan Manager</h1>
          <p className="text-xs text-slate-400">Create, edit, adjust prices, and set submission limits for Weekly, Monthly, and Yearly plans</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Create New Plan
        </button>
      </div>

      {/* Plans List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const subscribersCount = artistProfiles.filter(a => a.current_plan_id === plan.id).length;

          return (
            <div
              key={plan.id}
              className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider font-mono">
                    {plan.billing_period}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {subscribersCount} Active Artists
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white font-display">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="text-3xl font-black text-amber-400 font-display">
                    {siteConfig.currency.format(plan.price)}
                  </div>
                  <div className="text-[11px] text-slate-400">Billing cycle: {plan.billing_period}</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Submissions:</span>
                    <span className="font-bold text-white">{plan.max_submissions} artworks / cycle</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Active Listings:</span>
                    <span className="font-bold text-white">{plan.max_listings} listings</span>
                  </div>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  {plan.features?.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => openEditModal(plan)}
                className="w-full py-3 rounded-2xl bg-slate-900 border border-slate-700 text-amber-400 font-bold text-xs hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors mt-4"
              >
                <Edit3 className="w-4 h-4" /> Edit Plan Rules & Price
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit / Create Plan Modal */}
      {(editingPlan || isCreatingNew) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                {isCreatingNew ? 'Create New Subscription Plan' : `Edit "${editingPlan?.name}"`}
              </h3>
              <button onClick={() => { setEditingPlan(null); setIsCreatingNew(false); }} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Plan Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Monthly Studio Membership"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Price (₦ NGN) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="e.g. 15000"
                    required
                    min={0}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Billing Period *</label>
                  <select
                    value={billingPeriod}
                    onChange={(e) => setBillingPeriod(e.target.value as BillingPeriod)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Max Submissions Allowed</label>
                  <input
                    type="number"
                    value={maxSubmissions}
                    onChange={(e) => setMaxSubmissions(Number(e.target.value))}
                    required
                    min={1}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Max Active Listings</label>
                  <input
                    type="number"
                    value={maxListings}
                    onChange={(e) => setMaxListings(Number(e.target.value))}
                    required
                    min={1}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Features List (Comma Separated)</label>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => { setEditingPlan(null); setIsCreatingNew(false); }}
                  className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" /> Save Plan Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
