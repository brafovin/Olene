'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Sommerkleider',
    href: '/shop?category=Sommerkleider',
    gradient: 'linear-gradient(135deg, #8A2BE2 0%, #DA22FF 100%)',
    count: '10 Styles',
    emoji: '👗',
    imageId: '1496747611176-843222e1e57c', // Blue Lagoon Kleid
  },
  {
    name: 'Zweiteilige Sets',
    href: '/shop?category=Zweiteilige+Sets',
    gradient: 'linear-gradient(135deg, #F7971E 0%, #FFD200 100%)',
    count: '6 Styles',
    emoji: '🎽',
    imageId: '1434389677669-e08b4cac3105', // Sunset Glow Set
  },
  {
    name: 'Tops & Shirts',
    href: '/shop?category=Tops+%26+T-Shirts',
    gradient: 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
    count: '3 Styles',
    emoji: '👚',
    imageId: '1469334031218-e382a71b716b', // Summer Vibes Top
  },
  {
    name: 'Shorts & Röcke',
    href: '/shop?category=Shorts',
    gradient: 'linear-gradient(135deg, #00AEEF 0%, #0077B6 100%)',
    count: '4 Styles',
    emoji: '🩳',
    imageId: '1520367445093-50dc08a59d9d', // Ocean Breeze Shorts
  },
  {
    name: 'Strand-Outfits',
    href: '/shop?category=Strand-Outfits',
    gradient: 'linear-gradient(135deg, #40E0D0 0%, #FF8C00 100%)',
    count: '1 Style',
    emoji: '👙',
    imageId: '1544551763-46a013bb70d5', // Beach Queen Set
  },
  {
    name: 'Sale',
    href: '/shop?badge=Sale',
    gradient: 'linear-gradient(135deg, #FC4A1A 0%, #F7B733 100%)',
    count: 'Bis -30%',
    emoji: '🔥',
    imageId: '1512436991641-6745cae1b9f8', // Festival Queen
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-brand-purple text-sm font-semibold uppercase tracking-widest mb-3">Kategorien</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Dein Style,<br />
            <span className="gradient-text">deine Wahl</span>
          </h2>
        </div>
        <Link href="/shop" className="hidden sm:flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
          Alle Styles
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <Link
            key={cat.name}
            href={cat.href}
            className={`group relative rounded-2xl overflow-hidden hover-glow transition-all duration-300 ${
              i === 0 ? 'md:col-span-2 row-span-1' : ''
            }`}
          >
            {/* Gradient fallback */}
            <div className="absolute inset-0" style={{ background: cat.gradient }} />

            {/* Real photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://images.unsplash.com/photo-${cat.imageId}?auto=format&fit=crop&w=${i === 0 ? 800 : 500}&h=400&q=75`}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Gradient overlay so text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/60 transition-all duration-300" />

            {/* Content */}
            <div className="relative p-6 md:p-8 flex flex-col justify-between min-h-[140px] md:min-h-[180px]">
              <div className="flex items-start justify-between">
                <span className="text-3xl drop-shadow">{cat.emoji}</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow">{cat.name}</h3>
                <p className="text-white/80 text-sm mt-0.5 drop-shadow">{cat.count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
