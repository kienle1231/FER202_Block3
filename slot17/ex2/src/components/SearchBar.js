import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';

const SearchBar = () => {
  const { query, setQuery } = useContext(SearchContext);
  return (
    <div className="search-bar">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm món theo tên hoặc mô tả..."
      />
    </div>
  );
};

export default SearchBar;

