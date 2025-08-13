import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaLeaf, FaPaperPlane } from 'react-icons/fa';
import RecipeRequestForm from './RecipeRequestForm';

const Header = () => {
  const [showRecipeForm, setShowRecipeForm] = useState(false);

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-success">
            <FaLeaf className="me-2" />
            Healthy Recipe Finder
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" className="fw-semibold">Home</Nav.Link>
              <Nav.Link href="#" className="fw-semibold">About</Nav.Link>
              <Nav.Link href="#" className="fw-semibold">Recipes</Nav.Link>
              <Nav.Link 
                href="#" 
                className="fw-semibold text-primary"
                onClick={() => setShowRecipeForm(true)}
              >
                <FaPaperPlane className="me-1" />
                Recipe Request Form
              </Nav.Link>
            </Nav>
            <Button variant="success" className="ms-2">
              Browse recipes
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <RecipeRequestForm 
        show={showRecipeForm} 
        onHide={() => setShowRecipeForm(false)} 
      />
    </>
  );
};

export default Header;
