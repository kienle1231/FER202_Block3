import React from 'react';
import './App.css';

function App() {
  
  const courses = ['React', 'ReactNative', 'NodeJs'];

  return (
    <div className="App">
      <div className="course-container">
        <h1 className="course-title">Course names</h1>
        <ul className="course-list">
          {courses.map((course, index) => (
            <li key={index} className="course-item">
              {course}
            </li>
          ))}
        </ul>
    
      </div>
    </div>
  );
}

export default App;
