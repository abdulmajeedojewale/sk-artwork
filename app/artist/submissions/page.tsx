'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  UploadCloud, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Edit3,
  Eye,
  Plus,
  RefreshCw,
  Send
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  getArtworkSubmissions, 
  updateSubmissionStatus, 
  saveArtworkSubmissions 
} from '@/lib/marketplaceStore';
import { ArtworkSubmission, SubmissionStatus } from '@/types/database';
import { siteConfig } from '@/config/site';

export default function ArtistSubmissionsPage() {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr-artist-1';

  const [submissions, setSubmissions] = useState<ArtworkSubmission[]>(() =>
    getArtworkSubmissions().filter(s => s.artist_id === currentUserId || s.artist_id === 'usr-artist-1')
  );

  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('all');
  const [editingSub, setEditingSub] = useState<ArtworkSubmission | null>(null);

  // Form fields for resubmission
  const [resubTitle, setResubTitle] = useState('');
  const [resubDesc, setResubDesc] = useState('');
  const [resubPrice, setResubPrice] = useState(0);
  const [resubImage, setResubImage] = useState('');

  const filtered = submissions.filter(s => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  const openResubmitModal = (sub: ArtworkSubmission) => {
    setEditingSub(sub);
    setResubTitle(sub.title);
    setResubDesc(sub.description);
    setResubPrice(sub.proposed_price);
    setResubImage(sub.images?.[0] || '');
  };

  const handleResubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub) return;

    const all = getArtworkSubmissions();
    const idx = all.findIndex(s => s.id === editingSub.id);
    if (idx !== -1) {
      all[idx].title = resubTitle;
      all[idx].description = resubDesc;
      all[idx].proposed_price = Number(resubPrice);
      all[idx].images = [resubImage];
      all[idx].status = 'pending_approval';
      all[idx].admin_feedback = 'Resubmitted by artist. Awaiting founder re-review.';
      all[idx].updated_at = new Date().toISOString();
      saveArtworkSubmissions(all);

      const updated = all.filter(s => s.artist_id === currentUserId || s.artist_id === 'usr-artist-1');
      setSubmissions(updated);
      setEditingSub(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">My Artwork Submissions</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track submission statuses, read founder approval feedback, and resubmit requested changes.
          </p>
        </div>

        <Link
          href="/artist/submit"
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Submit Artwork
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center bg-[#121824] p-1.5 rounded-2xl border border-slate-800 text-xs">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'all' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          All ({submissions.length})
        </button>
        <button
          onClick={() => setStatusFilter('pending_approval')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'pending_approval' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setStatusFilter('changes_requested')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'changes_requested' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Changes Requested
        </button>
        <button
          onClick={() => setStatusFilter('approved')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'approved' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Approved / Published
        </button>
        <button
          onClick={() => setStatusFilter('rejected')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'rejected' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[#121824] border border-slate-800 rounded-3xl space-y-3">
            <Palette className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white font-display">No Submissions Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You currently have no artwork matching this filter status. Submit a new artwork to start your moderation journey.
            </p>
            <Link
              href="/artist/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              <Plus className="w-4 h-4" /> Submit First Artwork
            </Link>
          </div>
        ) : (
          filtered.map((sub) => (
            <div
              key={sub.id}
              className="p-6 bg-[#121824] border border-slate-800 rounded-3xl space-y-4 shadow-xl hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={sub.images?.[0] || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300'}
                    alt={sub.title}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0 ring-2 ring-slate-800"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white font-display">{sub.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        sub.status === 'pending_approval' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        sub.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        sub.status === 'changes_requested' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {sub.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl">{sub.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                      <span className="text-slate-400">Category: <strong className="text-white">{sub.category_name || 'Fine Art Canvas'}</strong></span>
                      <span className="text-slate-400">Proposed Price: <strong className="text-amber-400 font-display">{siteConfig.currency.format(sub.proposed_price)}</strong></span>
                      {sub.admin_price && sub.admin_price !== sub.proposed_price && (
                        <span className="text-slate-400">Founder Confirmed Price: <strong className="text-emerald-400 font-display">{siteConfig.currency.format(sub.admin_price)}</strong></span>
                      )}
                      <span className="text-slate-500 text-[11px]">Submitted: {new Date(sub.submitted_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {(sub.status === 'changes_requested' || sub.status === 'pending_approval') && (
                    <button
                      onClick={() => openResubmitModal(sub)}
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit & Resubmit
                    </button>
                  )}

                  {sub.is_published && (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Published in Shop
                    </span>
                  )}
                </div>
              </div>

              {/* Founder Feedback Banner */}
              {sub.admin_feedback && (
                <div className={`p-4 rounded-2xl text-xs space-y-1 ${
                  sub.status === 'changes_requested' 
                    ? 'bg-purple-950/60 border border-purple-500/40 text-purple-200' 
                    : sub.status === 'rejected'
                    ? 'bg-red-950/60 border border-red-500/40 text-red-200'
                    : 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Founder Review Feedback from Abdulmajeed Olasunkanmi O.:
                  </div>
                  <p className="leading-relaxed">{sub.admin_feedback}</p>
                </div>
              )}

            </div>
          ))
        )}
      </div>

      {/* Resubmit / Edit Modal */}
      {editingSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" /> Edit & Resubmit Artwork
              </h3>
              <button onClick={() => setEditingSub(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleResubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Artwork Title</label>
                <input
                  type="text"
                  value={resubTitle}
                  onChange={(e) => setResubTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Description & Artistic Context</label>
                <textarea
                  value={resubDesc}
                  onChange={(e) => setResubDesc(e.target.value)}
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Proposed Price (₦ NGN)</label>
                  <input
                    type="number"
                    value={resubPrice}
                    onChange={(e) => setResubPrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Image URL Preview</label>
                  <input
                    type="url"
                    value={resubImage}
                    onChange={(e) => setResubImage(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {resubImage && (
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img src={resubImage} alt="Resubmission Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSub(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" /> Resubmit for Founder Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
