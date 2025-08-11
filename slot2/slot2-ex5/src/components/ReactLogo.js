import React from 'react';
import './ReactLogo.css';

const ReactLogo = () => {
  return (
    <div className="react-logo-container">
      <div className="logo-section">
        <div className="react-logo">
          <div className="atom">
            <div className="nucleus"></div>
            <div className="orbit orbit-1"></div>
            <div className="orbit orbit-2"></div>
            <div className="orbit orbit-3"></div>
          </div>
        </div>
        <div className="logo-text">
          <p className="logo-description">This is the React logo!</p>
          <p className="logo-slogan">The library for web and native user interfaces</p>
        </div>
      </div>
      <div className="exercise-info">
        <h3>Bài tập 2: Thiết kế website hiển thị React logo</h3>
        <p>Logo React được tạo bằng CSS và hiển thị mô tả bên dưới</p>
      </div>
    </div>
  );
};

export default ReactLogo;
