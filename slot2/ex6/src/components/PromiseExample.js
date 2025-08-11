import React, { useState } from 'react';

const PromiseExample = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const generateRandomNumberPromise = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      
      setTimeout(() => {
        if (randomNumber > 5) {
          resolve(randomNumber);
        } else {
          reject("Error");
        }
        setLoading(false);
      }, 1000);
    });
  };

  const handleGenerateNumber = async () => {
    try {
      const number = await generateRandomNumberPromise();
      const newResult = `Thành công! Số ngẫu nhiên: ${number}`;
      setResult(newResult);
      setHistory(prev => [...prev, { type: 'success', message: newResult, timestamp: new Date().toLocaleTimeString() }]);
    } catch (error) {
      const newResult = `Lỗi: ${error} - Số nhỏ hơn hoặc bằng 5`;
      setResult(newResult);
      setHistory(prev => [...prev, { type: 'error', message: newResult, timestamp: new Date().toLocaleTimeString() }]);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setResult('');
  };

  return (
    <div className="section">
      <h2>5. Promise Example</h2>

      <div className="promise-controls">
        <h3>Thử nghiệm Promise:</h3>
        <button 
          onClick={handleGenerateNumber} 
          disabled={loading}
          className="generate-btn"
        >
          {loading ? 'Đang tạo số...' : 'Tạo số ngẫu nhiên'}
        </button>
        
        <button 
          onClick={clearHistory} 
          className="clear-btn"
        >
          Xóa lịch sử
        </button>
      </div>

      <div className="current-result">
        <h3>Kết quả hiện tại:</h3>
        <div className={`result-display ${result.includes('Lỗi') ? 'error' : 'success'}`}>
          {result || 'Chưa có kết quả'}
        </div>
      </div>

      <div className="promise-history">
        <h3>Lịch sử:</h3>
        {history.length > 0 ? (
          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className={`history-item ${item.type}`}>
                <span className="timestamp">{item.timestamp}</span>
                <span className="message">{item.message}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>Chưa có lịch sử</p>
        )}
      </div>
    </div>
  );
};

export default PromiseExample;
