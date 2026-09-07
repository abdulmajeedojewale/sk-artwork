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

// DEFAULT SUBSCRIPTION PLANS (Admin Editable)
export const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-weekly',
    name: 'Weekly Studio Pass',
    price: 5000,
    billing_period: 'weekly',
    max_submissions: 3,
    max_listings: 3,
    description: 'Flexible weekly subscription ideal for emerging African painters and artists.',
    features: [
      'Submit up to 3 original artworks/week',
      'Studio founder review within 48 hours',
      'Dedicated artist gallery showcase',
      'Direct collector inquiries channel',
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
    description: 'Our most popular plan for active artists seeking steady gallery curation and exposure.',
    features: [
      'Submit up to 12 original artworks/month',
      'Priority studio review (24 hours)',
      'Featured artist profile & bio',
      'Direct client booking and commission requests',
      'Studio newsletter showcase promotion',
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
    description: 'Comprehensive annual membership for established fine-art painters and master ateliers.',
    features: [
      'Unlimited artwork submissions',
      'Priority same-day curation workflow',
      'Premier gallery placement & exhibition features',
      'Dedicated client concierge & sales coordination',
      'Certificate of authenticity verification',
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// DEFAULT AUTHENTIC AFRICAN ARTIST PROFILES
export const DEFAULT_ARTIST_PROFILES: ArtistProfile[] = [
  {
    id: 'art-prof-founder',
    user_id: 'usr-admin-master',
    artist_name: 'Abdulmajeed Olasunkanmi O.',
    bio: 'Founder and Lead Fine Artist at SK Artwork Studio. Dedicated to African portraiture, expansive landscapes, life-image art, interior wall murals, and commissioned fine oil paintings.',
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
    artist_name: 'Chioma Adebayo',
    bio: 'Contemporary Nigerian oil painter capturing African feminine grace, traditional headwraps, and textured expressionist canvas compositions.',
    specialties: ['Oil Portraiture', 'Impasto Canvas', 'Figurative Art'],
    studio_name: 'Adebayo Fine Art Studio',
    avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
    location: 'Victoria Island, Lagos',
    rating: 4.9,
    reviews_count: 19,
    is_verified: true,
    is_featured: true,
    phone: '+2348123456789',
    email: 'chioma.adebayo@skartwork.com',
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
    artist_name: 'Babajide Adeleke',
    bio: 'Landscape painter and architectural muralist exploring Nigerian coastal sunlight, savannah plains, and large-format textured murals.',
    specialties: ['Landscape Art', 'Wall Murals', 'Canvas Painting'],
    studio_name: 'Adeleke Visual Arts',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=1200&auto=format&fit=crop&q=80',
    location: 'Abuja, Nigeria',
    rating: 4.8,
    reviews_count: 15,
    is_verified: true,
    is_featured: true,
    phone: '+2348098765432',
    email: 'babajide.adeleke@skartwork.com',
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
    bio: 'Colorist and fine art painter creating evocative figurative art, African heritage portraits, and metallic leaf canvas works.',
    specialties: ['Wall Murals', 'Portraiture', 'Metallic Leaf'],
    studio_name: 'Okafor Heritage Gallery',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
    location: 'Enugu, Nigeria',
    rating: 4.9,
    reviews_count: 22,
    is_verified: true,
    is_featured: true,
    phone: '+2348187654321',
    email: 'amara.okafor@skartwork.com',
    subscription_status: 'Active',
    current_plan_id: 'plan-monthly',
    subscription_expires_at: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    total_submissions: 14,
    active_listings: 9,
    created_artworks_count: 20,
    bookings_count: 18,
    total_earnings: 2850000,
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'art-prof-4',
    user_id: 'usr-artist-4',
    artist_name: 'Kofi Mensah',
    bio: 'Abstract visual artist focusing on earth-tone oil impasto, West African symbols, and rich textured gallery canvas pieces.',
    specialties: ['Abstract Painting', 'Oil Impasto', 'Fine Art Painting'],
    studio_name: 'Mensah Contemporary Atelier',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1200&auto=format&fit=crop&q=80',
    location: 'Accra & Lagos',
    rating: 4.7,
    reviews_count: 11,
    is_verified: true,
    is_featured: false,
    phone: '+233241234567',
    email: 'kofi.mensah@skartwork.com',
    subscription_status: 'Active',
    current_plan_id: 'plan-weekly',
    subscription_expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    total_submissions: 5,
    active_listings: 4,
    created_artworks_count: 8,
    bookings_count: 6,
    total_earnings: 890000,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// DEFAULT COMMISSION SETTING
export const DEFAULT_COMMISSION: CommissionSetting = {
  id: 'comm-default',
  commission_percentage: 15,
  payout_schedule: 'weekly',
  min_payout_amount: 10000,
  updated_at: new Date().toISOString(),
};

// STORAGE GETTERS & SETTERS
export const getPlans = (): SubscriptionPlan[] => {
  if (typeof window === 'undefined') return DEFAULT_PLANS;
  const saved = localStorage.getItem('sk_subscription_plans');
  return saved ? JSON.parse(saved) : DEFAULT_PLANS;
};

export const getSubscriptionPlans = getPlans;

export const savePlans = (plans: SubscriptionPlan[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sk_subscription_plans', JSON.stringify(plans));
};

export const saveSubscriptionPlans = savePlans;

export const upsertSubscriptionPlan = (plan: Partial<SubscriptionPlan> & { name: string; price: number }): SubscriptionPlan[] => {
  const plans = getPlans();
  if (plan.id) {
    const idx = plans.findIndex(p => p.id === plan.id);
    if (idx !== -1) {
      plans[idx] = { ...plans[idx], ...plan, updated_at: new Date().toISOString() } as SubscriptionPlan;
      savePlans(plans);
      return plans;
    }
  }
  const newPlan: SubscriptionPlan = {
    id: plan.id || `plan-${Date.now()}`,
    name: plan.name,
    price: plan.price,
    billing_period: plan.billing_period || 'monthly',
    max_submissions: plan.max_submissions || 10,
    max_listings: plan.max_listings || 10,
    description: plan.description || '',
    features: plan.features || [],
    is_active: plan.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  plans.push(newPlan);
  savePlans(plans);
  return plans;
};

export const getArtistProfiles = (): ArtistProfile[] => {
  if (typeof window === 'undefined') return DEFAULT_ARTIST_PROFILES;
  const saved = localStorage.getItem('sk_artist_profiles');
  return saved ? JSON.parse(saved) : DEFAULT_ARTIST_PROFILES;
};

export const getArtistProfileByUserId = (userId: string): ArtistProfile => {
  const profiles = getArtistProfiles();
  return profiles.find(p => p.user_id === userId || p.id === userId) || profiles[0];
};

export const saveArtistProfiles = (profiles: ArtistProfile[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sk_artist_profiles', JSON.stringify(profiles));
};

export const updateArtistSubscriptionPlan = (userId: string, planId: string): ArtistProfile | null => {
  const profiles = getArtistProfiles();
  const idx = profiles.findIndex(p => p.user_id === userId || p.id === userId);
  if (idx !== -1) {
    profiles[idx].current_plan_id = planId;
    profiles[idx].subscription_status = 'Active';
    profiles[idx].subscription_expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    profiles[idx].updated_at = new Date().toISOString();
    saveArtistProfiles(profiles);
    return profiles[idx];
  }
  return null;
};

export const getCommissionSetting = (): CommissionSetting => {
  if (typeof window === 'undefined') return DEFAULT_COMMISSION;
  const saved = localStorage.getItem('sk_commission_setting');
  return saved ? JSON.parse(saved) : DEFAULT_COMMISSION;
};

export const saveCommissionSetting = (setting: CommissionSetting) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sk_commission_setting', JSON.stringify(setting));
};

export const updateCommissionSetting = (percentage: number, payout_schedule: 'daily' | 'weekly' | 'monthly' = 'weekly', min_payout_amount: number = 10000) => {
  const current = getCommissionSetting();
  const updated: CommissionSetting = {
    ...current,
    commission_percentage: percentage,
    payout_schedule: payout_schedule as any,
    min_payout_amount: min_payout_amount,
    updated_at: new Date().toISOString(),
  };
  saveCommissionSetting(updated);
  return updated;
};

export const getArtworkSubmissions = (): ArtworkSubmission[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('sk_artwork_submissions');
  return saved ? JSON.parse(saved) : [];
};

export const saveArtworkSubmissions = (subs: ArtworkSubmission[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sk_artwork_submissions', JSON.stringify(subs));
};

export const createArtworkSubmission = (data: Omit<ArtworkSubmission, 'id' | 'status' | 'is_published' | 'submitted_at' | 'updated_at'>): ArtworkSubmission => {
  const subs = getArtworkSubmissions();
  const newSub: ArtworkSubmission = {
    ...data,
    id: `sub-${Date.now()}`,
    status: 'pending_approval',
    is_published: false,
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  subs.unshift(newSub);
  saveArtworkSubmissions(subs);
  return newSub;
};

export const updateSubmissionStatus = (id: string, status: SubmissionStatus, adminFeedback?: string): ArtworkSubmission | null => {
  const subs = getArtworkSubmissions();
  const idx = subs.findIndex(s => s.id === id);
  if (idx !== -1) {
    subs[idx].status = status;
    if (adminFeedback !== undefined) subs[idx].admin_feedback = adminFeedback;
    if (status === 'approved') subs[idx].is_published = true;
    subs[idx].updated_at = new Date().toISOString();
    saveArtworkSubmissions(subs);
    return subs[idx];
  }
  return null;
};

export const publishSubmissionListing = (id: string, title?: string, price?: number, description?: string): ArtworkSubmission | null => {
  const subs = getArtworkSubmissions();
  const idx = subs.findIndex(s => s.id === id);
  if (idx !== -1) {
    subs[idx].status = 'approved';
    subs[idx].is_published = true;
    if (title) subs[idx].title = title;
    if (price) subs[idx].admin_price = price;
    if (description) subs[idx].description = description;
    subs[idx].updated_at = new Date().toISOString();
    saveArtworkSubmissions(subs);

    // Also add to custom artworks so it appears dynamically in the shop
    const sub = subs[idx];
    const newArt: Product = {
      id: `prod-sub-${sub.id}`,
      title: title || sub.title,
      slug: (title || sub.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: description || sub.description,
      price: price || sub.admin_price || sub.proposed_price,
      stock: 1,
      is_digital: false,
      is_featured: false,
      is_published: true,
      is_approved: true,
      artist_id: sub.artist_id,
      artist_name: sub.artist_name,
      submission_id: sub.id,
      category_id: sub.category_id || 'cat-paintings',
      specifications: sub.specifications || {},
      images: [
        {
          id: `img-${Date.now()}`,
          product_id: `prod-sub-${sub.id}`,
          image_url: sub.images?.[0] || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
          display_order: 1,
          created_at: new Date().toISOString(),
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addCustomArtwork(newArt);

    return subs[idx];
  }
  return null;
};

// CUSTOM ARTWORKS STORE
export const getCustomArtworks = (): Product[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('sk_custom_artworks');
  return saved ? JSON.parse(saved) : [];
};

export const saveCustomArtworks = (artworks: Product[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sk_custom_artworks', JSON.stringify(artworks));
};

export const addCustomArtwork = (artwork: Product) => {
  const artworks = getCustomArtworks();
  artworks.unshift(artwork);
  saveCustomArtworks(artworks);
  return artwork;
};

export const updateCustomArtwork = (id: string, artwork: Partial<Product>) => {
  const artworks = getCustomArtworks();
  const idx = artworks.findIndex(a => a.id === id);
  if (idx !== -1) {
    artworks[idx] = { ...artworks[idx], ...artwork, updated_at: new Date().toISOString() };
    saveCustomArtworks(artworks);
    return artworks[idx];
  }
  return null;
};

export const deleteCustomArtwork = (id: string) => {
  const artworks = getCustomArtworks();
  const filtered = artworks.filter(a => a.id !== id);
  saveCustomArtworks(filtered);
  return filtered.length !== artworks.length;
};

// MESSAGING STORE
export const getMessages = (): MarketplaceMessage[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('sk_marketplace_messages');
  return saved ? JSON.parse(saved) : [];
};

export const getMarketplaceMessages = getMessages;

export const saveMessages = (msgs: MarketplaceMessage[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sk_marketplace_messages', JSON.stringify(msgs));
};

export const sendMessage = (msgData: Omit<MarketplaceMessage, 'id' | 'created_at' | 'is_read'>): MarketplaceMessage => {
  const msgs = getMessages();
  const newMsg: MarketplaceMessage = {
    ...msgData,
    id: `msg-${Date.now()}`,
    created_at: new Date().toISOString(),
    is_read: false,
  };
  msgs.unshift(newMsg);
  saveMessages(msgs);
  return newMsg;
};

// BOOKINGS STORE
export const getBookings = (): Booking[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('sk_bookings');
  return saved ? JSON.parse(saved) : [];
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

  sendMessage({
    sender_id: 'sys-booking-engine',
    sender_name: `Client Booking: ${data.client_name}`,
    sender_role: 'customer',
    receiver_id: data.artist_id,
    receiver_name: data.artist_name,
    receiver_role: 'artist',
    subject: `New Client Commission Booking #${newBooking.booking_number}`,
    message: `Client ${data.client_name} (${data.client_phone}, ${data.client_email}) placed a booking for "${data.service_title || 'Custom Painting Service'}". Total: NGN ${data.total_amount.toLocaleString()} (Your Earnings: NGN ${artistEarnings.toLocaleString()}). Date requested: ${data.date}.`,
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

// ARTIST CMS PROFILE MANAGEMENT
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
    bio: profile.bio || 'Fine artist portfolio registered on SK Artworks.',
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
