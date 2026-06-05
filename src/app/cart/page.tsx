'use client';

import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  const shipping = totalPrice >= 79 ? 0 : 4.99;
  const total = totalPrice + shipping;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-white">
            Warenkorb
            {totalItems > 0 && (
              <span className="text-white/40 font-sans text-2xl ml-3">({totalItems})</span>
            )}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={64} className="text-white/10 mb-6" />
            <h2 className="text-white font-semibold text-2xl mb-3">Dein Warenkorb ist leer</h2>
            <p className="text-white/50 mb-8 max-w-sm">
              Füge deine Lieblingsartikel hinzu und starte dein Sommer-Shopping!
            </p>
            <Link href="/shop" className="btn-primary flex items-center gap-2">
              Jetzt shoppen
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  className="flex gap-5 p-5 bg-surface rounded-2xl border border-white/5"
                >
                  {/* Product image */}
                  <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                    <div
                      className="w-24 h-28 md:w-28 md:h-32 rounded-xl overflow-hidden"
                      style={{ background: item.product.gradient }}
                    >
                      <div className="w-full h-full flex items-end p-2">
                        <span className="text-white/60 text-xs">{item.product.category}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="text-white font-semibold hover:text-brand-purple-light transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-sm text-white/40">
                          <span>Größe: <span className="text-white/70">{item.selectedSize}</span></span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor.name)}
                        className="text-white/30 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Qty */}
                      <div className="flex items-center gap-3 bg-surface-3 rounded-xl p-1.5 border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-white font-bold">{formatPrice(item.product.price * item.quantity)}</div>
                        {item.quantity > 1 && (
                          <div className="text-white/30 text-xs">{formatPrice(item.product.price)} / Stück</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue shopping */}
              <Link
                href="/shop"
                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors pt-2"
              >
                <ArrowLeft size={16} />
                Weiter shoppen
              </Link>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              {/* Promo */}
              <div className="bg-surface rounded-2xl border border-white/10 p-6">
                <h3 className="text-white font-semibold mb-3">Rabattcode</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code eingeben"
                    className="input-dark text-sm flex-1"
                  />
                  <button className="btn-outline text-sm px-4 py-2.5 rounded-xl whitespace-nowrap">
                    Einlösen
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-surface rounded-2xl border border-white/10 p-6 space-y-4">
                <h3 className="text-white font-semibold text-lg">Bestellübersicht</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Zwischensumme ({totalItems} Artikel)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Versand</span>
                    <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                      {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-xl p-3 text-xs text-brand-purple">
                      Noch {formatPrice(79 - totalPrice)} bis zum kostenlosen Versand!
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-3 flex justify-between text-white font-bold text-lg">
                    <span>Gesamt</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="text-white/30 text-xs">Inkl. MwSt.</div>
                </div>

                <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                  Zur Kasse
                  <ArrowRight size={18} />
                </Link>

                {/* Payment icons */}
                <div className="pt-2">
                  <p className="text-white/30 text-xs text-center mb-3">Sichere Zahlung mit</p>
                  <div className="flex items-center justify-center gap-3">
                    {['PayPal', 'Visa', 'MC', 'Klarna', '🍎Pay'].map((p) => (
                      <div
                        key={p}
                        className="px-2 py-1 bg-surface-3 rounded text-white/40 text-xs font-semibold border border-white/10"
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
