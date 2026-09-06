'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Download, Package, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types/database';
import { siteConfig } from '@/config/site';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const currentQty = getItemQuantity(product.id);

  const mainImage = product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80';
  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const effectivePrice = product.discount_price ?? product.price;

  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discount_price!) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-[#121824] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
      
      {/* Top Image Box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Digital vs Physical Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.is_digital ? (
            <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 backdrop-blur-md border border-purple-500/30 text-purple-300 text-[11px] font-bold flex items-center gap-1">
              <Download className="w-3 h-3 text-purple-400" />
              Digital Asset
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-blue-950/80 backdrop-blur-md border border-blue-500/30 text-blue-300 text-[11px] font-bold flex items-center gap-1">
              <Package className="w-3 h-3 text-blue-400" />
              Physical Canvas
            </span>
          )}

          {hasDiscount && (
            <span className="px-2 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-bold shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Floating Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition-all z-10 ${
            inWishlist
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
              : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>4.9 (24 reviews)</span>
          </div>

          <Link href={`/shop/${product.slug}`} className="block group-hover:text-amber-400 transition-colors">
            <h3 className="text-base font-bold text-white font-display line-clamp-1">
              {product.title}
            </h3>
          </Link>
          
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-white font-display">
              {siteConfig.currency.format(effectivePrice)}
            </div>
            {hasDiscount && (
              <div className="text-xs text-slate-500 line-through">
                {siteConfig.currency.format(product.price)}
              </div>
            )}
          </div>

          {currentQty === 0 ? (
            <button
              onClick={() => addToCart(product, 1)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-lg shadow-amber-500/10 flex items-center gap-1.5 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center bg-slate-900 border border-amber-500/50 rounded-xl overflow-hidden shadow-lg shadow-amber-500/10">
              <button
                onClick={() => updateQuantity(product.id, currentQty - 1)}
                className="px-2.5 py-1.5 text-xs text-amber-400 hover:bg-slate-800 font-bold"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-3 py-1.5 text-xs font-extrabold text-white bg-slate-950">
                {currentQty}
              </span>
              <button
                onClick={() => updateQuantity(product.id, currentQty + 1)}
                className="px-2.5 py-1.5 text-xs text-amber-400 hover:bg-slate-800 font-bold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
