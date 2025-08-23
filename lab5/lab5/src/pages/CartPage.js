import React, { useContext } from 'react';
import NavBar from '../shared/NavBar';
import Cart from '../components/Cart';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const CartPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) navigate('/checkout');
    else navigate('/login');
  };
  return (
    <div className="container py-3">
      <NavBar />
      <Cart />
      <div className="d-flex justify-content-between mt-3">
        <Button as={Link} to="/products" variant="outline-secondary" size="sm">Tiếp tục mua hàng</Button>
        <Button onClick={handleCheckout} variant="primary" size="sm">Thanh toán</Button>
      </div>
    </div>
  );
};

export default CartPage;


