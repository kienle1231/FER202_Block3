import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';

const AddressTab = ({ formData, onFieldChange }) => {
  const countries = [
    'Viet Nam',
    'Korea',
    'Italy',
    'United States',
    'United Kingdom',
    'France',
    'Germany',
    'Japan',
    'China',
    'India',
    'Australia',
    'Canada',
    'Brazil',
    'Mexico',
    'Spain',
    'Netherlands',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland'
  ];

  return (
    <div>
      <h4 className="mb-4">Thông tin địa chỉ</h4>
      
      {/* Street Address */}
      <Form.Group className="mb-3">
        <Form.Label>Địa chỉ đường *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập địa chỉ đường"
          value={formData.address.street}
          onChange={(e) => onFieldChange('address', 'street', e.target.value)}
          required
        />
      </Form.Group>

      {/* City, State */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Thành phố *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập thành phố"
              value={formData.address.city}
              onChange={(e) => onFieldChange('address', 'city', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tỉnh/Bang *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tỉnh/bang"
              value={formData.address.state}
              onChange={(e) => onFieldChange('address', 'state', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Country */}
      <Form.Group className="mb-3">
        <Form.Label>Quốc gia *</Form.Label>
        <Form.Select
          value={formData.address.country}
          onChange={(e) => onFieldChange('address', 'country', e.target.value)}
          required
        >
          <option value="">Chọn quốc gia</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Additional Information */}
      <div className="alert alert-info">
        <h6>Lưu ý:</h6>
        <ul className="mb-0">
          <li>Tất cả các trường đều bắt buộc</li>
          <li>Địa chỉ sẽ được sử dụng cho mục đích giao hàng và liên lạc</li>
          <li>Vui lòng nhập thông tin chính xác để tránh lỗi</li>
        </ul>
      </div>
    </div>
  );
};

AddressTab.propTypes = {
  formData: PropTypes.shape({
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired
};

export default AddressTab;
