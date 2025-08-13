import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Hero = () => {
  return (
    <Container className="text-center py-5 mt-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <h1 className="display-4 fw-bold text-success mb-4">
            Explore our simple, healthy recipes.
          </h1>
          <p className="lead text-muted">
            Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. 
            Use the search bar to find a recipe by name or ingredient, or simply scroll the list and 
            let something delicious catch your eye.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
