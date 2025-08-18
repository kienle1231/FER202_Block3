import React, { useState } from 'react';

const Navbar = ({ onQuickSearch, onNavigate }) => {
  const [quickSearchValue, setQuickSearchValue] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    onQuickSearch(quickSearchValue);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Student Management</h2>
        </div>
        
        <div className="navbar-links">
          <button 
            className="nav-link"
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button 
            className="nav-link"
            onClick={() => onNavigate('students')}
          >
            Students
          </button>
          <button 
            className="nav-link"
            onClick={() => onNavigate('about')}
          >
            About
          </button>
        </div>

        <div className="navbar-search">
          <form onSubmit={handleQuickSearch}>
            <input
              type="text"
              placeholder="Quick search..."
              value={quickSearchValue}
              onChange={(e) => setQuickSearchValue(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
