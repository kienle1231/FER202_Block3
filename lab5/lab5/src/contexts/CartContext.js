import React, { createContext, useEffect, useMemo, useReducer } from 'react';

export const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload);
    case 'UPDATE_QTY': {
      const { id, quantity } = action.payload;
      return state.map((item) => (item.id === id ? { ...item, quantity } : item));
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(reducer, [], (init) => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : init;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => dispatch({ type: 'ADD', payload: { ...item, quantity: 1 } });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalValue = useMemo(
    () => cartItems.reduce((acc, item) => acc + parseFloat(item.price) * (item.quantity || 1), 0).toFixed(2),
    [cartItems]
  );

  const checkout = () => {
    const order = {
      items: cartItems,
      total: totalValue,
      createdAt: new Date().toISOString(),
    };
    clearCart();
    return order;
  };

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalValue, checkout }),
    [cartItems, totalValue]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


