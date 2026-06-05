'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Product } from '@/types';

const VIEWS = [
  { label: 'Vorderseite' },
  { label: 'Rückseite' },
  { label: 'Detail' },
  { label: 'Look' },
];

function imageUrl(imageId: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export default function ProductImages({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const markError = (i: number) => setErrors((prev) => ({ ...prev, [i]: true }));
  const prev = () => setActiveIdx((i) => (i === 0 ? VIEWS.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === VIEWS.length - 1 ? 0 : i + 1));

  const activeView = VIEWS[activeIdx];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden group bg-surface-2">
        {/* Gradient fallback */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: product.gradient, opacity: errors[activeIdx] ? 1 : 0.3 }}
        />

        {/* Photo from Unsplash CDN */}
        {!errors[activeIdx] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={activeIdx}
            src={imageUrl(product.imageId, 600, 800)}
            alt={`${product.name} – ${activeView.label}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            onError={() => markError(activeIdx)}
          />
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* View label */}
        <div className="absolute top-5 left-5 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2 text-white/90 text-sm font-medium">
            {activeView.label}
          </div>
        </div>

        {/* Brand watermark */}
        <div className="absolute bottom-5 right-5 text-white/30 font-display font-bold text-lg pointer-events-none">
          OLENE
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
        >
          <ChevronRight size={18} />
        </button>

        {/* Zoom hint */}
        <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-all">
          <ZoomIn size={12} />
          Zoom
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {VIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`rounded-full transition-all ${
                i === activeIdx ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {VIEWS.map((view, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-surface-2 ${
              i === activeIdx ? 'border-brand-purple shadow-glow' : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: product.gradient }}
            />
            {!errors[i] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl(product.imageId, 150, 150)}
                alt={`${product.name} – ${view.label}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => markError(i)}
              />
            )}
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex items-end p-1.5">
              <span className="text-white/80 text-[10px] font-medium drop-shadow">{view.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
