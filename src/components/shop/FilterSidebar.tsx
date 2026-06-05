'use client';

import { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Category, FilterState } from '@/types';

const ALL_CATEGORIES: Category[] = [
  'Sommerkleider',
  'Tops & T-Shirts',
  'Shorts',
  'Röcke',
  'Zweiteilige Sets',
  'Strand-Outfits',
  'Accessoires',
];

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const ALL_COLORS = [
  { name: 'Schwarz', hex: '#1a1a1a' },
  { name: 'Weiß', hex: '#f5f5f5' },
  { name: 'Pink', hex: '#FF69B4' },
  { name: 'Lila', hex: '#8A2BE2' },
  { name: 'Blau', hex: '#00AEEF' },
  { name: 'Grün', hex: '#43E97B' },
  { name: 'Orange', hex: '#FF8C00' },
  { name: 'Gelb', hex: '#FFD700' },
];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/10 pb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-white font-semibold text-sm"
      >
        {title}
        <ChevronDown size={16} className={`text-white/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pt-1">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onClose, isMobile }: FilterSidebarProps) {
  const toggle = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const updateCategories = (cat: Category) =>
    onChange({ ...filters, categories: toggle(filters.categories, cat) });

  const updateSizes = (size: string) =>
    onChange({ ...filters, sizes: toggle(filters.sizes, size) });

  const updateColors = (color: string) =>
    onChange({ ...filters, colors: toggle(filters.colors, color) });

  const updatePrice = (range: [number, number]) =>
    onChange({ ...filters, priceRange: range });

  const clearAll = () =>
    onChange({ categories: [], sizes: [], colors: [], priceRange: [0, 200], sortBy: 'newest' });

  const hasFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200;

  return (
    <div
      className={`${
        isMobile
          ? 'fixed inset-0 z-50 flex items-end sm:items-start sm:justify-end'
          : 'w-64 flex-shrink-0'
      }`}
    >
      {isMobile && (
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      )}
      <div
        className={`${
          isMobile
            ? 'relative w-full sm:w-80 max-h-[90vh] sm:h-screen bg-surface border border-white/10 rounded-t-3xl sm:rounded-none overflow-y-auto animate-slide-up sm:animate-slide-in-right'
            : 'bg-surface rounded-2xl border border-white/10 p-6 space-y-5 sticky top-28'
        }`}
      >
        {isMobile && (
          <div className="sticky top-0 bg-surface flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-2 font-semibold text-white">
              <SlidersHorizontal size={18} className="text-brand-purple" />
              Filter
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-white">
              <X size={20} />
            </button>
          </div>
        )}

        <div className={isMobile ? 'p-5 space-y-5' : 'space-y-5'}>
          {/* Header */}
          {!isMobile && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-white">
                <SlidersHorizontal size={16} className="text-brand-purple" />
                Filter
              </div>
              {hasFilters && (
                <button onClick={clearAll} className="text-xs text-brand-purple hover:text-brand-purple-light transition-colors">
                  Alle löschen
                </button>
              )}
            </div>
          )}

          {/* Category */}
          <FilterSection title="Kategorie">
            <div className="space-y-2">
              {ALL_CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => updateCategories(cat)}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      filters.categories.includes(cat)
                        ? 'bg-brand-purple border-brand-purple'
                        : 'border-white/30 group-hover:border-brand-purple/60'
                    }`}
                  >
                    {filters.categories.includes(cat) && (
                      <svg viewBox="0 0 10 8" className="w-2.5 h-2 text-white fill-current">
                        <path d="M9 1L3.5 7 1 4.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Size */}
          <FilterSection title="Größe">
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => updateSizes(size)}
                  className={`w-12 h-10 rounded-lg text-sm font-medium border transition-all ${
                    filters.sizes.includes(size)
                      ? 'bg-brand-purple/20 border-brand-purple text-white'
                      : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Color */}
          <FilterSection title="Farbe">
            <div className="flex flex-wrap gap-3">
              {ALL_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => updateColors(color.name)}
                  title={color.name}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    filters.colors.includes(color.name)
                      ? 'border-white scale-110'
                      : 'border-white/20 hover:border-white/50'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </FilterSection>

          {/* Price */}
          <FilterSection title="Preis (€)">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>€{filters.priceRange[0]}</span>
                <span>€{filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={200}
                value={filters.priceRange[1]}
                onChange={(e) => updatePrice([filters.priceRange[0], Number(e.target.value)])}
                className="w-full accent-brand-purple"
              />
              <div className="flex gap-2">
                {[[0, 50], [50, 100], [100, 200]].map(([min, max]) => (
                  <button
                    key={`${min}-${max}`}
                    onClick={() => updatePrice([min, max])}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${
                      filters.priceRange[0] === min && filters.priceRange[1] === max
                        ? 'bg-brand-purple/20 border-brand-purple text-white'
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    €{min}–{max === 200 ? '200+' : `€${max}`}
                  </button>
                ))}
              </div>
            </div>
          </FilterSection>
        </div>

        {isMobile && (
          <div className="sticky bottom-0 bg-surface p-5 border-t border-white/10 flex gap-3">
            {hasFilters && (
              <button onClick={clearAll} className="btn-outline flex-1 py-3">
                Zurücksetzen
              </button>
            )}
            <button onClick={onClose} className="btn-primary flex-1 py-3">
              Ergebnisse anzeigen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
