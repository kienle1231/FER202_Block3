import { useCallback, useEffect, useState } from 'react';

export default function NavBar({ onSearchChange, onSortChange }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name-asc');

  // debounce search 300ms
  useEffect(() => {
    const t = setTimeout(() => onSearchChange?.(query), 300);
    return () => clearTimeout(t);
  }, [query, onSearchChange]);

  const handleSort = useCallback((e) => {
    const v = e.target.value;
    setSort(v);
    onSortChange?.(v);
  }, [onSortChange]);

  return (
    <div className="container" style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '12px 0' }}>
      <input className="input" style={{ flex: 1 }} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title..." />
      <select className="select" value={sort} onChange={handleSort}>
        <option value="name-asc">Name A→Z</option>
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
      </select>
    </div>
  );
}


