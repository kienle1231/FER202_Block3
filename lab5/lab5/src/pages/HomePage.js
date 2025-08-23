import React from 'react';
import NavBar from '../shared/NavBar';
import ImageCarousel from '../shared/ImageCarousel';
import ProductGrid from '../shared/ProductGrid';

const HomePage = () => {
  return (
    <div className="container py-3">
      <NavBar />
      <ImageCarousel />
      <ProductGrid />
    </div>
  );
};

export default HomePage;


