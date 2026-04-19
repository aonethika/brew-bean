import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: number;
};

type CartState = {
  cart: CartItem[];
  orders: Order[];

  addItem: (item: CartItem) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;

  addOrder: (order: Order) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      orders: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);

          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }

          return {
            cart: [...state.cart, item],
          };
        }),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((i) =>
              i.id === id ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0),
        })),

      clearCart: () => set({ cart: [] }),

    
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
    }),
    {
      name: "brew-storage", 
    }
  )
);