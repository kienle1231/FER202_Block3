import React, { createContext, useEffect, useMemo, useReducer } from 'react';

export const FavouritesContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.some((p) => p.id === action.payload.id);
      if (exists) return state;
      return [...state, action.payload];
    }
    case 'REMOVE':
      return state.filter((p) => p.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export const FavouritesProvider = ({ children }) => {
  const [favourites, dispatch] = useReducer(reducer, initialState, (init) => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : init;
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (product) => dispatch({ type: 'ADD', payload: product });
  const removeFromFavourites = (id) => dispatch({ type: 'REMOVE', payload: id });
  const clearFavourites = () => dispatch({ type: 'CLEAR' });

  const value = useMemo(() => ({ favourites, addToFavourites, removeFromFavourites, clearFavourites }), [favourites]);

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
};


