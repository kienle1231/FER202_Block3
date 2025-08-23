import React from 'react';
import { Carousel } from 'react-bootstrap';

const images = [
  process.env.PUBLIC_URL + '/images/uthappizza.jpg',
  process.env.PUBLIC_URL + '/images/zucchipakoda.jpg',
  process.env.PUBLIC_URL + '/images/elaicheesecake.jpg',
];

const ImageCarousel = () => {
  return (
    <Carousel controls indicators fade interval={3000} pause={false} className="mb-4">
      {images.map((src, idx) => (
        <Carousel.Item key={idx}>
          <img
            src={src}
            alt={`slide-${idx}`}
            className="d-block w-100"
            style={{ height: '340px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h5>Slide {idx + 1}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;


