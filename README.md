# 🎨 SK Artwork — E-Commerce & Creative Portfolio Platform

A modern, high-performance web application built with **Next.js 16 (App Router & Turbopack)**, **Tailwind CSS v4**, **TypeScript**, and **Supabase (PostgreSQL & Row-Level Security)**. 

Designed for creative visual artists to showcase portfolios, offer custom design services, and sell digital assets (3D icons, vector grids, PSD mockups) as well as physical prints with integrated **Paystack** and **Flutterwave** payments.

---

## ✨ Features

- 🛒 **Digital & Physical Asset Store**: Instant secure digital ZIP asset delivery & physical print shipping calculator.
- 💳 **Dual Nigerian & African Payment Providers**: Factory pattern abstraction supporting both Paystack and Flutterwave payment gateways.
- 🎨 **Artist Portfolio & Service Commissions**: Interactive artwork gallery with modal inquiry forms.
- 🔒 **Role-Based Authentication**: Public, Customer, and Administrator RBAC access control powered by Supabase Auth & SSR.
- 📊 **Executive Admin Dashboard**: Real-time sales analytics, product management, order processing, coupon codes, and store settings.
- 🌙 **Dark Glassmorphic Aesthetic**: Modern UI with micro-animations, vibrant gradients, and responsive layouts.
- ⚡ **SEO & Performance**: OpenGraph metadata, dynamic `sitemap.xml`, `robots.txt`, and optimized image loading.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (Turbopack)
- **Styling**: Tailwind CSS v4 & PostCSS
- **Backend & Database**: Supabase (PostgreSQL, RLS Policies, Auth, SSR)
- **Payment Gateways**: Paystack API & Flutterwave v3 API
- **Icons**: Lucide React & Custom Inline SVGs
- **Type Safety**: TypeScript 5+ & Zod

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18.x or 20.x installed
- npm or yarn

### 2. Installation

Clone the repository and install dependencies:

```bash
cd "sk artwork"
npm install
```

### 3. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your configuration variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_PAYMENT_PROVIDER=paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
PAYSTACK_SECRET_KEY=sk_test_xxx

NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-xxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-xxx
```

### 4. Database Setup (Supabase)

1. Create a new project on [Supabase](https://supabase.com).
2. Go to the SQL Editor in your Supabase dashboard.
3. Paste and run the contents of `supabase/schema.sql`.
4. This sets up all 13 PostgreSQL tables, auto-profile creation triggers, indexes, and Row-Level Security (RLS) policies.

---

## 💻 Local Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To build and verify the app for production:

```bash
npm run build
```

To run the production bundle locally:

```bash
npm run start
```

---

## 📄 License

Copyright © 2026 SK Artwork. All rights reserved.
