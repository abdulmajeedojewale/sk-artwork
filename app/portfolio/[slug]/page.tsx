'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UserCheck, Calendar, Palette, Brush, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { DEMO_PORTFOLIO } from '@/lib/demoData';
import { siteConfig } from '@/config/site';

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const project = DEMO_PORTFOLIO.find((p) => p.slug === slug) || DEMO_PORTFOLIO[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Artist Portfolio Gallery
      </Link>

      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
          <Brush className="w-4 h-4" /> {project.category?.name || 'Fine Art Showcase'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400">
          {project.client_name && (
            <span className="flex items-center gap-1.5 text-slate-300">
              <UserCheck className="w-4 h-4 text-amber-400" /> Collector / Client: <strong className="text-white">{project.client_name}</strong>
            </span>
          )}
          {project.date_completed && (
            <span className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-4 h-4 text-purple-400" /> Completed: <strong className="text-white">{project.date_completed}</strong>
            </span>
          )}
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Artist Signed Original
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white font-display">Artwork Description & Creative Process</h2>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {project.description}
        </p>
      </div>

      {/* Medium & Materials Used */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">Medium & Materials Used</h3>
        <div className="flex flex-wrap gap-2.5">
          {project.tools_used.map((tool, i) => (
            <span key={i} className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-300 shadow-md">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* High-res Image Showcase */}
      <div className="space-y-6 pt-6">
        <h3 className="text-xl font-bold text-white font-display">High-Resolution Artwork Visuals</h3>
        <div className="space-y-8">
          <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {project.gallery?.map((img, idx) => (
            <div key={idx} className="aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              <img src={img} alt={`${project.title} Detail ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Commission Similar Piece Call to Action */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-2xl font-extrabold font-display">Impressed by this artwork?</h3>
          <p className="text-xs sm:text-sm font-semibold opacity-90">
            Commission Abdulmajeed Olasunkanmi O. for a similar portrait, landscape, or wall painting tailored to your space.
          </p>
        </div>
        <Link
          href="/services"
          className="px-6 py-3.5 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-900 shrink-0 transition-colors shadow-xl"
        >
          Commission Custom Art
        </Link>
      </div>

    </div>
  );
}
