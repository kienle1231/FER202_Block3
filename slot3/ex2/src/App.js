import React, { useState, useMemo } from 'react';
import { persons } from './person';
import './App.css';

function App() {
  const [sortDirection, setSortDirection] = useState('asc');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const allSkills = useMemo(() => {
    return [...new Set(persons.flatMap(person => person.skills))];
  }, []);

  const displayPersons = useMemo(() => {
    let result = persons;
    
    if (minAge || maxAge || selectedSkill) {
      result = persons.filter(({ age, skills }) => {
        const ageInRange = (!minAge || age >= parseInt(minAge)) && 
                          (!maxAge || age <= parseInt(maxAge));
        const hasSkill = !selectedSkill || skills.includes(selectedSkill);
        return ageInRange && hasSkill;
      });
    }
    
    return result.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });
  }, [sortDirection, minAge, maxAge, selectedSkill]);

  const skillRanking = useMemo(() => {
    const skillCount = persons.reduce((acc, { skills }) => {
      skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(skillCount)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const searchResults = useMemo(() => {
    const filtered = persons.filter(({ firstName, lastName }) => {
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    return filtered.sort((a, b) => {
      if (a.isActive !== b.isActive) {
        return b.isActive ? -1 : 1;
      }
      if (a.age !== b.age) {
        return a.age - b.age;
      }
      return a.lastName.localeCompare(b.lastName);
    });
  }, [searchTerm]);

  const statistics = useMemo(() => {
    return persons.reduce((acc, { age, isActive }) => {
      acc.totalPeople += 1;
      acc.totalAge += age;
      if (isActive) {
        acc.activePeople += 1;
      }
      return acc;
    }, { totalPeople: 0, totalAge: 0, activePeople: 0 });
  }, []);

  const averageAge = statistics.totalPeople > 0 ? Math.round(statistics.totalAge / statistics.totalPeople) : 0;

  return (
    <div className="App">
      <h1>Quản lý Danh sách Persons</h1>

      <section>
        <h2>1. Danh sách Persons & Lọc</h2>
        <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
          Sort First Name: {sortDirection === 'asc' ? 'A→Z' : 'Z→A'}
        </button>
        <div>
          <input
            type="number"
            placeholder="Min Age"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Age"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
          <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
            <option value="">Tất cả skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        <ul>
          {displayPersons.length > 0 ? (
            displayPersons.map(person => (
              <li key={person.id}>
                <strong>{person.firstName} {person.lastName}</strong> - 
                Age: {person.age} - 
                City: {person.city} - 
                Skills: {person.skills.join(', ')}
              </li>
            ))
          ) : (
            <li>No found.</li>
          )}
        </ul>
      </section>

      <section>
        <h2>2. Bảng xếp hạng Skill</h2>
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {skillRanking.map((item, index) => (
              <tr key={item.skill} style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                <td>{item.skill}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>3. Tìm kiếm và sắp xếp đa tiêu chí</h2>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="statistics">
          <h3>Statistics</h3>
          <p>Tổng số người: {statistics.totalPeople}</p>
          <p>Tuổi trung bình: {averageAge}</p>
          <p>Số người active: {statistics.activePeople}</p>
        </div>

        <ul>
          {searchResults.map(person => (
            <li key={person.id}>
              <strong>{person.firstName} {person.lastName}</strong> - 
              Age: {person.age} - 
              Active: {person.isActive ? 'Yes' : 'No'} - 
              Skills: {person.skills.join(', ')}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
