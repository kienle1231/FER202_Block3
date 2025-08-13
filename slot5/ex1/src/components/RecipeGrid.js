import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Pagination, Form } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import recipeService from '../services/recipeService';

const RecipeGrid = ({ 
  searchTerm, 
  maxPrepTime, 
  maxCookTime, 
  sortBy,
  category, 
  difficulty, 
  maxCalories 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const filteredRecipes = recipeService.getFilteredRecipes({
    searchTerm,
    maxPrepTime,
    maxCookTime
  });

  const sortedRecipes = useMemo(() => {
    let sorted = [...filteredRecipes];
    
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'prep-asc':
        sorted.sort((a, b) => a.prep - b.prep);
        break;
      case 'prep-desc':
        sorted.sort((a, b) => b.prep - a.prep);
        break;
      case 'cook-asc':
        sorted.sort((a, b) => a.cook - b.cook);
        break;
      case 'cook-desc':
        sorted.sort((a, b) => b.cook - a.cook);
        break;
      default:
        break;
    }
    
    return sorted;
  }, [filteredRecipes, sortBy]);

  const totalPages = Math.ceil(sortedRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = sortedRecipes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const renderPaginationItems = () => {
    const items = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
        items.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      } else if (currentPage >= totalPages - 3) {
        items.push(
          <Pagination.Item
            key={1}
            onClick={() => handlePageChange(1)}
          >
            1
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
      } else {
        items.push(
          <Pagination.Item
            key={1}
            onClick={() => handlePageChange(1)}
          >
            1
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
        items.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }
    
    return items;
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success mb-0">
              {sortedRecipes.length} Recipes Found
            </h3>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">Items per page:</span>
              <Form.Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                style={{ width: '80px' }}
                size="sm"
              >
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
              </Form.Select>
            </div>
          </div>
        </Col>
      </Row>
      
      <Row xs={1} md={2} lg={3} className="g-4 mb-4">
        {currentRecipes.map(recipe => (
          <Col key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
      
      {sortedRecipes.length === 0 && (
        <Row>
          <Col className="text-center py-5">
            <h4 className="text-muted">Không tìm thấy công thức nào phù hợp</h4>
            <p className="text-muted">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </Col>
        </Row>
      )}

      {totalPages > 1 && (
        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              
              {renderPaginationItems()}
              
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RecipeGrid;
