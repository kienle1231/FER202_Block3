import React from 'react';
import PropTypes from 'prop-types';

const StudentDetailModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;

  const { id, name, email, age, avatar } = student;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chi tiết sinh viên</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-avatar">
            {avatar ? (
              <img 
                src={avatar} 
                alt={`Avatar của ${name}`} 
                className="detail-avatar-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <div className="detail-avatar-placeholder" style={{ display: avatar ? 'none' : 'block' }}>
              👤
            </div>
          </div>
          
          <div className="modal-info">
            <div className="info-row">
              <span className="info-label">ID:</span>
              <span className="info-value">{id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Tên:</span>
              <span className="info-value">{name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Tuổi:</span>
              <span className="info-value">{age}</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

StudentDetailModal.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default StudentDetailModal;
