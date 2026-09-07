'use client';

import React, { useState } from 'react';
import { X, Calendar, DollarSign, CheckCircle2, ShieldCheck, User, Mail, Phone } from 'lucide-react';
import { createBooking, getCommissionSetting } from '@/lib/marketplaceStore';
import { siteConfig } from '@/config/site';
import { ArtistProfile, ServiceItem } from '@/types/database';

interface BookArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Partial<ArtistProfile> & { id?: string; user_id?: string; artist_name: string; email?: string | null };
  service?: ServiceItem | null;
  artworkTitle?: string;
  defaultPrice?: number;
}

export const BookArtistModal: React.FC<BookArtistModalProps> = ({
  isOpen,
  onClose,
  artist,
  service,
  artworkTitle,
  defaultPrice,
}) => {
  const commSetting = getCommissionSetting();
  const commRate = commSetting.commission_percentage || 15;

  const initialAmount = defaultPrice || service?.starting_price || 120000;

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [amount, setAmount] = useState<number>(initialAmount);
  const [requestedDate, setRequestedDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Live Commission calculations
  const commissionAmount = Math.round((amount * commRate) / 100);
  const artistEarnings = Math.round(amount - commissionAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !amount) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = createBooking({
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        artist_id: artist.user_id || artist.id || 'usr-artist-1',
        artist_name: artist.artist_name,
        artist_avatar: artist.avatar_url || undefined,
        service_id: service?.id,
        service_title: service?.title || artworkTitle || 'Custom Fine Art Commission',
        total_amount: amount,
        commission_rate: commRate,
        date: requestedDate,
        notes: notes,
        status: 'pending',
        payment_status: 'unpaid',
      });

      setIsSubmitting(false);
      setSubmittedBooking(newBooking);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <img
            src={artist.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
            alt={artist.artist_name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-500/40"
          />
          <div>
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-display">
              Official Booking Request
            </div>
            <h2 className="text-xl font-extrabold text-white font-display">
              Book {artist.artist_name}
            </h2>
            <p className="text-xs text-slate-400">
              {service?.title || artworkTitle || 'Custom Fine Art Commission'}
            </p>
          </div>
        </div>

        {submittedBooking ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold font-mono">
                Booking #{submittedBooking.booking_number}
              </span>
              <h3 className="text-2xl font-extrabold text-white font-display mt-2">
                Booking Submitted Successfully!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                Your request has been registered with SK Artworks and sent to <strong className="text-white">{artist.artist_name}</strong>.
              </p>
            </div>

            {/* Financial Ledger Record Breakdown */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs space-y-2 text-left">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Marketplace Booking Record</div>
              <div className="flex justify-between text-slate-300">
                <span>Total Amount:</span>
                <span className="font-bold text-white">{siteConfig.currency.format(submittedBooking.total_amount)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SK Commission ({commRate}%):</span>
                <span>{siteConfig.currency.format(submittedBooking.commission_amount)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-1.5">
                <span>Artist Earnings (85%):</span>
                <span>{siteConfig.currency.format(submittedBooking.artist_earnings)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmittedBooking(null);
                onClose();
              }}
              className="px-6 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-lg"
            >
              Close & Track in Account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Your Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Your Email *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Phone Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+234..."
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Requested Service Date *</label>
                <input
                  type="date"
                  required
                  value={requestedDate}
                  onChange={(e) => setRequestedDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Total Booking Amount (NGN ₦) *</label>
              <input
                type="number"
                required
                min={10000}
                step={5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-amber-400 focus:outline-none focus:border-amber-500 font-display"
              />
            </div>

            {/* Live Financial Breakdown & Commission Transparency */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 uppercase tracking-wider font-display">
                <span>SK Financial Breakdown</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Platform Verified
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Client Total Payment:</span>
                  <span className="font-bold text-white">{siteConfig.currency.format(amount)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>SK Artworks Commission ({commRate}%):</span>
                  <span>{siteConfig.currency.format(commissionAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-1.5">
                  <span>Artist Net Earnings (85%):</span>
                  <span>{siteConfig.currency.format(artistEarnings)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Project Notes / Custom Requirements</label>
              <textarea
                rows={3}
                placeholder="Include canvas size, color preferences, wall dimensions, or portrait specifications..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? (
                'Processing Booking...'
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Submit Booking Request ({siteConfig.currency.format(amount)})
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
