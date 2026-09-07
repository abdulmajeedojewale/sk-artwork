export type UserRole = 'customer' | 'artist' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArtistProfile {
  id: string;
  user_id: string;
  artist_name: string;
  bio?: string | null;
  specialties?: string[];
  studio_name?: string | null;
  avatar_url?: string | null;
  cover_image?: string | null;
  location?: string | null;
  rating?: number;
  reviews_count?: number;
  is_verified?: boolean;
  is_featured?: boolean;
  phone?: string | null;
  email?: string | null;
  subscription_status: SubscriptionStatus;
  current_plan_id?: string | null;
  subscription_expires_at?: string | null;
  total_submissions: number;
  active_listings: number;
  created_artworks_count?: number;
  bookings_count?: number;
  total_earnings?: number;
  created_at: string;
  updated_at: string;
}

export type BillingPeriod = 'weekly' | 'monthly' | 'yearly';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billing_period: BillingPeriod;
  max_submissions: number;
  max_listings: number;
  description: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type SubscriptionStatus = 'Active' | 'Expired' | 'Cancelled' | 'Pending Payment';

export interface ArtistSubscription {
  id: string;
  artist_id: string;
  artist_name: string;
  plan_id: string;
  plan_name: string;
  price: number;
  billing_period: BillingPeriod;
  status: SubscriptionStatus;
  start_date: string;
  expires_at: string;
  created_at: string;
}

export type SubmissionStatus = 'pending_approval' | 'approved' | 'rejected' | 'changes_requested';

export interface ArtworkSubmission {
  id: string;
  artist_id: string;
  artist_name: string;
  artist_email?: string;
  title: string;
  description: string;
  category_id?: string | null;
  category_name?: string;
  proposed_price: number;
  admin_price?: number | null;
  images: string[];
  specifications: Record<string, string>;
  status: SubmissionStatus;
  admin_feedback?: string | null;
  is_published: boolean;
  product_id?: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface MarketplaceMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_role: UserRole;
  receiver_id: string;
  receiver_name: string;
  receiver_role: UserRole;
  submission_id?: string | null;
  order_id?: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type: 'product' | 'portfolio';
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string | null;
  display_order: number;
  created_at?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount_price?: number | null;
  category_id?: string | null;
  category?: Category | null;
  is_digital: boolean;
  digital_file_url?: string | null;
  stock: number;
  is_featured: boolean;
  is_published: boolean;
  is_approved?: boolean;
  artist_id?: string | null;
  artist_name?: string | null;
  submission_id?: string | null;
  specifications?: Record<string, string> | null;
  images?: ProductImage[];
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  gallery?: string[];
  category_id?: string | null;
  category?: Category | null;
  tools_used: string[];
  client_name?: string | null;
  date_completed?: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

export interface ServiceArtwork {
  id: string;
  service_id: string;
  title: string;
  image_url: string;
  artist_id: string;
  artist_name: string;
  artist_avatar?: string;
  artist_rating?: number;
  price?: number;
  description?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url?: string | null;
  starting_price: number;
  delivery_time_days: number;
  features: string[];
  artworks?: ServiceArtwork[];
  is_active: boolean;
  created_at: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type BookingPaymentStatus = 'unpaid' | 'paid' | 'refunded';

export interface Booking {
  id: string;
  booking_number: string;
  client_id?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  artist_id: string;
  artist_name: string;
  artist_avatar?: string;
  service_id?: string;
  service_title?: string;
  product_id?: string;
  product_title?: string;
  total_amount: number;
  commission_rate: number; // e.g. 15%
  commission_amount: number; // e.g. 15,000 NGN
  artist_earnings: number; // e.g. 85,000 NGN
  date: string;
  notes?: string;
  status: BookingStatus;
  payment_status: BookingPaymentStatus;
  created_at: string;
  updated_at: string;
}

export interface CommissionSetting {
  id: string;
  commission_percentage: number; // e.g., 15
  payout_schedule: string; // e.g., 'weekly' | 'biweekly' | 'monthly'
  min_payout_amount: number;
  updated_at: string;
}

export interface ArtistReview {
  id: string;
  artist_id: string;
  client_name: string;
  client_avatar?: string;
  rating: number;
  comment: string;
  service_title?: string;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  recipient_name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code?: string | null;
  is_default: boolean;
  created_at: string;
}

export type OrderStatus = 'Pending' | 'Payment Pending' | 'Paid' | 'Processing' | 'Ready' | 'Shipped' | 'Completed' | 'Cancelled' | 'Refunded';
export type PaymentStatus = 'Unpaid' | 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string | null;
  product_title: string;
  price: number;
  quantity: number;
  is_digital: boolean;
  download_token?: string | null;
  download_count?: number;
  product?: Product | null;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  customer_email: string;
  customer_name: string;
  shipping_address?: Address | null;
  total_amount: number;
  discount_amount: number;
  delivery_fee: number;
  net_amount: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_reference?: string | null;
  payment_provider?: string;
  notes?: string | null;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_value: number;
  max_uses: number;
  current_uses: number;
  expires_at?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  is_verified_purchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  user_name?: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id?: string;
  product_id: string;
  quantity: number;
  product: Product;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string | null;
  message: string;
  service_id?: string | null;
  artist_id?: string | null;
  artist_name?: string | null;
  is_read: boolean;
  created_at: string;
}
