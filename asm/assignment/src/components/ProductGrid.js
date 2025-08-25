import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ query, sort }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/products');
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        setProducts(data);
      } catch {
        setProducts([]);
      }
    })();
  }, []);

  const visible = useMemo(() => {
    let list = products;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (sort === 'name-asc') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'price-asc') list = [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === 'price-desc') list = [...list].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    return list;
  }, [products, query, sort]);

  return (
    <div className="grid">
      {visible.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}


