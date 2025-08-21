import React, { useContext } from 'react';
import './App.css';
import './styles.css';
import DishesList from './components/DishesList';
import Cart from './components/Cart';
import SearchBar from './components/SearchBar';
import { CartProvider } from './contexts/CartContext';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';
import { SearchProvider } from './contexts/SearchContext';

// Dữ liệu mẫu
const dishes = [
  {
    id: 0,
    name: 'Uthappizza',
    image: process.env.PUBLIC_URL + '/images/uthappizza.jpg',
    price: '4.99',
    description: 'A unique combination of Indian Uthappam and Italian pizza.',
  },
  {
    id: 1,
    name: 'Zucchipakoda',
    image: process.env.PUBLIC_URL + '/images/zucchipakoda.jpg',
    price: '1.99',
    description: 'Deep fried Zucchini with chickpea batter.',
  },
  {
    id: 2,
    name: 'Vadonut',
    image: process.env.PUBLIC_URL + '/images/vadonut.jpg',
    price: '1.99',
    description: 'A combination of vada and donut.',
  },
  {
    id: 3,
    name: 'ElaiCheese Cake',
    image: process.env.PUBLIC_URL + '/images/elaicheesecake.jpg',
    price: '2.99',
    description: 'New York Style Cheesecake with Indian cardamoms.',
  },
];

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      Chuyển chế độ: {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <SearchProvider>
          <div className="App container">
            <ThemeSwitcher />
            <SearchBar />
            <DishesList dishes={dishes} />
            <Cart />
          </div>
        </SearchProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
