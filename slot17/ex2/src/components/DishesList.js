import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../contexts/CartContext';
import { SearchContext } from '../contexts/SearchContext';

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const { query } = useContext(SearchContext);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dishes;
    return dishes.filter((d) =>
      d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
    );
  }, [dishes, query]);

  return (
    <div className="dishes-wrap">
      <h2>Danh sách món ăn</h2>
      <div className="dishes">
        {filtered.map((dish) => (
          <div key={dish.id} className="dish-item">
            <img src={dish.image} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>{`Price: $${parseFloat(dish.price).toFixed(2)}`}</p>
            <button onClick={() => addToCart(dish)}>Add to Cart</button>
          </div>
        ))}
        {filtered.length === 0 && <p>Không tìm thấy món ăn phù hợp.</p>}
      </div>
    </div>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;


