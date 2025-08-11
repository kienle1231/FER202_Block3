import React, { useState, useEffect, useRef } from 'react';

const CompanyOperations = () => {
  const [results, setResults] = useState({});
  const [domElements, setDomElements] = useState([]);
  const domContainerRef = useRef(null);

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

  useEffect(() => {
    const companyNames = [];
    companies.forEach(company => {
      companyNames.push(company.name);
    });

    const companiesAfter1987 = companies.filter(company => company.start > 1987);

    const retailCompanies = companies
      .filter(company => company.category === "Retail")
      .map(company => ({
        ...company,
        start: company.start + 1
      }));

    const sortedByEndDate = [...companies].sort((a, b) => a.end - b.end);

    const sortedAges = [...ages].sort((a, b) => b - a);

    const sumAges = ages.reduce((acc, age) => acc + age, 0);

    const { name, category } = companies[0];
    const newObject = {
      name,
      category,
      print() {
        return `Name: ${this.name}`;
      }
    };

    const sumNumbers = (...numbers) => {
      return numbers.reduce((acc, num) => acc + num, 0);
    };

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

    const { address: { street } } = person;

    let counter = 0;
    const getIncrementingNumber = () => {
      return counter++;
    };

    const parseQueryParams = (url) => {
      const urlObj = new URL(url);
      const params = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    };

    setResults({
      companyNames,
      companiesAfter1987,
      retailCompanies,
      sortedByEndDate,
      sortedAges,
      sumAges,
      newObject,
      sumNumbers: sumNumbers(1, 2, 3, 4, 5),
      addToArray: addToArray(1, [2, 3], 4, [5, 6]),
      street,
      incrementingNumber: getIncrementingNumber(),
      parseQueryParams: parseQueryParams('https://example.com?name=John&age=25&city=NYC')
    });

    setDomElements(retailCompanies);
  }, []);

  return (
    <div className="section">
      <h2>3. Company Operations</h2>

      <div className="data-display">
        <h3>Dữ liệu:</h3>
        <div className="data-section">
          <h4>Companies:</h4>
          <pre>{JSON.stringify(companies, null, 2)}</pre>
        </div>
        <div className="data-section">
          <h4>Ages:</h4>
          <pre>{JSON.stringify(ages, null, 2)}</pre>
        </div>
        <div className="data-section">
          <h4>Person:</h4>
          <pre>{JSON.stringify(person, null, 2)}</pre>
        </div>
      </div>

      <div className="results">
        <h3>Kết quả:</h3>
        
        <div className="result-item">
          <h4>1. Tên tất cả công ty (forEach):</h4>
          <p>{results.companyNames?.join(', ')}</p>
        </div>

        <div className="result-item">
          <h4>2. Công ty bắt đầu sau 1987:</h4>
          <p>{results.companiesAfter1987?.map(c => c.name).join(', ')}</p>
        </div>

        <div className="result-item">
          <h4>3. Công ty Retail (tăng start lên 1):</h4>
          <div ref={domContainerRef} className="dom-container">
            {domElements.map((company, index) => (
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
          <h4>4. Công ty sắp xếp theo end date (tăng dần):</h4>
          <p>{results.sortedByEndDate?.map(c => `${c.name} (${c.end})`).join(', ')}</p>
        </div>

        <div className="result-item">
          <h4>5. Ages sắp xếp giảm dần:</h4>
          <p>{results.sortedAges?.join(', ')}</p>
        </div>

        <div className="result-item">
          <h4>6. Tổng ages (reduce):</h4>
          <p><strong>{results.sumAges}</strong></p>
        </div>

        <div className="result-item">
          <h4>7. Object mới với destructuring và method print:</h4>
          <p>Object: {JSON.stringify({ name: results.newObject?.name, category: results.newObject?.category })}</p>
          <p>Print method: <strong>{results.newObject?.print()}</strong></p>
        </div>

        <div className="result-item">
          <h4>8. Function sum với rest parameters:</h4>
          <p>sumNumbers(1, 2, 3, 4, 5) = <strong>{results.sumNumbers}</strong></p>
        </div>

        <div className="result-item">
          <h4>9. Function addToArray với rest parameters:</h4>
          <p>addToArray(1, [2, 3], 4, [5, 6]) = <strong>[{results.addToArray?.join(', ')}]</strong></p>
        </div>

        <div className="result-item">
          <h4>10. Destructuring street từ person:</h4>
          <p>Street: <strong>{results.street}</strong></p>
        </div>

        <div className="result-item">
          <h4>11. Function incrementing number:</h4>
          <p>Số hiện tại: <strong>{results.incrementingNumber}</strong></p>
        </div>

        <div className="result-item">
          <h4>12. Parse query parameters:</h4>
          <p>URL: https://example.com?name=John&age=25&city=NYC</p>
          <p>Kết quả: <strong>{JSON.stringify(results.parseQueryParams)}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default CompanyOperations;
