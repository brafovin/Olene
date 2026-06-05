'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Share2, Ruler, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';

const badgeVariantMap: Record<string, 'new' | 'sale' | 'bestseller' | 'limited'> = {
  Neu: 'new', Sale: 'sale', Bestseller: 'bestseller', Limited: 'limited',
};

export default function ProductInfo({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [descOpen, setDescOpen] = useState(true);

  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        {product.badge && <Badge variant={badgeVariantMap[product.badge]}>{product.badge}</Badge>}
        {product.isNew && <Badge variant="new">Neu eingetroffen</Badge>}
        {product.inStock ? (
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Auf Lager
          </span>
        ) : (
          <span className="text-xs text-red-400">Ausverkauft</span>
        )}
      </div>

      {/* Name & Price */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
          {product.name}
        </h1>
        <p className="text-white/60 mt-2">{product.description}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} size="md" />
        <span className="text-white/80 font-semibold">{product.rating}</span>
        <Link href="#reviews" className="text-white/40 hover:text-white text-sm transition-colors">
          {product.reviewCount} Bewertungen
        </Link>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-white/30 line-through">{formatPrice(product.originalPrice)}</span>
            <span className="px-2.5 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-lg">
              -{calculateDiscount(product.originalPrice, product.price)}%
            </span>
          </>
        )}
      </div>

      {/* Color */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white/80">
            Farbe: <span className="text-white">{selectedColor.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              title={color.name}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                selectedColor.name === color.name
                  ? 'border-white scale-110 shadow-lg'
                  : 'border-white/20 hover:border-white/50'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white/80">Größe</span>
          <button className="flex items-center gap-1 text-xs text-brand-purple hover:text-brand-purple-light transition-colors">
            <Ruler size={12} />
            Größentabelle
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-14 h-12 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                selectedSize === size
                  ? 'bg-brand-purple/20 border-brand-purple text-white shadow-glow'
                  : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-xs text-white/40">Bitte wähle eine Größe aus.</p>
        )}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-white/80">Menge</span>
        <div className="flex items-center gap-3 bg-surface-2 rounded-xl p-1 border border-white/10">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            –
          </button>
          <span className="text-white font-semibold w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`btn-primary flex-1 flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {added ? (
            <>
              <Check size={20} />
              Hinzugefügt!
            </>
          ) : (
            <>
              <ShoppingBag size={20} />
              In den Warenkorb
            </>
          )}
        </button>
        <Link
          href={selectedSize ? '/checkout' : '#'}
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-base font-semibold rounded-full border border-white/20 text-white hover:bg-white/5 transition-all"
        >
          Jetzt kaufen
        </Link>
      </div>

      {/* Wishlist */}
      <button
        onClick={() => toggleItem(product)}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition-all text-sm font-medium ${
          wishlisted
            ? 'border-red-500/40 text-red-400 bg-red-500/10'
            : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
        }`}
      >
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        {wishlisted ? 'Zur Wunschliste hinzugefügt' : 'Zur Wunschliste'}
      </button>

      {/* Share */}
      <button className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
        <Share2 size={14} />
        Produkt teilen
      </button>

      {/* Description */}
      <div className="border-t border-white/10 pt-6 space-y-4">
        <button
          onClick={() => setDescOpen(!descOpen)}
          className="flex items-center justify-between w-full text-white font-semibold"
        >
          Produktbeschreibung
          {descOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {descOpen && (
          <div className="text-white/60 text-sm leading-relaxed space-y-3">
            <p>{product.longDescription}</p>
            {product.material && (
              <p className="text-white/40">
                <strong className="text-white/60">Material:</strong> {product.material}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
