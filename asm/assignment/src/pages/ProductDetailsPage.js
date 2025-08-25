import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { AuthContext } from '../contexts/AuthContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { ids, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        setProduct(data);
      } catch {
        setProduct(null);
      }
    })();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const price = product.salePrice ?? product.price;
  const wished = ids.includes(product.id);

  const onWishlist = () => {
    if (!user) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect_uri=${redirect}`);
      return;
    }
    toggleWishlist(product.id);
  };

  const onAddToCart = () => {
    if (!user) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect_uri=${redirect}`);
      return;
    }
    addToCart({ id: product.id, title: product.title, price, image: product.image });
  };

  return (
    <div className="container details">
      <div className="details-grid">
        <img className="details-image" src={product.image} alt={product.title} />
        <div>
          <h2 style={{ marginTop: 0 }}>{product.title}</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
            {product.salePrice ? <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>${product.price}</span> : null}
            <span style={{ fontWeight: 800, fontSize: 22 }}>${price}</span>
          </div>
          <p style={{ marginTop: 12 }}>{product.description}</p>
          <div className="actions">
            <button className="btn btn-primary" onClick={onAddToCart}>Add to Cart</button>
            {user && wished ? (
              <button className="btn" onClick={() => navigate('/wishlist')}>View Wishlist</button>
            ) : (
              <button className="btn" onClick={onWishlist}>Add to Wishlist</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


