import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Container, Alert, Row, Col } from "react-bootstrap";

// Component AdvancedForm với validation đầy đủ
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

  // Hàm xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Hàm validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm validate số điện thoại
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  // Hàm kiểm tra lỗi trước khi submit
  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra tên: không được để trống, chứa 3-50 ký tự
    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống!";
    } else if (formData.name.trim().length < 3 || formData.name.trim().length > 50) {
      newErrors.name = "Tên phải chứa từ 3 đến 50 ký tự!";
    }

    // Kiểm tra tuổi: không được để trống, từ 18-100 tuổi
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

    // Kiểm tra email: không được để trống, đúng định dạng
    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    // Kiểm tra số điện thoại: từ 10-15 chữ số
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10 đến 15 chữ số!";
    }

    // Kiểm tra đồng ý điều khoản
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản!";
    }

    setErrors(newErrors);
    
    // Hiển thị alert nếu có lỗi
    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }

    return Object.keys(newErrors).length === 0;
  };

  // Hàm submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form sau khi submit thành công
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

      {/* Hiển thị Alert nếu có lỗi */}
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <strong>Lỗi:</strong> Vui lòng kiểm tra và sửa các lỗi bên dưới.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {/* Trường tên */}
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
            {/* Trường tuổi */}
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
            {/* Trường email */}
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
            {/* Trường số điện thoại */}
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

        {/* Checkbox đồng ý điều khoản */}
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

        {/* Nút submit */}
        <div className="text-center">
          <Button variant="primary" type="submit" size="lg">
            Đăng Ký
          </Button>
        </div>
      </Form>
    </Container>
  );
};

// Xác định PropTypes cho AdvancedForm
AdvancedForm.propTypes = {
  title: PropTypes.string.isRequired, // Tiêu đề phải là một chuỗi
  onSubmit: PropTypes.func.isRequired, // Hàm onSubmit phải là một function
};

export default AdvancedForm;
