import React, { useContext, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { products } from '../data/products';
import { CartContext } from '../contexts/CartContext';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from './ToastContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => products.find((p) => String(p.id) === String(id)), [id]);
  const { addToCart } = useContext(CartContext);
  const { addToFavourites } = useContext(FavouritesContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  if (!product) return <div>Product not found.</div>;

  const handleAddToFavourite = () => {
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để thêm vào yêu thích');
      navigate('/login');
      return;
    }
    
    addToFavourites(product);
    showToast('Đã thêm vào yêu thích');
  };

  return (
    <Card className="shadow-sm">
      <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: '260px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="mb-3">{product.description}</Card.Text>
        <div className="d-flex gap-2">
          <Button variant="success" onClick={() => { addToCart(product); showToast('Đã thêm vào giỏ hàng'); }}>Thêm vào giỏ</Button>
          <Button variant="secondary" as={Link} to="/products">Quay lại danh sách</Button>
          <Button variant="warning" onClick={handleAddToFavourite}>Thêm yêu thích</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductDetails;


