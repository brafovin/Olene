'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Product } from '@/types';

export default function ProductImages({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const panels = [
    { label: 'Vorderseite', opacity: 0 },
    { label: 'Rückseite', opacity: 0.1 },
    { label: 'Detail', opacity: 0.2 },
    { label: 'Look', opacity: 0.3 },
  ];

  const prev = () => setActiveIdx((i) => (i === 0 ? panels.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === panels.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden group">
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{ background: product.gradient }}
        >
          {/* Decorative overlays */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(135deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 20px)',
              }}
            />
            {/* Panel-specific tint */}
            <div
              className="absolute inset-0 bg-black transition-opacity duration-300"
              style={{ opacity: panels[activeIdx].opacity }}
            />
          </div>

          {/* Label */}
          <div className="absolute top-6 left-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 text-white/80 text-sm font-medium">
              {panels[activeIdx].label}
            </div>
          </div>

          {/* Brand watermark */}
          <div className="absolute bottom-6 right-6 text-white/30 font-display font-bold text-lg">
            OLENE
          </div>
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
        >
          <ChevronRight size={18} />
        </button>

        {/* Zoom hint */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-all">
          <ZoomIn size={12} />
          Zoom
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {panels.map((_, i) => (
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
        {panels.map((panel, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              i === activeIdx ? 'border-brand-purple shadow-glow' : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div
              className="absolute inset-0"
              style={{ background: product.gradient }}
            >
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: panel.opacity + 0.1 }}
              />
            </div>
            <div className="absolute inset-0 flex items-end p-1.5">
              <span className="text-white/60 text-[10px] font-medium">{panel.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
