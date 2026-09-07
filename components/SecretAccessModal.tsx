'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert, KeyRound, ArrowRight, X, AlertCircle } from 'lucide-react';

export const triggerSecretAccess = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sk-open-secret-access'));
  }
};

export const SecretAccessModal: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Keyboard shortcut listener: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const isModifierActive = isMac ? e.metaKey : e.ctrlKey;

      if (isModifierActive && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsOpen(true);
        setErrorMessage('');
      }

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomTrigger = () => {
      setIsOpen(true);
      setErrorMessage('');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('sk-open-secret-access', handleCustomTrigger);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('sk-open-secret-access', handleCustomTrigger);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretCode.trim()) {
      setErrorMessage('Please enter the secret access code');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/secret-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: secretCode.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save session flag for valid secret access prompt
        sessionStorage.setItem('sk_admin_secret_verified', 'true');
        setIsOpen(false);
        setSecretCode('');
        router.push(data.redirectUrl || '/admin/login');
      } else {
        setErrorMessage(data.message || 'Invalid secret access code');
      }
    } catch (err: any) {
      setErrorMessage('Failed to verify access code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#05070c]/90 backdrop-blur-xl p-4 animate-in fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="w-full max-w-md bg-[#0e131d] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">Administrative Gateway</h2>
              <p className="text-[11px] text-slate-400">Authorized Personnel Only</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Enter Studio Secret Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={secretCode}
                onChange={(e) => {
                  setSecretCode(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="••••••••••••"
                autoFocus
                className="w-full bg-[#161d2b] border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors tracking-widest"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-4 top-3.5" />
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Proceed to CMS Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-500">
          Tip: Trigger via <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Ctrl+Shift+A</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Cmd+Shift+A</kbd>
        </p>
      </div>
    </div>
  );
};
