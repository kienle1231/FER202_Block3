import React, { useContext, useMemo, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { SearchContext } from '../contexts/SearchContext';

const ProductGrid = () => {
  const { query } = useContext(SearchContext);
  const [sort, setSort] = useState('name');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = products.filter((p) =>
      !q || p.name.toLowerCase().includes(q)
    );
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) result = result.filter((p) => parseFloat(p.price) >= min);
    if (!isNaN(max)) result = result.filter((p) => parseFloat(p.price) <= max);
    if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'price-asc') result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (sort === 'price-desc') result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    return result;
  }, [query, sort, minPrice, maxPrice]);

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        <Form.Select size="sm" value={sort} onChange={(e) => setSort(e.target.value)} style={{ maxWidth: 220 }}>
          <option value="name">Sort by name</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </Form.Select>
        <Form.Control size="sm" placeholder="Min price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ maxWidth: 120 }} />
        <Form.Control size="sm" placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ maxWidth: 120 }} />
      </div>
      <Row xs={1} md={2} lg={4} className="g-3">
        {filtered.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;


