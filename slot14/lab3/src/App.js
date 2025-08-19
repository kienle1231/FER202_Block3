import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StudentsPage from './components/StudentsPage';
import Footer from './components/Footer';
import ProfileBuilder from './components/ProfileBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showProfileBuilder, setShowProfileBuilder] = useState(false);

  const handleQuickSearch = (searchValue) => {
    setCurrentPage('students');
    if (window.handleQuickSearch) {
      window.handleQuickSearch(searchValue);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'students':
        return <StudentsPage />;
      case 'about':
        return (
          <div className="about-page">
            <div className="about-container">
              <h1>Về chúng tôi</h1>
              <p>Hệ thống quản lý sinh viên được phát triển với React và các công nghệ hiện đại.</p>
              <p>Chức năng chính:</p>
              <ul>
                <li>Quản lý thông tin sinh viên</li>
                <li>Tìm kiếm và lọc dữ liệu</li>
                <li>Sắp xếp theo nhiều tiêu chí</li>
                <li>Giao diện responsive</li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <>
            <Hero />
            <div className="home-content">
              <div className="home-container">
                <h2>Chào mừng đến với hệ thống quản lý sinh viên</h2>
                <p>Hãy khám phá các tính năng tuyệt vời của chúng tôi:</p>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Tìm kiếm thông minh</h3>
                    <p>Tìm kiếm sinh viên theo tên, email một cách nhanh chóng</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Lọc dữ liệu</h3>
                    <p>Lọc theo độ tuổi và trạng thái avatar</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📈</div>
                    <h3>Sắp xếp linh hoạt</h3>
                    <p>Sắp xếp theo tuổi và tên theo nhiều hướng</p>
                  </div>
                </div>
                <button 
                  className="cta-button"
                  onClick={() => setCurrentPage('students')}
                >
                  Xem danh sách sinh viên
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navbar 
        onQuickSearch={handleQuickSearch}
        onNavigate={setCurrentPage}
        onShowProfileBuilder={() => setShowProfileBuilder(true)}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
      <ProfileBuilder 
        show={showProfileBuilder}
        onHide={() => setShowProfileBuilder(false)}
      />
    </div>
  );
}

export default App;
