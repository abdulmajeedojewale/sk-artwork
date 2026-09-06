'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  getMarketplaceMessages, 
  sendMessage, 
  getArtistProfileByUserId 
} from '@/lib/marketplaceStore';
import { MarketplaceMessage } from '@/types/database';

export default function ArtistMessagesPage() {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr-artist-1';
  const profile = getArtistProfileByUserId(currentUserId);

  const [messages, setMessages] = useState<MarketplaceMessage[]>(() =>
    getMarketplaceMessages().filter(m => m.receiver_id === currentUserId || m.sender_id === currentUserId)
  );

  const [subject, setSubject] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg || !subject) return;

    const sent = sendMessage({
      sender_id: currentUserId,
      sender_name: profile.artist_name,
      sender_role: 'artist',
      receiver_id: 'usr-admin-master',
      receiver_name: 'Abdulmajeed Olasunkanmi O. (Founder)',
      receiver_role: 'admin',
      subject,
      message: newMsg,
    });

    setMessages([sent, ...messages]);
    setSubject('');
    setNewMsg('');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5" /> Founder Direct Communication
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Founder Messages & Moderation Feedback
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Communicate directly with Abdulmajeed Olasunkanmi O. (Founder) regarding artwork submissions, change requests, or order logistics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Send Message Form */}
        <div className="lg:col-span-5 p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" /> Send Message to Founder
            </h2>
            <p className="text-[11px] text-slate-400">Recipient: Abdulmajeed Olasunkanmi O. (Founder & Marketplace Agent)</p>
          </div>

          {sentSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Message sent directly to Founder inbox.
            </div>
          )}

          <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Question about Twilight Reverie approval..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Message Body *</label>
              <textarea
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                rows={5}
                placeholder="Write your message or inquiry for the founder..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:opacity-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>

        {/* Message Inbox Thread List */}
        <div className="lg:col-span-7 p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white font-display">Conversation History</h2>
            <span className="text-xs text-slate-400">{messages.length} messages</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No messages yet. Send your first message to the founder.
              </div>
            ) : (
              messages.map((m) => {
                const isFromFounder = m.sender_role === 'admin';
                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl border space-y-2 text-xs transition-colors ${
                      isFromFounder 
                        ? 'bg-purple-950/40 border-purple-500/30' 
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          isFromFounder ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {isFromFounder ? 'FOUNDER' : 'YOU'}
                        </span>
                        <span className="font-bold text-white">{m.sender_name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{new Date(m.created_at).toLocaleString()}</span>
                    </div>

                    <div className="font-bold text-amber-400">{m.subject}</div>
                    <p className="text-slate-300 leading-relaxed">{m.message}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
