import React, { useState } from 'react';
import './App.css';
import PeopleOperations from './components/PeopleOperations';
import ArrayOperations from './components/ArrayOperations';
import CompanyOperations from './components/CompanyOperations';
import ShapeClasses from './components/ShapeClasses';
import PromiseExample from './components/PromiseExample';

function App() {
  const [activeSection, setActiveSection] = useState('people');

  const sections = [
    { id: 'people', name: '1. People Operations' },
    { id: 'array', name: '2. Array Operations' },
    { id: 'company', name: '3. Company Operations' },
    { id: 'shapes', name: '4. Shape Classes' },
    { id: 'promise', name: '5. Promise Example' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'people':
        return <PeopleOperations />;
      case 'array':
        return <ArrayOperations />;
      case 'company':
        return <CompanyOperations />;
      case 'shapes':
        return <ShapeClasses />;
      case 'promise':
        return <PromiseExample />;
      default:
        return <PeopleOperations />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ES6 và JSX Exercise</h1>
        <nav className="nav-tabs">
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </header>
      <main className="App-main">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
