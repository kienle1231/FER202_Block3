import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Student Management</h1>
          <p className="hero-description">
            Quản lý thông tin sinh viên một cách hiệu quả và trực quan. 
            Tìm kiếm, lọc và sắp xếp danh sách sinh viên theo nhu cầu của bạn.
          </p>
        </div>
        <div className="hero-image">
          <div className="hero-icon">🎓</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
