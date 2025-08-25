import { useContext, useEffect, useMemo, useState } from 'react';
import { WishlistContext } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { ids } = useContext(WishlistContext);
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

  const wished = useMemo(() => products.filter((p) => ids.includes(p.id)), [products, ids]);

  return (
    <div className="container">
      <h2>Wishlist</h2>
      <div className="grid">
        {wished.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}


