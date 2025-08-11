import React, { useState } from 'react';
import './App.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState('');

  // Dữ liệu cho các bài tập
  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9}, 
    {name: 'John', age: 40}, 
    {name: 'Ann', age: 19}, 
    {name: 'Elisabeth', age: 16}
  ];

  const array = [1, 2, 3, 4];

  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12"
    }
  };

  // Các hàm ES6
  const findFirstTeenager = () => people.find(person => person.age >= 10 && person.age <= 20);
  const findAllTeenagers = () => people.filter(person => person.age >= 10 && person.age <= 20);
  const isEveryPersonTeenager = () => people.every(person => person.age >= 10 && person.age <= 20);
  const isAnyPersonTeenager = () => people.some(person => person.age >= 10 && person.age <= 20);

  const sumArray = () => array.reduce((acc, curr) => acc + curr, 0);
  const productArray = () => array.reduce((acc, curr) => acc * curr, 1);

  const companiesAfter1987 = companies.filter(company => company.start > 1987);
  const retailCompanies = companies
    .filter(company => company.category === "Retail")
    .map(company => ({ ...company, start: company.start + 1 }));

  const sumAges = ages.reduce((acc, age) => acc + age, 0);

  const { name, category } = companies[0];
  const companyObject = {
    name,
    category,
    print() {
      console.log(this.name);
    }
  };

  const sumNumbers = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);
  const addToArray = (...args) => {
    const result = [];
    args.forEach(arg => {
      if (Array.isArray(arg)) {
        result.push(...arg);
      } else {
        result.push(arg);
      }
    });
    return result;
  };

  const { street } = person.address;

  let counter = 0;
  const getIncrementingNumber = () => {
    counter++;
    return counter - 1;
  };

  const parseQueryParams = (url) => {
    const urlObj = new URL(url);
    const params = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  // Promise function
  const generateRandomNumber = () => {
    return new Promise((resolve, reject) => {
      const randomNum = Math.floor(Math.random() * 10) + 1;
      if (randomNum > 5) {
        resolve(randomNum);
      } else {
        reject("Error");
      }
    });
  };

  const handlePromise = async () => {
    try {
      const result = await generateRandomNumber();
      setRandomNumber(result);
      setError('');
    } catch (err) {
      setError(err);
      setRandomNumber(null);
    }
  };

  // Classes
  class Animal {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    makeSound() {
      return "Some sound";
    }

    getInfo() {
      return `Name: ${this.name}, Age: ${this.age}`;
    }
  }

  class Dog extends Animal {
    constructor(name, age, breed) {
      super(name, age);
      this.breed = breed;
    }

    makeSound() {
      return "Woof!";
    }

    getInfo() {
      return `${super.getInfo()}, Breed: ${this.breed}`;
    }
  }

  const animal = new Animal("Generic Animal", 5);
  const dog = new Dog("Buddy", 3, "Golden Retriever");

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">JSX & ES6 Exercise</div>
        <ul className="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="container">
        {/* Bài tập 1: Website design */}
        <section className="section">
          <h2>1. Website Design</h2>
          <div className="website-design">
            <div className="header">
              <h1>Welcome to Our Website</h1>
              <p>This is a simple website design using JSX and CSS</p>
            </div>
            <div className="content-grid">
              <div className="card">
                <h3>Feature 1</h3>
                <p>Simple feature description</p>
              </div>
              <div className="card">
                <h3>Feature 2</h3>
                <p>Another simple feature</p>
              </div>
              <div className="card">
                <h3>Feature 3</h3>
                <p>Third simple feature</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bài tập 2: Website design 2 */}
        <section className="section">
          <h2>2. Simple Website Design</h2>
          <div className="modern-design">
            <div className="hero-section">
              <h1>Simple Design</h1>
              <p>Basic and clean design</p>
              <button className="cta-button">Get Started</button>
            </div>
            <div className="features">
              <div className="feature-item">
                <h3>Fast</h3>
                <p>Fast performance</p>
              </div>
              <div className="feature-item">
                <h3>Simple</h3>
                <p>Simple design</p>
              </div>
              <div className="feature-item">
                <h3>Clean</h3>
                <p>Clean code</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bài tập 3: Navbar */}
        <section className="section">
          <h2>3. Navigation Bar</h2>
          <div className="navbar-example">
            <nav className="example-navbar">
              <div className="logo">Logo</div>
              <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </div>
        </section>

        {/* Bài tập 4: Text display */}
        <section className="section">
          <h2>4. Text Display</h2>
          <div className="text-display">
            <h1>Welcome to JSX and ES6 Exercise</h1>
            <p>This is a comprehensive exercise covering modern JavaScript features and JSX syntax.</p>
            <p>You will learn about:</p>
            <ul>
              <li>JSX syntax and components</li>
              <li>ES6 features like arrow functions, destructuring, and classes</li>
              <li>Array methods and functional programming</li>
              <li>Promises and async/await</li>
            </ul>
          </div>
        </section>

        {/* Bài tập 5: Course list */}
        <section className="section">
          <h2>5. Course List</h2>
          <div className="course-list">
            <h3>Available Courses</h3>
            <div className="courses">
              <div className="course">
                <h4>JavaScript Fundamentals</h4>
                <p>Learn the basics of JavaScript programming</p>
                <span className="duration">Duration: 8 weeks</span>
              </div>
              <div className="course">
                <h4>React Development</h4>
                <p>Build web applications with React</p>
                <span className="duration">Duration: 10 weeks</span>
              </div>
              <div className="course">
                <h4>ES6+ Features</h4>
                <p>Master modern JavaScript features</p>
                <span className="duration">Duration: 6 weeks</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bài tập ES6 với people array */}
        <section className="section">
          <h2>ES6 Array Methods - People</h2>
          <div className="results">
            <div className="result-item">
              <h4>First Teenager:</h4>
              <p>{findFirstTeenager() ? `${findFirstTeenager().name} (${findFirstTeenager().age})` : 'None'}</p>
            </div>
            <div className="result-item">
              <h4>All Teenagers:</h4>
              <p>{findAllTeenagers().map(p => `${p.name} (${p.age})`).join(', ')}</p>
            </div>
            <div className="result-item">
              <h4>Every Person is Teenager:</h4>
              <p>{isEveryPersonTeenager().toString()}</p>
            </div>
            <div className="result-item">
              <h4>Any Person is Teenager:</h4>
              <p>{isAnyPersonTeenager().toString()}</p>
            </div>
          </div>
        </section>

        {/* Bài tập ES6 với array */}
        <section className="section">
          <h2>ES6 Array Methods - Numbers</h2>
          <div className="results">
            <div className="result-item">
              <h4>Sum of Array [1,2,3,4]:</h4>
              <p>{sumArray()}</p>
            </div>
            <div className="result-item">
              <h4>Product of Array [1,2,3,4]:</h4>
              <p>{productArray()}</p>
            </div>
          </div>
        </section>

        {/* Bài tập ES6 với companies */}
        <section className="section">
          <h2>ES6 Array Methods - Companies</h2>
          <div className="results">
            <div className="result-item">
              <h4>Companies After 1987:</h4>
              <p>{companiesAfter1987.map(c => c.name).join(', ')}</p>
            </div>
            <div className="result-item">
              <h4>Retail Companies (start + 1):</h4>
              <div className="company-cards">
                {retailCompanies.map((company, index) => (
                  <div key={index} className="company-card">
                    <p><strong>Name:</strong> {company.name}</p>
                    <p><strong>Category:</strong> {company.category}</p>
                    <p><strong>Start:</strong> {company.start}</p>
                    <p><strong>End:</strong> {company.end}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="result-item">
              <h4>Sum of All Ages:</h4>
              <p>{sumAges}</p>
            </div>
            <div className="result-item">
              <h4>Street from Person Object:</h4>
              <p>{street}</p>
            </div>
          </div>
        </section>

        {/* Bài tập Classes */}
        <section className="section">
          <h2>Classes</h2>
          <div className="results">
            <div className="result-item">
              <h4>Animal Class:</h4>
              <p>{animal.getInfo()}</p>
              <p>Sound: {animal.makeSound()}</p>
            </div>
            <div className="result-item">
              <h4>Dog Class (inherits from Animal):</h4>
              <p>{dog.getInfo()}</p>
              <p>Sound: {dog.makeSound()}</p>
            </div>
          </div>
        </section>

        {/* Bài tập Promises */}
        <section className="section">
          <h2>Promises</h2>
          <div className="promise-section">
            <button onClick={handlePromise} className="promise-button">
              Generate Random Number
            </button>
            {randomNumber && (
              <div className="result">
                <h4>Random Number:</h4>
                <p>{randomNumber}</p>
              </div>
            )}
            {error && (
              <div className="error">
                <h4>Error:</h4>
                <p>{error}</p>
              </div>
            )}
          </div>
        </section>

        {/* Test các hàm ES6 khác */}
        <section className="section">
          <h2>Other ES6 Functions</h2>
          <div className="results">
            <div className="result-item">
              <h4>Sum of 1,2,3,4,5:</h4>
              <p>{sumNumbers(1,2,3,4,5)}</p>
            </div>
            <div className="result-item">
              <h4>Add to Array (1, [2,3], 4):</h4>
              <p>[{addToArray(1, [2,3], 4).join(', ')}]</p>
            </div>
            <div className="result-item">
              <h4>Incrementing Number:</h4>
              <p>{getIncrementingNumber()}</p>
            </div>
            <div className="result-item">
              <h4>Query Params from "https://example.com?name=John&age=25":</h4>
              <p>{JSON.stringify(parseQueryParams("https://example.com?name=John&age=25"))}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
