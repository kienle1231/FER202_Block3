import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { SearchContext } from '../contexts/SearchContext';

const SearchBar = () => {
  const { query, setQuery } = useContext(SearchContext);
  return (
    <div className="mb-3">
      <Form.Control
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        size="sm"
        className="w-100"
      />
    </div>
  );
};

export default SearchBar;

