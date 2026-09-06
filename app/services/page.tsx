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
  Calendar 
} from 'lucide-react';
import { DEMO_SERVICES } from '@/lib/demoData';
import { siteConfig } from '@/config/site';
import { ContactArtistModal } from '@/components/ContactArtistModal';
import { BookArtistModal } from '@/components/BookArtistModal';
import { ServiceArtwork, ArtistProfile } from '@/types/database';

export default function ServicesPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(DEMO_SERVICES[0].id);
  const [activeContactArtist, setActiveContactArtist] = useState<Partial<ArtistProfile> & { artist_name: string } | null>(null);
  const [activeBookModal, setActiveBookModal] = useState<{ artist: any; service: any; artworkTitle?: string; price?: number } | null>(null);

  const selectedService = DEMO_SERVICES.find((s) => s.id === selectedServiceId) || DEMO_SERVICES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-lg">
          <Brush className="w-4 h-4" /> Multi-Artist Marketplace Services
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
          Bespoke Artwork & Custom Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Every service features works created by multiple verified marketplace artists. Explore original creations, select your favorite style, and connect with the specific artist directly.
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
                artist: { id: 'usr-admin-master', artist_name: 'SK Marketplace Artist', avatar_url: '/founder.jpg' },
                service: selectedService
              })}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Category Service
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
            Estimated Timeline: {selectedService.delivery_time_days} Days
          </span>
        </div>
      </div>

      {/* 4. MULTI-ARTIST ARTWORKS GALLERY (6-7+ IMAGES CONNECTED TO ACTUAL ARTISTS) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest font-display mb-1">
              Multi-Artist Gallery ({selectedService.artworks?.length || 0} Artworks)
            </div>
            <h3 className="text-2xl font-extrabold text-white font-display">
              {selectedService.title} Showcase Works
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Click any artwork to contact the connected artist or place a direct booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedService.artworks?.map((art) => (
            <div
              key={art.id}
              className="group bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Artwork High-Res Showcase Image */}
                <div className="aspect-[4/3] w-full bg-slate-900 relative overflow-hidden">
                  <img
                    src={art.image_url}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent opacity-80" />

                  {art.price && (
                    <span className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg font-display">
                      {siteConfig.currency.format(art.price)}
                    </span>
                  )}
                </div>

                {/* Artwork Title & Description */}
                <div className="p-6 space-y-3">
                  <h4 className="text-base font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {art.description || 'Custom crafted fine artwork piece for interior and gallery settings.'}
                  </p>

                  {/* ARTIST CONNECTION WIDGET (REQUIRMENT #4) */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 mt-3">
                    <Link
                      href={`/artists/${art.artist_id}`}
                      className="flex items-center gap-3 min-w-0 group/art"
                    >
                      <img
                        src={art.artist_avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
                        alt={art.artist_name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-500/40 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Created By Artist</div>
                        <div className="text-xs font-bold text-white truncate group-hover/art:text-amber-400 font-display">
                          {art.artist_name}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" /> {art.artist_rating || 4.9}
                        </div>
                      </div>
                    </Link>

                    <Link
                      href={`/artists/${art.artist_id}`}
                      className="text-[11px] font-bold text-amber-400 hover:underline shrink-0"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveContactArtist({
                    id: art.artist_id,
                    artist_name: art.artist_name,
                    avatar_url: art.artist_avatar
                  })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Reach Out
                </button>

                <button
                  onClick={() => setActiveBookModal({
                    artist: { id: art.artist_id, artist_name: art.artist_name, avatar_url: art.artist_avatar },
                    service: selectedService,
                    artworkTitle: art.title,
                    price: art.price
                  })}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Artwork
                </button>
              </div>

            </div>
          ))}
        </div>
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
