import React from 'react';
import './HelloReact.css';

const HelloReact = () => {
  return (
    <div className="hello-react-container">
      <h1 className="hello-react-title">
        <span className="hello-text">Hello </span>
        <span className="react-text">React</span>
      </h1>
      <div className="exercise-info">
        <h3>Bài tập 1: Thiết kế website hiển thị "Hello React"</h3>
        <p>Từ "React" được highlight bằng màu xanh dương</p>
      </div>
    </div>
  );
};

export default HelloReact;
