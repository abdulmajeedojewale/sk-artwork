'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Palette, 
  ShieldAlert, 
  Search,
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';

export const Navbar = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout, login, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0d14]/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Logo href="/" size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth / Account Dropdown */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 transition-colors"
                  >
                    <img
                      src={user.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
                      alt={user.full_name || 'User'}
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-amber-500/40"
                    />
                    <span className="hidden sm:inline text-xs font-semibold text-slate-200">
                      {user.full_name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-3 w-64 bg-[#121824] border border-slate-800 rounded-2xl shadow-2xl p-2.5 z-50 space-y-2"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-slate-800 space-y-1">
                        <p className="text-xs font-bold text-white truncate">{user.full_name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                            : user.role === 'artist' 
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {user.role === 'admin' ? 'FOUNDER / ADMIN' : user.role === 'artist' ? 'VERIFIED ARTIST' : 'CUSTOMER'}
                        </span>
                      </div>

                      <div className="py-1 space-y-1">
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-purple-400 hover:bg-purple-500/10 rounded-xl transition-colors"
                          >
                            <ShieldAlert className="w-4 h-4 text-purple-400" />
                            Founder / Admin Portal
                          </Link>
                        )}

                        {user.role === 'artist' && (
                          <Link
                            href="/artist"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors"
                          >
                            <Palette className="w-4 h-4 text-amber-400" />
                            Artist Portal & Submissions
                          </Link>
                        )}

                        <Link
                          href="/account"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          Customer Account
                        </Link>

                        {/* Testing Role Switcher */}
                        <div className="pt-2 border-t border-slate-800/80">
                          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Switch Role (Demo Preview)
                          </p>
                          <div className="grid grid-cols-3 gap-1 px-1">
                            <button
                              onClick={() => { login('collector@skartwork.com', 'customer'); setUserDropdownOpen(false); }}
                              className={`py-1 text-[10px] font-bold rounded-lg ${user.role === 'customer' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                            >
                              Customer
                            </button>
                            <button
                              onClick={() => { login('elena.rostova@skartwork.com', 'artist'); setUserDropdownOpen(false); }}
                              className={`py-1 text-[10px] font-bold rounded-lg ${user.role === 'artist' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                            >
                              Artist
                            </button>
                            <button
                              onClick={() => { login('abdulmajeedojewale@gmail.com', 'admin'); setUserDropdownOpen(false); }}
                              className={`py-1 text-[10px] font-bold rounded-lg ${user.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                            >
                              Founder
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1 border-t border-slate-800">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-red-400" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:opacity-90 shadow-lg shadow-amber-500/20 transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-300 hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d14] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium ${
                pathname === link.href
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-bold bg-purple-600/20 text-purple-400 border border-purple-500/30"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
