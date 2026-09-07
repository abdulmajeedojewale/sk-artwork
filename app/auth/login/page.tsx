'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Palette, Mail, Lock, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { siteConfig } from '@/config/site';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
);

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/account';

  const { login, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'customer@skartwork.com', 'customer');
    router.push(redirect);
  };

  const handleDemoAdmin = () => {
    login('admin@skartwork.com', 'admin');
    router.push('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            <Palette className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-display text-white">{siteConfig.name}</span>
        </Link>
        <h1 className="text-2xl font-bold text-white font-display">Sign In to Your Account</h1>
        <p className="text-xs text-slate-400">Access your digital downloads, order history, and saved wishlist</p>
      </div>

      <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-2xl">
        
        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              signInWithOAuth('github');
              router.push('/account');
            }}
            className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-800 flex items-center justify-center gap-2"
          >
            <GithubIcon className="w-4 h-4 text-slate-300" />
            GitHub
          </button>

          <button
            onClick={() => {
              signInWithOAuth('google');
              router.push('/account');
            }}
            className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-800 flex items-center justify-center gap-2"
          >
            <span className="text-amber-400 font-extrabold text-sm">G</span>
            Google
          </button>
        </div>

        <div className="relative text-center">
          <span className="bg-[#121824] px-3 text-[11px] text-slate-500 uppercase font-semibold">Or with email</span>
          <div className="absolute inset-0 flex items-center -z-10"><div className="w-full border-t border-slate-800" /></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Email Address</label>
            <input
              type="email"
              required
              placeholder="customer@skartwork.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Password</label>
              <Link href="/auth/forgot-password" className="text-[11px] text-amber-400 hover:underline">Forgot?</Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-xl shadow-amber-500/20"
          >
            Sign In as Customer
          </button>
        </form>

        {/* Demo Mode Instant Admin Switch */}
        <div className="pt-3 border-t border-slate-800">
          <button
            onClick={handleDemoAdmin}
            className="w-full py-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold text-xs hover:bg-purple-900/60 flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-purple-400" />
            Quick Demo Sign In: Administrator Mode
          </button>
        </div>

      </div>

      <div className="text-center text-xs text-slate-400">
        Don't have an account yet? <Link href="/auth/signup" className="text-amber-400 font-bold hover:underline">Sign Up Free</Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading auth screen...</div>}>
      <LoginForm />
    </Suspense>
  );
}
