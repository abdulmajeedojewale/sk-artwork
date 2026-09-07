'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Coupon } from '@/types/database';

export interface CartItemType {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItemType[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getItemQuantity: (productId: string) => number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sk_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sk_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discount_price ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // Calculate physical item presence for delivery fee
  const hasPhysicalItems = cart.some((item) => !item.product.is_digital);
  const deliveryFee = hasPhysicalItems && subtotal > 0 ? 3500 : 0;

  // Coupon discount calculation
  let discountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.discount_type === 'percentage') {
      discountAmount = (subtotal * activeCoupon.discount_value) / 100;
    } else {
      discountAmount = activeCoupon.discount_value;
    }
  }

  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SK10' || cleanCode === 'WELCOME10') {
      const coupon: Coupon = {
        id: 'c-1',
        code: cleanCode,
        discount_type: 'percentage',
        discount_value: 10,
        min_order_value: 5000,
        max_uses: 100,
        current_uses: 12,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setActiveCoupon(coupon);
      return { success: true, message: '10% discount applied successfully!' };
    }
    if (cleanCode === 'VIP5000') {
      const coupon: Coupon = {
        id: 'c-2',
        code: cleanCode,
        discount_type: 'fixed',
        discount_value: 5000,
        min_order_value: 20000,
        max_uses: 50,
        current_uses: 5,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setActiveCoupon(coupon);
      return { success: true, message: '₦5,000 discount applied successfully!' };
    }
    return { success: false, message: 'Invalid or expired coupon code.' };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  const getItemQuantity = (productId: string): number => {
    const found = cart.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        getItemQuantity,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
