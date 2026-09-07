'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Palette, Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/Logo';

// Brand icons removed from lucide-react v1.x — using inline SVGs
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const DribbbleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>
);

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#06080d] border-t border-slate-800 text-slate-400 font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Artist Brand */}
          <div className="space-y-4">
            <Logo href="/" size="md" />
            <p className="text-xs leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.socials.dribbble}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                aria-label="Dribbble"
              >
                <DribbbleIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Studio Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/shop" className="hover:text-amber-400 transition-colors">Artwork Shop</Link></li>
              <li><Link href="/portfolio" className="hover:text-amber-400 transition-colors">Artwork Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Painting & Art Services</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact & Inquiries</Link></li>
              <li><Link href="/faqs" className="hover:text-amber-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Account */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Customer Portal
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/account" className="hover:text-amber-400 transition-colors">Account Dashboard</Link></li>
              <li><Link href="/account/orders" className="hover:text-amber-400 transition-colors">Order History</Link></li>
              <li><Link href="/account/downloads" className="hover:text-amber-400 transition-colors">Digital Downloads</Link></li>
              <li><Link href="/wishlist" className="hover:text-amber-400 transition-colors">Saved Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-amber-400 transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
              Collector Newsletter
            </h3>
            <p className="text-xs text-slate-400">
              Subscribe to receive exclusive asset drops, artwork discount vouchers, and tutorial releases.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Thank you for joining.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
                    aria-label="Submit newsletter"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Security & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Designed & Developed by {siteConfig.artistName}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Secured by Paystack & Flutterwave
            </span>
            <Link href="/contact" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
