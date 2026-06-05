'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Kleider', href: '/shop?category=Sommerkleider' },
  { label: 'Sets', href: '/shop?category=Zweiteilige+Sets' },
  { label: 'Sale', href: '/shop?badge=Sale' },
  { label: 'Neu', href: '/shop?badge=Neu' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, toggleCart } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-brand-black/95 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        {/* Top bar */}
        <div className="border-b border-white/5 py-2 text-center text-xs text-white/50 hidden md:block">
          <span>Gratis Versand ab 79 € &nbsp;|&nbsp; Kostenlose Rücksendung &nbsp;|&nbsp;</span>
          <span className="gradient-text font-semibold">Jetzt bis zu 30% Sale!</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Sparkles
                  size={20}
                  className="text-brand-purple group-hover:text-brand-blue transition-colors duration-300"
                />
              </div>
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight gradient-text">
                OLENE
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm font-medium text-white/70 hover:text-white relative group transition-colors duration-200"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-brand-purple to-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <button
                className="p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Suche"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 text-white/70 hover:text-white transition-colors">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-purple text-white text-xs rounded-full flex items-center justify-center font-bold leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link href="/account" className="hidden md:flex p-2 text-white/70 hover:text-white transition-colors">
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Warenkorb"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-brand-purple to-brand-blue text-white text-xs rounded-full flex items-center justify-center font-bold leading-none shadow-glow">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 animate-slide-up">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Suche nach Kleidern, Sets, Tops..."
                  className="input-dark pr-12"
                  autoFocus
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                  <Search size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-surface border-r border-white/10 flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="font-display text-2xl font-bold gradient-text">OLENE</span>
              <button onClick={() => setMobileOpen(false)} className="text-white/70">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 p-6 space-y-2">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="p-6 border-t border-white/10 space-y-3">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <User size={18} />
                Mein Konto
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <Heart size={18} />
                Wunschliste {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
