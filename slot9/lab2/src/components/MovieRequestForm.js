import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { allGenres } from '../data/movies';

const MovieRequestForm = ({ onSubmit, showToast }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const MIN_TITLE_LENGTH = 2;
  const MIN_DESCRIPTION_LENGTH = 30;
  const MIN_YEAR = 1900;
  const MAX_YEAR = new Date().getFullYear() + 5;
  const MIN_DURATION = 1;
  const MAX_DURATION = 300;
  const RESET_TIMEOUT = 3000;

  const validationRules = {
    title: (value) => {
      if (!value.trim()) return 'Tiêu đề phim là bắt buộc';
      if (value.trim().length < MIN_TITLE_LENGTH) return 'Tiêu đề phải có ít nhất 2 ký tự';
      return '';
    },
    genre: (value) => {
      if (!value) return 'Vui lòng chọn thể loại phim';
      return '';
    },
    year: (value) => {
      if (!value) return 'Năm phát hành là bắt buộc';
      const year = parseInt(value);
      if (isNaN(year) || year < MIN_YEAR || year > MAX_YEAR) {
        return `Năm phải từ ${MIN_YEAR} đến ${MAX_YEAR}`;
      }
      return '';
    },
    duration: (value) => {
      if (!value) return 'Thời lượng phim là bắt buộc';
      const duration = parseInt(value);
      if (isNaN(duration) || duration < MIN_DURATION || duration > MAX_DURATION) {
        return `Thời lượng phải từ ${MIN_DURATION} đến ${MAX_DURATION} phút`;
      }
      return '';
    },
    description: (value) => {
      if (!value.trim()) return 'Mô tả phim là bắt buộc';
      if (value.trim().length < MIN_DESCRIPTION_LENGTH) {
        return `Mô tả phải có ít nhất ${MIN_DESCRIPTION_LENGTH} ký tự`;
      }
      return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field](formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setIsSubmitted(true);
      showToast('Yêu cầu đã được gửi. Cảm ơn bạn!', 'success');
      
      setFormData({
        title: '',
        genre: '',
        year: '',
        duration: '',
        description: ''
      });
      setErrors({});
      
      setTimeout(() => setIsSubmitted(false), RESET_TIMEOUT);
    }
  };

  const renderFormField = (name, label, type = 'text', placeholder = '', additionalProps = {}) => (
    <Form.Group className="mb-3">
      <Form.Label>{label} *</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        isInvalid={!!errors[name]}
        placeholder={placeholder}
        {...additionalProps}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  const renderGenreSelect = () => (
    <Form.Group className="mb-3">
      <Form.Label>Thể loại *</Form.Label>
      <Form.Select
        name="genre"
        value={formData.genre}
        onChange={handleInputChange}
        isInvalid={!!errors.genre}
      >
        <option value="">Chọn thể loại...</option>
        {allGenres.filter(genre => genre !== 'All').map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {errors.genre}
      </Form.Control.Feedback>
    </Form.Group>
  );

  const renderDescriptionField = () => (
    <Form.Group className="mb-3">
      <Form.Label>Mô tả phim *</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        isInvalid={!!errors.description}
        placeholder="Mô tả chi tiết về nội dung phim (tối thiểu 30 ký tự)..."
      />
      <Form.Text className="text-muted">
        {formData.description.length}/{MIN_DESCRIPTION_LENGTH} ký tự tối thiểu
      </Form.Text>
      <Form.Control.Feedback type="invalid">
        {errors.description}
      </Form.Control.Feedback>
    </Form.Group>
  );

  if (isSubmitted) {
    return (
      <Alert variant="success" className="text-center">
        <h4>🎉 Yêu cầu đã được gửi thành công!</h4>
        <p>Cảm ơn bạn đã gửi yêu cầu thêm phim. Chúng tôi sẽ xem xét và cập nhật sớm nhất.</p>
      </Alert>
    );
  }

  return (
    <Card className="shadow">
      <Card.Header className="bg-primary text-white">
        <h3 className="mb-0">📝 Form Yêu Cầu Thêm Phim</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {renderFormField('title', 'Tiêu đề phim', 'text', 'Nhập tiêu đề phim...')}
          {renderGenreSelect()}
          
          <div className="row">
            <div className="col-md-6">
              {renderFormField('year', 'Năm phát hành', 'number', '2024', {
                min: MIN_YEAR,
                max: MAX_YEAR
              })}
            </div>
            <div className="col-md-6">
              {renderFormField('duration', 'Thời lượng (phút)', 'number', '120', {
                min: MIN_DURATION,
                max: MAX_DURATION
              })}
            </div>
          </div>

          {renderDescriptionField()}

          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg">
              📤 Gửi Yêu Cầu
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MovieRequestForm;
