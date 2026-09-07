'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Plus, 
  Search, 
  ShieldCheck, 
  Star, 
  DollarSign, 
  Eye, 
  Edit3, 
  Trash2, 
  AlertOctagon, 
  Sparkles, 
  CheckCircle2,
  X
} from 'lucide-react';
import { 
  getArtistProfiles, 
  upsertArtistProfileInStore, 
  toggleArtistVisibility, 
  deleteArtistProfile,
  getCommissionSetting 
} from '@/lib/marketplaceStore';
import { siteConfig } from '@/config/site';
import { ArtistProfile } from '@/types/database';

export default function AdminArtistsPage() {
  const [artists, setArtists] = useState<ArtistProfile[]>(() => getArtistProfiles());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArtist, setEditingArtist] = useState<ArtistProfile | null>(null);

  const commSetting = getCommissionSetting();

  // Form State
  const [formData, setFormData] = useState({
    artist_name: '',
    email: '',
    phone: '',
    specialties: 'Fine Art Painting, Wall Murals',
    studio_name: '',
    location: 'Lagos, Nigeria',
    bio: '',
    avatar_url: '',
    cover_image: '',
  });

  const handleRefresh = () => {
    setArtists(getArtistProfiles());
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.artist_name || !formData.email) return;

    upsertArtistProfileInStore({
      id: editingArtist?.id,
      user_id: editingArtist?.user_id,
      artist_name: formData.artist_name,
      email: formData.email,
      phone: formData.phone,
      specialties: formData.specialties.split(',').map(s => s.trim()),
      studio_name: formData.studio_name || `${formData.artist_name} Studio`,
      location: formData.location,
      bio: formData.bio,
      avatar_url: formData.avatar_url,
      cover_image: formData.cover_image,
    });

    handleRefresh();
    setShowAddModal(false);
    setEditingArtist(null);
    setFormData({
      artist_name: '',
      email: '',
      phone: '',
      specialties: 'Fine Art Painting, Wall Murals',
      studio_name: '',
      location: 'Lagos, Nigeria',
      bio: '',
      avatar_url: '',
      cover_image: '',
    });
  };

  const handleEditInit = (artist: ArtistProfile) => {
    setEditingArtist(artist);
    setFormData({
      artist_name: artist.artist_name,
      email: artist.email || '',
      phone: artist.phone || '',
      specialties: artist.specialties?.join(', ') || 'Fine Art Painting',
      studio_name: artist.studio_name || '',
      location: artist.location || 'Lagos, Nigeria',
      bio: artist.bio || '',
      avatar_url: artist.avatar_url || '',
      cover_image: artist.cover_image || '',
    });
    setShowAddModal(true);
  };

  const handleToggleFeatured = (id: string) => {
    toggleArtistVisibility(id);
    handleRefresh();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove artist "${name}" from the marketplace?`)) {
      deleteArtistProfile(id);
      handleRefresh();
    }
  };

  const filteredArtists = artists.filter(a =>
    a.artist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.studio_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              Marketplace CMS
            </span>
            <span className="text-xs text-slate-400">SK Artworks Partners</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-display mt-1">Marketplace Artists Management</h1>
          <p className="text-xs text-slate-400">Manage fine artists, inspect portfolios & services, adjust ratings, and review commission ledgers</p>
        </div>

        <button
          onClick={() => {
            setEditingArtist(null);
            setFormData({
              artist_name: '',
              email: '',
              phone: '',
              specialties: 'Fine Art Painting, Wall Murals',
              studio_name: '',
              location: 'Lagos, Nigeria',
              bio: '',
              avatar_url: '',
              cover_image: '',
            });
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Artist
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search artist name, studio, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>Configured Commission Rate: <strong className="text-amber-400 font-bold font-display">{commSetting.commission_percentage}%</strong></span>
          <Link href="/admin/settings" className="text-amber-400 underline font-semibold">Change Rate</Link>
        </div>
      </div>

      {/* Artists Management Table */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Artist Profile</th>
                <th className="p-4">Location & Studio</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Listings / Bookings</th>
                <th className="p-4">Total Earnings</th>
                <th className="p-4">SK Commission ({commSetting.commission_percentage}%)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredArtists.map((artist) => {
                const totalSales = artist.total_earnings || 1200000;
                const skCommission = Math.round((totalSales * commSetting.commission_percentage) / 100);

                return (
                  <tr key={artist.id} className="hover:bg-slate-900/40 transition-colors">
                    
                    {/* Artist Profile */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={artist.avatar_url || '/founder.jpg'}
                          alt={artist.artist_name}
                          className="w-11 h-11 rounded-xl object-cover ring-2 ring-amber-500/30"
                        />
                        <div>
                          <div className="font-bold text-white font-display flex items-center gap-1.5">
                            {artist.artist_name}
                            {artist.is_verified !== false && (
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{artist.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Location & Studio */}
                    <td className="p-4">
                      <div className="font-semibold text-white">{artist.studio_name || 'SK Studio'}</div>
                      <div className="text-[11px] text-slate-400">{artist.location || 'Lagos, Nigeria'}</div>
                    </td>

                    {/* Rating */}
                    <td className="p-4 font-bold text-amber-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{artist.rating || 4.9}</span>
                        <span className="text-[10px] text-slate-500 font-normal">({artist.reviews_count || 12})</span>
                      </div>
                    </td>

                    {/* Listings & Bookings */}
                    <td className="p-4">
                      <div className="font-semibold text-white">{artist.active_listings || 4} Listings</div>
                      <div className="text-[11px] text-purple-400">{artist.bookings_count || 8} Bookings Completed</div>
                    </td>

                    {/* Total Earnings */}
                    <td className="p-4 font-bold text-emerald-400 font-display">
                      {siteConfig.currency.format(totalSales - skCommission)}
                    </td>

                    {/* SK Commission */}
                    <td className="p-4 font-bold text-amber-400 font-display">
                      {siteConfig.currency.format(skCommission)}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/admin/artists/${artist.id}`}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold inline-flex items-center gap-1"
                        title="View Full Management Page"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" /> Inspect
                      </Link>

                      <button
                        onClick={() => handleEditInit(artist)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold inline-flex items-center gap-1"
                        title="Edit Artist Profile"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-blue-400" /> Edit
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(artist.id)}
                        className={`px-2.5 py-1.5 rounded-lg border font-semibold inline-flex items-center gap-1 ${
                          artist.is_featured
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                        title="Toggle Featured Artist Banner"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Featured
                      </button>

                      {artist.id !== 'art-prof-founder' && (
                        <button
                          onClick={() => handleDelete(artist.id, artist.artist_name)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/60 font-semibold inline-flex items-center gap-1"
                          title="Suspend / Remove Artist"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Artist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-display">
                {editingArtist ? `Edit Artist: ${editingArtist.artist_name}` : 'Add New Marketplace Artist'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Artist Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Artist Name"
                    value={formData.artist_name}
                    onChange={(e) => setFormData({ ...formData, artist_name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="artist@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Studio Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rostova Atelier"
                    value={formData.studio_name}
                    onChange={(e) => setFormData({ ...formData, studio_name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Lagos, Nigeria"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Specialties (comma separated)</label>
                <input
                  type="text"
                  placeholder="Oil Portraiture, Wall Murals, Fine Art"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Biography</label>
                <textarea
                  rows={3}
                  placeholder="Short artist introduction..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Avatar Image URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Cover Image URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-lg shadow-amber-500/20"
              >
                {editingArtist ? 'Save Profile Changes' : 'Register New Marketplace Artist'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
