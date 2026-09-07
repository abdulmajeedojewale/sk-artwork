'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Package, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Eye, 
  Palette, 
  Maximize2,
  Filter
} from 'lucide-react';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { getCustomArtworks, deleteCustomArtwork, getArtistProfiles } from '@/lib/marketplaceStore';
import { siteConfig } from '@/config/site';
import { useImageViewer } from '@/context/ImageViewerContext';

export default function AdminArtworksPage() {
  const { openImage } = useImageViewer();
  const [artworks, setArtworks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const loadArtworks = () => {
    const custom = getCustomArtworks();
    const combined = [...custom, ...DEMO_PRODUCTS];
    setArtworks(combined);
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const artists = getArtistProfiles();

  const getArtistName = (artistId?: string) => {
    if (!artistId || artistId === 'usr-admin-master') return siteConfig.artistName;
    const match = artists.find(a => a.user_id === artistId || a.id === artistId);
    return match ? match.artist_name : siteConfig.artistName;
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the gallery?`)) {
      deleteCustomArtwork(id);
      setArtworks(prev => prev.filter(a => a.id !== id));
    }
  };

  const filtered = artworks.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) ||
      getArtistName(art.artist_id).toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || art.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">Artwork & Studio Management</h1>
          <p className="text-xs text-slate-400">Add, edit, manage, and assign original African fine art paintings</p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-90 flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Artwork
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by artwork title or artist name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121824] border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="w-full sm:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#121824] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Painting Categories</option>
            <option value="cat-1">Fine-Art Canvas Paintings</option>
            <option value="cat-2">African Portraiture & Figurative Art</option>
            <option value="cat-3">Landscape & Heritage Scenery</option>
            <option value="cat-4">Interior Murals & Fine Art</option>
          </select>
        </div>
      </div>

      {/* Artworks Table */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-display">
              <tr>
                <th className="p-4">Artwork Details</th>
                <th className="p-4">Artist</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((art) => {
                const img = art.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=200';
                return (
                  <tr key={art.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative group cursor-pointer shrink-0">
                        <img 
                          src={img} 
                          alt={art.title} 
                          onClick={() => openImage(img, art.title, getArtistName(art.artist_id))}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700" 
                        />
                        <div 
                          onClick={() => openImage(img, art.title, getArtistName(art.artist_id))}
                          className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-white line-clamp-1">{art.title}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{art.specifications?.Medium || 'Original Oil on Canvas'}</div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-amber-400">
                      {getArtistName(art.artist_id)}
                    </td>
                    <td className="p-4 text-slate-300">
                      {art.category?.name || 'Fine Art Painting'}
                    </td>
                    <td className="p-4 font-bold text-white">
                      {siteConfig.currency.format(art.discount_price ?? art.price)}
                    </td>
                    <td className="p-4">
                      {art.is_published ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                          Active Gallery Listing
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold border border-slate-700">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openImage(img, art.title, `${getArtistName(art.artist_id)} — ${siteConfig.currency.format(art.price)}`)}
                        className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Quick Preview"
                        aria-label="Preview Artwork"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(art.id, art.title)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Delete Artwork"
                        aria-label="Delete Artwork"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
