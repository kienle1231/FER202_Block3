import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Film, Heart, PlusCircle } from 'react-bootstrap-icons';

const CustomNavbar = ({ activePage, onPageChange }) => {
  const navItems = [
    { id: 'movies', label: 'Free Movies', icon: <Film />, path: '/' },
    { id: 'favourites', label: 'My Favourite Movies', icon: <Heart />, path: '/favourites' },
    { id: 'request', label: 'Movie Request Form', icon: <PlusCircle />, path: '/request' }
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
      <Container>
        <Navbar.Brand 
          href="#" 
          onClick={() => onPageChange('movies')}
          className="fw-bold fs-4"
        >
          🎬 Movie Explorer
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.id}
                href="#"
                onClick={() => onPageChange(item.id)}
                className={`d-flex align-items-center gap-2 ${
                  activePage === item.id ? 'active fw-bold' : ''
                }`}
              >
                {item.icon} {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
