import React from 'react';
import PropTypes from 'prop-types';
import StudentCard from './StudentCard';

const StudentGrid = ({ students, onViewDetails }) => {
  if (students.length === 0) {
    return (
      <div className="no-students">
        <p>Không tìm thấy sinh viên nào phù hợp với bộ lọc.</p>
      </div>
    );
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

StudentGrid.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default StudentGrid;
