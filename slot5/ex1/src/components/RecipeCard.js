import React, { useState } from 'react';
import { Card, Button, Modal, Badge } from 'react-bootstrap';
import { FaUser, FaClock, FaUtensils, FaShoppingCart, FaLeaf } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddToCart = () => {
    alert(`Đã thêm "${recipe.title}" vào giỏ hàng!`);
    handleClose();
  };

  return (
    <>
      <Card className="h-100 shadow-sm border-0">
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={recipe.image}
            alt={recipe.title}
            className="recipe-image"
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </div>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-bold mb-2">{recipe.title}</Card.Title>
          <Card.Text className="text-muted mb-3 flex-grow-1">
            {recipe.description}
          </Card.Text>

          <div className="recipe-stats mb-3">
            <div className="d-flex align-items-center mb-1">
              <FaUser className="text-muted me-2" size={14} />
              <small className="text-muted">Servings: {recipe.servings}</small>
            </div>
            <div className="d-flex align-items-center mb-1">
              <FaClock className="text-muted me-2" size={14} />
              <small className="text-muted">Prep: {recipe.prep} mins</small>
            </div>
            <div className="d-flex align-items-center">
              <FaUtensils className="text-muted me-2" size={14} />
              <small className="text-muted">Cook: {recipe.cook} mins</small>
            </div>
          </div>

          <Button
            variant="success"
            className="w-100"
            onClick={handleShow}
          >
            View Recipe
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-success fw-bold">
            {recipe.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-center mb-4">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="img-fluid rounded"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>

          <div className="row mb-4">
            <div className="col-md-4 text-center">
              <FaUser className="text-success mb-2" size={24} />
              <h6>Servings</h6>
              <p className="text-muted">{recipe.servings} people</p>
            </div>
            <div className="col-md-4 text-center">
              <FaClock className="text-success mb-2" size={24} />
              <h6>Prep Time</h6>
              <p className="text-muted">{recipe.prep} mins</p>
            </div>
            <div className="col-md-4 text-center">
              <FaUtensils className="text-success mb-2" size={24} />
              <h6>Cook Time</h6>
              <p className="text-muted">{recipe.cook} mins</p>
            </div>
          </div>

          <h5 className="fw-bold mb-3">Mô tả:</h5>
          <p className="text-muted mb-4">{recipe.description}</p>

          <h5 className="fw-bold mb-3">
            <FaLeaf className="text-success me-2" />
            Nguyên liệu:
          </h5>
          <div className="row">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="col-md-6 mb-2">
                <div className="d-flex align-items-center">
                  <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                  <span className="text-muted">{ingredient}</span>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddToCart}>
            <FaShoppingCart className="me-2" />
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RecipeCard;
