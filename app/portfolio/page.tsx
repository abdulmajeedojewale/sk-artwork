'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  Eye,
  X,
  Send,
  Calendar
} from 'lucide-react';
import { DEMO_PORTFOLIO, DEMO_CATEGORIES } from '@/lib/demoData';
import { PortfolioCard } from '@/components/PortfolioCard';
import { PortfolioProject } from '@/types/database';
import { siteConfig } from '@/config/site';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<PortfolioProject | null>(null);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [commissionSuccess, setCommissionSuccess] = useState(false);

  const [commissionForm, setCommissionForm] = useState({
    name: '',
    email: '',
    artType: 'Oil Painting Portrait',
    budget: '₦150,000 - ₦300,000',
    description: '',
  });

  const portfolioCategories = DEMO_CATEGORIES.filter((c) => c.type === 'portfolio');

  const filteredProjects = selectedCategory === 'all'
    ? DEMO_PORTFOLIO
    : DEMO_PORTFOLIO.filter((p) => p.category_id === selectedCategory);

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommissionSuccess(true);
    setTimeout(() => {
      setCommissionSuccess(false);
      setShowCommissionModal(false);
      setCommissionForm({
        name: '',
        email: '',
        artType: 'Oil Painting Portrait',
        budget: '₦150,000 - ₦300,000',
        description: '',
      });
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* FOUNDER PROFILE & INTRO */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Founder Image */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src={siteConfig.artistImage}
              alt={siteConfig.artistName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#121824] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121824] to-transparent lg:hidden" />
          </div>

          {/* Founder Bio */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-5 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
              {siteConfig.artistName}
            </h1>
            <p className="text-sm text-amber-400 font-semibold">Founder &amp; Lead Artist</p>

            <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am <strong className="text-white">{siteConfig.artistName}</strong>, the founder of {siteConfig.name}. 
                My work is rooted in a deep passion for visual expression — oil portraiture, wall murals, 
                landscape painting, and decorative fine art.
              </p>
              <p>
                Every piece I create starts with a personal connection. Whether it is capturing someone&apos;s likeness, 
                transforming a blank wall, or telling a story through colour and form — art, to me, is about 
                creating something that stays with people.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowCommissionModal(true)}
                className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 shadow-lg shadow-amber-500/15 inline-flex items-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" /> Request Custom Artwork
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* GALLERY */}
      <div className="space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-display">Gallery</span>
            <h2 className="text-3xl font-bold text-white font-display mt-1">
              Selected Works
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              All
            </button>
            {portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="relative group">
              <PortfolioCard project={project} />
              <button
                onClick={() => setActiveLightbox(project)}
                className="absolute top-3 left-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:text-amber-400 flex items-center gap-1.5 shadow-xl"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" /> View
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={activeLightbox.cover_image}
              alt={activeLightbox.title}
              className="w-full max-h-[450px] object-cover rounded-2xl ring-1 ring-slate-800"
            />

            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[11px] font-bold">
                {activeLightbox.category?.name || 'Artwork'}
              </span>
              <h3 className="text-2xl font-bold text-white font-display">{activeLightbox.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{activeLightbox.description}</p>
              
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
                {activeLightbox.tools_used.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Commission Modal */}
      {showCommissionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowCommissionModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white font-display">
                Request Custom Artwork
              </h3>
              <p className="text-xs text-slate-400">Describe what you have in mind and we&apos;ll get back to you.</p>
            </div>

            {commissionSuccess ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs text-slate-300">We&apos;ll review your request and reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleCommissionSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={commissionForm.name}
                    onChange={(e) => setCommissionForm({ ...commissionForm, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={commissionForm.email}
                    onChange={(e) => setCommissionForm({ ...commissionForm, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Type of Artwork</label>
                  <select
                    value={commissionForm.artType}
                    onChange={(e) => setCommissionForm({ ...commissionForm, artType: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Oil Painting Portrait">Oil Painting Portrait</option>
                    <option value="Wall Mural">Wall Mural</option>
                    <option value="Landscape Painting">Landscape Painting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Describe Your Vision *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Subject, preferred size, colours, any reference images..."
                    value={commissionForm.description}
                    onChange={(e) => setCommissionForm({ ...commissionForm, description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/15"
                >
                  <Send className="w-3.5 h-3.5" /> Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
