import { useCallback, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import NavBar from '../components/NavBar';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name-asc');
  const handleSearchChange = useCallback((value) => setQuery(value), []);
  const handleSortChange = useCallback((value) => setSort(value), []);

  return (
    <div>
      <HeroSlider />
      <NavBar onSearchChange={handleSearchChange} onSortChange={handleSortChange} />
      <ProductGrid query={query} sort={sort} />
    </div>
  );
}


