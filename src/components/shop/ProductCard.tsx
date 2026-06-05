'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

const badgeVariantMap: Record<string, 'new' | 'sale' | 'bestseller' | 'limited'> = {
  Neu: 'new',
  Sale: 'sale',
  Bestseller: 'bestseller',
  Limited: 'limited',
};

function unsplashUrl(id: string, w = 600, h = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovering, setHovering] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 'M', product.colors[0]);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div
        className="rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-glow"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden shine-effect">
          {/* Gradient fallback – always rendered as background */}
          <div
            className="absolute inset-0"
            style={{ background: product.gradient }}
          />

          {/* Real photo */}
          {!imgError && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={unsplashUrl(product.imageId)}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovering ? 'scale(1.06)' : 'scale(1)' }}
              onError={() => setImgError(true)}
            />
          )}

          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant={badgeVariantMap[product.badge]}>{product.badge}</Badge>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              wishlisted
                ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                : 'bg-black/40 border border-white/10 text-white/60 opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Quick add – slides up on hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 z-10 transition-all duration-300 ${
              hovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-sm font-semibold hover:bg-white/20 transition-colors"
            >
              <ShoppingBag size={16} />
              Schnell hinzufügen
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-brand-purple-light transition-colors">
            {product.name}
          </h3>
          <p className="text-white/40 text-xs line-clamp-1">{product.description}</p>

          <div className="flex items-center gap-1.5">
            <Star size={12} fill="#FACC15" className="text-yellow-400" />
            <span className="text-white/60 text-xs">{product.rating}</span>
            <span className="text-white/30 text-xs">({product.reviewCount})</span>
          </div>

          {/* Color swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <div
                key={c.name}
                title={c.name}
                className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-white/30 text-xs">+{product.colors.length - 4}</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-white font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-white/30 text-sm line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-red-400 text-xs font-semibold">
                  -{calculateDiscount(product.originalPrice, product.price)}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
