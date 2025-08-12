import React, { useState, useMemo } from 'react';
import './App.css';

function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useMemo(() => {
    return [...new Set(companies.map(company => company.category))];
  }, []);

  const filteredAndSortedCompanies = useMemo(() => {
    let result = companies;

    if (searchTerm) {
      result = result.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(company => company.category === selectedCategory);
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case 'year-asc':
            return a.start - b.start;
          case 'year-desc':
            return b.start - a.start;
          case 'range':
            return (a.end - a.start) - (b.end - b.start);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [searchTerm, sortBy, selectedCategory]);

  return (
    <div className="App">
      <div className="container">
        <h1>Quản lý Danh sách Company</h1>
        
        <div className="search-section">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            onClick={() => setSearchTerm('')}
            className="clear-btn"
          >
            Xóa tìm kiếm
          </button>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label>Sắp xếp theo:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="select-input"
            >
              <option value="">Không sắp xếp</option>
              <option value="year-asc">Năm tăng dần</option>
              <option value="year-desc">Năm giảm dần</option>
              <option value="range">Chọn từ start-End</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Lọc theo Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-input"
            >
              <option value="">Tất cả categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="results-section">
          <h3>Kết quả tìm kiếm ({filteredAndSortedCompanies.length} companies)</h3>
          
          {filteredAndSortedCompanies.length === 0 ? (
            <div className="no-results">No result</div>
          ) : (
            <table className="company-table">
              <thead>
                <tr>
                  <th>Tên Company</th>
                  <th>Category</th>
                  <th>Năm bắt đầu</th>
                  <th>Năm kết thúc</th>
                  <th>Thời gian hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCompanies.map((company, index) => (
                  <tr key={index}>
                    <td>{company.name}</td>
                    <td>{company.category}</td>
                    <td>{company.start}</td>
                    <td>{company.end}</td>
                    <td>{company.end - company.start} năm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
