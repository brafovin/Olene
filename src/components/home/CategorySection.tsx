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
  },
  {
    name: 'Zweiteilige Sets',
    href: '/shop?category=Zweiteilige+Sets',
    gradient: 'linear-gradient(135deg, #F7971E 0%, #FFD200 100%)',
    count: '6 Styles',
    emoji: '🎽',
  },
  {
    name: 'Tops & Shirts',
    href: '/shop?category=Tops+%26+T-Shirts',
    gradient: 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
    count: '3 Styles',
    emoji: '👚',
  },
  {
    name: 'Shorts & Röcke',
    href: '/shop?category=Shorts',
    gradient: 'linear-gradient(135deg, #00AEEF 0%, #0077B6 100%)',
    count: '4 Styles',
    emoji: '🩳',
  },
  {
    name: 'Strand-Outfits',
    href: '/shop?category=Strand-Outfits',
    gradient: 'linear-gradient(135deg, #40E0D0 0%, #FF8C00 100%)',
    count: '1 Style',
    emoji: '👙',
  },
  {
    name: 'Sale',
    href: '/shop?badge=Sale',
    gradient: 'linear-gradient(135deg, #FC4A1A 0%, #F7B733 100%)',
    count: 'Bis -30%',
    emoji: '🔥',
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
        <Link
          href="/shop"
          className="hidden sm:flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
        >
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
            <div
              className="absolute inset-0 shine-effect"
              style={{ background: cat.gradient }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="relative p-6 md:p-8 flex flex-col justify-between min-h-[140px] md:min-h-[160px]">
              <div className="flex items-start justify-between">
                <span className="text-4xl">{cat.emoji}</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg md:text-xl">{cat.name}</h3>
                <p className="text-white/70 text-sm mt-0.5">{cat.count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
