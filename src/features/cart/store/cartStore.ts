import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@appTypes/api.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  coupon: { code: string; discount: number } | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getDiscountAmount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      applyCoupon: (code) => {
        if (code.toUpperCase() === 'SAVE10') {
          set({ coupon: { code: 'SAVE10', discount: 0.1 } });
          return true;
        }
        return false;
      },
      removeCoupon: () => set({ coupon: null }),
      getCartTotal: () => {
        const subtotal = get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        const discount = get().getDiscountAmount();
        return subtotal - discount;
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      getDiscountAmount: () => {
        const subtotal = get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        const coupon = get().coupon;
        return coupon ? subtotal * coupon.discount : 0;
      },
    }),
    {
      name: 'shopsphere-cart',
    }
  )
);

