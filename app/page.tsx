'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShoppingBag, 
  Palette, 
  Star, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { DEMO_PRODUCTS, DEMO_PORTFOLIO, DEMO_SERVICES } from '@/lib/demoData';
import { getCustomArtworks } from '@/lib/marketplaceStore';
import { ProductCard } from '@/components/ProductCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { useImageViewer } from '@/context/ImageViewerContext';

export default function HomePage() {
  const { openImage } = useImageViewer();
  const customArtworks = getCustomArtworks();
  const allProducts = [...customArtworks, ...DEMO_PRODUCTS];

  const featuredProducts = allProducts.filter((p) => p.is_featured).slice(0, 6);
  const featuredProjects = DEMO_PORTFOLIO.slice(0, 3);

  return (
    <div className="space-y-28 pb-20">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Content */}
            <div className="space-y-7 text-center lg:text-left">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                Original African Art,{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
                  Hand-Painted
                </span>
                <br className="hidden sm:inline" />
                {' '}with Soul & Heritage
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Authentic oil paintings, portrait commissions, scenic landscapes, and architectural wall murals by <strong className="text-white">{siteConfig.name}</strong> studio.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/shop"
                  id="hero-shop-cta"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-base hover:bg-amber-400 shadow-xl shadow-amber-500/15 flex items-center justify-center gap-2.5 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Explore Original Artworks
                </Link>

                <Link
                  href="/portfolio"
                  id="hero-portfolio-cta"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white font-semibold text-base hover:bg-slate-800 flex items-center justify-center gap-2.5 transition-all"
                >
                  <Palette className="w-5 h-5 text-amber-400" />
                  View Studio Portfolio
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-400">
                <div>
                  <span className="block text-xl font-bold text-white font-display">100%</span>
                  <span className="text-xs">Original Paintings</span>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div>
                  <span className="block text-xl font-bold text-white font-display">5.0</span>
                  <span className="text-xs flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Studio Rating</span>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div>
                  <span className="block text-xl font-bold text-white font-display">Authentic</span>
                  <span className="text-xs">Certified Works</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative group cursor-pointer">
              <div 
                className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800"
                onClick={() => openImage('/hero-artist.png', 'SK Artworks Studio', 'Fine Art in Creation')}
              >
                <img
                  src="/hero-artist.png"
                  alt="Artist at work in the studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
              </div>
              <div 
                onClick={() => openImage('/hero-artist.png', 'SK Artworks Studio', 'Fine Art in Creation')}
                className="absolute top-4 right-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-semibold shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Expand Photo</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURED ARTWORK ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-display">Curated Studio Gallery</span>
            <h2 className="text-3xl font-bold text-white font-display mt-1">
              Featured Original Paintings
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 group"
          >
            View Full Art Collection
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
            <div 
              className="lg:col-span-5 relative min-h-[320px] lg:min-h-full cursor-pointer group"
              onClick={() => openImage(siteConfig.artistImage, siteConfig.artistName, 'Founder & Lead Fine Artist')}
            >
              <img
                src={siteConfig.artistImage}
                alt={siteConfig.artistName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#121824] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121824] to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-4 h-4" />
                <span>Expand Photo</span>
              </div>
            </div>

            {/* Founder Bio */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-display">
                Founder & Lead Artist
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {siteConfig.artistName}
              </h2>
              <p className="text-sm text-amber-400 font-semibold">Fine Artist & Studio Principal</p>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Welcome to <strong className="text-white">{siteConfig.name}</strong>. My work is dedicated to authentic African visual expression: oil portraiture, custom wall murals, landscape painting, and canvas fine art.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Every painting begins with personal dialogue and cultural contemplation — capturing character, elevating architecture, or evoking peace through color and texture.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 group"
                >
                  Read more about my background
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
            Our Studio Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Artistic Disciplines
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From gallery canvases to architectural walls, every work is hand-painted with professional mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#121824] border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/30 transition-colors">
            <div className="text-3xl">🎨</div>
            <h3 className="text-lg font-bold text-white font-display">Canvas &amp; Portrait Painting</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Original oil and acrylic portrait paintings, lifelike imagery, and scenic landscapes tailored to your memories and spaces.
            </p>
          </div>

          <div className="p-8 bg-[#121824] border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/30 transition-colors">
            <div className="text-3xl">🖌️</div>
            <h3 className="text-lg font-bold text-white font-display">Interior &amp; Wall Murals</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transforming living rooms, hotels, and offices into inspiring atmospheres with custom hand-painted wall murals and finishes.
            </p>
          </div>

          <div className="p-8 bg-[#121824] border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/30 transition-colors">
            <div className="text-3xl">✨</div>
            <h3 className="text-lg font-bold text-white font-display">Abstract &amp; Textured Fine Art</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Textured palette knife paintings, gold leaf accents, and earth-tone abstract compositions for modern collectors.
            </p>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO SHOWCASE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-display">Selected Commissions</span>
            <h2 className="text-3xl font-bold text-white font-display mt-1">
              Portfolio Showcase
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 group"
          >
            View Full Portfolio
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
            Custom Commissions
          </span>
          <h2 className="text-3xl font-bold text-white font-display">
            Painting &amp; Mural Services
          </h2>
          <p className="text-sm text-slate-400">
            Commission a bespoke portrait, scenic landscape, or feature wall mural directly from our studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_SERVICES.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-[#121824] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 shadow-lg"
            >
              <div>
                <div 
                  className="aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => openImage(service.image_url!, service.title, `Starting from ${siteConfig.currency.format(service.starting_price)}`)}
                >
                  <img
                    src={service.image_url!}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                  Commission Art
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 p-8 sm:p-14 text-slate-950 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Ready to Collect Original African Art?
            </h2>
            <p className="text-slate-950/80 text-sm sm:text-base font-medium">
              Explore available fine art canvases or reach out to discuss a commissioned portrait or mural for your space.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/shop"
                className="px-6 py-3.5 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-slate-900 transition-colors shadow-lg"
              >
                Explore Paintings
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/25 backdrop-blur-sm text-slate-950 text-sm font-bold hover:bg-white/35 transition-colors"
              >
                Inquire With Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
