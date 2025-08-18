import React from 'react';

const Filters = ({ 
  searchTerm, 
  onSearchChange, 
  ageRange, 
  onAgeRangeChange, 
  hasAvatar, 
  onHasAvatarChange 
}) => {
  return (
    <section className="filters">
      <div className="filters-container">
        <h3 className="filters-title">Bộ lọc</h3>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="search" className="filter-label">Tìm kiếm theo tên/email:</label>
            <input
              type="text"
              id="search"
              placeholder="Nhập tên hoặc email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Khoảng tuổi:</label>
            <div className="age-options">
              <label className="age-option">
                <input
                  type="radio"
                  name="ageRange"
                  value="all"
                  checked={ageRange === 'all'}
                  onChange={(e) => onAgeRangeChange(e.target.value)}
                />
                <span>Tất cả</span>
              </label>
              <label className="age-option">
                <input
                  type="radio"
                  name="ageRange"
                  value="under20"
                  checked={ageRange === 'under20'}
                  onChange={(e) => onAgeRangeChange(e.target.value)}
                />
                <span>≤ 20</span>
              </label>
              <label className="age-option">
                <input
                  type="radio"
                  name="ageRange"
                  value="21-25"
                  checked={ageRange === '21-25'}
                  onChange={(e) => onAgeRangeChange(e.target.value)}
                />
                <span>21 - 25</span>
              </label>
              <label className="age-option">
                <input
                  type="radio"
                  name="ageRange"
                  value="over25"
                  checked={ageRange === 'over25'}
                  onChange={(e) => onAgeRangeChange(e.target.value)}
                />
                <span>&gt; 25</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <input
                type="checkbox"
                checked={hasAvatar}
                onChange={(e) => onHasAvatarChange(e.target.checked)}
                className="filter-checkbox"
              />
              <span>Chỉ hiển thị sinh viên có ảnh</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;
