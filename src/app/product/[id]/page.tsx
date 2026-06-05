'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import ProductImages from '@/components/product/ProductImages';
import ProductInfo from '@/components/product/ProductInfo';
import ProductReviews from '@/components/product/ProductReviews';
import ProductCard from '@/components/shop/ProductCard';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="font-display text-3xl font-bold text-white mb-3">Produkt nicht gefunden</h1>
        <p className="text-white/50 mb-8">Das gesuchte Produkt existiert leider nicht.</p>
        <Link href="/shop" className="btn-primary">
          Zum Shop
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/40 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-white transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-white/70">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Zurück zum Shop
        </Link>

        {/* Product grid */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Reviews */}
        <ProductReviews rating={product.rating} reviewCount={product.reviewCount} />

        {/* Related products */}
        {related.length > 0 && (
          <section className="py-12 border-t border-white/10">
            <h2 className="font-display text-3xl font-bold text-white mb-8">
              Das könnte dir auch gefallen
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
