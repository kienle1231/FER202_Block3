import React from 'react';
import { Carousel } from 'react-bootstrap';
import { movies } from '../data/movies';

const HeroCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      image: '/images/movie1.jpg',
      title: movies[0].title,
      description: movies[0].description
    },
    {
      id: 2,
      image: '/images/movie2.jpg',
      title: movies[1].title,
      description: movies[1].description
    },
    {
      id: 3,
      image: '/images/movie3.jpg',
      title: movies[2].title,
      description: movies[2].description
    }
  ];

  return (
    <Carousel 
      className="mb-4" 
      interval={5000}
      indicators={true}
      controls={true}
    >
      {carouselItems.map((item) => (
        <Carousel.Item key={item.id}>
          <div 
            className="d-block w-100"
            style={{
              height: '400px',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className="text-center text-white">
              <h2 className="display-4 fw-bold mb-3">{item.title}</h2>
              <p className="lead fs-4">{item.description}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
