import React, { useState, useEffect } from 'react';
import './CompaniesExercise.css';

const CompaniesExercise = () => {
  const [results, setResults] = useState({});
  const [retailCompanies, setRetailCompanies] = useState([]);

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
    // 1. In tên mỗi công ty sử dụng forEach
    const companyNames = [];
    companies.forEach(company => {
      companyNames.push(company.name);
    });

    // 2. In tên các công ty bắt đầu sau 1987
    const companiesAfter1987 = companies.filter(company => company.start > 1987);

    // 3. Lấy các công ty Retail, tăng start lên 1 và tạo DOM elements
    const retailCompaniesData = companies
      .filter(company => company.category === "Retail")
      .map(company => ({
        ...company,
        start: company.start + 1
      }));

    // 4. Sắp xếp công ty theo end date tăng dần
    const sortedByEndDate = [...companies].sort((a, b) => a.end - b.end);

    // 5. Sắp xếp mảng ages giảm dần
    const sortedAges = [...ages].sort((a, b) => b - a);

    // 6. Tính tổng ages sử dụng reduce
    const sumOfAges = ages.reduce((sum, age) => sum + age, 0);

    // 7. Tạo object mới với destructuring và method
    const newCompany = {
      name: companies[0].name,
      category: companies[0].category,
      print() {
        return this.name;
      }
    };

    // 8. Function nhận số lượng arguments không xác định và trả về tổng
    const sumNumbers = (...numbers) => {
      return numbers.reduce((sum, num) => sum + num, 0);
    };

    // 9. Function nhận arguments bất kỳ và trả về array
    const createArray = (...args) => {
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

    // 10. Destructuring street từ person
    const { address: { street } } = person;

    // 11. Function trả về số tăng dần
    let counter = 0;
    const getIncrementingNumber = () => {
      return counter++;
    };

    // 12. Function xử lý query parameters của URL
    const parseQueryParams = (url) => {
      try {
        const urlObj = new URL(url);
        const params = {};
        urlObj.searchParams.forEach((value, key) => {
          params[key] = value;
        });
        return params;
      } catch (error) {
        return {};
      }
    };

    setResults({
      companyNames,
      companiesAfter1987,
      sortedByEndDate,
      sortedAges,
      sumOfAges,
      newCompany,
      sumNumbers,
      createArray,
      street,
      getIncrementingNumber,
      parseQueryParams
    });

    setRetailCompanies(retailCompaniesData);
  }, []);

  return (
    <div className="companies-exercise-container">
      <h2>Bài tập ES6 - Bài tập 3: Xử lý companies, ages và person</h2>
      
      <div className="data-section">
        <h3>Dữ liệu:</h3>
        <div className="data-item">
          <h4>Companies:</h4>
          <pre>{JSON.stringify(companies, null, 2)}</pre>
        </div>
        <div className="data-item">
          <h4>Ages:</h4>
          <pre>{JSON.stringify(ages, null, 2)}</pre>
        </div>
        <div className="data-item">
          <h4>Person:</h4>
          <pre>{JSON.stringify(person, null, 2)}</pre>
        </div>
      </div>

      <div className="results-section">
        <h3>Kết quả:</h3>
        
        <div className="result-item">
          <h4>1. Tên các công ty (forEach):</h4>
          <ul>
            {results.companyNames?.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="result-item">
          <h4>2. Công ty bắt đầu sau 1987:</h4>
          <ul>
            {results.companiesAfter1987?.map((company, index) => (
              <li key={index}>{company.name} (start: {company.start})</li>
            ))}
          </ul>
        </div>

        <div className="result-item">
          <h4>3. Công ty Retail với start tăng 1:</h4>
          <div className="retail-companies">
            {retailCompanies.map((company, index) => (
              <div key={index} className="company-card">
                <p><strong>Tên:</strong> {company.name}</p>
                <p><strong>Danh mục:</strong> {company.category}</p>
                <p><strong>Bắt đầu:</strong> {company.start}</p>
                <p><strong>Kết thúc:</strong> {company.end}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="result-item">
          <h4>4. Công ty sắp xếp theo end date tăng dần:</h4>
          <ul>
            {results.sortedByEndDate?.map((company, index) => (
              <li key={index}>{company.name} (end: {company.end})</li>
            ))}
          </ul>
        </div>

        <div className="result-item">
          <h4>5. Ages sắp xếp giảm dần:</h4>
          <p>{results.sortedAges?.join(', ')}</p>
        </div>

        <div className="result-item">
          <h4>6. Tổng ages (reduce):</h4>
          <p><strong>{results.sumOfAges}</strong></p>
        </div>

        <div className="result-item">
          <h4>7. Object mới với method print:</h4>
          <p>Tên: <strong>{results.newCompany?.name}</strong></p>
          <p>Danh mục: <strong>{results.newCompany?.category}</strong></p>
          <p>Kết quả print(): <strong>{results.newCompany?.print()}</strong></p>
        </div>

        <div className="result-item">
          <h4>8. Function sumNumbers với rest parameters:</h4>
          <p>sumNumbers(1, 2, 3, 4, 5) = <strong>{results.sumNumbers?.(1, 2, 3, 4, 5)}</strong></p>
        </div>

        <div className="result-item">
          <h4>9. Function createArray:</h4>
          <p>createArray(1, [2, 3], 4) = <strong>{JSON.stringify(results.createArray?.(1, [2, 3], 4))}</strong></p>
        </div>

        <div className="result-item">
          <h4>10. Destructuring street:</h4>
          <p>Street: <strong>{results.street}</strong></p>
        </div>

        <div className="result-item">
          <h4>11. Function tăng dần:</h4>
          <p>Lần 1: <strong>{results.getIncrementingNumber?.()}</strong></p>
          <p>Lần 2: <strong>{results.getIncrementingNumber?.()}</strong></p>
          <p>Lần 3: <strong>{results.getIncrementingNumber?.()}</strong></p>
        </div>

        <div className="result-item">
          <h4>12. Parse query parameters:</h4>
          <p>URL: "https://example.com?name=John&age=25"</p>
          <p>Kết quả: <strong>{JSON.stringify(results.parseQueryParams?.("https://example.com?name=John&age=25"))}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default CompaniesExercise;
