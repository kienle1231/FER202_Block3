import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchFilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedGenre, 
  onGenreChange, 
  sortBy, 
  onSortChange,
  genres,
  resultCount 
}) => {
  const SORT_OPTIONS = [
    { value: '', label: 'Không sắp xếp' },
    { value: 'duration-asc', label: 'Thời lượng ↑' },
    { value: 'duration-desc', label: 'Thời lượng ↓' }
  ];

  const renderSearchInput = () => (
    <Col md={4}>
      <InputGroup>
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm phim..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputGroup>
    </Col>
  );

  const renderGenreFilter = () => (
    <Col md={3}>
      <Form.Select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        {genres.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </Form.Select>
    </Col>
  );

  const renderSortSelect = () => (
    <Col md={3}>
      <Form.Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Col>
  );

  const renderResultCount = () => (
    <Col md={2}>
      <div className="text-center p-2 bg-white rounded border">
        <small className="text-muted">
          {resultCount} phim
        </small>
      </div>
    </Col>
  );

  return (
    <div className="mb-4 p-3 bg-light rounded">
      <Row className="g-3">
        {renderSearchInput()}
        {renderGenreFilter()}
        {renderSortSelect()}
        {renderResultCount()}
      </Row>
    </div>
  );
};

SearchFilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  resultCount: PropTypes.number.isRequired
};

export default SearchFilterBar;
