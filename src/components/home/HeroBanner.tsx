'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

// product photo IDs used in the hero
const HERO_PHOTO    = '1515886657613-9f3515b0c78f'; // Tropical Dream Kleid
const FLOAT_TOP     = '1591047139829-d91aecb6caea'; // Lila Traum Kleid
const FLOAT_BOTTOM  = '1544551763-46a013bb70d5';    // Beach Queen Set
const FLOAT_SIDE    = '1434389677669-e08b4cac3105'; // Sunset Glow Set

function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#0d0820] to-brand-black" />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8A2BE2 0%, transparent 70%)', animation: 'float 6s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00AEEF 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Text side ── */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
              <span className="text-sm text-brand-purple-light font-medium">Sommer-Kollektion 2025</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">Entdecke die</h1>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1]">
                <span className="gradient-text">heißesten</span>
              </h1>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">Sommer-Looks</h1>
            </div>

            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              Von Traumkleidern bis Festival-Sets – hier findest du deinen perfekten Look für jeden Sommermoment.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/shop" className="btn-primary flex items-center gap-2 px-8 py-4 text-base">
                Jetzt shoppen
                <ArrowRight size={18} />
              </Link>
              <Link href="/shop?badge=Neu" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-brand-purple flex items-center justify-center transition-colors">
                  <Play size={16} fill="currentColor" />
                </div>
                <span className="font-medium">Neuheiten entdecken</span>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              {[{ value: '500+', label: 'Styles' }, { value: '10k+', label: 'Käufer' }, { value: '4.9★', label: 'Bewertung' }].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Visual side ── */}
          <div className="relative hidden lg:flex justify-center">
            <div className="relative w-full max-w-sm">

              {/* Main portrait photo */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                {/* gradient fallback */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FFD700, #8A2BE2)' }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={unsplash(HERO_PHOTO, 600, 800)}
                  alt="Summer Fashion"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Bottom product info chip */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="text-white/50 text-xs mb-1 uppercase tracking-wider">Bestseller</div>
                    <div className="text-white font-semibold text-sm">Tropical Dream Kleid</div>
                    <div className="text-brand-purple-light font-bold mt-1">€59,99</div>
                  </div>
                </div>
              </div>

              {/* Floating card – top right */}
              <div
                className="absolute -top-5 -right-10 w-32 rounded-2xl overflow-hidden shadow-xl border border-white/15"
                style={{ animation: 'float 5s ease-in-out infinite' }}
              >
                <div className="aspect-[3/4] relative">
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #C8A2C8, #A855F7)' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unsplash(FLOAT_TOP, 200, 280)}
                    alt="Lila Traum"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white text-[11px] font-semibold leading-tight">Lila Traum</div>
                    <div className="text-white/70 text-[10px]">€72,99</div>
                  </div>
                </div>
              </div>

              {/* Floating card – bottom left */}
              <div
                className="absolute -bottom-5 -left-10 w-28 rounded-2xl overflow-hidden shadow-xl border border-white/15"
                style={{ animation: 'float 7s ease-in-out infinite reverse' }}
              >
                <div className="aspect-square relative">
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #43C6AC, #40E0D0)' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unsplash(FLOAT_BOTTOM, 160, 160)}
                    alt="Beach Queen"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white text-[11px] font-semibold">Beach Queen</div>
                  </div>
                </div>
              </div>

              {/* Floating card – mid left (small) */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -left-14 w-24 rounded-2xl overflow-hidden shadow-xl border border-white/15"
                style={{ animation: 'float 6s ease-in-out infinite 1s' }}
              >
                <div className="aspect-[3/4] relative">
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #F7971E, #FFD200)' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unsplash(FLOAT_SIDE, 160, 220)}
                    alt="Sunset Glow"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white text-[10px] font-semibold leading-tight">Sunset Glow</div>
                    <div className="text-white/70 text-[10px]">€74,99</div>
                  </div>
                </div>
              </div>

              {/* Rating badge */}
              <div className="absolute top-1/3 -right-14 bg-surface border border-white/10 rounded-2xl px-3 py-2.5 shadow-xl text-center">
                <div className="text-yellow-400 text-base">⭐</div>
                <div className="text-white font-bold text-sm">4.9</div>
                <div className="text-white/40 text-[10px]">Rating</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
