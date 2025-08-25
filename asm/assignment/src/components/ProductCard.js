import { useContext, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { ids, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const isWished = useMemo(() => ids.includes(product.id), [ids, product.id]);
  const { showSuccess, showInfo } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const onAddToCart = () => {
    if (!user) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      showInfo('Vui lòng đăng nhập để thêm vào giỏ hàng');
      navigate(`/login?redirect_uri=${redirect}`);
      return;
    }
    addToCart({ id: product.id, title: product.title, price, image: product.image });
    showSuccess('Đã thêm vào giỏ hàng!');
  };

  const onWishlist = () => {
    if (!user) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      showInfo('Please sign in to save wishlist');
      navigate(`/login?redirect_uri=${redirect}`);
      return;
    }
    toggleWishlist(product.id);
    showSuccess('Added to wishlist!');
  };

  const price = product.salePrice ?? product.price;

  return (
    <div className="card product-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div className="img-wrap">
        <img src={product.image} alt={product.title} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'; }} />
        <div className="badges">
          {product.tags?.includes('hot') ? <span className="badge badge-hot">HOT</span> : null}
          {product.tags?.includes('sale') ? <span className="badge badge-sale">SALE</span> : null}
        </div>
      </div>
      <div className="title">{product.title}</div>
      <div className="brand">{product.name}</div>
      <div className="price-row">
        {product.salePrice ? <span className="old-price">${product.price}</span> : null}
        <span className="price">${price}</span>
      </div>
      <div className="actions">
        <button className="btn btn-primary" onClick={onAddToCart}>Add to Cart</button>
        <Link to={`/product/${product.id}`} className="btn" style={{ textDecoration: 'none' }}>View Details</Link>
        {user && isWished ? (
          <Link to="/wishlist" className="btn" style={{ textDecoration: 'none' }}>View Wishlist</Link>
        ) : (
          <button className="btn" onClick={onWishlist}>Add to Wishlist</button>
        )}
      </div>
    </div>
  );
}


