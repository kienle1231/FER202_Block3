import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import recipeService from '../services/recipeService';

const RecipeGrid = ({ 
  searchTerm, 
  maxPrepTime, 
  maxCookTime, 
  category, 
  difficulty, 
  maxCalories 
}) => {
  const filteredRecipes = recipeService.getFilteredRecipes({
    searchTerm,
    maxPrepTime,
    maxCookTime
  });

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-center mb-4 text-success">
            {filteredRecipes.length} Recipes Found
          </h3>
        </Col>
      </Row>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredRecipes.map(recipe => (
          <Col key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
      
      {filteredRecipes.length === 0 && (
        <Row>
          <Col className="text-center py-5">
            <h4 className="text-muted">Không tìm thấy công thức nào phù hợp</h4>
            <p className="text-muted">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RecipeGrid;
