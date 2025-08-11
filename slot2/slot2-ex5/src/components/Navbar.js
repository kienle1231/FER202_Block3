import React from 'react';
import './Navbar.css';

const Navbar = ({ setActiveSection, activeSection }) => {
  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'hello-react', label: '1. Hello React' },
    { id: 'react-logo', label: '2. React Logo' },
    { id: 'jsx-text', label: '4. JSX Text' },
    { id: 'course-list', label: '5. Danh sách khóa học' },
    { id: 'people-exercise', label: 'ES6 - Bài tập 1' },
    { id: 'array-exercise', label: 'ES6 - Bài tập 2' },
    { id: 'companies-exercise', label: 'ES6 - Bài tập 3' },
    { id: 'shape-classes', label: '4. Tạo classes' },
    { id: 'promise-exercise', label: '5. Promises' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>JSX & ES6 Exercise</h2>
      </div>
      <ul className="navbar-nav">
        {navItems.map(item => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
