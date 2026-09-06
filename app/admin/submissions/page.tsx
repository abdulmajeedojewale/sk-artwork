'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  UploadCloud, 
  Eye, 
  Edit3, 
  Sparkles,
  Send,
  Globe,
  Filter
} from 'lucide-react';
import { 
  getArtworkSubmissions, 
  updateSubmissionStatus, 
  publishSubmissionListing 
} from '@/lib/marketplaceStore';
import { ArtworkSubmission, SubmissionStatus } from '@/types/database';
import { siteConfig } from '@/config/site';

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ArtworkSubmission[]>(() => getArtworkSubmissions());
  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('pending_approval');
  const [selectedSub, setSelectedSub] = useState<ArtworkSubmission | null>(null);
  
  // Action Modals State
  const [rejectFeedback, setRejectFeedback] = useState('');
  const [changesFeedback, setChangesFeedback] = useState('');
  const [activeModal, setActiveModal] = useState<'review' | 'changes' | 'reject' | 'publish' | null>(null);

  // Publish Form State
  const [pubTitle, setPubTitle] = useState('');
  const [pubPrice, setPubPrice] = useState(0);
  const [pubDesc, setPubDesc] = useState('');

  const filtered = submissions.filter(s => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  const handleApprove = (sub: ArtworkSubmission) => {
    const updated = updateSubmissionStatus(sub.id, 'approved', 'Approved by Founder Abdulmajeed. Ready for marketplace publishing.');
    if (updated) {
      setSubmissions(getArtworkSubmissions());
      setSelectedSub(null);
      setActiveModal(null);
    }
  };

  const handleRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub || !changesFeedback) return;
    const updated = updateSubmissionStatus(selectedSub.id, 'changes_requested', changesFeedback);
    if (updated) {
      setSubmissions(getArtworkSubmissions());
      setSelectedSub(null);
      setActiveModal(null);
      setChangesFeedback('');
    }
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    const updated = updateSubmissionStatus(selectedSub.id, 'rejected', rejectFeedback || 'Artwork does not meet SK Artworks curation guidelines at this time.');
    if (updated) {
      setSubmissions(getArtworkSubmissions());
      setSelectedSub(null);
      setActiveModal(null);
      setRejectFeedback('');
    }
  };

  const openPublishModal = (sub: ArtworkSubmission) => {
    setSelectedSub(sub);
    setPubTitle(sub.title);
    setPubPrice(sub.admin_price || sub.proposed_price);
    setPubDesc(sub.description);
    setActiveModal('publish');
  };

  const handleConfirmPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    const updated = publishSubmissionListing(selectedSub.id, pubTitle, Number(pubPrice), pubDesc);
    if (updated) {
      setSubmissions(getArtworkSubmissions());
      setSelectedSub(null);
      setActiveModal(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              Central Agent Curation
            </span>
            <span className="text-xs text-slate-400">ARTIST → FOUNDER → CUSTOMER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-display mt-1">Artwork Moderation & Publishing</h1>
          <p className="text-xs text-slate-400">Approve submissions, request artist changes, confirm pricing, and publish listings live to shop</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center bg-[#121824] p-1.5 rounded-2xl border border-slate-800 text-xs gap-1">
        <button
          onClick={() => setStatusFilter('pending_approval')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'pending_approval' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Pending Approval ({submissions.filter(s => s.status === 'pending_approval').length})
        </button>
        <button
          onClick={() => setStatusFilter('changes_requested')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'changes_requested' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Changes Requested ({submissions.filter(s => s.status === 'changes_requested').length})
        </button>
        <button
          onClick={() => setStatusFilter('approved')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'approved' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Approved ({submissions.filter(s => s.status === 'approved').length})
        </button>
        <button
          onClick={() => setStatusFilter('rejected')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'rejected' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Rejected ({submissions.filter(s => s.status === 'rejected').length})
        </button>
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          All ({submissions.length})
        </button>
      </div>

      {/* Submissions List Table / Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[#121824] border border-slate-800 rounded-3xl space-y-3">
            <CheckSquare className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white font-display">No Submissions Found</h3>
            <p className="text-xs text-slate-400">There are currently no artwork submissions in this filter view.</p>
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
                    className="w-24 h-24 rounded-2xl object-cover shrink-0 ring-2 ring-amber-500/30"
                  />
                  <div className="space-y-1.5">
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

                      {sub.is_published && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold">
                          LIVE IN PUBLIC SHOP
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl">{sub.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                      <span className="text-slate-400">Artist: <strong className="text-amber-400">{sub.artist_name}</strong></span>
                      <span className="text-slate-400">Category: <strong className="text-white">{sub.category_name || 'Fine Art Canvas'}</strong></span>
                      <span className="text-slate-400">Proposed Price: <strong className="text-amber-400 font-display">{siteConfig.currency.format(sub.proposed_price)}</strong></span>
                      {sub.admin_price && (
                        <span className="text-slate-400">Confirmed Price: <strong className="text-emerald-400 font-display">{siteConfig.currency.format(sub.admin_price)}</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex flex-wrap items-center gap-2 self-end md:self-center shrink-0">
                  {sub.status === 'pending_approval' && (
                    <>
                      <button
                        onClick={() => handleApprove(sub)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 flex items-center gap-1 shadow-md transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>

                      <button
                        onClick={() => { setSelectedSub(sub); setActiveModal('changes'); }}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 flex items-center gap-1 shadow-md transition-colors"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" /> Request Changes
                      </button>

                      <button
                        onClick={() => { setSelectedSub(sub); setActiveModal('reject'); }}
                        className="px-3.5 py-2 rounded-xl bg-red-600/80 text-white font-bold text-xs hover:bg-red-600 flex items-center gap-1 shadow-md transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  )}

                  {sub.status === 'approved' && !sub.is_published && (
                    <button
                      onClick={() => openPublishModal(sub)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs hover:opacity-95 flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                    >
                      <Globe className="w-4 h-4" /> Publish Listing to Marketplace
                    </button>
                  )}

                  {sub.is_published && (
                    <button
                      onClick={() => openPublishModal(sub)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-bold text-xs hover:bg-slate-800 flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Listing Details
                    </button>
                  )}
                </div>
              </div>

              {sub.admin_feedback && (
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-amber-400 font-bold">Feedback Sent to Artist:</span>
                  <p>{sub.admin_feedback}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Request Changes Modal */}
      {activeModal === 'changes' && selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-purple-400" /> Request Changes from Artist
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleRequestChanges} className="space-y-4 text-xs">
              <p className="text-slate-300">
                Explain clearly what the artist ({selectedSub.artist_name}) needs to modify before artwork can be approved.
              </p>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Feedback & Requested Modifications *</label>
                <textarea
                  value={changesFeedback}
                  onChange={(e) => setChangesFeedback(e.target.value)}
                  rows={4}
                  placeholder="e.g. Please upload a higher resolution image showing signatures or refine the description details..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" /> Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {activeModal === 'reject' && selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" /> Reject Artwork Submission
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleReject} className="space-y-4 text-xs">
              <p className="text-slate-300">
                Are you sure you want to reject <strong className="text-white">"{selectedSub.title}"</strong> by {selectedSub.artist_name}?
              </p>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Rejection Reason (Optional)</label>
                <textarea
                  value={rejectFeedback}
                  onChange={(e) => setRejectFeedback(e.target.value)}
                  rows={3}
                  placeholder="Provide reason for rejection..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 shadow-lg"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publish Listing Modal */}
      {activeModal === 'publish' && selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" /> Review & Publish to Public Shop
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleConfirmPublish} className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
                <span className="font-bold block mb-0.5">Founder Confirmation:</span>
                Review and finalize title, description, and selling price before displaying to customers.
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Final Display Title *</label>
                <input
                  type="text"
                  value={pubTitle}
                  onChange={(e) => setPubTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Final Selling Price (₦ NGN) *</label>
                <input
                  type="number"
                  value={pubPrice}
                  onChange={(e) => setPubPrice(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Public Description *</label>
                <textarea
                  value={pubDesc}
                  onChange={(e) => setPubDesc(e.target.value)}
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Globe className="w-4 h-4" /> Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
