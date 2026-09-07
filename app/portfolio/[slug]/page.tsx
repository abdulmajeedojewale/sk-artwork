'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UserCheck, Calendar, Palette, Brush, CheckCircle2, ShieldCheck, Maximize2 } from 'lucide-react';
import { DEMO_PORTFOLIO } from '@/lib/demoData';
import { siteConfig } from '@/config/site';
import { useImageViewer } from '@/context/ImageViewerContext';

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openImage } = useImageViewer();

  const project = DEMO_PORTFOLIO.find((p) => p.slug === slug) || DEMO_PORTFOLIO[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Studio Portfolio
      </Link>

      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
          <Brush className="w-4 h-4" /> {project.category?.name || 'Fine Art Painting'}
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
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Studio Original Painting
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white font-display">Artistic Concept & Execution</h2>
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

      {/* High-res Image Showcase with Lightbox */}
      <div className="space-y-6 pt-6">
        <h3 className="text-xl font-bold text-white font-display">High-Resolution Artwork Visuals</h3>
        <div className="space-y-8">
          <div 
            className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl cursor-pointer group"
            onClick={() => openImage(project.cover_image, project.title, project.client_name)}
          >
            <img 
              src={project.cover_image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute top-4 right-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-semibold shadow-lg">
              <Maximize2 className="w-4 h-4" />
              <span>Click to Expand</span>
            </div>
          </div>

          {project.gallery?.map((img, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl cursor-pointer group"
              onClick={() => openImage(img, `${project.title} — Detail ${idx + 1}`)}
            >
              <img 
                src={img} 
                alt={`${project.title} Detail ${idx + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-4 h-4" />
                <span>Click to Expand</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Call to Action */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-2xl font-extrabold font-display">Interested in a custom painting?</h3>
          <p className="text-xs sm:text-sm font-semibold opacity-90">
            Commission {siteConfig.artistName} for an original portrait, landscape, or custom wall mural tailored to your home or office.
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
