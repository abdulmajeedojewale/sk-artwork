'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAdmin } = useAuth();
  const [email, setEmail] = useState('abdulmajeedojewale@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the administrator secret password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/secret-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('sk_admin_secret_verified', 'true');
        await login(email || 'abdulmajeedojewale@gmail.com', 'admin');
        router.push('/admin');
      } else {
        setError(data.message || 'Incorrect administrator secret password');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0e131d] border border-purple-500/30 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">SK CMS Portal</h1>
          <p className="text-xs text-slate-400">Admin & Studio Management Authentication</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@skartwork.com"
                required
                className="w-full bg-[#161d2b] border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute right-4 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Secret CMS Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter CMS secret password..."
                required
                className="w-full bg-[#161d2b] border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-4 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold text-xs shadow-xl shadow-purple-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Access CMS Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
