import React, { useContext, useMemo } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from './ToastContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { favourites, addToFavourites } = useContext(FavouritesContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const isFavourited = useMemo(() => favourites.some((f) => f.id === product.id), [favourites, product.id]);

  const handleFavourite = () => {
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để thêm vào yêu thích');
      navigate('/login');
      return;
    }
    
    if (isFavourited) {
      navigate('/favourites');
    } else {
      addToFavourites(product);
      showToast('Đã thêm vào yêu thích');
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: '160px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="flex-grow-1">${parseFloat(product.price).toFixed(2)}</Card.Text>
        <div className="d-flex gap-2">
          <Button as={Link} to={`/products/${product.id}`} variant="outline-primary" size="sm">Xem chi tiết</Button>
          <Button variant="success" size="sm" onClick={() => { addToCart(product); showToast('Đã thêm vào giỏ hàng'); }}>Thêm vào giỏ</Button>
          <Button variant={isFavourited ? 'secondary' : 'warning'} size="sm" onClick={handleFavourite}>
            {isFavourited ? 'Xem yêu thích' : 'Thêm yêu thích'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;


