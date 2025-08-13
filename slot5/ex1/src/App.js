import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterSearch from './components/FilterSearch';
import RecipeGrid from './components/RecipeGrid';
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [maxCookTime, setMaxCookTime] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'maxPrepTime':
        setMaxPrepTime(value);
        break;
      case 'maxCookTime':
        setMaxCookTime(value);
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setMaxPrepTime('');
    setMaxCookTime('');
  };

  return (
    <div className="App">
      <Header />
      <main className="container-fluid px-4 py-5">
        <Hero />
        <FilterSearch
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          searchTerm={searchTerm}
          maxPrepTime={maxPrepTime}
          maxCookTime={maxCookTime}
          onClearFilters={handleClearFilters}
        />
        <RecipeGrid
          searchTerm={searchTerm}
          maxPrepTime={maxPrepTime}
          maxCookTime={maxCookTime}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
