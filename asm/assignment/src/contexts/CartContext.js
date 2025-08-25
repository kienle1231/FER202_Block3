import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, items: action.payload || [] };
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const items = existing
        ? state.items.map((i) => (i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.items, { ...action.payload, qty: 1 }];
      return { ...state, items };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case 'INC':
      return { ...state, items: state.items.map((i) => (i.id === action.payload ? { ...i, qty: i.qty + 1 } : i)) };
    case 'DEC':
      return { ...state, items: state.items.map((i) => (i.id === action.payload ? { ...i, qty: Math.max(1, i.qty - 1) } : i)) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const CartContext = createContext({
  items: [],
  count: 0,
  subtotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  incQty: () => {},
  decQty: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('cart_items');
    if (saved) {
      try {
        dispatch({ type: 'INIT', payload: JSON.parse(saved) });
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((product) => dispatch({ type: 'ADD', payload: product }), []);
  const removeFromCart = useCallback((id) => dispatch({ type: 'REMOVE', payload: id }), []);
  const incQty = useCallback((id) => dispatch({ type: 'INC', payload: id }), []);
  const decQty = useCallback((id) => dispatch({ type: 'DEC', payload: id }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const count = useMemo(() => state.items.reduce((s, i) => s + i.qty, 0), [state.items]);
  const subtotal = useMemo(() => state.items.reduce((s, i) => s + i.price * i.qty, 0), [state.items]);

  return (
    <CartContext.Provider value={{
      items: state.items,
      count,
      subtotal,
      addToCart,
      removeFromCart,
      incQty,
      decQty,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}


