'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { productPhotoUrl, productPlaceholder } from '@/lib/productImage';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const badgeVariantMap: Record<string, 'new' | 'sale' | 'bestseller' | 'limited'> = {
  Neu: 'new',
  Sale: 'sale',
  Bestseller: 'bestseller',
  Limited: 'limited',
};

export default function ProductCard({ product }: ProductCardProps) {
  const [hovering, setHovering] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddSize = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    addItem(product, size, product.colors[0]);
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1500);
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
          {/* Guaranteed fitting illustration (always rendered behind) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productPlaceholder(product)}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Real Unsplash photo on top — hidden on error to reveal the illustration */}
          {!imgError && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={productPhotoUrl(product.imageId)}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovering ? 'scale(1.06)' : 'scale(1)' }}
              onError={() => setImgError(true)}
            />
          )}

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

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

          {/* Size quick-add (slides up on hover) */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 z-10 transition-all duration-300 ${
              hovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {addedSize ? (
              <div className="flex items-center justify-center gap-2 py-2.5 bg-green-500/20 border border-green-500/40 rounded-xl text-green-400 text-sm font-semibold backdrop-blur-md">
                <Check size={15} />
                Größe {addedSize} hinzugefügt
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 justify-center">
                  <ShoppingBag size={11} className="text-white/50" />
                  <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider">Größe wählen</span>
                </div>
                <div className="flex gap-1.5 justify-center flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => handleAddSize(e, size)}
                      className="px-2.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/25 rounded-lg text-white text-xs font-bold hover:bg-white/25 hover:border-white/50 transition-all active:scale-95"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
