import React, { useState, useEffect } from 'react';

const ArrayOperations = () => {
  const [results, setResults] = useState({});

  const array = [1, 2, 3, 4];

  useEffect(() => {
    const sumWithReduce = array.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const productWithReduce = array.reduce((accumulator, currentValue) => {
      return accumulator * currentValue;
    }, 1);

    const sumWithArrow = array.reduce((acc, curr) => acc + curr, 0);
    const productWithArrow = array.reduce((acc, curr) => acc * curr, 1);
    const maxWithArrow = array.reduce((acc, curr) => Math.max(acc, curr), array[0]);
    const minWithArrow = array.reduce((acc, curr) => Math.min(acc, curr), array[0]);

    setResults({
      sumWithReduce,
      productWithReduce,
      sumWithArrow,
      productWithArrow,
      maxWithArrow,
      minWithArrow
    });
  }, []);

  return (
    <div className="section">
      <h2>2. Array Operations</h2>

      <div className="results">
        <h3>Kết quả:</h3>
        
        <div className="result-item">
          <h4>1. Sử dụng reduce với function thông thường:</h4>
          <p>Tổng: <strong>{results.sumWithReduce}</strong></p>
          <p>Tích: <strong>{results.productWithReduce}</strong></p>
        </div>

        <div className="result-item">
          <h4>2. Sử dụng arrow functions (giải pháp đơn giản hóa):</h4>
          <p>Tổng: <strong>{results.sumWithArrow}</strong></p>
          <p>Tích: <strong>{results.productWithArrow}</strong></p>
          <p>Giá trị lớn nhất: <strong>{results.maxWithArrow}</strong></p>
          <p>Giá trị nhỏ nhất: <strong>{results.minWithArrow}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default ArrayOperations;
