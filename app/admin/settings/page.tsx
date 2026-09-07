'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, Palette, Globe, Phone, Mail, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getCommissionSetting, updateCommissionSetting } from '@/lib/marketplaceStore';

// Brand icons removed from lucide-react v1.x — using inline SVGs
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const DribbbleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>
);

export default function AdminSettingsPage() {
  const [commSetting, setCommSetting] = useState(() => getCommissionSetting());
  const [commissionRate, setCommissionRate] = useState<number>(commSetting.commission_percentage || 15);

  const [settings, setSettings] = useState({
    brandName: siteConfig.name,
    artistName: siteConfig.artistName,
    contactEmail: siteConfig.contact.email,
    contactPhone: siteConfig.contact.phone,
    address: siteConfig.contact.address,
    instagram: siteConfig.socials.instagram,
    twitter: siteConfig.socials.twitter,
    dribbble: siteConfig.socials.dribbble,
    currency: 'NGN',
    paymentProvider: 'paystack',
    deliveryFee: 3500,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommissionSetting(commissionRate);
    setCommSetting(getCommissionSetting());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const paystackConfigured = !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const flutterwaveConfigured = !!process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white font-display">Store & Brand Configuration</h1>
        <p className="text-xs text-slate-400">Manage artist branding, social links, payment setup, and shipping defaults</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Marketplace Commission Setting Card (REQUIREMENT #7) */}
        <div className="p-6 bg-[#121824] border border-amber-500/40 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Marketplace Commission Rate
              </h2>
              <p className="text-xs text-slate-400">Configurable percentage automatically deducted from client payments per booking</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs border border-amber-500/30">
              Active: {commissionRate}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase">SK Commission Percentage (%) *</label>
              <input
                type="number"
                min={0}
                max={50}
                step={1}
                required
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-amber-400 focus:outline-none focus:border-amber-500 font-display"
              />
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="text-slate-400 font-semibold text-[11px]">Calculated Example (₦100,000 Booking):</div>
              <div className="flex justify-between text-amber-400 font-bold">
                <span>Platform Commission ({commissionRate}%):</span>
                <span>₦{((100000 * commissionRate) / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Artist Earnings ({100 - commissionRate}%):</span>
                <span>₦{(100000 - (100000 * commissionRate) / 100).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Identity */}
        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2 border-b border-slate-800 pb-3">
            <Palette className="w-4 h-4 text-amber-400" /> Brand Identity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Brand / Store Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Artist / Designer Name</label>
              <input
                type="text"
                value={settings.artistName}
                onChange={(e) => setSettings({ ...settings, artistName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2 border-b border-slate-800 pb-3">
            <Mail className="w-4 h-4 text-purple-400" /> Contact Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Phone Number</label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Business Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe className="w-4 h-4 text-cyan-400" /> Social Media & Portfolio Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1"><InstagramIcon className="w-3 h-3" /> Instagram</label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1"><TwitterIcon className="w-3 h-3" /> Twitter / X</label>
              <input
                type="url"
                value={settings.twitter}
                onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1"><DribbbleIcon className="w-3 h-3" /> Dribbble</label>
              <input
                type="url"
                value={settings.dribbble}
                onChange={(e) => setSettings({ ...settings, dribbble: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateway Status */}
        <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Payment Gateway Configuration Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Paystack</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  paystackConfigured
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {paystackConfigured ? 'LIVE CONNECTED' : 'DEV / SIMULATION MODE'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {paystackConfigured
                  ? 'Paystack API keys are configured. Live transactions enabled.'
                  : 'Set PAYSTACK_SECRET_KEY and NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in .env to enable live Paystack payments.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Flutterwave</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  flutterwaveConfigured
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {flutterwaveConfigured ? 'LIVE CONNECTED' : 'DEV / SIMULATION MODE'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {flutterwaveConfigured
                  ? 'Flutterwave API keys are configured. Live transactions enabled.'
                  : 'Set FLUTTERWAVE_SECRET_KEY and NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY in .env to enable live Flutterwave payments.'}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {saved && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Settings saved successfully!
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Save All Settings
        </button>

      </form>
    </div>
  );
}
