import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HelloReact from './components/HelloReact';
import ReactLogo from './components/ReactLogo';
import JSXText from './components/JSXText';
import CourseList from './components/CourseList';
import PeopleExercise from './components/PeopleExercise';
import ArrayExercise from './components/ArrayExercise';
import CompaniesExercise from './components/CompaniesExercise';
import ShapeClasses from './components/ShapeClasses';
import PromiseExercise from './components/PromiseExercise';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'hello-react':
        return <HelloReact />;
      case 'react-logo':
        return <ReactLogo />;
      case 'jsx-text':
        return <JSXText />;
      case 'course-list':
        return <CourseList />;
      case 'people-exercise':
        return <PeopleExercise />;
      case 'array-exercise':
        return <ArrayExercise />;
      case 'companies-exercise':
        return <CompaniesExercise />;
      case 'shape-classes':
        return <ShapeClasses />;
      case 'promise-exercise':
        return <PromiseExercise />;
      default:
        return (
          <div className="home-section">
            <h1>Bài tập JSX và ES6</h1>
            <p>Chào mừng bạn đến với bài tập về JSX và ES6!</p>
            <p>Hãy chọn một phần từ thanh điều hướng để bắt đầu.</p>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Navbar setActiveSection={setActiveSection} activeSection={activeSection} />
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
