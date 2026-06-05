'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#0d0820] to-brand-black" />
        {/* Animated blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #8A2BE2 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #00AEEF 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF6B6B 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="space-y-8">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
              <span className="text-sm text-brand-purple-light font-medium">Sommer-Kollektion 2025</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">
                Entdecke die
              </h1>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1]">
                <span className="gradient-text">heißesten</span>
              </h1>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">
                Sommer-Looks
              </h1>
            </div>

            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              Von Traumkleidern bis Festival-Sets – hier findest du deinen perfekten Look für jeden Sommermoment.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/shop" className="btn-primary flex items-center gap-2 px-8 py-4 text-base">
                Jetzt shoppen
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop?badge=Neu"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-brand-purple flex items-center justify-center transition-colors">
                  <Play size={16} fill="currentColor" />
                </div>
                <span className="font-medium">Neuheiten entdecken</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              {[
                { value: '500+', label: 'Styles' },
                { value: '10k+', label: 'Käufer' },
                { value: '4.9★', label: 'Bewertung' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div className="relative hidden lg:block">
            {/* Floating product cards */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main central card */}
              <div
                className="absolute inset-16 rounded-3xl overflow-hidden shadow-2xl hover-glow"
                style={{ background: 'linear-gradient(135deg, #8A2BE2 0%, #00AEEF 100%)' }}
              >
                <div className="w-full h-full relative p-8 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 30% 40%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-widest mb-2">Summer 2025</div>
                    <div className="text-white font-display text-3xl font-bold leading-tight">Sommer<br/>Kollektion</div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-white/60 text-xs mb-1">Ab</div>
                      <div className="text-white text-2xl font-bold">€24,99</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {[
                {
                  pos: 'top-0 left-0',
                  gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                  name: 'Tropical Dream',
                  price: '€59,99',
                  anim: 'float 4s ease-in-out infinite',
                },
                {
                  pos: 'top-0 right-0',
                  gradient: 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
                  name: 'Ocean Breeze',
                  price: '€34,99',
                  anim: 'float 5s ease-in-out infinite reverse',
                },
                {
                  pos: 'bottom-0 left-0',
                  gradient: 'linear-gradient(135deg, #DA22FF 0%, #9733EE 100%)',
                  name: 'Lila Traum',
                  price: '€72,99',
                  anim: 'float 6s ease-in-out infinite 1s',
                },
                {
                  pos: 'bottom-0 right-0',
                  gradient: 'linear-gradient(135deg, #F9D423 0%, #FF4E50 100%)',
                  name: 'Sunset Glow',
                  price: '€74,99',
                  anim: 'float 4.5s ease-in-out infinite reverse 0.5s',
                },
              ].map(({ pos, gradient, name, price, anim }) => (
                <div
                  key={name}
                  className={`absolute ${pos} w-32 h-36 rounded-2xl overflow-hidden shadow-xl`}
                  style={{ background: gradient, animation: anim }}
                >
                  <div className="w-full h-full flex flex-col justify-end p-3">
                    <div className="text-white text-xs font-semibold truncate">{name}</div>
                    <div className="text-white/80 text-xs">{price}</div>
                  </div>
                </div>
              ))}
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
