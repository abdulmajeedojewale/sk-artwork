'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, HelpCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How do digital downloads work after payment?",
      a: "As soon as your payment is verified by Paystack or Flutterwave, instant download access is granted. You can download your high-res ZIP files directly on the order confirmation page or anytime from your Account Dashboard under 'Digital Downloads'."
    },
    {
      q: "What payment methods are supported?",
      a: "We accept all Nigerian bank debit cards (Verve, Visa, Mastercard), Instant Bank Transfers, USSD, and Flutterwave mobile money."
    },
    {
      q: "Can I use purchased digital assets for commercial client projects?",
      a: "Yes! All digital asset packs include our Commercial License, permitting use in commercial client projects, pitch decks, landing pages, and social media campaigns."
    },
    {
      q: "How are physical art prints shipped?",
      a: "Physical canvas art prints are framed, safely packaged in protective wooden boxes, and delivered via registered courier across Nigeria within 3-5 business days."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Contact & Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Have questions about an asset order or custom design commission? Reach out to SK Artwork directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info & Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
              Send a Direct Message
            </h2>

            {submitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-300">We will respond to {formData.email} within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1.5">
                  <h3 className="text-xs font-bold text-white font-display">{faq.q}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
