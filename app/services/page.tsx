'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  CheckCircle2, 
  Clock, 
  Send, 
  Sparkles, 
  Brush, 
  Star, 
  ArrowRight, 
  User, 
  MessageSquare, 
  Calendar,
  Maximize2
} from 'lucide-react';
import { DEMO_SERVICES } from '@/lib/demoData';
import { siteConfig } from '@/config/site';
import { ContactArtistModal } from '@/components/ContactArtistModal';
import { BookArtistModal } from '@/components/BookArtistModal';
import { useImageViewer } from '@/context/ImageViewerContext';
import { ArtistProfile } from '@/types/database';

export default function ServicesPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(DEMO_SERVICES[0].id);
  const [activeContactArtist, setActiveContactArtist] = useState<Partial<ArtistProfile> & { artist_name: string } | null>(null);
  const [activeBookModal, setActiveBookModal] = useState<{ artist: any; service: any; artworkTitle?: string; price?: number } | null>(null);
  const { openImage } = useImageViewer();

  const selectedService = DEMO_SERVICES.find((s) => s.id === selectedServiceId) || DEMO_SERVICES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-lg">
          <Brush className="w-4 h-4" /> Fine Art Studio Commissions
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
          Custom Artwork & Painting Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Commission bespoke fine art directly from {siteConfig.artistName} and resident African painters. Choose your preferred service category and discuss your project.
        </p>

        {/* Service Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {DEMO_SERVICES.map((serv) => (
            <button
              key={serv.id}
              onClick={() => setSelectedServiceId(serv.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedServiceId === serv.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-[#121824] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {serv.title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Service Overview & Feature Highlights */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-display">
              Selected Service Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              {selectedService.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {selectedService.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="text-left sm:text-right">
              <div className="text-[10px] text-slate-500 uppercase">Starting From</div>
              <div className="text-2xl font-extrabold text-white font-display">
                {siteConfig.currency.format(selectedService.starting_price)}
              </div>
            </div>

            <button
              onClick={() => setActiveBookModal({
                artist: { id: 'usr-admin-master', artist_name: siteConfig.artistName, avatar_url: '/founder.jpg' },
                service: selectedService
              })}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Commission
            </button>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-300">
          {selectedService.features.map((feat, i) => (
            <span key={i} className="flex items-center gap-1.5 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              {feat}
            </span>
          ))}
          <span className="flex items-center gap-1.5 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 font-medium text-slate-400">
            <Clock className="w-4 h-4 text-purple-400 shrink-0" />
            Estimated Timeline: {selectedService.delivery_time_days ? `${selectedService.delivery_time_days} business days` : '7-14 business days'}
          </span>
        </div>
      </div>

      {/* Services Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {DEMO_SERVICES.map((serv) => (
          <div
            key={serv.id}
            className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl"
          >
            <div>
              <div 
                className="aspect-video w-full bg-slate-900 relative overflow-hidden cursor-pointer group"
                onClick={() => openImage(serv.image_url!, serv.title, `Starting from ${siteConfig.currency.format(serv.starting_price)}`)}
              >
                <img
                  src={serv.image_url!}
                  alt={serv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white font-display">
                  {serv.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {serv.description}
                </p>

                <ul className="space-y-2 pt-2 border-t border-slate-800">
                  {serv.features.map((f, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800 mt-auto pt-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Starting From</div>
                <div className="text-lg font-bold text-white font-display">
                  {siteConfig.currency.format(serv.starting_price)}
                </div>
              </div>

              <button
                onClick={() => setActiveBookModal({
                  artist: { id: 'usr-admin-master', artist_name: siteConfig.artistName, avatar_url: '/founder.jpg' },
                  service: serv,
                  price: serv.starting_price
                })}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-md"
              >
                Commission
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Modal Trigger */}
      {activeContactArtist && (
        <ContactArtistModal
          isOpen={!!activeContactArtist}
          onClose={() => setActiveContactArtist(null)}
          artist={activeContactArtist}
        />
      )}

      {/* Book Modal Trigger */}
      {activeBookModal && (
        <BookArtistModal
          isOpen={!!activeBookModal}
          onClose={() => setActiveBookModal(null)}
          artist={activeBookModal.artist}
          service={activeBookModal.service}
          artworkTitle={activeBookModal.artworkTitle}
          defaultPrice={activeBookModal.price}
        />
      )}

    </div>
  );
}
