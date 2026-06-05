'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartContextType, CartItem, Color, Product } from '@/types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback(
    (product: Product, size: string, color: Color, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColor.name === color.name,
        );
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.selectedSize === size && i.selectedColor.name === color.name
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
      });
      setIsCartOpen(true);
    },
    [],
  );

  const removeItem = useCallback((productId: string, size: string, colorName: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.selectedSize === size && i.selectedColor.name === colorName),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, colorName: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, colorName);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.selectedSize === size && i.selectedColor.name === colorName
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const toggleCart = useCallback(() => setIsCartOpen((v) => !v), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
