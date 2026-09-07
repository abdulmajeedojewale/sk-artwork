'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  UploadCloud, 
  Palette, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  createArtworkSubmission, 
  getArtistProfileByUserId, 
  getSubscriptionPlans 
} from '@/lib/marketplaceStore';
import { DEMO_CATEGORIES } from '@/lib/demoData';

export default function SubmitArtworkPage() {
  const router = useRouter();
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr-artist-1';
  const profile = getArtistProfileByUserId(currentUserId);
  const plans = getSubscriptionPlans();
  const currentPlan = plans.find(p => p.id === profile.current_plan_id) || plans[1];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(DEMO_CATEGORIES[0].id);
  const [proposedPrice, setProposedPrice] = useState<number | ''>('');
  const [imageUrl, setImageUrl] = useState('');
  const [dimensions, setDimensions] = useState('30 x 40 inches (76 x 101 cm)');
  const [medium, setMedium] = useState('Oil on Stretched Cotton Canvas');
  const [frame, setFrame] = useState('Unframed / Floating Frame Available');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Preset sample artwork images for easy demo selection
  const SAMPLE_IMAGES = [
    { label: 'Oil Portrait Canvas', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Canvas Texture Detail', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Crimson Abstraction', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Celestial Art', url: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1000&auto=format&fit=crop&q=80' },
    { label: 'African Landscape', url: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=1000&auto=format&fit=crop&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !proposedPrice || !imageUrl) return;

    setIsSubmitting(true);
    const selCategory = DEMO_CATEGORIES.find(c => c.id === categoryId);

    setTimeout(() => {
      createArtworkSubmission({
        artist_id: currentUserId,
        artist_name: profile.artist_name,
        artist_email: profile.email || 'artist@skartwork.com',
        title,
        description,
        category_id: categoryId,
        category_name: selCategory?.name || 'Fine-Art Canvas Paintings',
        proposed_price: Number(proposedPrice),
        images: [imageUrl],
        specifications: {
          'Dimensions': dimensions,
          'Medium': medium,
          'Frame': frame,
          'Authenticity': 'Certificate Signed by Artist & Verified by Founder',
        },
      });

      setIsSubmitting(false);
      setSuccessMsg(true);
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
          <UploadCloud className="w-3.5 h-3.5" /> Managed Marketplace Submission
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Submit Artwork for Founder Curation
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Your artwork will be automatically logged as <strong className="text-amber-400 uppercase">Pending Approval</strong> for review by Abdulmajeed Olasunkanmi O. (Founder).
        </p>
      </div>

      {/* Success Notification Banner */}
      {successMsg ? (
        <div className="p-8 bg-emerald-950/80 border border-emerald-500/40 rounded-3xl space-y-4 text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white font-display">Artwork Submitted Successfully!</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Your submission <strong className="text-white">"{title}"</strong> has entered the <span className="text-amber-400 font-bold uppercase">Pending Approval</span> queue. The Founder will review your proposed price, imagery, and listing details.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setSuccessMsg(false);
                setTitle('');
                setDescription('');
                setProposedPrice('');
                setImageUrl('');
              }}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800"
            >
              Submit Another Artwork
            </button>
            <button
              onClick={() => router.push('/artist/submissions')}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-2 shadow-lg"
            >
              View My Submissions <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          
          {/* Important Rule Notice */}
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-400 block mb-0.5">Marketplace Policy:</span>
              Artists cannot directly publish artwork to the public marketplace. The founder will review, confirm pricing, and publish your approved listing.
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 block">Artwork Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Grace & Elegance — Oil Canvas Painting"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs focus:border-amber-500 outline-none"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 block">Description & Creative Story *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe the inspiration, color harmony, brushwork techniques, or physical textures of your artwork..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs focus:border-amber-500 outline-none"
              />
            </div>

            {/* Category & Proposed Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 block">Artwork Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs focus:border-amber-500 outline-none"
                >
                  {DEMO_CATEGORIES.filter(c => c.type === 'product').map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 block">Proposed Selling Price (₦ NGN) *</label>
                <input
                  type="number"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 125000"
                  required
                  min={1000}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Image URL & Preset Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-200 block">Artwork Image URL *</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste direct HTTPS image link (e.g. Unsplash / Cloudinary / Imgur)..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs focus:border-amber-500 outline-none"
              />

              {/* Preset Sample Gallery */}
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-semibold block">Or select a fine art sample showcase image:</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {SAMPLE_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(img.url)}
                      className={`p-1.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        imageUrl === img.url ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full aspect-video rounded-lg object-cover" />
                      <span className="text-[10px] text-slate-300 font-bold truncate">{img.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Box */}
              {imageUrl && (
                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 font-semibold block mb-1">Image Preview:</span>
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img src={imageUrl} alt="Artwork Submission Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            {/* Artwork Specifications */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white font-display">Artwork Specifications & Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300 block">Dimensions</label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300 block">Medium / Materials</label>
                  <input
                    type="text"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300 block">Framing Status</label>
                  <input
                    type="text"
                    value={frame}
                    onChange={(e) => setFrame(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all"
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" /> Submit for Founder Review
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
