'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, Palette, Sparkles, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { DEMO_CATEGORIES } from '@/lib/demoData';
import { getArtistProfiles, addCustomArtwork } from '@/lib/marketplaceStore';
import { Product } from '@/types/database';

export default function AdminNewArtworkPage() {
  const router = useRouter();
  const artists = getArtistProfiles();

  const [formData, setFormData] = useState({
    title: '',
    artistId: 'usr-admin-master',
    categoryId: 'cat-1',
    price: 150000,
    discountPrice: 125000,
    dimensions: '30 x 40 inches (76 x 101 cm)',
    medium: 'Oil on Stretched Linen Canvas',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000',
    isPublished: true,
  });

  const [submitted, setSubmitted] = useState(false);

  // Preset African art photography samples
  const PRESET_IMAGES = [
    { label: 'African Oil Portrait', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000' },
    { label: 'Sunset Savannah Landscape', url: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=1000' },
    { label: 'Textured Impasto Canvas', url: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1000' },
    { label: 'Regal Figurative Study', url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1000' },
    { label: 'Contemporary Heritage Abstraction', url: 'https://images.unsplash.com/photo-1579783901586-7880cb4cd40a?w=1000' },
    { label: 'Indigo Cultural Geometry', url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1000' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;

    const matchedCategory = DEMO_CATEGORIES.find(c => c.id === formData.categoryId) || DEMO_CATEGORIES[0];
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newArtwork: Product = {
      id: `prod-custom-${Date.now()}`,
      artist_id: formData.artistId,
      title: formData.title,
      slug: slug || `artwork-${Date.now()}`,
      description: formData.description,
      price: Number(formData.price),
      discount_price: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      category_id: formData.categoryId,
      category: matchedCategory,
      is_digital: false,
      stock: 1,
      is_featured: true,
      is_published: formData.isPublished,
      specifications: {
        'Dimensions': formData.dimensions,
        'Medium': formData.medium,
        'Authenticity': 'Original Hand-Signed Certificate Included',
      },
      images: [
        {
          id: `img-${Date.now()}`,
          product_id: `prod-custom-${Date.now()}`,
          image_url: formData.imageUrl,
          alt_text: formData.title,
          display_order: 1,
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addCustomArtwork(newArtwork);
    setSubmitted(true);

    setTimeout(() => {
      router.push('/admin/products');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
        <Link href="/admin/products" className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">Add New Artwork</h1>
          <p className="text-xs text-slate-400">Publish an original painting and assign it to an artist profile</p>
        </div>
      </div>

      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Artwork published successfully! Assigned to artist profile and gallery. Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-2xl">
        
        {/* Title & Artist Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Artwork Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Elegance in Gold"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Assign to Artist *</label>
            <select
              value={formData.artistId}
              onChange={(e) => setFormData({ ...formData, artistId: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {artists.map((art) => (
                <option key={art.id} value={art.user_id || art.id}>
                  {art.artist_name} ({art.studio_name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category & Medium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Painting Category *</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {DEMO_CATEGORIES.filter(c => c.type === 'product').map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Medium & Technique *</label>
            <input
              type="text"
              required
              placeholder="e.g. Oil on Stretched Linen Canvas"
              value={formData.medium}
              onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Pricing & Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Price (NGN ₦) *</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Discount Price (NGN ₦)</label>
            <input
              type="number"
              value={formData.discountPrice}
              onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Dimensions *</label>
            <input
              type="text"
              required
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Image URL & Quick Presets */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300">Artwork Image URL *</label>
          <input
            type="url"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />

          {/* Presets */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-semibold text-slate-400">Quick African Art Photography Presets:</div>
            <div className="flex flex-wrap gap-2">
              {PRESET_IMAGES.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: p.url })}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all border ${
                    formData.imageUrl === p.url
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Box */}
          {formData.imageUrl && (
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-400 mb-2">Live Image Preview:</div>
              <div className="h-56 w-full max-w-sm rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Description & Artistic Story *</label>
          <textarea
            rows={4}
            required
            placeholder="Describe the background, color palette, brush technique, and story behind this painting..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-90 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" /> Save & Publish to Gallery
        </button>

      </form>

    </div>
  );
}
