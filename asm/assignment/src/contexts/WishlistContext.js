import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { AuthContext } from './AuthContext';

const BASE_URL = 'http://localhost:3001';

const initialState = {
  ids: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, ids: action.payload || [] };
    case 'TOGGLE': {
      const exists = state.ids.includes(action.payload);
      const ids = exists ? state.ids.filter((id) => id !== action.payload) : [...state.ids, action.payload];
      return { ...state, ids };
    }
    case 'SET':
      return { ...state, ids: action.payload };
    default:
      return state;
  }
}

export const WishlistContext = createContext({
  ids: [],
  isWished: () => false,
  toggleWishlist: async () => {},
  ensureAuthOrRedirect: () => {},
});

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem('wishlist_ids');
      if (saved) {
        try { dispatch({ type: 'INIT', payload: JSON.parse(saved) }); } catch {}
      } else {
        dispatch({ type: 'INIT', payload: [] });
      }
    } else {
      (async () => {
        try {
          const res = await fetch(`${BASE_URL}/accounts/${user.id}`);
          if (!res.ok) throw new Error('fail');
          const acc = await res.json();
          dispatch({ type: 'SET', payload: acc.wishlist || [] });
        } catch {
          dispatch({ type: 'INIT', payload: [] });
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('wishlist_ids', JSON.stringify(state.ids));
    }
  }, [user, state.ids]);

  const isWished = useCallback((id) => state.ids.includes(id), [state.ids]);

  const toggleWishlist = useCallback(async (id) => {
    const exists = state.ids.includes(id);
    const next = exists ? state.ids.filter((x) => x !== id) : [...state.ids, id];
    dispatch({ type: 'SET', payload: next });
    if (user) {
      try {
        await fetch(`${BASE_URL}/accounts/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wishlist: next }),
        });
      } catch {}
    }
  }, [state.ids, user]);

  const value = useMemo(() => ({
    ids: state.ids,
    isWished,
    toggleWishlist,
  }), [state.ids, isWished, toggleWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}


