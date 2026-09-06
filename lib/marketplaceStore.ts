import { 
  SubscriptionPlan, 
  ArtistProfile, 
  ArtistSubscription, 
  ArtworkSubmission, 
  MarketplaceMessage, 
  Product,
  SubmissionStatus,
  CommissionSetting,
  Booking
} from '@/types/database';

// DEFAULT DEMO SUBSCRIPTION PLANS (Admin Editable)
export const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-weekly',
    name: 'Weekly Artist Pass',
    price: 5000,
    billing_period: 'weekly',
    max_submissions: 3,
    max_listings: 3,
    description: 'Flexible weekly subscription ideal for emerging artists trying out the platform.',
    features: [
      'Submit up to 3 artworks/week',
      'Founder review within 48 hours',
      'Basic artist profile page',
      'Direct founder messaging',
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'plan-monthly',
    name: 'Monthly Studio Membership',
    price: 15000,
    billing_period: 'monthly',
    max_submissions: 12,
    max_listings: 10,
    description: 'Our most popular plan for active artists seeking steady gallery exposure and curation.',
    features: [
      'Submit up to 12 artworks/month',
      'Priority founder review (24 hours)',
      'Featured artist profile & bio',
      'Direct founder & customer inquiry channel',
      'Social media showcase promotion',
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'plan-yearly',
    name: 'Yearly Master Studio Pass',
    price: 120000,
    billing_period: 'yearly',
    max_submissions: 100,
    max_listings: 50,
    description: 'Exclusive annual membership for established artists and fine-art masters.',
    features: [
      'Unlimited artwork submissions',
      'Same-day priority approval workflow',
      'Premier homepage banner placement',
      'Dedicated founder concierge & sales handling',
      'Certificate of authenticity verification',
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// DEFAULT DEMO ARTIST PROFILES
export const DEFAULT_ARTIST_PROFILES: ArtistProfile[] = [
  {
    id: 'art-prof-founder',
    user_id: 'usr-admin-master',
    artist_name: 'Abdulmajeed Olasunkanmi O. (Founder)',
    bio: 'Founder and Lead Master Artist at SK Artwork Studio. Specializing in portrait paintings, landscapes, life-image art, interior/exterior wall painting, decorative artwork, and custom commissions.',
    specialties: ['Fine Art Painting', 'Landscape Art', 'Interior Murals', 'Portraiture'],
    studio_name: 'SK Artwork Master Atelier',
    avatar_url: '/founder.jpg',
    cover_image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80',
    location: 'Lekki Phase 1, Lagos, Nigeria',
    rating: 5.0,
    reviews_count: 34,
    is_verified: true,
    is_featured: true,
    phone: '+2349072994416',
    email: 'abdulmajeedojewale@gmail.com',
    subscription_status: 'Active',
    current_plan_id: 'plan-yearly',
    total_submissions: 32,
    active_listings: 24,
    created_artworks_count: 48,
    bookings_count: 28,
    total_earnings: 4850000,
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'art-prof-1',
    user_id: 'usr-artist-1',
    artist_name: 'Elena Rostova',
    bio: 'Contemporary oil painter specializing in emotive portraiture, classical glazes, and figurative expressionism. Classically trained with 8+ years gallery experience.',
    specialties: ['Oil Portraiture', 'Impasto Canvas', 'Figurative Art'],
    studio_name: 'Rostova Atelier',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
    location: 'Victoria Island, Lagos',
    rating: 4.9,
    reviews_count: 19,
    is_verified: true,
    is_featured: true,
    phone: '+2348123456789',
    email: 'elena.rostova@skartwork.com',
    subscription_status: 'Active',
    current_plan_id: 'plan-monthly',
    subscription_expires_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    total_submissions: 8,
    active_listings: 6,
    created_artworks_count: 14,
    bookings_count: 12,
    total_earnings: 1650000,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'art-prof-2',
    user_id: 'usr-artist-2',
    artist_name: 'Marcus Vance',
    bio: 'Sculptor and mixed-media muralist working with cast bronze, clay textures, and architectural canvas reliefs.',
    specialties: ['Sculpture', 'Wall Murals', 'Bronze Craft'],
    studio_name: 'Vance Fine Art Studio',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&auto=format&fit=crop&q=80',
    location: 'Abuja, Nigeria',
    rating: 4.8,
    reviews_count: 15,
    is_verified: true,
    is_featured: true,
    phone: '+2348098765432',
    email: 'marcus.vance@skartwork.com',
    subscription_status: 'Active',
    current_plan_id: 'plan-yearly',
    subscription_expires_at: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString(),
    total_submissions: 10,
    active_listings: 7,
    created_artworks_count: 18,
    bookings_count: 15,
    total_earnings: 2400000,
    created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'art-prof-3',
    user_id: 'usr-artist-3',
    artist_name: 'Amara Okafor',
    bio: 'Vibrant colorist and textile mural painter creating expressive cultural art, tropical wall motifs, and metallic leaf panels.',
    specialties: ['Wall Murals', 'Tropical Art', 'Metallic Leaf'],
    studio_name: 'Amara Colors Studio',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=1200&auto=format&fit=crop&q=80',
    location: 'Enugu, Nigeria',
    rating: 4.9,
    reviews_count: 11,
    is_verified: true,
    is_featured: false,
    phone: '+2348031122334',
    email: 'amara.okafor@skartwork.com',
    subscription_status: 'Active',
    current_plan_id: 'plan-monthly',
    subscription_expires_at: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    total_submissions: 5,
    active_listings: 4,
    created_artworks_count: 9,
    bookings_count: 8,
    total_earnings: 1120000,
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'art-prof-4',
    user_id: 'usr-artist-4',
    artist_name: 'Tariq Hassan',
    bio: 'Minimalist line artist and contemporary acrylic painter focusing on urban storytelling, coastal scenery, and modern cafe murals.',
    specialties: ['Acrylic Scenery', 'Line Art', 'Urban Murals'],
    studio_name: 'Hassan Art Lab',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1200&auto=format&fit=crop&q=80',
    location: 'Ibadan, Nigeria',
    rating: 4.7,
    reviews_count: 8,
    is_verified: true,
    is_featured: false,
    phone: '+2348149988776',
    email: 'tariq.hassan@skartwork.com',
    subscription_status: 'Active',
    current_plan_id: 'plan-weekly',
    subscription_expires_at: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    total_submissions: 4,
    active_listings: 3,
    created_artworks_count: 7,
    bookings_count: 5,
    total_earnings: 750000,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// DEFAULT DEMO SUBMISSIONS FOR REVIEW & MODERATION
export const DEFAULT_SUBMISSIONS: ArtworkSubmission[] = [
  {
    id: 'sub-101',
    artist_id: 'usr-artist-1',
    artist_name: 'Elena Rostova',
    artist_email: 'elena.rostova@skartwork.com',
    title: 'Twilight Reverie — Oil on Linen Canvas',
    description: 'A poetic oil painting capturing evening reflections and soft ambient light across textured linen canvas. Hand-glazed with natural dammar varnish.',
    category_id: 'cat-1',
    category_name: 'Fine-Art Canvas Paintings',
    proposed_price: 135000,
    admin_price: 135000,
    images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=80'],
    specifications: { 'Dimensions': '30 x 40 inches', 'Medium': 'Oil on Linen', 'Framing': 'Custom Teak Floating Frame' },
    status: 'pending_approval',
    submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    is_published: false,
  },
  {
    id: 'sub-102',
    artist_id: 'usr-artist-2',
    artist_name: 'Marcus Vance',
    artist_email: 'marcus.vance@skartwork.com',
    title: 'Monolith in Motion — Cast Bronze & Polymer Sculpture',
    description: 'Dynamic contemporary tabletop sculpture exploring geometric tension and brushed metallic sheen.',
    category_id: 'cat-4',
    category_name: 'Wall Art & Decorative Pieces',
    proposed_price: 190000,
    admin_price: 190000,
    images: ['https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=80'],
    specifications: { 'Height': '20 inches', 'Material': 'Cast Bronze & Mahogany Pedestal' },
    status: 'changes_requested',
    admin_feedback: 'Please provide a close-up photo showing the signature on the mahogany pedestal before we publish.',
    submitted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: false,
  },
  {
    id: 'sub-103',
    artist_id: 'usr-artist-1',
    artist_name: 'Elena Rostova',
    artist_email: 'elena.rostova@skartwork.com',
    title: 'Symphony of Ochre — Textured Impasto Canvas',
    description: 'Vibrant impasto palette knife painting in warm autumn gold, ochre, and dark crimson.',
    category_id: 'cat-1',
    category_name: 'Fine-Art Canvas Paintings',
    proposed_price: 145000,
    admin_price: 145000,
    images: ['https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&auto=format&fit=crop&q=80'],
    specifications: { 'Dimensions': '36 x 48 inches', 'Medium': 'Heavy Impasto Acrylic & Oil' },
    status: 'approved',
    admin_feedback: 'Approved by Founder. Ready to publish to marketplace.',
    submitted_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    product_id: 'prod-published-1',
  },
];

// DEFAULT DEMO MESSAGES
export const DEFAULT_MESSAGES: MarketplaceMessage[] = [
  {
    id: 'msg-1',
    sender_id: 'usr-admin-master',
    sender_name: 'Abdulmajeed Olasunkanmi O. (Founder)',
    sender_role: 'admin',
    receiver_id: 'usr-artist-2',
    receiver_name: 'Marcus Vance',
    receiver_role: 'artist',
    submission_id: 'sub-102',
    subject: 'Feedback on Monolith Sculpture Submission',
    message: 'Hello Marcus, we love the bronze piece! Please upload one photo showing the signature details on the base so we can publish it for collectors.',
    is_read: true,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-2',
    sender_id: 'usr-artist-1',
    sender_name: 'Elena Rostova',
    sender_role: 'artist',
    receiver_id: 'usr-admin-master',
    receiver_name: 'Abdulmajeed Olasunkanmi O. (Founder)',
    receiver_role: 'admin',
    submission_id: 'sub-101',
    subject: 'Submission status inquiry for Twilight Reverie',
    message: 'Good day Founder, I just submitted my new oil linen painting "Twilight Reverie". Looking forward to your review!',
    is_read: false,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-3',
    sender_id: 'usr-customer-1',
    sender_name: 'SK Collector',
    sender_role: 'customer',
    receiver_id: 'usr-admin-master',
    receiver_name: 'Abdulmajeed Olasunkanmi O. (Founder)',
    receiver_role: 'admin',
    subject: 'Inquiry regarding Custom Frame Options for Canvas Art',
    message: 'Hello Abdulmajeed, I am interested in purchasing Grace & Elegance. Can it be framed in floating dark teak wood?',
    is_read: false,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// LOCAL STORAGE PERSISTENCE HELPERS
const STORAGE_KEYS = {
  PLANS: 'sk_subscription_plans',
  ARTISTS: 'sk_artist_profiles',
  SUBMISSIONS: 'sk_artwork_submissions',
  MESSAGES: 'sk_marketplace_messages',
  SUBSCRIPTIONS: 'sk_artist_subscriptions',
};

// 1. SUBSCRIPTION PLANS
export const getSubscriptionPlans = (): SubscriptionPlan[] => {
  if (typeof window === 'undefined') return DEFAULT_PLANS;
  const stored = localStorage.getItem(STORAGE_KEYS.PLANS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(DEFAULT_PLANS));
    return DEFAULT_PLANS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_PLANS;
  }
};

export const saveSubscriptionPlans = (plans: SubscriptionPlan[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
};

export const upsertSubscriptionPlan = (plan: Partial<SubscriptionPlan> & { name: string; price: number; billing_period: 'weekly' | 'monthly' | 'yearly' }) => {
  const plans = getSubscriptionPlans();
  if (plan.id) {
    const idx = plans.findIndex(p => p.id === plan.id);
    if (idx !== -1) {
      plans[idx] = { ...plans[idx], ...plan, updated_at: new Date().toISOString() };
    }
  } else {
    const newPlan: SubscriptionPlan = {
      id: `plan-${Date.now()}`,
      name: plan.name,
      price: plan.price,
      billing_period: plan.billing_period,
      max_submissions: plan.max_submissions ?? 10,
      max_listings: plan.max_listings ?? 10,
      description: plan.description ?? 'Artist membership plan.',
      features: plan.features ?? ['Artwork submissions', 'Founder curation', 'Artist profile'],
      is_active: plan.is_active ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    plans.push(newPlan);
  }
  saveSubscriptionPlans(plans);
  return plans;
};

// 2. ARTIST PROFILES & SUBSCRIPTIONS
export const getArtistProfiles = (): ArtistProfile[] => {
  if (typeof window === 'undefined') return DEFAULT_ARTIST_PROFILES;
  const stored = localStorage.getItem(STORAGE_KEYS.ARTISTS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.ARTISTS, JSON.stringify(DEFAULT_ARTIST_PROFILES));
    return DEFAULT_ARTIST_PROFILES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_ARTIST_PROFILES;
  }
};

export const saveArtistProfiles = (profiles: ArtistProfile[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ARTISTS, JSON.stringify(profiles));
};

export const getArtistProfileByUserId = (userId: string): ArtistProfile => {
  const profiles = getArtistProfiles();
  let found = profiles.find(p => p.user_id === userId);
  if (!found) {
    found = {
      id: `art-prof-${Date.now()}`,
      user_id: userId,
      artist_name: 'Artist Creator',
      bio: 'Independent fine artist showcasing custom paintings.',
      specialties: ['Fine Art', 'Canvas Painting'],
      studio_name: 'Creative Studio',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      phone: '+2349072994416',
      email: 'artist@skartwork.com',
      subscription_status: 'Active',
      current_plan_id: 'plan-monthly',
      subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      total_submissions: 0,
      active_listings: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    profiles.push(found);
    saveArtistProfiles(profiles);
  }
  return found;
};

export const updateArtistSubscriptionPlan = (userId: string, planId: string) => {
  const profiles = getArtistProfiles();
  const plans = getSubscriptionPlans();
  const plan = plans.find(p => p.id === planId) || plans[0];
  const idx = profiles.findIndex(p => p.user_id === userId);
  
  const expiresDays = plan.billing_period === 'weekly' ? 7 : plan.billing_period === 'monthly' ? 30 : 365;

  if (idx !== -1) {
    profiles[idx] = {
      ...profiles[idx],
      current_plan_id: plan.id,
      subscription_status: 'Active',
      subscription_expires_at: new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    saveArtistProfiles(profiles);
    return profiles[idx];
  }
  return null;
};

// 3. ARTWORK SUBMISSIONS
export const getArtworkSubmissions = (): ArtworkSubmission[] => {
  if (typeof window === 'undefined') return DEFAULT_SUBMISSIONS;
  const stored = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(DEFAULT_SUBMISSIONS));
    return DEFAULT_SUBMISSIONS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_SUBMISSIONS;
  }
};

export const saveArtworkSubmissions = (submissions: ArtworkSubmission[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
};

export const createArtworkSubmission = (submission: Omit<ArtworkSubmission, 'id' | 'status' | 'submitted_at' | 'updated_at' | 'is_published'>): ArtworkSubmission => {
  const submissions = getArtworkSubmissions();
  const newSubmission: ArtworkSubmission = {
    ...submission,
    id: `sub-${Date.now()}`,
    status: 'pending_approval',
    is_published: false,
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  submissions.unshift(newSubmission);
  saveArtworkSubmissions(submissions);

  // Update artist total submissions count
  const profiles = getArtistProfiles();
  const pIdx = profiles.findIndex(p => p.user_id === submission.artist_id);
  if (pIdx !== -1) {
    profiles[pIdx].total_submissions += 1;
    saveArtistProfiles(profiles);
  }

  return newSubmission;
};

export const updateSubmissionStatus = (
  id: string, 
  status: SubmissionStatus, 
  feedback?: string, 
  adminPrice?: number
): ArtworkSubmission | null => {
  const submissions = getArtworkSubmissions();
  const idx = submissions.findIndex(s => s.id === id);
  if (idx !== -1) {
    submissions[idx].status = status;
    if (feedback !== undefined) submissions[idx].admin_feedback = feedback;
    if (adminPrice !== undefined) submissions[idx].admin_price = adminPrice;
    submissions[idx].updated_at = new Date().toISOString();
    
    // Auto-create message if feedback given
    if (feedback) {
      sendMessage({
        sender_id: 'usr-admin-master',
        sender_name: 'Abdulmajeed Olasunkanmi O. (Founder)',
        sender_role: 'admin',
        receiver_id: submissions[idx].artist_id,
        receiver_name: submissions[idx].artist_name,
        receiver_role: 'artist',
        submission_id: id,
        subject: `Artwork Moderation Update: "${submissions[idx].title}"`,
        message: `Status updated to [${status.toUpperCase()}]. ${feedback}`,
      });
    }

    saveArtworkSubmissions(submissions);
    return submissions[idx];
  }
  return null;
};

export const publishSubmissionListing = (id: string, finalTitle?: string, finalPrice?: number, finalDescription?: string): ArtworkSubmission | null => {
  const submissions = getArtworkSubmissions();
  const idx = submissions.findIndex(s => s.id === id);
  if (idx !== -1) {
    if (finalTitle) submissions[idx].title = finalTitle;
    if (finalPrice !== undefined) submissions[idx].admin_price = finalPrice;
    if (finalDescription) submissions[idx].description = finalDescription;
    
    submissions[idx].status = 'approved';
    submissions[idx].is_published = true;
    submissions[idx].product_id = `prod-pub-${Date.now()}`;
    submissions[idx].updated_at = new Date().toISOString();

    saveArtworkSubmissions(submissions);

    // Update active listings count
    const profiles = getArtistProfiles();
    const pIdx = profiles.findIndex(p => p.user_id === submissions[idx].artist_id);
    if (pIdx !== -1) {
      profiles[pIdx].active_listings += 1;
      saveArtistProfiles(profiles);
    }

    return submissions[idx];
  }
  return null;
};

// 4. MESSAGES
export const getMarketplaceMessages = (): MarketplaceMessage[] => {
  if (typeof window === 'undefined') return DEFAULT_MESSAGES;
  const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
    return DEFAULT_MESSAGES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_MESSAGES;
  }
};

export const saveMarketplaceMessages = (messages: MarketplaceMessage[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
};

export const sendMessage = (msg: Omit<MarketplaceMessage, 'id' | 'created_at' | 'is_read'>): MarketplaceMessage => {
  const messages = getMarketplaceMessages();
  const newMsg: MarketplaceMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    is_read: false,
    created_at: new Date().toISOString(),
  };
  messages.unshift(newMsg);
  saveMarketplaceMessages(messages);
  return newMsg;
};

// 5. COMMISSION SETTING
export const DEFAULT_COMMISSION: CommissionSetting = {
  id: 'comm-1',
  commission_percentage: 15, // 15% SK Artworks Commission
  payout_schedule: 'weekly',
  min_payout_amount: 10000,
  updated_at: new Date().toISOString(),
};

export const getCommissionSetting = (): CommissionSetting => {
  if (typeof window === 'undefined') return DEFAULT_COMMISSION;
  const stored = localStorage.getItem('sk_commission_setting');
  if (!stored) {
    localStorage.setItem('sk_commission_setting', JSON.stringify(DEFAULT_COMMISSION));
    return DEFAULT_COMMISSION;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_COMMISSION;
  }
};

export const updateCommissionSetting = (percentage: number): CommissionSetting => {
  const setting: CommissionSetting = {
    ...getCommissionSetting(),
    commission_percentage: percentage,
    updated_at: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem('sk_commission_setting', JSON.stringify(setting));
  }
  return setting;
};

// 6. BOOKINGS & EARNINGS
export const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    booking_number: 'SKB-8091',
    client_name: 'Dr. Tunde Alabi',
    client_email: 'tunde.alabi@gmail.com',
    client_phone: '+2348039876543',
    artist_id: 'usr-artist-1',
    artist_name: 'Elena Rostova',
    artist_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    service_id: 'serv-5',
    service_title: 'Portrait Painting (Linen Oil Edition)',
    total_amount: 150000,
    commission_rate: 15,
    commission_amount: 22500,
    artist_earnings: 127500,
    date: '2026-03-20',
    notes: 'Family portrait for anniversary living room wall.',
    status: 'confirmed',
    payment_status: 'paid',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'book-102',
    booking_number: 'SKB-8092',
    client_name: 'Chief Kenneth Okoye',
    client_email: 'okoye.investments@yahoo.com',
    client_phone: '+2348122334455',
    artist_id: 'usr-admin-master',
    artist_name: 'Abdulmajeed Olasunkanmi O. (Founder)',
    artist_avatar: '/founder.jpg',
    service_id: 'serv-7',
    service_title: 'Botanical Sanctuary Custom Mural',
    total_amount: 280000,
    commission_rate: 15,
    commission_amount: 42000,
    artist_earnings: 238000,
    date: '2026-03-25',
    notes: 'Feature wall mural for Lekki Phase 1 villa.',
    status: 'in_progress',
    payment_status: 'paid',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'book-103',
    booking_number: 'SKB-8093',
    client_name: 'Nneka Williams',
    client_email: 'nneka.w@gmail.com',
    client_phone: '+2348091122334',
    artist_id: 'usr-artist-2',
    artist_name: 'Marcus Vance',
    artist_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    service_id: 'serv-1',
    service_title: 'Architectural Shadow & Bronze Wash',
    total_amount: 160000,
    commission_rate: 15,
    commission_amount: 24000,
    artist_earnings: 136000,
    date: '2026-03-28',
    notes: 'Textured wall sculpture wash for commercial reception.',
    status: 'pending',
    payment_status: 'unpaid',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const getBookings = (): Booking[] => {
  if (typeof window === 'undefined') return DEFAULT_BOOKINGS;
  const stored = localStorage.getItem('sk_bookings');
  if (!stored) {
    localStorage.setItem('sk_bookings', JSON.stringify(DEFAULT_BOOKINGS));
    return DEFAULT_BOOKINGS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_BOOKINGS;
  }
};

export const saveBookings = (bookings: Booking[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sk_bookings', JSON.stringify(bookings));
};

export const createBooking = (data: Omit<Booking, 'id' | 'booking_number' | 'commission_amount' | 'artist_earnings' | 'created_at' | 'updated_at'>): Booking => {
  const bookings = getBookings();
  const commSetting = getCommissionSetting();
  const commRate = data.commission_rate || commSetting.commission_percentage;
  const commissionAmount = (data.total_amount * commRate) / 100;
  const artistEarnings = data.total_amount - commissionAmount;

  const newBooking: Booking = {
    ...data,
    id: `book-${Date.now()}`,
    booking_number: `SKB-${Math.floor(1000 + Math.random() * 9000)}`,
    commission_rate: commRate,
    commission_amount: commissionAmount,
    artist_earnings: artistEarnings,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  bookings.unshift(newBooking);
  saveBookings(bookings);

  // Auto-send notification message to artist
  sendMessage({
    sender_id: 'sys-booking-engine',
    sender_name: `Client Booking: ${data.client_name}`,
    sender_role: 'customer',
    receiver_id: data.artist_id,
    receiver_name: data.artist_name,
    receiver_role: 'artist',
    subject: `New Client Booking #${newBooking.booking_number}`,
    message: `Client ${data.client_name} (${data.client_phone}, ${data.client_email}) placed a booking for "${data.service_title || 'Custom Service'}". Total: NGN ${data.total_amount.toLocaleString()} (Your Earnings: NGN ${artistEarnings.toLocaleString()}). Date requested: ${data.date}.`,
  });

  return newBooking;
};

export const updateBookingStatus = (id: string, status: Booking['status'], paymentStatus?: Booking['payment_status']): Booking | null => {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    if (paymentStatus) bookings[idx].payment_status = paymentStatus;
    bookings[idx].updated_at = new Date().toISOString();
    saveBookings(bookings);
    return bookings[idx];
  }
  return null;
};

// 7. ARTIST CMS CONTROLS
export const upsertArtistProfileInStore = (profile: Partial<ArtistProfile> & { artist_name: string; email: string }) => {
  const profiles = getArtistProfiles();
  if (profile.id) {
    const idx = profiles.findIndex(p => p.id === profile.id || p.user_id === profile.user_id);
    if (idx !== -1) {
      profiles[idx] = { ...profiles[idx], ...profile, updated_at: new Date().toISOString() };
      saveArtistProfiles(profiles);
      return profiles[idx];
    }
  }
  const newProfile: ArtistProfile = {
    id: `art-prof-${Date.now()}`,
    user_id: profile.user_id || `usr-artist-${Date.now()}`,
    artist_name: profile.artist_name,
    bio: profile.bio || 'New artist profile registered on SK Artworks.',
    specialties: profile.specialties || ['Fine Art Painting'],
    studio_name: profile.studio_name || `${profile.artist_name} Studio`,
    avatar_url: profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    cover_image: profile.cover_image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200',
    location: profile.location || 'Lagos, Nigeria',
    rating: 5.0,
    reviews_count: 0,
    is_verified: true,
    is_featured: false,
    phone: profile.phone || '+2348000000000',
    email: profile.email,
    subscription_status: 'Active',
    current_plan_id: 'plan-monthly',
    total_submissions: 0,
    active_listings: 0,
    created_artworks_count: 0,
    bookings_count: 0,
    total_earnings: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  profiles.push(newProfile);
  saveArtistProfiles(profiles);
  return newProfile;
};

export const toggleArtistVisibility = (id: string): ArtistProfile | null => {
  const profiles = getArtistProfiles();
  const idx = profiles.findIndex(p => p.id === id);
  if (idx !== -1) {
    profiles[idx].is_featured = !profiles[idx].is_featured;
    profiles[idx].updated_at = new Date().toISOString();
    saveArtistProfiles(profiles);
    return profiles[idx];
  }
  return null;
};

export const deleteArtistProfile = (id: string): boolean => {
  const profiles = getArtistProfiles();
  const filtered = profiles.filter(p => p.id !== id);
  saveArtistProfiles(filtered);
  return filtered.length !== profiles.length;
};
