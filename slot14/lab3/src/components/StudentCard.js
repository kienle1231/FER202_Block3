import React from 'react';
import PropTypes from 'prop-types';

const StudentCard = ({ student, onViewDetails }) => {
  const { id, name, email, age, avatar } = student;

  return (
    <div className="student-card">
      <div className="card-header">
        <span className="student-id">ID: {id}</span>
      </div>
      
      <div className="card-avatar">
        {avatar ? (
          <img 
            src={avatar} 
            alt={`Avatar của ${name}`} 
            className="avatar-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : null}
        <div className="avatar-placeholder" style={{ display: avatar ? 'none' : 'block' }}>
          👤
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="student-name">{name}</h3>
        <p className="student-email">{email}</p>
        <p className="student-age">Tuổi: {age}</p>
      </div>
      
      <div className="card-actions">
        <button 
          className="view-details-btn"
          onClick={() => onViewDetails(student)}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default StudentCard;
