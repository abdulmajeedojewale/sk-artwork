'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Palette, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white font-display">Reset Your Password</h1>
        <p className="text-xs text-slate-400">Enter your email to receive password recovery instructions</p>
      </div>

      <div className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-2xl">
        {sent ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-6 h-6 mx-auto" />
            <p>Password recovery link sent to <strong>{email}</strong>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
            >
              Send Password Reset Link
            </button>
          </form>
        )}
      </div>

      <div className="text-center text-xs text-slate-400">
        Remembered password? <Link href="/auth/login" className="text-amber-400 font-bold hover:underline">Back to Login</Link>
      </div>
    </div>
  );
}
