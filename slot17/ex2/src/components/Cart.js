import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue, checkout } = useContext(CartContext);
  const [message, setMessage] = useState('');

  const handleConfirm = () => {
    if (cartItems.length === 0) {
      setMessage('Giỏ hàng trống. Vui lòng thêm món trước khi thanh toán.');
      return;
    }
    const order = checkout();
    setMessage(`Thanh toán thành công! Tổng tiền: $${order.total}`);
  };

  return (
    <div className="cart">
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <p>{`Tổng số món: ${cartItems.length}`}</p>
            <p>{`Tổng giá trị: $${totalValue}`}</p>
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={handleConfirm} className="confirm-btn">Xác nhận đơn hàng</button>
          </div>
        </div>
      )}
      {message && <p role="status">{message}</p>}
    </div>
  );
};

export default Cart;

