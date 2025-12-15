import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  addItem: (product) =>
    set((state) => {
      // Check if product already in cart
      const existing = state.cart.find((p) => p.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));
