'use client';

import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isCartOpen, toggleCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-white/10 z-50 flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-brand-purple" />
            <h2 className="text-lg font-semibold text-white">
              Warenkorb
              {totalItems > 0 && (
                <span className="ml-2 text-sm text-white/50">({totalItems} Artikel)</span>
              )}
            </h2>
          </div>
          <button
            onClick={toggleCart}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag size={48} className="text-white/20 mb-4" />
              <p className="text-white/50 text-lg mb-2">Dein Warenkorb ist leer</p>
              <p className="text-white/30 text-sm mb-6">Füge deine Lieblingsartikel hinzu!</p>
              <button
                onClick={toggleCart}
                className="btn-primary"
              >
                Jetzt shoppen
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                className="flex gap-4 p-4 bg-surface-2 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
              >
                {/* Product visual */}
                <div
                  className="w-20 h-24 rounded-xl flex-shrink-0 overflow-hidden"
                  style={{ background: item.product.gradient }}
                >
                  <div className="w-full h-full flex items-end p-2">
                    <div className="text-white/80 text-xs font-medium truncate">{item.product.category}</div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{item.product.name}</h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    Größe: {item.selectedSize} · {item.selectedColor.name}
                  </p>
                  <p className="text-sm font-semibold mt-1" style={{ color: item.product.accentColor }}>
                    {formatPrice(item.product.price)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center gap-2 bg-surface-3 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm text-white min-w-[1.25rem] text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor.name)}
                      className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            {/* Promo code */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Rabattcode eingeben"
                className="input-dark text-sm"
              />
              <button className="btn-outline text-sm px-4 py-2.5 whitespace-nowrap rounded-xl">
                Einlösen
              </button>
            </div>

            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Zwischensumme</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Versand</span>
                <span className="text-green-400">
                  {totalPrice >= 79 ? 'Gratis' : formatPrice(4.99)}
                </span>
              </div>
              {totalPrice < 79 && (
                <p className="text-xs text-brand-purple">
                  Noch {formatPrice(79 - totalPrice)} bis zum kostenlosen Versand!
                </p>
              )}
              <div className="flex justify-between text-white font-semibold text-base pt-2 border-t border-white/10">
                <span>Gesamt</span>
                <span>{formatPrice(totalPrice >= 79 ? totalPrice : totalPrice + 4.99)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
            >
              Zur Kasse
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/cart"
              onClick={toggleCart}
              className="w-full flex items-center justify-center text-sm text-white/50 hover:text-white transition-colors py-1"
            >
              Warenkorb ansehen
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
