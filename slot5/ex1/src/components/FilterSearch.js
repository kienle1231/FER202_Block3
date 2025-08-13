import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const FilterSearch = ({
  onSearch,
  onFilterChange,
  searchTerm,
  maxPrepTime,
  maxCookTime,
  onClearFilters
}) => {
  const [searchValue, setSearchValue] = useState(searchTerm);

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  useEffect(() => {
    setSearchValue(searchTerm);
  }, [searchTerm]);

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const handleClearFilters = () => {
    setSearchValue('');
    onClearFilters();
  };

  return (
    <Container className="mb-5">
      <Row className="mb-4">
        <Col>
          <InputGroup>
            <InputGroup.Text className="border-light bg-white">
              <FaSearch className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, description, or ingredients..."
              value={searchValue}
              onChange={handleSearchChange}
              className="border-light"
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <div className="d-flex align-items-center mb-2">
            <FaFilter className="text-success me-2" />
            <h6 className="mb-0 text-success">Filters</h6>
          </div>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={6} lg={4}>
          <Form.Select
            value={maxPrepTime}
            onChange={(e) => handleFilterChange('maxPrepTime', e.target.value)}
            className="border-light"
          >
            <option value="">Max Prep Time</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
            <option value="30">30 mins</option>
          </Form.Select>
        </Col>

        <Col md={6} lg={4}>
          <Form.Select
            value={maxCookTime}
            onChange={(e) => handleFilterChange('maxCookTime', e.target.value)}
            className="border-light"
          >
            <option value="">Max Cook Time</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
            <option value="30">30 mins</option>
          </Form.Select>
        </Col>

        <Col md={6} lg={4}>
          <Button
            variant="outline-secondary"
            onClick={handleClearFilters}
            className="w-100"
          >
            <FaTimes className="me-2" />
            Clear Filters
          </Button>
        </Col>
      </Row>

      {(searchValue || maxPrepTime || maxCookTime) && (
        <Row className="mt-3">
          <Col>
            <div className="d-flex flex-wrap gap-2">
              <small className="text-muted">Active filters:</small>
              {searchValue && (
                <span className="badge bg-primary">
                  Search: {searchValue}
                </span>
              )}
              {maxPrepTime && (
                <span className="badge bg-info">
                  Prep ≤ {maxPrepTime} mins
                </span>
              )}
              {maxCookTime && (
                <span className="badge bg-info">
                  Cook ≤ {maxCookTime} mins
                </span>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FilterSearch;
