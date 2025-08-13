import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaLeaf } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm fixed-top">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <FaLeaf className="text-success me-2" size={24} />
          <span className="fw-bold text-success">Healthy Recipe Finder</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home" className="mx-3">Home</Nav.Link>
            <Nav.Link href="#about" className="mx-3">About</Nav.Link>
            <Nav.Link href="#recipes" className="mx-3 active">Recipes</Nav.Link>
          </Nav>
          <Button variant="success" size="lg">
            Browse recipes
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
