'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Heart, 
  Download, 
  Package, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  ArrowLeft,
  Share2,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { DEMO_PRODUCTS, DEMO_REVIEWS } from '@/lib/demoData';
import { getArtistProfiles } from '@/lib/marketplaceStore';
import { ContactArtistModal } from '@/components/ContactArtistModal';
import { BookArtistModal } from '@/components/BookArtistModal';
import { siteConfig } from '@/config/site';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = DEMO_PRODUCTS.find((p) => p.slug === slug) || DEMO_PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [showBookModal, setShowBookModal] = useState<boolean>(false);

  const artists = getArtistProfiles();
  const artistObj = artists.find(a => a.user_id === product.artist_id || a.id === product.artist_id) || artists[0];

  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const currentCartQty = getItemQuantity(product.id);

  const effectivePrice = product.discount_price ?? product.price;
  const hasDiscount = product.discount_price && product.discount_price < product.price;

  const relatedProducts = DEMO_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const reviews = DEMO_REVIEWS.filter((r) => r.product_id === product.id || r.product_id === 'prod-1');

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    if (currentCartQty === 0) {
      addToCart(product, 1);
    }
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Button */}
      <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Shop Catalog
      </Link>

      {/* Main Grid: Gallery & Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Display Image */}
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#121824] border border-slate-800 shadow-2xl">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.is_digital ? (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-purple-950/90 backdrop-blur-md border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-purple-400" />
                Digital Asset Download
              </span>
            ) : (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-blue-950/90 backdrop-blur-md border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-blue-400" />
                Physical Canvas Edition
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.image_url)}
                  className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img.image_url ? 'border-amber-500 ring-2 ring-amber-500/40' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_url} alt={img.alt_text || 'Thumbnail'} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Details */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-2">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.9 (24 Reviews)</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Category: {product.category?.name || 'Graphic Assets'}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-white font-display leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-[#121824] border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Total Price</div>
              <div className="text-3xl font-extrabold text-white font-display">
                {siteConfig.currency.format(effectivePrice)}
              </div>
              {hasDiscount && (
                <div className="text-xs text-slate-500 line-through">
                  Original: {siteConfig.currency.format(product.price)}
                </div>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-xl border transition-colors ${
                inWishlist ? 'bg-pink-500/20 text-pink-400 border-pink-500/40' : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
              }`}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Product Overview</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* ARTIST PROFILE CARD WIDGET (REQUIREMENT #5) */}
          <div className="p-4 bg-[#121824] border border-amber-500/30 rounded-2xl space-y-3 shadow-xl">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-display">
              Created By Verified Artist
            </div>
            
            <div className="flex items-start gap-3">
              <img
                src={artistObj?.avatar_url || '/founder.jpg'}
                alt={artistObj?.artist_name || 'Abdulmajeed Olasunkanmi O.'}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/40 shrink-0"
              />

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white font-display truncate">
                    {artistObj?.artist_name || 'Abdulmajeed Olasunkanmi O. (Founder)'}
                  </h4>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 shrink-0">
                    <Star className="w-3 h-3 fill-amber-400" /> {artistObj?.rating || 4.9}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {artistObj?.bio || 'Master painter and creative founder specializing in original fine art, portraits, and wall murals.'}
                </p>

                <div className="flex items-center gap-3 pt-1 text-[11px]">
                  <Link
                    href={`/artists/${artistObj?.id || 'art-prof-founder'}`}
                    className="font-bold text-amber-400 hover:underline"
                  >
                    View Artist Profile →
                  </Link>

                  <button
                    onClick={() => setShowContactModal(true)}
                    className="text-slate-300 hover:text-white font-medium underline"
                  >
                    Reach Out
                  </button>

                  <button
                    onClick={() => setShowBookModal(true)}
                    className="text-slate-300 hover:text-white font-medium underline"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery & Access Notice */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
              {product.is_digital ? <Download className="w-4 h-4 text-purple-400" /> : <Package className="w-4 h-4 text-blue-400" />}
              {product.is_digital ? 'Instant Secure Digital Delivery' : 'Insured Physical Shipping'}
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              {product.is_digital
                ? 'After verified payment via Paystack or Flutterwave, instant download links and access tokens are generated in your Account Dashboard.'
                : 'Physical canvas prints are packaged securely with certificates of authenticity and shipped via local courier across Nigeria within 3-5 business days.'}
            </p>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            {addedNotice && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Added to your artwork cart!
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {currentCartQty === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-between bg-slate-900 border border-amber-500/50 rounded-xl p-1 shadow-lg shadow-amber-500/10">
                  <button
                    onClick={() => updateQuantity(product.id, currentCartQty - 1)}
                    className="px-4 py-2 text-xs text-amber-400 hover:bg-slate-800 font-bold rounded-lg"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="text-xs font-extrabold text-white">
                    {currentCartQty} in Cart
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, currentCartQty + 1)}
                    className="px-4 py-2 text-xs text-amber-400 hover:bg-slate-800 font-bold rounded-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}
              
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:opacity-95 shadow-xl shadow-purple-600/20 flex items-center justify-center gap-2 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Specifications Table */}
          {product.specifications && (
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Specifications & Assets</h3>
              <div className="bg-[#121824] border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between border-b border-slate-800/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-slate-400 font-medium">{key}:</span>
                    <span className="text-white font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-12 border-t border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white font-display">Customer Ratings & Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-[#121824] border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold">
                    {rev.user_name?.[0] || 'U'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{rev.user_name}</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-amber-400 text-xs">
                  {'★'.repeat(rev.rating)}
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="pt-12 border-t border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white font-display">Related Creative Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Contact Artist Modal */}
      {showContactModal && (
        <ContactArtistModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          artist={artistObj}
          defaultSubject={`Inquiry regarding "${product.title}"`}
        />
      )}

      {/* Book Artist Modal */}
      {showBookModal && (
        <BookArtistModal
          isOpen={showBookModal}
          onClose={() => setShowBookModal(false)}
          artist={artistObj}
          artworkTitle={product.title}
          defaultPrice={effectivePrice}
        />
      )}

    </div>
  );
}
