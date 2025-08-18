import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProfileForm.css';

const ProfileForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [errors, setErrors] = useState({});
  
  const [touched, setTouched] = useState({});
  
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          return 'Tên không được để trống';
        }
        if (value.trim().length < 2) {
          return 'Tên phải có ít nhất 2 ký tự';
        }
        return '';
        
      case 'email':
        if (!value.trim()) {
          return 'Email không được để trống';
        }
        if (!value.includes('@')) {
          return 'Email phải chứa ký tự @';
        }
        if (!value.includes('.') || value.indexOf('@') > value.lastIndexOf('.')) {
          return 'Email không hợp lệ';
        }
        return '';
        
      case 'age':
        if (!value.trim()) {
          return 'Tuổi không được để trống';
        }
        const ageNum = parseInt(value);
        if (isNaN(ageNum)) {
          return 'Tuổi phải là số';
        }
        if (ageNum < 1) {
          return 'Tuổi phải tối thiểu là 1';
        }
        if (ageNum > 120) {
          return 'Tuổi không hợp lệ';
        }
        return '';
        
      default:
        return '';
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      name: validateField('name', name),
      email: validateField('email', email),
      age: validateField('age', age)
    };
    
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'age':
        setAge(value);
        break;
      default:
        break;
    }
    
    if (touched[fieldName]) {
      const fieldError = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldError || undefined
      }));
    }
  };
  
  const handleInputBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const value = fieldName === 'name' ? name : fieldName === 'email' ? email : age;
    const fieldError = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldError || undefined
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTouched({ name: true, email: true, age: true });
    
    if (validateForm()) {
      setShowToast(true);
      
      setShowModal(true);
      
      if (onSubmit) {
        onSubmit({ name, email, age: parseInt(age) });
      }
      
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  
  const isFormValid = () => {
    return !errors.name && !errors.email && !errors.age && 
           name.trim() && email.trim() && age.trim();
  };
  
  const isFieldValid = (fieldName) => {
    if (!touched[fieldName]) return null;
    return !errors[fieldName];
  };
  
  const getInputClassName = (fieldName) => {
    const valid = isFieldValid(fieldName);
    if (valid === null) return '';
    return valid ? 'valid' : 'error';
  };
  
  return (
    <div className="profile-form-container">
      <h2>Profile Form</h2>
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleInputBlur('name')}
            placeholder="Enter your name"
            className={getInputClassName('name')}
          />
          {touched.name && errors.name && (
            <span className="error-message">{errors.name}</span>
          )}
          {touched.name && !errors.name && name.trim() && (
            <span className="valid-message">✓ Tên hợp lệ</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleInputBlur('email')}
            placeholder="Enter your email"
            className={getInputClassName('email')}
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
          {touched.email && !errors.email && email.trim() && (
            <span className="valid-message">✓ Email hợp lệ</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Tuổi:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            onBlur={() => handleInputBlur('age')}
            placeholder="Enter your age"
            className={getInputClassName('age')}
          />
          {touched.age && errors.age && (
            <span className="error-message">{errors.age}</span>
          )}
          {touched.age && !errors.age && age.trim() && (
            <span className="valid-message">✓ Tuổi hợp lệ</span>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={!isFormValid()}
          className="submit-button"
        >
          Submit
        </button>
      </form>
      
      {showToast && (
        <div className="toast">
          Submitted successfully!
        </div>
      )}
      
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card">
              <h3>Thông tin đã submit thành công!</h3>
              <div className="card-content">
                <p><strong>Tên:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Tuổi:</strong> {age}</p>
              </div>
              <button 
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

ProfileForm.defaultProps = {
  onSubmit: () => console.log('Form submitted')
};

export default ProfileForm;
