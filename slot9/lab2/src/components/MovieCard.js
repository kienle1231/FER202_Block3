import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import { Heart, HeartFill, InfoCircle } from 'react-bootstrap-icons';

const MovieCard = ({ movie, isFavourite, onToggleFavourite, showToast }) => {
  const [showModal, setShowModal] = useState(false);

  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x450/6c757d/ffffff?text=No+Image';
  const MODAL_PLACEHOLDER = 'https://via.placeholder.com/300x400/6c757d/ffffff?text=No+Image';
  const MAX_DESCRIPTION_LENGTH = 100;

  const handleFavouriteToggle = () => {
    onToggleFavourite(movie.id);
    const message = isFavourite ? 'Removed from favourites!' : 'Added to favourites!';
    const variant = isFavourite ? 'info' : 'success';
    showToast(message, variant);
  };

  const handleImageError = (e, placeholder = PLACEHOLDER_IMAGE) => {
    e.target.src = placeholder;
  };

  const truncateDescription = (text) => {
    return text.length > MAX_DESCRIPTION_LENGTH 
      ? `${text.substring(0, MAX_DESCRIPTION_LENGTH)}...` 
      : text;
  };

  const getFavouriteButtonProps = () => ({
    variant: isFavourite ? "outline-danger" : "outline-primary",
    icon: isFavourite ? <HeartFill /> : <Heart />,
    text: isFavourite ? ' Remove' : ' Add to Favourites'
  });

  const renderMovieInfo = () => (
    <div className="text-muted small mb-3">
      <div>🌍 {movie.country}</div>
      <div>⏱️ {movie.duration} phút</div>
    </div>
  );

  const renderBadges = () => (
    <div className="mb-2">
      <Badge bg="primary" className="me-1">{movie.genre}</Badge>
      <Badge bg="secondary">{movie.year}</Badge>
    </div>
  );

  const renderButtons = () => {
    const { variant, icon, text } = getFavouriteButtonProps();
    
    return (
      <div className="mt-auto d-flex gap-2">
        <Button 
          variant={variant}
          size="sm"
          onClick={handleFavouriteToggle}
          className="flex-fill"
        >
          {icon} {text}
        </Button>
        <Button 
          variant="outline-info" 
          size="sm"
          onClick={() => setShowModal(true)}
        >
          <InfoCircle /> Details
        </Button>
      </div>
    );
  };

  const renderModalImage = () => (
    <div className="col-md-4">
      <img 
        src={movie.poster} 
        alt={`Poster for ${movie.title}`}
        className="img-fluid rounded shadow"
        style={{ 
          width: '100%', 
          height: '400px', 
          objectFit: 'cover',
          maxWidth: '300px'
        }}
        onError={(e) => handleImageError(e, MODAL_PLACEHOLDER)}
      />
    </div>
  );

  const renderModalContent = () => (
    <div className="col-md-8">
      <h5>Mô tả</h5>
      <p>{movie.description}</p>
      
      <div className="row">
        <div className="col-6">
          <strong>Thể loại:</strong> <Badge bg="primary">{movie.genre}</Badge>
        </div>
        <div className="col-6">
          <strong>Năm:</strong> {movie.year}
        </div>
      </div>
      
      <div className="row mt-2">
        <div className="col-6">
          <strong>Quốc gia:</strong> {movie.country}
        </div>
        <div className="col-6">
          <strong>Thời lượng:</strong> {movie.duration} phút
        </div>
      </div>
      
      <div className="mt-3">
        <h6>Lịch chiếu</h6>
        <p className="text-muted">Thông tin lịch chiếu sẽ được cập nhật sớm nhất.</p>
      </div>
    </div>
  );

  return (
    <>
      <Card className="h-100 movie-card" style={{ transition: 'transform 0.2s' }}>
        <Card.Img 
          variant="top" 
          src={movie.poster} 
          alt={`Poster for ${movie.title}`}
          style={{ height: '300px', objectFit: 'cover' }}
          onError={(e) => handleImageError(e)}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-bold">{movie.title}</Card.Title>
          <Card.Text className="text-muted small">
            {truncateDescription(movie.description)}
          </Card.Text>
          
          {renderBadges()}
          {renderMovieInfo()}
          {renderButtons()}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {renderModalImage()}
            {renderModalContent()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired
  }).isRequired,
  isFavourite: PropTypes.bool.isRequired,
  onToggleFavourite: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default MovieCard;
