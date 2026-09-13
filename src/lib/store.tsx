"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";
import { Hat } from "./data";

type CartItem = { hat: Hat; qty: number; color: string; size: string };
type CartState = { items: CartItem[] };

type Action =
  | { type: "ADD"; hat: Hat; color: string; size: string }
  | { type: "REMOVE"; id: string }
  | { type: "INC"; id: string }
  | { type: "DEC"; id: string }
  | { type: "CLEAR" };

const CartCtx = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find(
        (i) => i.hat.id === action.hat.id && i.color === action.color && i.size === action.size
      );
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.hat.id === action.hat.id && i.color === action.color && i.size === action.size
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { hat: action.hat, qty: 1, color: action.color, size: action.size }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.hat.id !== action.id) };
    case "INC":
      return { items: state.items.map((i) => (i.hat.id === action.id ? { ...i, qty: i.qty + 1 } : i)) };
    case "DEC":
      return {
        items: state.items
          .map((i) => (i.hat.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  return <CartCtx.Provider value={{ state, dispatch }}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.hat.price * i.qty, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.qty, 0);
}
