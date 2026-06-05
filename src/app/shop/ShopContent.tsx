'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, LayoutGrid, List, Search, X } from 'lucide-react';
import { products } from '@/data/products';
import { Category, FilterState } from '@/types';
import ProductCard from '@/components/shop/ProductCard';
import FilterSidebar from '@/components/shop/FilterSidebar';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Neueste zuerst' },
  { value: 'popular', label: 'Beliebteste' },
  { value: 'price-asc', label: 'Preis aufsteigend' },
  { value: 'price-desc', label: 'Preis absteigend' },
  { value: 'rating', label: 'Beste Bewertung' },
] as const;

export default function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  const badgeParam = searchParams.get('badge');
  const queryParam = searchParams.get('q') || '';

  const [filters, setFilters] = useState<FilterState>({
    categories: categoryParam ? [categoryParam] : [],
    sizes: [],
    colors: [],
    priceRange: [0, 200],
    sortBy: 'newest',
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState(queryParam);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      );
    }

    if (badgeParam) {
      result = result.filter((p) => p.badge === badgeParam);
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) => filters.sizes.some((s) => p.sizes.includes(s)));
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) {
      result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [filters, search, badgeParam]);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative py-12 bg-surface border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8A2BE2, transparent)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #00AEEF, transparent)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {badgeParam === 'Sale'
              ? '🔥 Sale'
              : badgeParam === 'Neu'
              ? '✨ Neuheiten'
              : categoryParam || 'Alle Styles'}
          </h1>
          <p className="text-white/50">{filtered.length} Produkte gefunden</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Produkte suchen..."
              className="input-dark pl-9 pr-8 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="input-dark max-w-[200px] text-sm bg-surface-2 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 btn-outline text-sm py-2.5"
          >
            <SlidersHorizontal size={16} />
            Filter
          </button>

          <div className="hidden sm:flex items-center gap-1 bg-surface-2 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md transition-all ${
                view === 'grid' ? 'bg-surface-4 text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-all ${
                view === 'list' ? 'bg-surface-4 text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-white font-semibold text-xl mb-2">Keine Produkte gefunden</h3>
                <p className="text-white/50 mb-6">Versuche andere Filter oder Suchbegriffe.</p>
                <button
                  onClick={() => {
                    setFilters({
                      categories: [],
                      sizes: [],
                      colors: [],
                      priceRange: [0, 200],
                      sortBy: 'newest',
                    });
                    setSearch('');
                  }}
                  className="btn-primary"
                >
                  Filter zurücksetzen
                </button>
              </div>
            ) : (
              <div
                className={
                  view === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
                    : 'space-y-4'
                }
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onClose={() => setMobileFiltersOpen(false)}
          isMobile
        />
      )}
    </div>
  );
}
