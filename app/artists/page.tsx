'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Search, 
  Star, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  MessageSquare,
  Filter,
  Maximize2
} from 'lucide-react';
import { getArtistProfiles } from '@/lib/marketplaceStore';
import { ContactArtistModal } from '@/components/ContactArtistModal';
import { BookArtistModal } from '@/components/BookArtistModal';
import { ArtistProfile } from '@/types/database';
import { useImageViewer } from '@/context/ImageViewerContext';

export default function ArtistsDirectoryPage() {
  const [artists] = useState<ArtistProfile[]>(() => getArtistProfiles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [activeContactArtist, setActiveContactArtist] = useState<ArtistProfile | null>(null);
  const [activeBookArtist, setActiveBookArtist] = useState<ArtistProfile | null>(null);
  const { openImage } = useImageViewer();

  // Painting Specialties list
  const allSpecialties = ['all', 'Portraiture', 'Wall Murals', 'Fine Art Painting', 'Landscape Art', 'Abstract Painting'];

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch = 
      artist.artist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.studio_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = 
      selectedSpecialty === 'all' || 
      artist.specialties?.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#121824] via-amber-950/40 to-purple-950/40 border border-slate-800 p-8 sm:p-14 overflow-hidden shadow-2xl space-y-4 text-center sm:text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold shadow-lg">
          <Palette className="w-4 h-4 text-amber-400" />
          <span>SK Artworks Resident Collective</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
          Discover Verified African Artists & <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-purple-400">
            Fine Art Painters
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Explore curated Nigerian and African fine artists, portrait painters, and architectural muralists led by <strong className="text-white">Abdulmajeed Olasunkanmi O.</strong>. Explore artist portfolios and commission original paintings directly.
        </p>

        {/* Filter Controls */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 max-w-3xl">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by artist name, style, or studio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-500 shrink-0 hidden sm:inline" />
            {allSpecialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedSpecialty === spec
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {spec === 'all' ? 'All Specialties' : spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artists Directory Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span>Showing <strong className="text-white font-bold">{filteredArtists.length}</strong> Resident Artists</span>
          <span>Curated by SK Artworks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="group bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Cover Image & Avatar Banner */}
                <div 
                  className="relative h-36 w-full bg-slate-900 overflow-hidden cursor-pointer"
                  onClick={() => openImage(artist.cover_image, `${artist.artist_name} Studio`, artist.studio_name)}
                >
                  <img
                    src={artist.cover_image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800'}
                    alt={artist.artist_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent pointer-events-none" />
                  
                  {artist.is_featured && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1 pointer-events-none">
                      <Sparkles className="w-3 h-3" /> Featured Artist
                    </span>
                  )}
                </div>

                {/* Profile Header Info */}
                <div className="px-6 pt-0 pb-4 relative -mt-10 space-y-3">
                  <div className="flex items-end justify-between">
                    <div 
                      className="relative group/avatar cursor-pointer"
                      onClick={() => openImage(artist.avatar_url, artist.artist_name, `${artist.studio_name} — ${artist.location}`)}
                    >
                      <img
                        src={artist.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                        alt={artist.artist_name}
                        className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#121824] shadow-2xl shrink-0"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{artist.rating || 5.0}</span>
                      <span className="text-[10px] text-slate-500">({artist.reviews_count || 18})</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-extrabold text-white font-display flex items-center gap-1.5 group-hover:text-amber-400 transition-colors">
                      {artist.artist_name}
                      {artist.is_verified !== false && (
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </h2>
                    <p className="text-xs text-amber-400 font-semibold mt-0.5">{artist.studio_name || 'SK Partner Atelier'}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{artist.location || 'Lagos, Nigeria'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {artist.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {artist.specialties?.slice(0, 3).map((spec, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveContactArtist(artist)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Message
                </button>

                <Link
                  href={`/artists/${artist.id}`}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1 shadow-md"
                >
                  View Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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
      {activeBookArtist && (
        <BookArtistModal
          isOpen={!!activeBookArtist}
          onClose={() => setActiveBookArtist(null)}
          artist={activeBookArtist}
        />
      )}

    </div>
  );
}
