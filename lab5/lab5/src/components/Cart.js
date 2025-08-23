import React, { useContext } from 'react';
import { Card, Button, ListGroup, Alert, Badge, ButtonGroup, Form } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue, checkout, updateQuantity } = useContext(CartContext);

  return (
    <div className="mb-4">
      <Card>
        <Card.Header as="h5" className="text-center py-3">
          Giỏ hàng
        </Card.Header>
        <Card.Body className="p-3">
          {cartItems.length === 0 ? (
            <Alert variant="info" className="text-center mb-0 py-3">
              Giỏ hàng của bạn đang trống.
            </Alert>
          ) : (
            <>
              <ListGroup variant="flush" className="mb-3">
                {cartItems.map((item) => (
                  <ListGroup.Item 
                    key={item.id}
                    className="d-flex justify-content-between align-items-center py-2"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <strong className="me-2">{item.name}</strong>
                        <Badge bg="secondary" className="fs-6">
                          ${parseFloat(item.price).toFixed(2)}
                        </Badge>
                      </div>
                      <ButtonGroup size="sm">
                        <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}>-</Button>
                        <Form.Control 
                          value={item.quantity || 1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val > 0) updateQuantity(item.id, val);
                          }}
                          style={{ width: 60, textAlign: 'center' }}
                        />
                        <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</Button>
                      </ButtonGroup>
                      <div>
                        <Badge bg="info">Subtotal ${((item.quantity || 1) * parseFloat(item.price)).toFixed(2)}</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="px-2"
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <div className="text-center">
                <div className="mb-3">
                  <Badge bg="info" className="me-2 fs-6">
                    Tổng số món: {cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0)}
                  </Badge>
                  <Badge bg="success" className="fs-6">
                    Tổng giá trị: ${totalValue}
                  </Badge>
                </div>
                <div>
                  <Button 
                    variant="outline-warning" 
                    onClick={clearCart}
                    className="me-2"
                    size="sm"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cart;

