import React, { useContext } from 'react';
import NavBar from '../shared/NavBar';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <div className="container py-3">
      <NavBar />
      <h2>Checkout</h2>
      <p>Tiến hành thanh toán...</p>
    </div>
  );
};

export default CheckoutPage;


