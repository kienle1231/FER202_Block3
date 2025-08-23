import React, { useContext } from 'react';
import NavBar from '../shared/NavBar';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { Button, ListGroup, Alert } from 'react-bootstrap';

const FavouritesPage = () => {
  const { favourites, removeFromFavourites, clearFavourites } = useContext(FavouritesContext);
  return (
    <div className="container py-3">
      <NavBar />
      <h2 className="mb-3">My Favourites</h2>
      {favourites.length === 0 ? (
        <Alert variant="info">Chưa có sản phẩm yêu thích.</Alert>
      ) : (
        <>
          <ListGroup className="mb-2">
            {favourites.map((f) => (
              <ListGroup.Item key={f.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{f.name}</strong>
                </div>
                <Button size="sm" variant="outline-danger" onClick={() => removeFromFavourites(f.id)}>Remove</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="outline-secondary" size="sm" onClick={clearFavourites}>Clear all</Button>
        </>
      )}
    </div>
  );
};

export default FavouritesPage;


