import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Container, Alert, Row, Col } from "react-bootstrap";

const AdvancedForm = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống!";
    } else if (formData.name.trim().length < 3 || formData.name.trim().length > 50) {
      newErrors.name = "Tên phải chứa từ 3 đến 50 ký tự!";
    }

    if (!formData.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(formData.age)) {
      newErrors.age = "Tuổi phải là một số hợp lệ!";
    } else {
      const ageNum = parseInt(formData.age);
      if (ageNum < 18 || ageNum > 100) {
        newErrors.age = "Tuổi phải từ 18 đến 100 tuổi!";
      }
    }

    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10 đến 15 chữ số!";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản!";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: "",
        age: "",
        email: "",
        phone: "",
        agreeToTerms: false,
      });
      setErrors({});
      setShowAlert(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">{title}</h2>

      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <strong>Lỗi:</strong> Vui lòng kiểm tra và sửa các lỗi bên dưới.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Tên <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                placeholder="Nhập tên của bạn"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Tên phải chứa từ 3 đến 50 ký tự
              </Form.Text>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label>Tuổi <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                isInvalid={!!errors.age}
                placeholder="Nhập tuổi"
                min="18"
                max="100"
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Tuổi phải từ 18 đến 100
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="example@email.com"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Nhập email hợp lệ
              </Form.Text>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                placeholder="0123456789"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Số điện thoại từ 10 đến 15 chữ số
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formAgreeToTerms">
          <Form.Check
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            isInvalid={!!errors.agreeToTerms}
            label="Tôi đồng ý với các điều khoản và điều kiện sử dụng"
          />
          {errors.agreeToTerms && (
            <div className="text-danger small mt-1">
              {errors.agreeToTerms}
            </div>
          )}
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" size="lg">
            Đăng Ký
          </Button>
        </div>
      </Form>
    </Container>
  );
};

AdvancedForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AdvancedForm;
