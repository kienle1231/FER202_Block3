import React, { useState, useEffect } from 'react';
import './ArrayExercise.css';

const ArrayExercise = () => {
  const [results, setResults] = useState({});

  const array = [1, 2, 3, 4];

  useEffect(() => {
    // Sử dụng reduce để tính tổng
    const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    // Sử dụng reduce để tính tích
    const product = array.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
    
    // Sử dụng arrow function để tính tổng
    const sumWithArrow = array.reduce((acc, val) => acc + val, 0);
    
    // Sử dụng arrow function để tính tích
    const productWithArrow = array.reduce((acc, val) => acc * val, 1);

    setResults({
      sum,
      product,
      sumWithArrow,
      productWithArrow
    });
  }, []);

  return (
    <div className="array-exercise-container">
      <h2>Bài tập ES6 - Bài tập 2: Xử lý mảng với reduce và arrow functions</h2>
      
      <div className="data-display">
        <h3>Dữ liệu mảng:</h3>
        <pre>{JSON.stringify(array)}</pre>
      </div>

      <div className="results-section">
        <h3>Kết quả:</h3>
        
        <div className="result-item">
          <h4>1. Tính tổng sử dụng reduce:</h4>
          <p>Kết quả: <strong>{results.sum}</strong></p>
          <p>Code: <code>array.reduce((acc, val) => acc + val, 0)</code></p>
        </div>

        <div className="result-item">
          <h4>2. Tính tích sử dụng reduce:</h4>
          <p>Kết quả: <strong>{results.product}</strong></p>
          <p>Code: <code>array.reduce((acc, val) => acc * val, 1)</code></p>
        </div>

        <div className="result-item">
          <h4>3. Sử dụng arrow functions:</h4>
          <p>Tổng với arrow function: <strong>{results.sumWithArrow}</strong></p>
          <p>Tích với arrow function: <strong>{results.productWithArrow}</strong></p>
        </div>
      </div>

      <div className="code-explanation">
        <h3>Giải thích:</h3>
        <ul>
          <li><strong>reduce()</strong>: Áp dụng một function lên accumulator và mỗi phần tử trong mảng để giảm về một giá trị duy nhất</li>
          <li><strong>Arrow functions</strong>: Cú pháp ngắn gọn để viết functions, giúp giảm boilerplate code</li>
          <li><strong>Initial value</strong>: Giá trị khởi tạo cho accumulator (0 cho tổng, 1 cho tích)</li>
        </ul>
        
        <h4>So sánh với function truyền thống:</h4>
        <pre>
{`// Function truyền thống
array.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

// Arrow function
array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);`}
        </pre>
      </div>
    </div>
  );
};

export default ArrayExercise;
