'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Ticket,
  Truck,
  Check
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { siteConfig } from '@/config/site';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, deliveryFee, total, activeCoupon, applyCoupon, removeCoupon, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '15 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    provider: 'paystack' as 'paystack' | 'flutterwave',
    notes: '',
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hasPhysical = cart.some((i) => !i.product.is_digital);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim().toUpperCase());
    if (res.success) {
      setCouponMsg(`Coupon ${couponInput.toUpperCase()} applied successfully!`);
      setCouponInput('');
    } else {
      setCouponMsg(res.message || 'Invalid coupon code.');
    }
  };

  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg('Please complete all required customer contact details.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const orderNumber = `SK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Initialize payment via backend API endpoint
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: `ord_${Date.now()}`,
          orderNumber,
          email: formData.email,
          amount: total,
          provider: formData.provider,
          callbackUrl: `${window.location.origin}/checkout/confirmation/${orderNumber}`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Payment gateway initialization failed');
      }

      // Store transient order confirmation details
      localStorage.setItem(`sk_order_${orderNumber}`, JSON.stringify({
        orderNumber,
        customerName: formData.fullName,
        customerEmail: formData.email,
        totalAmount: total,
        netAmount: total,
        discountAmount,
        deliveryFee,
        provider: formData.provider,
        reference: data.reference,
        items: cart,
        date: new Date().toISOString(),
      }));

      clearCart();

      // Redirect user to payment authorization gateway (or simulated callback URL)
      window.location.href = data.authorizationUrl;

    } catch (err: any) {
      setErrorMsg(err.message || 'Checkout creation failed. Please check payment gateway credentials.');
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white font-display">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Add products to your cart before proceeding to checkout.</p>
        <Link href="/shop" className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Step Progress Bar */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/cart" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display">Secure Checkout</h1>
            <p className="text-xs text-slate-400">Encrypted payment transaction with Instant Asset Delivery</p>
          </div>
        </div>

        {/* Interactive Step Progress Stepper */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 p-2 bg-[#121824] border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0">1</div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Contact Details</div>
              <div className="text-[10px] text-slate-400 hidden sm:block">Required Info</div>
            </div>
          </div>

          <div className={`flex items-center gap-2 p-2 rounded-xl border ${hasPhysical ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-900 border-slate-800 opacity-60'}`}>
            <div className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-extrabold text-xs shrink-0">2</div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Delivery Address</div>
              <div className="text-[10px] text-slate-400 hidden sm:block">{hasPhysical ? 'Physical Freight' : 'Instant Digital'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0">3</div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Payment Gateway</div>
              <div className="text-[10px] text-slate-400 hidden sm:block">Paystack & Flutterwave</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Customer Info & Shipping */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Customer Contact Info */}
          <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-amber-400" />
              1. Customer Information & Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SK Collector"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. abdulmajeedojewale@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +2349072994416"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address (if physical items exist) */}
          {hasPhysical ? (
            <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  2. Delivery Address (Physical Canvas Prints)
                </h2>
                <span className="text-[11px] text-blue-400 font-semibold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Insured Courier Shipping
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-purple-950/30 border border-purple-500/30 rounded-2xl flex items-center gap-3 text-xs text-purple-300">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <span className="font-bold">Instant Digital Fulfillment:</span> All selected items are digital assets. Download ZIP links will be delivered immediately to your email after verification.
              </div>
            </div>
          )}

          {/* Step 3: Payment Provider Selection */}
          <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2 border-b border-slate-800 pb-3">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              3. Payment Provider Selection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setFormData({ ...formData, provider: 'paystack' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                  formData.provider === 'paystack'
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  P
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    Paystack Payment Gateway
                    {formData.provider === 'paystack' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400">Cards, Bank Transfer, USSD, Apple Pay</div>
                </div>
              </div>

              <div
                onClick={() => setFormData({ ...formData, provider: 'flutterwave' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                  formData.provider === 'flutterwave'
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  F
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    Flutterwave Payment
                    {formData.provider === 'flutterwave' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400">Cards, Mobile Money, Bank Transfer</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Checkout Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-6 shadow-xl sticky top-24">
            <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-4 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-amber-400 font-normal">{cart.length} item(s)</span>
            </h2>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                  <img
                    src={item.product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=200'}
                    alt={item.product.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 truncate">
                    <div className="font-bold text-white truncate">{item.product.title}</div>
                    <div className="text-[11px] text-slate-400">{item.quantity} × {siteConfig.currency.format(item.product.discount_price ?? item.product.price)}</div>
                  </div>
                  <span className="font-bold text-amber-400">
                    {siteConfig.currency.format((item.product.discount_price ?? item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Redemption Input */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-amber-400" /> Have a Coupon Code?
              </label>
              
              {activeCoupon ? (
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-400">{activeCoupon.code}</span>
                    <span className="text-[10px] text-slate-300 ml-1.5">({activeCoupon.discount_type === 'percentage' ? `${activeCoupon.discount_value}% OFF` : `₦${activeCoupon.discount_value} OFF`})</span>
                  </div>
                  <button type="button" onClick={removeCoupon} className="text-red-400 font-bold hover:underline text-[11px]">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code e.g. WELCOME10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponMsg && <div className="text-[11px] text-amber-400 font-semibold">{couponMsg}</div>}
            </div>

            {/* Subtotals & Delivery Fees */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-semibold">{siteConfig.currency.format(subtotal)}</span>
              </div>
              {activeCoupon && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount ({activeCoupon.code})</span>
                  <span>-{siteConfig.currency.format(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Shipping / Freight</span>
                <span className="text-white font-semibold">
                  {deliveryFee > 0 ? siteConfig.currency.format(deliveryFee) : 'FREE Digital Delivery'}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-lg font-extrabold text-white font-display">
                <span>Total Amount</span>
                <span className="text-amber-400">{siteConfig.currency.format(total)}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? (
                <span>Initializing Secure Gateway...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay {siteConfig.currency.format(total)} Now
                </>
              )}
            </button>

            <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              256-Bit SSL Encrypted & Verified Server Verification
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}

