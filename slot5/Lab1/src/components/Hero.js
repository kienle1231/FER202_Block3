import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { FaUtensils, FaLeaf, FaClock } from 'react-icons/fa';

const Hero = () => {
  const featuredRecipes = [
    {
      id: 1,
      title: "Mediterranean Chickpea Salad",
      description: "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
      image: "/images/mediterranean-chickpea-salad.jpg",
      prepTime: 10,
      cookTime: 0,
      icon: FaLeaf,
      color: "success"
    },
    {
      id: 2,
      title: "One-Pan Lemon Garlic Salmon",
      description: "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
      image: "/images/one-pan-lemon-garlic-salmon.jpg",
      prepTime: 5,
      cookTime: 12,
      icon: FaUtensils,
      color: "primary"
    },
    {
      id: 3,
      title: "Quinoa Veggie Power Bowl",
      description: "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
      image: "/images/quinoa-veggie-power-bowl.jpg",
      prepTime: 10,
      cookTime: 15,
      icon: FaClock,
      color: "warning"
    }
  ];

  return (
    <Container className="mb-5">
      <Row>
        <Col>
          <Carousel className="hero-carousel">
            {featuredRecipes.map((recipe, index) => {
              const IconComponent = recipe.icon;
              return (
                <Carousel.Item key={recipe.id}>
                  <div className="carousel-content p-0 rounded overflow-hidden">
                    <div className="position-relative">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-100"
                        style={{ height: '400px', objectFit: 'cover' }}
                      />
                      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                        <div className={`bg-${recipe.color} bg-opacity-75 text-white p-5 rounded text-center`} style={{ maxWidth: '600px' }}>
                          <IconComponent size={48} className="mb-3" />
                          <h1 className="display-4 fw-bold mb-3">{recipe.title}</h1>
                          <p className="lead mb-4">{recipe.description}</p>
                          <div className="d-flex justify-content-center gap-3 mb-4">
                            <span className="badge bg-light text-dark">
                              <FaClock className="me-1" />
                              Prep: {recipe.prepTime} mins
                            </span>
                            <span className="badge bg-light text-dark">
                              <FaUtensils className="me-1" />
                              Cook: {recipe.cookTime} mins
                            </span>
                          </div>
                          <Button variant="light" size="lg">
                            View Recipe
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
