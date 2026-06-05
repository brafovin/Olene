export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  description: string;
  longDescription: string;
  sizes: string[];
  colors: Color[];
  imageId: string;
  gradient: string;
  accentColor: string;
  rating: number;
  reviewCount: number;
  badge?: 'Neu' | 'Bestseller' | 'Sale' | 'Limited';
  isNew: boolean;
  inStock: boolean;
  material?: string;
  tags: string[];
}

export type Category =
  | 'Sommerkleider'
  | 'Tops & T-Shirts'
  | 'Shorts'
  | 'Röcke'
  | 'Zweiteilige Sets'
  | 'Strand-Outfits'
  | 'Accessoires';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: Color;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: Color, quantity?: number) => void;
  removeItem: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

export interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  totalItems: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FilterState {
  categories: Category[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
}
