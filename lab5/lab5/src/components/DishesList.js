import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { SearchContext } from '../contexts/SearchContext';

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const { query } = useContext(SearchContext);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dishes;
    return dishes.filter((d) =>
      d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
    );
  }, [dishes, query]);

  return (
    <div className="mb-4">
      <h2 className="text-center mb-4">Danh sách món ăn</h2>
      {filtered.length === 0 ? (
        <Alert variant="info" className="text-center">
          Không tìm thấy món ăn phù hợp.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={4} className="g-3">
          {filtered.map((dish) => (
            <Col key={dish.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={dish.image} 
                  alt={dish.name}
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title className="mb-2">{dish.name}</Card.Title>
                  <Card.Text className="flex-grow-1 mb-2" style={{ fontSize: '0.85rem' }}>
                    {dish.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h6 text-primary mb-0">
                      ${parseFloat(dish.price).toFixed(2)}
                    </span>
                    <Button 
                      variant="success" 
                      onClick={() => addToCart(dish)}
                      size="sm"
                      className="px-3"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;


