'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/site';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-pink-400">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-white font-display">Your Wishlist is Empty</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Save your favorite vector art, 3D packs, and branding mockups to buy later.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-xl shadow-amber-500/20"
        >
          Explore Shop Catalog
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white font-display">Saved Wishlist ({wishlist.length})</h1>
        <p className="text-xs text-slate-400">Items you've bookmarked for your creative projects</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((product) => {
          const effectivePrice = product.discount_price ?? product.price;
          return (
            <div key={product.id} className="bg-[#121824] border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-4 space-y-4 flex flex-col justify-between">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 relative">
                <img
                  src={product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-slate-900/80 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <Link href={`/shop/${product.slug}`} className="text-base font-bold text-white hover:text-amber-400 font-display line-clamp-1">
                  {product.title}
                </Link>
                <div className="text-lg font-extrabold text-white font-display">
                  {siteConfig.currency.format(effectivePrice)}
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  removeFromWishlist(product.id);
                }}
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" /> Move to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
