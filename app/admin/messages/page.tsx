'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Clock, Trash2 } from 'lucide-react';

const DEMO_MESSAGES = [
  {
    id: 'msg-1',
    name: 'Chidi Okonkwo',
    email: 'chidi@example.com',
    subject: 'Custom Logo Design Inquiry',
    message: 'Hi SK Artwork, I am launching a brand and would love to commission a full artwork collection. Can we schedule a call this week?',
    is_read: false,
    created_at: '2026-08-12T09:15:00Z',
  },
  {
    id: 'msg-2',
    name: 'Amina Bello',
    email: 'amina@example.com',
    subject: 'Bulk Order - 10 Canvas Prints',
    message: 'We are an art gallery and would like to order 10 custom canvas prints for our September exhibition. Please share pricing for bulk orders.',
    is_read: true,
    created_at: '2026-08-10T14:20:00Z',
  },
  {
    id: 'msg-3',
    name: 'David Eze',
    email: 'david@example.com',
    subject: 'Music Album Cover Art - 3 Singles',
    message: 'I am an Afrobeats music producer and need album cover art for 3 upcoming singles. Budget is around ₦250,000 for all 3.',
    is_read: false,
    created_at: '2026-08-11T17:00:00Z',
  },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(DEMO_MESSAGES);

  const markRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this inquiry message?')) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white font-display">Service Inquiries & Contact Messages</h1>
        <p className="text-xs text-slate-400">Customer & service commission messages submitted via the public contact form</p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 rounded-3xl border shadow-xl transition-colors ${
              msg.is_read ? 'bg-[#121824] border-slate-800' : 'bg-[#121824] border-amber-500/40 ring-1 ring-amber-500/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                  {msg.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-display">{msg.name}</div>
                  <div className="text-[11px] text-slate-400">{msg.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {new Date(msg.created_at).toLocaleDateString()}
                </span>
                {!msg.is_read && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">NEW</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {msg.subject && (
                <h3 className="text-xs font-bold text-white">Subject: {msg.subject}</h3>
              )}
              <p className="text-xs text-slate-300 leading-relaxed">{msg.message}</p>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              {!msg.is_read && (
                <button
                  onClick={() => markRead(msg.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Read
                </button>
              )}
              <button
                onClick={() => handleDelete(msg.id)}
                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                aria-label="Delete message"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-16 bg-[#121824] border border-slate-800 rounded-3xl">
            <Mail className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No messages yet</h3>
            <p className="text-xs text-slate-400">Inquiries from your contact and services forms will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
