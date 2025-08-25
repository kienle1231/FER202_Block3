import { createContext, useCallback, useMemo, useReducer } from 'react';

const initialState = { toasts: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };
    default:
      return state;
  }
}

export const ToastContext = createContext({
  showSuccess: () => {},
  showInfo: () => {},
  showError: () => {},
});

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    dispatch({ type: 'ADD', payload: { id, type, message } });
    setTimeout(() => dispatch({ type: 'REMOVE', payload: id }), 2500);
  }, []);

  const showSuccess = useCallback((msg) => addToast('success', msg), [addToast]);
  const showInfo = useCallback((msg) => addToast('info', msg), [addToast]);
  const showError = useCallback((msg) => addToast('danger', msg), [addToast]);

  const value = useMemo(() => ({ showSuccess, showInfo, showError, toasts: state.toasts }), [showSuccess, showInfo, showError, state.toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}


