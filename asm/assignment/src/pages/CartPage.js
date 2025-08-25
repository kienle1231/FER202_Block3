import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function CartPage() {
  const { items, incQty, decQty, removeFromCart, subtotal } = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <div>Giỏ hàng trống. <Link to="/">Mua sắm ngay</Link></div>
      ) : (
        <>
          <div className="card" style={{ padding: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th align="left">Sản phẩm</th>
                <th>Giá</th>
                <th>SL</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{i.title}</td>
                  <td align="center">${i.price}</td>
                  <td align="center">
                    <button className="btn" onClick={() => decQty(i.id)}>-</button>
                    <span style={{ padding: '0 8px' }}>{i.qty}</span>
                    <button className="btn" onClick={() => incQty(i.id)}>+</button>
                  </td>
                  <td align="center">${i.price * i.qty}</td>
                  <td align="center"><button className="btn" onClick={() => removeFromCart(i.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div style={{ textAlign: 'right', marginTop: 12 }}>
            <strong>Subtotal: ${subtotal}</strong>
          </div>
          <div style={{ textAlign: 'right', marginTop: 12 }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!user) {
                  const redirect = encodeURIComponent('/checkout');
                  navigate(`/login?redirect_uri=${redirect}`);
                  return;
                }
                navigate('/checkout');
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}


