import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountTab = ({ 
  formData, 
  onFieldChange, 
  showPassword, 
  setShowPassword, 
  showConfirmPassword, 
  setShowConfirmPassword 
}) => {
  const secretQuestions = [
    'What is your first pet\'s name?',
    'What is your mother\'s maiden name?',
    'In which city were you born?',
    'Who was your favorite teacher?'
  ];


  const isPasswordMatch = formData.account.password === formData.account.confirmPassword;

  return (
    <div>
      <h4 className="mb-4">Thông tin tài khoản</h4>
      
      {/* Username */}
      <Form.Group className="mb-3">
        <Form.Label>Username *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập username (ít nhất 6 ký tự)"
          value={formData.account.username}
          onChange={(e) => onFieldChange('account', 'username', e.target.value)}
          isInvalid={formData.account.username.length > 0 && formData.account.username.length < 6}
          required
        />
        <Form.Control.Feedback type="invalid">
          Username phải có ít nhất 6 ký tự
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Username phải có ít nhất 6 ký tự
        </Form.Text>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3">
        <Form.Label>Mật khẩu *</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
            value={formData.account.password}
            onChange={(e) => onFieldChange('account', 'password', e.target.value)}
            isInvalid={formData.account.password.length > 0 && formData.account.password.length < 8}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          Mật khẩu phải có ít nhất 8 ký tự
        </Form.Control.Feedback>
        
        <Form.Text className="text-muted">
          Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
        </Form.Text>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3">
        <Form.Label>Xác nhận mật khẩu *</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu"
            value={formData.account.confirmPassword}
            onChange={(e) => onFieldChange('account', 'confirmPassword', e.target.value)}
            isInvalid={formData.account.confirmPassword.length > 0 && !isPasswordMatch}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          Mật khẩu xác nhận không khớp
        </Form.Control.Feedback>
        {isPasswordMatch && formData.account.confirmPassword && (
          <Form.Control.Feedback type="valid">
            Mật khẩu khớp
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Secret Question */}
      <Form.Group className="mb-3">
        <Form.Label>Câu hỏi bí mật *</Form.Label>
        <Form.Select
          value={formData.account.secretQuestion}
          onChange={(e) => onFieldChange('account', 'secretQuestion', e.target.value)}
          required
        >
          <option value="">Chọn câu hỏi bí mật</option>
          {secretQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Answer */}
      <Form.Group className="mb-3">
        <Form.Label>Câu trả lời *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập câu trả lời"
          value={formData.account.answer}
          onChange={(e) => onFieldChange('account', 'answer', e.target.value)}
          required
        />
        <Form.Text className="text-muted">
          Câu trả lời này sẽ được sử dụng để khôi phục tài khoản nếu bạn quên mật khẩu
        </Form.Text>
      </Form.Group>
    </div>
  );
};

AccountTab.propTypes = {
  formData: PropTypes.shape({
    account: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmPassword: PropTypes.string.isRequired,
      secretQuestion: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  showConfirmPassword: PropTypes.bool.isRequired,
  setShowConfirmPassword: PropTypes.func.isRequired
};

export default AccountTab;
