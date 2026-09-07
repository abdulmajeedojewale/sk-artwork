'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Palette, 
  Users, 
  Ticket, 
  Mail, 
  Settings, 
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  CheckSquare,
  CreditCard,
  PlusCircle
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoading && !isAdmin && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [isLoading, isAdmin, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center text-slate-400 text-xs">
        Loading CMS Administration...
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const adminNav = [
    { name: 'Executive Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Artwork Management', href: '/admin/products', icon: Package },
    { name: 'Add New Artwork', href: '/admin/products/new', icon: PlusCircle },
    { name: 'Artwork Moderation', href: '/admin/submissions', icon: CheckSquare },
    { name: 'Marketplace Artists', href: '/admin/artists', icon: Users },
    { name: 'Bookings & Commissions', href: '/admin/bookings', icon: ShoppingBag },
    { name: 'Subscription Plans', href: '/admin/subscriptions', icon: CreditCard },
    { name: 'Customer Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Portfolio Showcase', href: '/admin/portfolio', icon: Palette },
    { name: 'Communication Hub', href: '/admin/messages', icon: Mail },
    { name: 'Coupons & Vouchers', href: '/admin/coupons', icon: Ticket },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#06080d] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0d14] border-b md:border-b-0 md:border-r border-slate-800 p-6 space-y-6 shrink-0">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Logo href="/admin" size="sm" />
        </div>

        {/* Admin Profile */}
        <div className="p-3 bg-purple-950/60 border border-purple-500/40 rounded-2xl flex items-center gap-3">
          <img
            src={siteConfig.artistImage || '/founder.jpg'}
            alt={siteConfig.artistName}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-400/40 shrink-0"
          />
          <div className="text-xs truncate">
            <div className="font-bold text-white truncate">{siteConfig.artistName}</div>
            <div className="text-[10px] text-purple-300 truncate">Founder & Lead Artist</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Public Store
          </Link>
        </div>
      </aside>

      {/* Main Admin Body Content */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
