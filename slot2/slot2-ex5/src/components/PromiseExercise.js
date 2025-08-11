import React, { useState } from 'react';
import './PromiseExercise.css';

const PromiseExercise = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Promise function hiển thị số ngẫu nhiên lớn hơn 5
  const generateRandomNumberPromise = () => {
    return new Promise((resolve, reject) => {
      // Tạo số ngẫu nhiên từ 1 đến 10
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      
      // Giả lập delay để demo async
      setTimeout(() => {
        if (randomNumber > 5) {
          resolve(randomNumber);
        } else {
          reject(new Error("Error: Số nhỏ hơn hoặc bằng 5"));
        }
      }, 1000);
    });
  };

  const handlePromiseTest = async () => {
    setIsLoading(true);
    const newResult = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      status: 'running',
      message: 'Đang xử lý...'
    };
    
    setResults(prev => [newResult, ...prev]);

    try {
      const number = await generateRandomNumberPromise();
      setResults(prev => 
        prev.map(result => 
          result.id === newResult.id 
            ? { ...result, status: 'success', message: `Thành công! Số ngẫu nhiên: ${number}` }
            : result
        )
      );
    } catch (error) {
      setResults(prev => 
        prev.map(result => 
          result.id === newResult.id 
            ? { ...result, status: 'error', message: error.message }
            : result
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="promise-exercise-container">
      <h2>Bài tập 5: Promises</h2>
      
      <div className="promise-explanation">
        <h3>Giải thích về Promises:</h3>
        <p>
          Promise là một đối tượng đại diện cho kết quả cuối cùng của một hoạt động bất đồng bộ. 
          Promise có hai kênh: kênh đầu tiên cho kết quả, kênh thứ hai cho lỗi tiềm ẩn.
        </p>
        <ul>
          <li><strong>then()</strong>: Để xử lý kết quả thành công</li>
          <li><strong>catch()</strong>: Để xử lý lỗi</li>
          <li><strong>async/await</strong>: Cú pháp hiện đại để xử lý promises</li>
        </ul>
      </div>

      <div className="promise-task">
        <h3>Yêu cầu bài tập:</h3>
        <p>
          Viết promise function hiển thị số ngẫu nhiên lớn hơn 5. 
          Nếu số nhỏ hơn hoặc bằng 5, hiển thị thông báo: "Error"
        </p>
      </div>

      <div className="promise-demo">
        <h3>Demo Promise:</h3>
        <button 
          onClick={handlePromiseTest} 
          disabled={isLoading}
          className="promise-btn"
        >
          {isLoading ? 'Đang xử lý...' : 'Test Promise'}
        </button>
        
        <button onClick={clearResults} className="clear-btn">
          Xóa kết quả
        </button>
      </div>

      <div className="results-section">
        <h3>Kết quả:</h3>
        {results.length === 0 ? (
          <p className="no-results">Chưa có kết quả nào. Hãy click "Test Promise" để bắt đầu.</p>
        ) : (
          <div className="results-list">
            {results.map(result => (
              <div key={result.id} className={`result-item ${result.status}`}>
                <div className="result-header">
                  <span className="timestamp">{result.timestamp}</span>
                  <span className={`status ${result.status}`}>
                    {result.status === 'running' && '🔄 Đang xử lý'}
                    {result.status === 'success' && '✅ Thành công'}
                    {result.status === 'error' && '❌ Lỗi'}
                  </span>
                </div>
                <p className="message">{result.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="code-section">
        <h3>Code Promise Function:</h3>
        <pre className="code-block">
{`const generateRandomNumberPromise = () => {
  return new Promise((resolve, reject) => {
    // Tạo số ngẫu nhiên từ 1 đến 10
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    
    // Giả lập delay để demo async
    setTimeout(() => {
      if (randomNumber > 5) {
        resolve(randomNumber);  // Thành công
      } else {
        reject(new Error("Error: Số nhỏ hơn hoặc bằng 5"));  // Lỗi
      }
    }, 1000);
  });
};

// Sử dụng với async/await
try {
  const number = await generateRandomNumberPromise();
  console.log('Thành công! Số ngẫu nhiên:', number);
} catch (error) {
  console.log('Lỗi:', error.message);
}`}
        </pre>
      </div>

      <div className="promise-features">
        <h3>Tính năng của Promise:</h3>
        <ul>
          <li><strong>Pending:</strong> Trạng thái ban đầu, chưa hoàn thành</li>
          <li><strong>Fulfilled:</strong> Hoàn thành thành công</li>
          <li><strong>Rejected:</strong> Hoàn thành với lỗi</li>
          <li><strong>Chaining:</strong> Có thể nối nhiều promises</li>
          <li><strong>Error Handling:</strong> Xử lý lỗi tập trung</li>
        </ul>
      </div>
    </div>
  );
};

export default PromiseExercise;
