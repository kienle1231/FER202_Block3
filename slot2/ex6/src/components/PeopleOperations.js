import React, { useState, useEffect } from 'react';

const PeopleOperations = () => {
  const [results, setResults] = useState({});

  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9}, 
    {name: 'John', age: 40}, 
    {name: 'Ann', age: 19}, 
    {name: 'Elisabeth', age: 16}
  ];

  useEffect(() => {
    const firstTeenager = people.find(person => person.age >= 10 && person.age <= 20);
    
    const allTeenagers = people.filter(person => person.age >= 10 && person.age <= 20);
    
    const everyIsTeenager = people.every(person => person.age >= 10 && person.age <= 20);
    
    const anyIsTeenager = people.some(person => person.age >= 10 && person.age <= 20);

    setResults({
      firstTeenager,
      allTeenagers,
      everyIsTeenager,
      anyIsTeenager
    });
  }, []);

  return (
    <div className="section">
      <h2>1. People Operations</h2>

      <div className="results">
        <h3>Kết quả:</h3>
        
        <div className="result-item">
          <h4>1. Người đầu tiên là teenager (10-20 tuổi):</h4>
          <p>
            {results.firstTeenager 
              ? `${results.firstTeenager.name} (${results.firstTeenager.age} tuổi)`
              : 'Không tìm thấy teenager nào'
            }
          </p>
        </div>

        <div className="result-item">
          <h4>2. Tất cả người là teenager:</h4>
          <p>
            {results.allTeenagers && results.allTeenagers.length > 0
              ? results.allTeenagers.map(person => `${person.name} (${person.age} tuổi)`).join(', ')
              : 'Không có teenager nào'
            }
          </p>
        </div>

        <div className="result-item">
          <h4>3. Tất cả người có phải là teenager không?</h4>
          <p>Kết quả: <strong>{results.everyIsTeenager ? 'True' : 'False'}</strong></p>
        </div>

        <div className="result-item">
          <h4>4. Có người nào là teenager không?</h4>
          <p>Kết quả: <strong>{results.anyIsTeenager ? 'True' : 'False'}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PeopleOperations;
