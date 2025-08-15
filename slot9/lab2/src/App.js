import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomNavbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import SearchFilterBar from './components/SearchFilterBar';
import MovieCard from './components/MovieCard';
import MovieRequestForm from './components/MovieRequestForm';
import CustomToastContainer from './components/ToastContainer';

import { movies, allGenres } from './data/movies';

import './App.css';

function App() {
  const [activePage, setActivePage] = useState('movies');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [toasts, setToasts] = useState([]);

  const STORAGE_KEY = 'movieFavourites';

  useEffect(() => {
    const savedFavourites = localStorage.getItem(STORAGE_KEY);
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies;

    if (searchTerm.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    if (sortBy === 'duration-asc') {
      filtered = [...filtered].sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'duration-desc') {
      filtered = [...filtered].sort((a, b) => b.duration - a.duration);
    }

    return filtered;
  }, [searchTerm, selectedGenre, sortBy]);

  const favouriteMovies = useMemo(() => {
    return movies.filter(movie => favourites.includes(movie.id));
  }, [favourites]);

  const handlePageChange = (page) => {
    setActivePage(page);
    if (page === 'movies') {
      setSearchTerm('');
      setSelectedGenre('All');
      setSortBy('');
    }
  };

  const handleToggleFavourite = (movieId) => {
    setFavourites(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  const showToast = (message, variant = 'info') => {
    const newToast = {
      id: Date.now(),
      message,
      variant,
      time: new Date().toLocaleTimeString()
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (toastId) => {
    setToasts(prev => prev.filter(toast => toast.id !== toastId));
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  const renderMoviesPage = () => (
    <>
      <HeroCarousel />
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        sortBy={sortBy}
        onSortChange={setSortBy}
        genres={allGenres}
        resultCount={filteredAndSortedMovies.length}
      />
      {filteredAndSortedMovies.length === 0 ? (
        <Alert variant="warning" className="text-center">
          <h4>🔍 Không tìm thấy phim</h4>
          <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc thể loại phim.</p>
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredAndSortedMovies.map(movie => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                isFavourite={favourites.includes(movie.id)}
                onToggleFavourite={handleToggleFavourite}
                showToast={showToast}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );

  const renderFavouritesPage = () => (
    <div className="mb-4">
      <h2 className="text-center mb-3">❤️ Phim Yêu Thích Của Tôi</h2>
      {favourites.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h4>💔 Chưa có phim yêu thích</h4>
          <p>Hãy thêm phim vào danh sách yêu thích để xem chúng ở đây!</p>
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favouriteMovies.map(movie => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                isFavourite={true}
                onToggleFavourite={handleToggleFavourite}
                showToast={showToast}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );

  const renderRequestPage = () => (
    <div className="mt-4">
      <MovieRequestForm
        onSubmit={handleFormSubmit}
        showToast={showToast}
      />
    </div>
  );

  const renderPageContent = () => {
    switch (activePage) {
      case 'movies':
        return renderMoviesPage();
      case 'favourites':
        return renderFavouritesPage();
      case 'request':
        return renderRequestPage();
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <CustomNavbar 
        activePage={activePage} 
        onPageChange={handlePageChange} 
      />
      
      <Container className="mt-5 pt-4">
        {renderPageContent()}
      </Container>

      <CustomToastContainer 
        toasts={toasts} 
        onRemoveToast={removeToast} 
      />
    </div>
  );
}

export default App;
