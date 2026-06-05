'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.badge === 'Bestseller' || p.isNew).slice(0, 8);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-brand-purple text-sm font-semibold uppercase tracking-widest mb-3">Highlights</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Trending jetzt
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden sm:flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
        >
          Alle ansehen
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-10 sm:hidden">
        <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
          Alle Produkte
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
