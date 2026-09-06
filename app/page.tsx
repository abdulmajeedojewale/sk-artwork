'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShoppingBag, 
  Palette, 
  Star, 
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { DEMO_PRODUCTS, DEMO_PORTFOLIO, DEMO_SERVICES } from '@/lib/demoData';
import { ProductCard } from '@/components/ProductCard';
import { PortfolioCard } from '@/components/PortfolioCard';

export default function HomePage() {
  const featuredProducts = DEMO_PRODUCTS.filter((p) => p.is_featured);
  const featuredProjects = DEMO_PORTFOLIO.filter((p) => p.is_featured);

  return (
    <div className="space-y-28 pb-20">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Content */}
            <div className="space-y-7 text-center lg:text-left">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                Original Art,{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
                  Handcrafted
                </span>
                <br className="hidden sm:inline" />
                {' '}with Purpose
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Oil paintings, portrait commissions, wall murals, and fine art — created by real artists at <strong className="text-white">{siteConfig.name}</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/shop"
                  id="hero-shop-cta"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-base hover:bg-amber-400 shadow-xl shadow-amber-500/15 flex items-center justify-center gap-2.5 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Browse Artwork
                </Link>

                <Link
                  href="/portfolio"
                  id="hero-portfolio-cta"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white font-semibold text-base hover:bg-slate-800 flex items-center justify-center gap-2.5 transition-all"
                >
                  <Palette className="w-5 h-5 text-amber-400" />
                  View Portfolio
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-400">
                <div>
                  <span className="block text-xl font-bold text-white font-display">100%</span>
                  <span className="text-xs">Original Work</span>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div>
                  <span className="block text-xl font-bold text-white font-display">4.9</span>
                  <span className="text-xs flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Rating</span>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div>
                  <span className="block text-xl font-bold text-white font-display">50+</span>
                  <span className="text-xs">Artworks Sold</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-artist.png"
                  alt="Artist at work in the studio"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Subtle border accent */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURED ARTWORK ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-display">Curated Collection</span>
            <h2 className="text-3xl font-bold text-white font-display mt-1">
              Featured Paintings
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 group"
          >
            View All Artwork
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── MEET THE FOUNDER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121824] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Founder Image */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
              <img
                src={siteConfig.artistImage}
                alt={siteConfig.artistName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#121824] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121824] to-transparent lg:hidden" />
            </div>

            {/* Founder Bio */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-display">
                Meet the Founder
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {siteConfig.artistName}
              </h2>
              <p className="text-sm text-amber-400 font-semibold">Founder &amp; Lead Artist</p>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I am <strong className="text-white">{siteConfig.artistName}</strong> — the founder of {siteConfig.name}. 
                My work is rooted in a deep passion for visual expression: oil portraiture, wall murals, 
                landscape painting, and decorative fine art.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Every piece I create starts with a personal connection — whether it is capturing someone&apos;s likeness, 
                transforming a blank wall, or telling a story through colour and form. Art, to me, is about 
                creating something that stays with people long after they first see it.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 group"
                >
                  Read more about my journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-display">
            Our Craft
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            What We Create
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From canvas to wall, every piece is made with real skill and genuine creative intention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#121824] border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/30 transition-colors">
            <div className="text-3xl">🎨</div>
            <h3 className="text-lg font-bold text-white font-display">Canvas &amp; Portrait Painting</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Hand-painted oil and acrylic portraits, lifelike imagery, and scenic landscapes tailored to your memories and tastes.
            </p>
          </div>

          <div className="p-8 bg-[#121824] border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/30 transition-colors">
            <div className="text-3xl">🖌️</div>
            <h3 className="text-lg font-bold text-white font-display">Interior &amp; Wall Murals</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transforming blank walls into painted murals, decorative finishes, and artistic room features for homes and offices.
            </p>
          </div>

          <div className="p-8 bg-[#121824] border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/30 transition-colors">
            <div className="text-3xl">🗿</div>
            <h3 className="text-lg font-bold text-white font-display">Sculptures &amp; Fine Art</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tactile sculptures, bronze forms, and decorative artworks designed to bring three-dimensional character to any space.
            </p>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO SHOWCASE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-display">Selected Works</span>
            <h2 className="text-3xl font-bold text-white font-display mt-1">
              Portfolio Showcase
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 group"
          >
            Full Portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-display">
            Professional Services
          </span>
          <h2 className="text-3xl font-bold text-white font-display">
            Artwork Services
          </h2>
          <p className="text-sm text-slate-400">
            Need a portrait, landscape painting, or a mural for your space? We work with you directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_SERVICES.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-[#121824] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 shadow-lg"
            >
              <div>
                <div className="aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.image_url!}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white font-display">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-800">
                    {service.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800 mt-auto pt-4">
                <div>
                  <div className="text-[11px] text-slate-500 uppercase">Starting From</div>
                  <div className="text-lg font-bold text-white font-display">
                    {siteConfig.currency.format(service.starting_price)}
                  </div>
                </div>

                <Link
                  href="/services"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── WHY TRUST US ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#121824] border border-slate-800 p-8 sm:p-14 space-y-8">
          
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-display">
              Our Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Why Choose SK Artworks?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Choosing artwork is personal. We make it simple, transparent, and enjoyable. 
              Every piece is presented clearly so you can appreciate its creative character 
              and decide whether it belongs in your collection.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When you choose our artwork, you are supporting an ongoing artistic journey — 
              real creativity, personal expression, and craftsmanship you can see and feel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
            <div className="space-y-2">
              <div className="text-2xl">🎨</div>
              <h3 className="text-sm font-bold text-white">Original Creativity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Every piece has its own identity and visual character, conceived from genuine creative thought.</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">✨</div>
              <h3 className="text-sm font-bold text-white">Attention to Detail</h3>
              <p className="text-xs text-slate-400 leading-relaxed">From composition to finishing touches, every piece is carefully considered and professionally presented.</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🤝</div>
              <h3 className="text-sm font-bold text-white">Made for People</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Art is personal. We create work that different people can connect with and enjoy in their own way.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 p-8 sm:p-14 text-slate-950 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Ready to Find Your Next Piece?
            </h2>
            <p className="text-slate-950/70 text-sm sm:text-base font-medium">
              Explore original canvas paintings or reach out about a portrait, mural, or any artwork you have in mind.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/shop"
                className="px-6 py-3.5 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-slate-900 transition-colors shadow-lg"
              >
                Browse Artwork
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/25 backdrop-blur-sm text-slate-950 text-sm font-bold hover:bg-white/35 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
