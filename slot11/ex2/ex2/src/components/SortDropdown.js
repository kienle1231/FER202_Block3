import React from 'react';

const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <section className="sort-section">
      <div className="sort-container">
        <label htmlFor="sort" className="sort-label">Sắp xếp theo:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="age-asc">Tuổi tăng dần</option>
          <option value="age-desc">Tuổi giảm dần</option>
          <option value="name-asc">Tên A → Z</option>
          <option value="name-desc">Tên Z → A</option>
        </select>
      </div>
    </section>
  );
};

export default SortDropdown;
