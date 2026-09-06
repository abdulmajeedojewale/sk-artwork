'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, Download, Package } from 'lucide-react';
import { DEMO_CATEGORIES } from '@/lib/demoData';

export default function AdminNewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: 15000,
    discountPrice: 12000,
    categoryId: 'cat-1',
    isDigital: true,
    digitalUrl: 'https://example.com/downloads/custom-asset.zip',
    stock: 999,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    isFeatured: true,
    isPublished: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Product created successfully!');
    router.push('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
        <Link href="/admin/products" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">Create Product Asset</h1>
          <p className="text-xs text-slate-400">Add a new digital asset pack or physical canvas print</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Product Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Cyberpunk 3D Icon Bundle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">URL Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Regular Price (NGN) *</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Discount Price (NGN)</label>
            <input
              type="number"
              value={formData.discountPrice}
              onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase">Description *</label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Product Image URL *</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Product Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            >
              {DEMO_CATEGORIES.filter((c) => c.type === 'product').map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Save & Publish Product
        </button>

      </form>

    </div>
  );
}
