'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, Palette, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface FAQItem {
  question: string;
  answer: string;
  category: 'services' | 'commissions' | 'orders' | 'general';
}

const FAQS_DATA: FAQItem[] = [
  {
    question: "What type of painting services do you offer?",
    answer: "SK Artworks offers a wide range of artwork and painting services including fine-art canvas paintings, portrait painting, landscape painting, life-image painting, interior wall painting, exterior wall painting, and custom architectural wall murals.",
    category: "services"
  },
  {
    question: "Do you create custom artwork?",
    answer: "Yes! Custom artwork commissions are a core part of SK Artworks. Artist Abdulmajeed Olasunkanmi O. works directly with clients to translate personal ideas, themes, memories, or color preferences into custom canvas paintings or wall art.",
    category: "commissions"
  },
  {
    question: "Do you create portrait paintings?",
    answer: "Yes, we specialize in custom portrait paintings created from your photograph or life reference. Portraits can be crafted using oil or acrylic paint on museum-grade stretched canvas.",
    category: "commissions"
  },
  {
    question: "Do you provide interior and exterior painting?",
    answer: "Yes. We offer professional interior and exterior painting for residential homes, office spaces, studios, and commercial buildings. We handle surface preparation, color consultation, texture work, and weather-resistant protective coatings.",
    category: "services"
  },
  {
    question: "Do you provide interior decoration?",
    answer: "Yes! Our interior decoration services combine wall paintings, custom artwork placement, color coordination, and decorative wall finishes to transform living and work environments.",
    category: "services"
  },
  {
    question: "Can I request a specific artwork or custom dimensions?",
    answer: "Absolutely. Whether you need a specific canvas size for a living room feature wall or a multi-panel artwork series, we accommodate custom size and specification requests.",
    category: "commissions"
  },
  {
    question: "How long does a painting project take?",
    answer: "Completion time depends on the medium and scale. Ready-to-ship gallery canvas prints ship within 3–5 business days. Custom portrait or landscape commissions typically take 7–14 days to complete and dry before dispatch.",
    category: "orders"
  },
  {
    question: "How do I place an order or commission an artwork?",
    answer: "You can purchase available paintings directly through our online shop catalog. For custom commissions or wall painting inquiries, submit an inquiry form through our Services page or contact us via email.",
    category: "orders"
  },
  {
    question: "Do you work with clients outside your location?",
    answer: "Yes! We work with art collectors and clients across Nigeria and internationally. Original canvas paintings are packaged in secure custom wooden crates with insured shipping.",
    category: "general"
  },
  {
    question: "How can I contact SK Artworks?",
    answer: `You can reach out via email at ${siteConfig.contact.email}, by phone at ${siteConfig.contact.phone}, or by filling out the inquiry form at the bottom of this page.`,
    category: "general"
  }
];

export default function FAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });

  const filteredFaqs = FAQS_DATA.filter((faq) => activeCategory === 'all' || faq.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.email || !inquiry.message) return;
    setSubmitted(true);
    setInquiry({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Everything You Need to Know
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Learn more about our fine-art painting services, portrait commissions, wall art, delivery timelines, and ordering process.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All FAQs' },
          { id: 'services', label: 'Painting Services' },
          { id: 'commissions', label: 'Custom Artwork' },
          { id: 'orders', label: 'Ordering & Shipping' },
          { id: 'general', label: 'General & Contact' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#121824] border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Inquiry Contact Box */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-display">
            Have a Specific Question?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Contact Artist Studio Directly
          </h2>
          <p className="text-xs text-slate-400">
            Have a custom painting idea or wall art project? Send a message directly to Abdulmajeed Olasunkanmi O..
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5" /> Thank you! Your inquiry has been sent to the artist.
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adebayo Johnson"
                  value={inquiry.name}
                  onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. adebayo@example.com"
                  value={inquiry.email}
                  onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Message / Project Details</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your artwork request, wall dimensions, or questions..."
                value={inquiry.message}
                onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" /> Send Studio Message
            </button>
          </form>
        )}

        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-slate-400">
          <div>Email: <strong className="text-white">{siteConfig.contact.email}</strong></div>
          <div>Phone: <strong className="text-white">{siteConfig.contact.phone}</strong></div>
          <div>Studio: <strong className="text-white">{siteConfig.contact.address}</strong></div>
        </div>
      </div>

    </div>
  );
}
