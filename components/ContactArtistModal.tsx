'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, User, Mail, Phone } from 'lucide-react';
import { sendMessage } from '@/lib/marketplaceStore';
import { ArtistProfile } from '@/types/database';

interface ContactArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Partial<ArtistProfile> & { id?: string; user_id?: string; artist_name: string; email?: string | null };
  defaultSubject?: string;
  defaultMessage?: string;
}

export const ContactArtistModal: React.FC<ContactArtistModalProps> = ({
  isOpen,
  onClose,
  artist,
  defaultSubject = '',
  defaultMessage = '',
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [subject, setSubject] = useState(defaultSubject || `Inquiry for ${artist.artist_name}`);
  const [message, setMessage] = useState(defaultMessage);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      sendMessage({
        sender_id: `usr-client-${Date.now()}`,
        sender_name: senderName,
        sender_role: 'customer',
        receiver_id: artist.user_id || artist.id || 'usr-artist-1',
        receiver_name: artist.artist_name,
        receiver_role: 'artist',
        subject: subject || `Client Inquiry from ${senderName}`,
        message: `${message}\n\nClient Phone: ${senderPhone || 'Not provided'}\nClient Email: ${senderEmail}`,
      });

      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
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
              Reach Out to Artist
            </div>
            <h2 className="text-xl font-extrabold text-white font-display">
              {artist.artist_name}
            </h2>
            <p className="text-xs text-slate-400">{artist.studio_name || 'SK Partner Atelier'}</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Message Sent to {artist.artist_name}</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been delivered directly to {artist.artist_name}. SK Artworks has recorded this request for platform verification.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Your Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
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
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+234..."
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Subject</label>
                <input
                  type="text"
                  placeholder="Inquiry Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Message / Request Details *</label>
              <textarea
                required
                rows={4}
                placeholder={`Describe the artwork or custom service you would like to discuss with ${artist.artist_name}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 leading-relaxed">
              <strong>SK Artworks Protection Guarantee:</strong> All initial requests and completed bookings remain tracked through SK Artworks for quality assurance and payment security.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? (
                'Sending Message...'
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message to {artist.artist_name.split(' ')[0]}
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
