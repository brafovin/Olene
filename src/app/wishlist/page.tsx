'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/shop/ProductCard';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl font-bold text-white">
              Wunschliste
            </h1>
            <p className="text-white/40 mt-1">
              {items.length === 0 ? 'Noch keine Artikel gespeichert' : `${items.length} gespeicherte Artikel`}
            </p>
          </div>
          {items.length > 0 && (
            <Link href="/shop" className="btn-outline text-sm py-2.5">
              Weiter shoppen
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-surface border border-white/10 flex items-center justify-center mb-6">
              <Heart size={36} className="text-white/20" />
            </div>
            <h2 className="text-white font-semibold text-2xl mb-3">Noch nichts gespeichert</h2>
            <p className="text-white/50 mb-8 max-w-sm">
              Klicke auf das Herz-Symbol bei Produkten, die du speichern möchtest.
            </p>
            <Link href="/shop" className="btn-primary flex items-center gap-2">
              Produkte entdecken
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/cart" className="btn-primary inline-flex items-center gap-2">
                <ShoppingBag size={20} />
                Zum Warenkorb
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
