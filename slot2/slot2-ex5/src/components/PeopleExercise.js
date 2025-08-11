import React, { useState, useEffect } from 'react';
import './PeopleExercise.css';

const PeopleExercise = () => {
  const [results, setResults] = useState({});

  const people = [
    { name: 'Jack', age: 50 },
    { name: 'Michael', age: 9 },
    { name: 'John', age: 40 },
    { name: 'Ann', age: 19 },
    { name: 'Elisabeth', age: 16 }
  ];

  useEffect(() => {
    // Tìm người đầu tiên là teenager (age >= 10 và age <= 20)
    const firstTeenager = people.find(person => person.age >= 10 && person.age <= 20);
    
    // Tìm tất cả người là teenager
    const allTeenagers = people.filter(person => person.age >= 10 && person.age <= 20);
    
    // Kiểm tra xem tất cả người có phải là teenager không
    const everyPersonTeenager = people.every(person => person.age >= 10 && person.age <= 20);
    
    // Kiểm tra xem có người nào là teenager không
    const anyPersonTeenager = people.some(person => person.age >= 10 && person.age <= 20);

    setResults({
      firstTeenager,
      allTeenagers,
      everyPersonTeenager,
      anyPersonTeenager
    });
  }, []);

  return (
    <div className="people-exercise-container">
      <h2>Bài tập ES6 - Bài tập 1: Xử lý mảng people</h2>
      
      <div className="data-display">
        <h3>Dữ liệu mảng people:</h3>
        <pre>{JSON.stringify(people, null, 2)}</pre>
      </div>

      <div className="results-section">
        <h3>Kết quả:</h3>
        
        <div className="result-item">
          <h4>1. Người đầu tiên là teenager (age >= 10 và age <= 20):</h4>
          <p>
            {results.firstTeenager 
              ? `${results.firstTeenager.name} (${results.firstTeenager.age} tuổi)`
              : 'Không tìm thấy teenager'
            }
          </p>
        </div>

        <div className="result-item">
          <h4>2. Tất cả người là teenager:</h4>
          <ul>
            {results.allTeenagers?.map((person, index) => (
              <li key={index}>{person.name} ({person.age} tuổi)</li>
            ))}
          </ul>
        </div>

        <div className="result-item">
          <h4>3. Kiểm tra xem tất cả người có phải là teenager không:</h4>
          <p>Kết quả: <strong>{results.everyPersonTeenager ? 'true' : 'false'}</strong></p>
        </div>

        <div className="result-item">
          <h4>4. Kiểm tra xem có người nào là teenager không:</h4>
          <p>Kết quả: <strong>{results.anyPersonTeenager ? 'true' : 'false'}</strong></p>
        </div>
      </div>

      <div className="code-explanation">
        <h3>Giải thích code:</h3>
        <ul>
          <li><strong>find()</strong>: Tìm phần tử đầu tiên thỏa mãn điều kiện</li>
          <li><strong>filter()</strong>: Lọc tất cả phần tử thỏa mãn điều kiện</li>
          <li><strong>every()</strong>: Kiểm tra xem tất cả phần tử có thỏa mãn điều kiện không</li>
          <li><strong>some()</strong>: Kiểm tra xem có phần tử nào thỏa mãn điều kiện không</li>
        </ul>
      </div>
    </div>
  );
};

export default PeopleExercise;
