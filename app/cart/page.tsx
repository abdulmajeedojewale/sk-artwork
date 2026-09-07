'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, ArrowRight, Ticket, CheckCircle2, AlertCircle, ArrowLeft, Download, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/site';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, discountAmount, deliveryFee, total, activeCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    setCouponMsg(res);
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-white font-display">Your Shopping Cart is Empty</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Explore our collection of 3D icon packs, luxury branding mockups, and limited canvas prints.
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
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display">Shopping Cart</h1>
          <p className="text-xs text-slate-400">Review your selected creative assets before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const price = item.product.discount_price ?? item.product.price;
            return (
              <div
                key={item.product.id}
                className="p-4 sm:p-5 bg-[#121824] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                    <img
                      src={item.product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                      {item.product.is_digital ? 'Digital Asset' : 'Physical Print'}
                    </span>
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="text-sm font-bold text-white hover:text-amber-400 transition-colors font-display line-clamp-1"
                    >
                      {item.product.title}
                    </Link>
                    <div className="text-xs text-slate-400 mt-1">
                      Unit Price: {siteConfig.currency.format(price)}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-white font-display">
                      {siteConfig.currency.format(price * item.quantity)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-4">
              Order Summary
            </h2>

            {/* Subtotal & Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-semibold">{siteConfig.currency.format(subtotal)}</span>
              </div>

              {activeCoupon && (
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5" /> Coupon ({activeCoupon.code})
                  </span>
                  <span className="font-semibold">-{siteConfig.currency.format(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Estimated Delivery Fee</span>
                <span className="text-white font-semibold">
                  {deliveryFee > 0 ? siteConfig.currency.format(deliveryFee) : 'FREE (Digital Assets)'}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-extrabold text-white font-display">
                <span>Total Due</span>
                <span className="text-amber-400">{siteConfig.currency.format(total)}</span>
              </div>
            </div>

            {/* Coupon Input Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Have a Voucher or Promo Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try 'SK10' or 'VIP5000'"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors"
                >
                  Apply
                </button>
              </div>

              {couponMsg && (
                <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                  couponMsg.success ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {couponMsg.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {couponMsg.message}
                </div>
              )}
            </form>

            {/* Proceed to Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all block text-center"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
