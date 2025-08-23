import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { FavouritesContext } from '../contexts/FavouritesContext';

const AppNavBar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { cartItems } = useContext(CartContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">My Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
                <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile">Hồ sơ</Nav.Link>
                <Nav.Link as={Link} to="/favourites">
                  Yêu thích <Badge bg="secondary">{favourites.length}</Badge>
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/cart">
              Giỏ hàng <Badge bg="primary">{cartItems.length}</Badge>
            </Nav.Link>
            <Button variant="outline-secondary" size="sm" className="ms-2" onClick={toggleTheme}>
              Giao diện
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;


