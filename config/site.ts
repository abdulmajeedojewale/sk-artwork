export const siteConfig = {
  name: "SK Artwork",
  artistName: "Abdulmajeed Olasunkanmi O.",
  artistImage: "/founder.jpg",
  title: "SK Artwork | Professional Fine Art & Painting Studio",
  description: "Official artwork studio and portfolio of artist Abdulmajeed Olasunkanmi O. Specializing in portrait paintings, landscapes, life-image art, interior/exterior wall painting, decorative artwork, and custom commissions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://skartwork.com",
  ogImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80",
  
  currency: {
    code: "NGN",
    symbol: "₦",
    format: (amount: number) => {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    },
  },

  contact: {
    email: "abdulmajeedojewale@gmail.com",
    phone: "+2349072994416",
    address: "Lekki Phase 1, Lagos, Nigeria",
    workingHours: "Mon - Fri: 9:00 AM - 6:00 PM (WAT)",
  },

  socials: {
    instagram: "https://instagram.com/sk_artwork",
    twitter: "https://twitter.com/sk_artwork",
    behance: "https://behance.net/sk_artwork",
    dribbble: "https://dribbble.com/sk_artwork",
    github: "https://github.com/sk-artwork",
  },

  theme: {
    primaryColor: "#f59e0b",
    secondaryColor: "#8b5cf6",
    accentColor: "#ec4899",
    darkBg: "#0a0d14",
  },

  navLinks: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Artists", href: "/artists" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/services" },
    { name: "FAQs", href: "/faqs" },
  ],

  adminNavLinks: [
    { name: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
    { name: "Artwork Moderation", href: "/admin/submissions", icon: "CheckSquare" },
    { name: "Marketplace Artists", href: "/admin/artists", icon: "Users" },
    { name: "Subscription Plans", href: "/admin/subscriptions", icon: "CreditCard" },
    { name: "Published Products", href: "/admin/products", icon: "Package" },
    { name: "Orders", href: "/admin/orders", icon: "ShoppingBag" },
    { name: "Portfolio", href: "/admin/portfolio", icon: "Palette" },
    { name: "Messages", href: "/admin/messages", icon: "Mail" },
    { name: "Coupons", href: "/admin/coupons", icon: "Ticket" },
    { name: "Site Settings", href: "/admin/settings", icon: "Settings" },
  ],

  paymentProviders: {
    defaultProvider: (process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || "paystack") as "paystack" | "flutterwave",
    paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    flutterwavePublicKey: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
  }
};

export type SiteConfig = typeof siteConfig;
