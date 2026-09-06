'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Package, Edit, Trash2, Search, CheckCircle2, XCircle, Star } from 'lucide-react';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { siteConfig } from '@/config/site';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [search, setSearch] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">Product Catalog Management</h1>
          <p className="text-xs text-slate-400">Create, edit, publish, or delete digital assets & canvas prints</p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> Create New Product
        </Link>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Filter products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#121824] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white"
        />
      </div>

      {/* Table */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-display">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={prod.images?.[0]?.image_url} alt={prod.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-white line-clamp-1">{prod.title}</div>
                      <div className="text-[10px] text-slate-500">{prod.category?.name}</div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">
                    {prod.is_digital ? (
                      <span className="text-purple-400">Digital</span>
                    ) : (
                      <span className="text-blue-400">Physical</span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-white">
                    {siteConfig.currency.format(prod.discount_price ?? prod.price)}
                  </td>
                  <td className="p-4 font-semibold text-slate-300">{prod.stock}</td>
                  <td className="p-4">
                    {prod.is_published ? (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Published</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-bold">Draft</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      aria-label="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
