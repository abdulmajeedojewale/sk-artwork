'use client';

import React from 'react';
import Link from 'next/link';
import { Palette, Brush, ShieldCheck, Heart, ArrowRight, MapPin, Award, Maximize2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useImageViewer } from '@/context/ImageViewerContext';

export default function AboutPage() {
  const { openImage } = useImageViewer();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold shadow-lg">
          <Palette className="w-4 h-4 text-amber-400" />
          <span>About SK Artworks</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
          Handcrafted Fine Art Rooted in <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            African Heritage & Passion
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The story, philosophy, and dedication behind SK Artworks — founded by fine artist Abdulmajeed Olasunkanmi O. in Lagos, Nigeria.
        </p>
      </section>

      {/* 2. FOUNDER STORY & STUDIO ATELIER */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#121824] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div 
          className="lg:col-span-5 relative group cursor-pointer"
          onClick={() => openImage(siteConfig.artistImage, siteConfig.artistName, 'Founder & Lead Artist at Work')}
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-700/80">
            <img
              src={siteConfig.artistImage}
              alt={siteConfig.artistName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute top-4 right-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-semibold shadow-lg">
            <Maximize2 className="w-4 h-4" />
            <span>Expand Photo</span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-display">
              The Artist Behind the Canvas
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Abdulmajeed Olasunkanmi O.
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Studio Atelier in Lekki Phase 1, Lagos, Nigeria</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I began painting out of an instinctive love for the richness of color, the depth of human expression, and the enduring beauty of West African culture. For me, art has never been merely decorative — it is a lasting visual dialogue between the painter, the subject, and the space it inhabits.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every piece created at SK Artworks is hand-crafted with focused patience using professional-grade oil pigments, heavy linen canvases, and protective satin finishes. Whether working on an intimate family portrait or a 20-foot feature wall mural, the commitment to authenticity and craftsmanship remains unchanged.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <div className="text-2xl font-bold text-white font-display">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Original Studio Paintings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-display">Certified</div>
              <div className="text-xs text-slate-400 mt-0.5">Hand-Signed Certificates</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDIO VALUES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">Our Studio Principles</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            What guides every brushstroke and custom artwork commission at SK Artworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
              🎨
            </div>
            <h3 className="text-lg font-bold text-white font-display">Authentic Expression</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We celebrate genuine African heritage, storytelling, and honest emotions rather than generic or synthetic art.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl">
              🛡️
            </div>
            <h3 className="text-lg font-bold text-white font-display">Archival Quality</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We use heavy-gauge Belgian linen, lightfast artists&apos; oil pigments, and UV protective varnishes built to endure for generations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
              🤝
            </div>
            <h3 className="text-lg font-bold text-white font-display">Direct Collaboration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clients collaborate directly with the artist throughout the commission process — from composition sketch to final delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 sm:p-12 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display">Ready to discuss a custom painting?</h3>
          <p className="text-xs sm:text-sm font-semibold opacity-90">
            Whether for your private residence, corporate office, or as a memorable gift, let&apos;s create something remarkable together.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-8 py-4 rounded-2xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-900 shrink-0 transition-colors shadow-xl"
        >
          Contact the Studio
        </Link>
      </section>

    </div>
  );
}
