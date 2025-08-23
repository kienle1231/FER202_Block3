import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles.css';
import AppRoutes from './routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider } from './contexts/AuthContext';
import { FavouritesProvider } from './contexts/FavouritesContext';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './shared/ToastContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            <SearchProvider>
              <BrowserRouter>
                <ToastProvider>
                  <AppRoutes />
                </ToastProvider>
              </BrowserRouter>
            </SearchProvider>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
