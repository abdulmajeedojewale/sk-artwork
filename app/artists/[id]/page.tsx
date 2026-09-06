'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Star, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles,
  Award,
  Phone,
  Mail
} from 'lucide-react';
import { getArtistProfiles } from '@/lib/marketplaceStore';
import { DEMO_PRODUCTS, DEMO_PORTFOLIO, DEMO_SERVICES } from '@/lib/demoData';
import { ProductCard } from '@/components/ProductCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { ContactArtistModal } from '@/components/ContactArtistModal';
import { BookArtistModal } from '@/components/BookArtistModal';
import { siteConfig } from '@/config/site';

export default function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const artists = getArtistProfiles();
  const artist = artists.find(a => a.id === id || a.user_id === id) || artists[0];

  const [activeTab, setActiveTab] = useState<'portfolio' | 'shop' | 'services' | 'reviews'>('portfolio');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);

  // Filter artworks created by this artist
  const artistProducts = DEMO_PRODUCTS.filter(
    p => p.artist_id === artist.user_id || p.artist_id === artist.id || artist.user_id === 'usr-admin-master'
  );

  // Filter portfolio projects
  const artistPortfolio = DEMO_PORTFOLIO;

  // Filter services offered
  const artistServices = DEMO_SERVICES.filter(s => s.is_active);

  // Demo reviews
  const reviews = [
    { id: 'rev-1', client_name: 'Dr. Tunde Alabi', rating: 5, comment: 'Exceptional oil portrait work! The likeness and color depth exceeded our expectations.', date: '2 weeks ago' },
    { id: 'rev-2', client_name: 'Mrs. Folake Adeyemi', rating: 5, comment: 'Professional wall mural painting for our living room. Delivered on schedule and clean finish.', date: '1 month ago' },
    { id: 'rev-3', client_name: 'Lagos Fine Art Gallery', rating: 4.8, comment: 'Outstanding craftsmanship and attention to detail. Certified authentic fine art.', date: '2 months ago' },
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. HERO PROFILE COVER & HEADER */}
      <section className="relative">
        <div className="h-64 sm:h-80 w-full bg-slate-900 overflow-hidden relative rounded-b-3xl border-b border-slate-800">
          <img
            src={artist.cover_image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200'}
            alt={artist.artist_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 z-10">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
              
              {/* Profile Details */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                  src={artist.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'}
                  alt={artist.artist_name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-amber-500/40 shadow-2xl shrink-0"
                />

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                      VERIFIED MARKETPLACE ARTIST
                    </span>
                    {artist.is_featured && (
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" /> Featured Curation
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display flex items-center justify-center md:justify-start gap-2">
                    {artist.artist_name}
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </h1>

                  <div className="text-sm font-semibold text-amber-400">{artist.studio_name || 'SK Partner Atelier'}</div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {artist.location || 'Lagos, Nigeria'}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {artist.rating || 4.9} ({artist.reviews_count || 19} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Booking & Reach Out Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  Reach Out to Artist
                </button>

                <button
                  onClick={() => setShowBookModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  Book / Request Service
                </button>
              </div>

            </div>

            {/* Bio & Specialties */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                {artist.bio}
              </p>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Specializations:</span>
                {artist.specialties?.map((spec, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROFILE TABBED NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'portfolio'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Portfolio Gallery ({artistPortfolio.length})
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'shop'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Artworks for Sale ({artistProducts.length})
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'services'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Services Offered ({artistServices.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'reviews'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Client Reviews ({reviews.length})
          </button>
        </div>

        {/* TAB 1: PORTFOLIO GALLERY */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">Featured Portfolio Showcase</h3>
              <span className="text-xs text-slate-400">Created by {artist.artist_name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artistPortfolio.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ARTWORKS FOR SALE */}
        {activeTab === 'shop' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">Available Fine Art Products</h3>
              <span className="text-xs text-slate-400">Directly from {artist.studio_name || artist.artist_name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {artistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES OFFERED */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">Services Offered by {artist.artist_name}</h3>
              <button
                onClick={() => setShowBookModal(true)}
                className="text-xs font-bold text-amber-400 hover:underline"
              >
                Request Custom Booking
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artistServices.slice(0, 3).map((service) => (
                <div
                  key={service.id}
                  className="bg-[#121824] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl hover:border-amber-500/40 transition-all"
                >
                  <div className="space-y-4">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900">
                      <img
                        src={service.image_url!}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-white font-display">{service.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Starting Price</div>
                      <div className="text-base font-bold text-white font-display">
                        {siteConfig.currency.format(service.starting_price)}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowBookModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">Verified Client Reviews</h3>
              <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" /> {artist.rating || 4.9} rating
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-white text-sm">{rev.client_name}</div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      {Array.from({ length: Math.floor(rev.rating) }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                  <div className="text-[11px] text-slate-500">{rev.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactArtistModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          artist={artist}
        />
      )}

      {/* Book Modal */}
      {showBookModal && (
        <BookArtistModal
          isOpen={showBookModal}
          onClose={() => setShowBookModal(false)}
          artist={artist}
        />
      )}

    </div>
  );
}
