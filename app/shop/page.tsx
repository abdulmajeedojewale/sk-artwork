'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Package,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Eye,
  ShoppingBag,
  Star,
  X,
  Check
} from 'lucide-react';
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from '@/lib/demoData';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/database';
import { siteConfig } from '@/config/site';
import { useCart } from '@/context/CartContext';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [productType, setProductType] = useState<'all' | 'digital' | 'physical'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { addToCart, getItemQuantity } = useCart();

  const productCategories = DEMO_CATEGORIES.filter((c) => c.type === 'product');

  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      // Search Query filter
      if (
        searchQuery &&
        !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category_id !== selectedCategory) {
        return false;
      }

      // Digital vs Physical filter
      if (productType === 'digital' && !product.is_digital) return false;
      if (productType === 'physical' && product.is_digital) return false;

      // Price filter
      const effectivePrice = product.discount_price ?? product.price;
      if (effectivePrice > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discount_price ?? a.price;
      const priceB = b.discount_price ?? b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return b.is_featured ? 1 : -1;
    });
  }, [searchQuery, selectedCategory, productType, sortBy, maxPrice]);

  const activeFilterCount = (searchQuery ? 1 : 0) + (selectedCategory !== 'all' ? 1 : 0) + (productType !== 'all' ? 1 : 0) + (maxPrice < 250000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header Banner */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              Fine Art & Digital Vault
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Art Store & Digital Assets Catalog
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mt-1">
            Explore original oil canvas paintings, hand-signed portraiture, scenic landscapes, and instant high-res digital ZIP assets by artist Abdulmajeed Olasunkanmi O.
          </p>
        </div>

        {/* View Layout Toggle */}
        <div className="flex items-center bg-[#121824] border border-slate-800 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            aria-label="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            aria-label="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search & Sort Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

        {/* Search Input */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search paintings, portraits, landscapes, wall art..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121824] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Product Type Filter Pills */}
        <div className="md:col-span-3 flex items-center bg-[#121824] border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setProductType('all')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${productType === 'all' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
          >
            All Works
          </button>
          <button
            onClick={() => setProductType('physical')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${productType === 'physical' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
          >
            Physical
          </button>
          <button
            onClick={() => setProductType('digital')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${productType === 'digital' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
          >
            Digital
          </button>
        </div>

        {/* Sort Select */}
        <div className="md:col-span-3 relative">
          <ArrowUpDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="w-full appearance-none bg-[#121824] border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

      </div>

      {/* Category Pills & Price Slider */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#121824]/60 border border-slate-800/80 p-4 rounded-2xl">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
          >
            All Categories ({DEMO_PRODUCTS.length})
          </button>
          {productCategories.map((cat) => {
            const count = DEMO_PRODUCTS.filter((p) => p.category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Price Slider & Reset */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Max: <strong className="text-white font-semibold">₦{maxPrice.toLocaleString()}</strong></span>
            <input
              type="range"
              min="20000"
              max="250000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-32 accent-amber-500 cursor-pointer"
            />
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setProductType('all');
                setMaxPrice(250000);
              }}
              className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[11px] font-bold hover:bg-amber-500 hover:text-slate-950 transition-colors"
            >
              Reset ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Product Display (Grid vs List Layout) */}
      {filteredProducts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                {/* Quick View Hover Button */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center gap-1.5 hover:text-amber-400 shadow-xl"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" /> Quick View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const effectivePrice = product.discount_price ?? product.price;
              const mainImage = product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400';
              const qty = getItemQuantity(product.id);
              return (
                <div key={product.id} className="p-4 bg-[#121824] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-xl hover:border-amber-500/40 transition-colors">
                  <img src={mainImage} alt={product.title} className="w-full sm:w-36 h-36 rounded-xl object-cover" />
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      {product.is_digital ? (
                        <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-bold">Digital Asset</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-blue-950/80 border border-blue-500/30 text-blue-300 text-[10px] font-bold">Physical Canvas</span>
                      )}
                    </div>
                    <Link href={`/shop/${product.slug}`} className="block text-base font-bold text-white hover:text-amber-400 font-display">
                      {product.title}
                    </Link>
                    <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="text-center sm:text-right space-y-3 shrink-0">
                    <div className="text-xl font-extrabold text-amber-400 font-display">
                      {siteConfig.currency.format(effectivePrice)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 flex items-center gap-1.5 shadow-lg shadow-amber-500/10"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add ({qty})
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="text-center py-20 bg-[#121824] border border-slate-800 rounded-3xl space-y-4">
          <SlidersHorizontal className="w-10 h-10 text-amber-400 mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search criteria or price filters to discover available assets.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setProductType('all');
              setMaxPrice(250000);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <img
                src={quickViewProduct.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800'}
                alt={quickViewProduct.title}
                className="w-full aspect-square rounded-2xl object-cover ring-2 ring-slate-800"
              />

              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-bold">
                  {quickViewProduct.is_digital ? 'Digital Asset (Instant ZIP Download)' : 'Physical Hand-Painted Canvas'}
                </span>

                <h3 className="text-xl font-bold text-white font-display">{quickViewProduct.title}</h3>

                <p className="text-xs text-slate-300 leading-relaxed">{quickViewProduct.description}</p>

                <div className="text-2xl font-extrabold text-amber-400 font-display">
                  {siteConfig.currency.format(quickViewProduct.discount_price ?? quickViewProduct.price)}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
                  </button>
                  <Link
                    href={`/shop/${quickViewProduct.slug}`}
                    className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    Full Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

