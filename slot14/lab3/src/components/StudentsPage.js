import React, { useState, useMemo } from 'react';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import StudentGrid from './StudentGrid';
import StudentDetailModal from './StudentDetailModal';
import { students } from '../students';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('all');
  const [hasAvatar, setHasAvatar] = useState(false);
  
  const [sortBy, setSortBy] = useState('name-asc');
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ageRange !== 'all') {
      switch (ageRange) {
        case 'under20':
          filtered = filtered.filter(student => student.age <= 20);
          break;
        case '21-25':
          filtered = filtered.filter(student => student.age >= 21 && student.age <= 25);
          break;
        case 'over25':
          filtered = filtered.filter(student => student.age > 25);
          break;
        default:
          break;
      }
    }

    if (hasAvatar) {
      filtered = filtered.filter(student => student.avatar);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'age-asc':
          return a.age - b.age;
        case 'age-desc':
          return b.age - a.age;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, ageRange, hasAvatar, sortBy]);

  const handleQuickSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setAgeRange('all');
    setHasAvatar(false);
    setSortBy('name-asc');
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="students-page">
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        ageRange={ageRange}
        onAgeRangeChange={setAgeRange}
        hasAvatar={hasAvatar}
        onHasAvatarChange={setHasAvatar}
      />
      
      <SortDropdown
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <div className="results-info">
        <p>Hiển thị {filteredAndSortedStudents.length} sinh viên</p>
      </div>
      
      <StudentGrid
        students={filteredAndSortedStudents}
        onViewDetails={handleViewDetails}
      />
      
      <StudentDetailModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default StudentsPage;
