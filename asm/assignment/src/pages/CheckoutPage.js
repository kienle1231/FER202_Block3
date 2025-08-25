import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';

const BASE_URL = 'http://localhost:3001';

export default function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const { items, subtotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { showSuccess } = useContext(ToastContext);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect_uri=${encodeURIComponent(location.pathname + location.search)}`);
    }
  }, [user, navigate, location.pathname, location.search]);

  const onPlaceOrder = async () => {
    if (!user) {
      navigate(`/login?redirect_uri=${encodeURIComponent('/checkout')}`);
      return;
    }
    const order = {
      id: Date.now(),
      userid: user.id,
      items,
      total: subtotal,
      date: new Date().toISOString(),
    };
    await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    clearCart();
    showSuccess('Order placed!');
    navigate('/');
  };

  return (
    <div>
      <h2>Checkout</h2>
      {items.length === 0 ? (
        <div>Không có sản phẩm trong giỏ.</div>
      ) : (
        <>
          <ul>
            {items.map((i) => (
              <li key={i.id}>{i.title} x {i.qty} = ${i.price * i.qty}</li>
            ))}
          </ul>
          <div style={{ textAlign: 'right' }}>
            <strong>Total: ${subtotal}</strong>
          </div>
          <div style={{ textAlign: 'right', marginTop: 12 }}>
            <button onClick={onPlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}


