'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Star, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Calendar, 
  ShoppingBag, 
  Sparkles,
  Maximize2,
  PackageOpen
} from 'lucide-react';
import { getArtistProfiles, getCustomArtworks } from '@/lib/marketplaceStore';
import { DEMO_PRODUCTS, DEMO_SERVICES } from '@/lib/demoData';
import { ProductCard } from '@/components/ProductCard';
import { ContactArtistModal } from '@/components/ContactArtistModal';
import { BookArtistModal } from '@/components/BookArtistModal';
import { useImageViewer } from '@/context/ImageViewerContext';
import { siteConfig } from '@/config/site';

export default function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { openImage } = useImageViewer();
  
  const [artists, setArtists] = useState(getArtistProfiles());
  const [customArtworks, setCustomArtworks] = useState<any[]>([]);

  useEffect(() => {
    setArtists(getArtistProfiles());
    setCustomArtworks(getCustomArtworks());
  }, []);

  const artist = artists.find(a => a.id === id || a.user_id === id) || artists[0];

  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);

  // Combine static and dynamically added artworks for this specific artist
  const allProducts = [...customArtworks, ...DEMO_PRODUCTS];
  const artistArtworks = allProducts.filter(
    p => p.artist_id === artist.user_id || p.artist_id === artist.id
  );

  // Filter services offered
  const artistServices = DEMO_SERVICES.filter(s => s.is_active);

  // Verified reviews
  const reviews = [
    { id: 'rev-1', client_name: 'Dr. Tunde Alabi', rating: 5, comment: 'Exceptional oil portrait work! The likeness and color depth exceeded our expectations.', date: '2 weeks ago' },
    { id: 'rev-2', client_name: 'Mrs. Folake Adeyemi', rating: 5, comment: 'Professional wall mural painting for our living room. Delivered on schedule with immaculate finishing.', date: '1 month ago' },
    { id: 'rev-3', client_name: 'Lagos Fine Art Gallery', rating: 5, comment: 'Outstanding craftsmanship and attention to detail. Certified authentic African fine art.', date: '2 months ago' },
  ];

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. ARTIST INFORMATION & COVER */}
      <section className="relative">
        <div className="h-64 sm:h-80 w-full bg-slate-900 overflow-hidden relative rounded-b-3xl border-b border-slate-800">
          <img
            src={artist.cover_image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200'}
            alt={artist.artist_name}
            onClick={() => openImage(artist.cover_image, `${artist.artist_name} Studio Cover`, artist.studio_name)}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/40 to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 z-10">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
              
              {/* Profile Details */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative group cursor-pointer">
                  <img
                    src={artist.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                    alt={artist.artist_name}
                    onClick={() => openImage(artist.avatar_url, artist.artist_name, `${artist.studio_name} — ${artist.location}`)}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-amber-500/40 shadow-2xl shrink-0 group-hover:opacity-90 transition-opacity"
                  />
                  <div 
                    onClick={() => openImage(artist.avatar_url, artist.artist_name, `${artist.studio_name} — ${artist.location}`)}
                    className="absolute inset-0 rounded-3xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                      VERIFIED RESIDENT ARTIST
                    </span>
                    {artist.is_featured && (
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" /> Featured Collection
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display flex items-center justify-center md:justify-start gap-2">
                    {artist.artist_name}
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </h1>

                  <div className="text-sm font-semibold text-amber-400">{artist.studio_name || 'SK Artworks Atelier'}</div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {artist.location || 'Lagos, Nigeria'}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {artist.rating || 5.0} ({artist.reviews_count || 24} client reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Booking & Reach Out Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  Message Studio
                </button>

                <button
                  onClick={() => setShowBookModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  Commission Artwork
                </button>
              </div>

            </div>

            {/* 2. ABOUT THE ARTIST */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white font-display">About the Artist</h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                {artist.bio}
              </p>

              <div className="flex flex-wrap gap-2 items-center pt-2">
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

      {/* 3. THEIR ARTWORKS & ARTWORK GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              <Palette className="w-6 h-6 text-amber-400" />
              Their Artworks & Paintings
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Original fine art pieces created by {artist.artist_name}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full self-start sm:self-auto">
            {artistArtworks.length} {artistArtworks.length === 1 ? 'Artwork' : 'Artworks'} Available
          </span>
        </div>

        {artistArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistArtworks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#121824] border border-slate-800 rounded-3xl space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <PackageOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">No Artworks Currently Listed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {artist.artist_name} is currently working on new studio collections. You can commission a custom original painting directly or reach out for inquiries.
            </p>
            <button
              onClick={() => setShowBookModal(true)}
              className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Request Custom Commission
            </button>
          </div>
        )}
      </section>

      {/* 4. SERVICES & COMMISSIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-display">Commission & Painting Services</h3>
            <p className="text-xs text-slate-400 mt-0.5">Bespoke artistic services provided by {artist.artist_name}</p>
          </div>
          <button
            onClick={() => setShowBookModal(true)}
            className="text-xs font-bold text-amber-400 hover:underline"
          >
            Custom Inquiry →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artistServices.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-[#121824] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl hover:border-amber-500/40 transition-all"
            >
              <div className="space-y-4">
                <div 
                  className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => openImage(service.image_url!, service.title, `${siteConfig.currency.format(service.starting_price)} Starting Price`)}
                >
                  <img
                    src={service.image_url!}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-lg font-bold text-white font-display">{service.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{service.description}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Starting From</div>
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
      </section>

      {/* 5. VERIFIED CLIENT REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white font-display">Client Reviews & Testimonials</h3>
          <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
            <Star className="w-4 h-4 fill-amber-400" /> {artist.rating || 5.0} Rating
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-sm">{rev.client_name}</div>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
              <div className="text-[11px] text-slate-500">{rev.date}</div>
            </div>
          ))}
        </div>
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
