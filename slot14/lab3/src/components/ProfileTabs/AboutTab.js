import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';

const AboutTab = ({ formData, onFieldChange, onFileChange, isStepValid }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

    return (
    <div className="about-tab-container">
      <h4 className="mb-4 text-center text-primary fw-bold">Thông tin cá nhân</h4>
      
             <Row className="g-4">
         {/* Avatar Section - Left Side */}
         <Col lg={5} md={12}>
           <div className="avatar-section p-4 bg-light rounded-3 border">
             <Form.Group className="mb-0">
               <Form.Label className="fw-semibold text-dark mb-4">Ảnh đại diện *</Form.Label>
               <div className="text-center">
                 {formData.about.avatar ? (
                   <div className="avatar-preview mb-4">
                     <img 
                       src={URL.createObjectURL(formData.about.avatar)} 
                       alt="Preview" 
                       className="rounded-circle shadow-sm"
                       style={{ 
                         width: '160px', 
                         height: '160px', 
                         objectFit: 'cover',
                         border: '4px solid #fff',
                         boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                       }}
                     />
                   </div>
                 ) : (
                   <div 
                     className="avatar-placeholder mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                     style={{ 
                       width: '160px', 
                       height: '160px', 
                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                       border: '4px solid #fff',
                       color: 'white',
                       cursor: 'pointer',
                       transition: 'all 0.3s ease',
                       position: 'relative'
                     }}
                     onClick={() => document.getElementById('avatar-input').click()}
                   >
                                                                    <div 
                          className="text-center position-absolute"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%'
                          }}
                        >
                                               <div className="fw-semibold" style={{ fontSize: '1.2rem', lineHeight: '1.2' }}>CHOOSE PICTURE</div>
                     </div>
                   </div>
                 )}
                 <Form.Control
                   id="avatar-input"
                   type="file"
                   accept="image/*"
                   onChange={handleFileChange}
                   className={`d-none ${!formData.about.avatar && isStepValid ? 'is-invalid' : ''}`}
                 />
                 <button
                   type="button"
                   className="btn btn-outline-primary w-100"
                   onClick={() => document.getElementById('avatar-input').click()}
                 >
                   {formData.about.avatar ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                 </button>
               </div>
               {!formData.about.avatar && isStepValid && (
                 <div className="invalid-feedback d-block text-center mt-2">
                   Vui lòng chọn ảnh đại diện
                 </div>
               )}
             </Form.Group>
           </div>
         </Col>

         {/* Form Fields - Right Side */}
         <Col lg={7} md={12}>
           <div className="form-section p-4 bg-white rounded-3 border">
             <h5 className="mb-4 text-dark fw-semibold">Thông tin cơ bản</h5>
            
            {/* Name Fields */}
            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-dark">Họ *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ của bạn"
                    value={formData.about.firstName}
                    onChange={(e) => onFieldChange('about', 'firstName', e.target.value)}
                    isInvalid={formData.about.firstName.length > 0 && (formData.about.firstName.trim() === '' || !/^[a-zA-ZÀ-ỹ\s]+$/.test(formData.about.firstName))}
                    className="form-control-lg"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formData.about.firstName.trim() === '' ? 'Vui lòng nhập họ của bạn' : 'Họ chỉ được chứa chữ cái'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-dark">Tên *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên của bạn"
                    value={formData.about.lastName}
                    onChange={(e) => onFieldChange('about', 'lastName', e.target.value)}
                    isInvalid={formData.about.lastName.length > 0 && (formData.about.lastName.trim() === '' || !/^[a-zA-ZÀ-ỹ\s]+$/.test(formData.about.lastName))}
                    className="form-control-lg"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formData.about.lastName.trim() === '' ? 'Vui lòng nhập tên của bạn' : 'Tên chỉ được chứa chữ cái'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Email */}
            <Form.Group className="mb-0">
              <Form.Label className="fw-semibold text-dark">Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                value={formData.about.email}
                onChange={(e) => onFieldChange('about', 'email', e.target.value)}
                isInvalid={formData.about.email.length > 0 && (formData.about.email.trim() === '' || !/\S+@\S+\.\S+/.test(formData.about.email))}
                className="form-control-lg"
                required
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập email hợp lệ
              </Form.Control.Feedback>
              <Form.Text className="text-muted mt-2">
                <i className="fas fa-shield-alt me-1"></i>
                Chúng tôi sẽ không chia sẻ email của bạn với bất kỳ ai khác.
              </Form.Text>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </div>
  );
};

AboutTab.propTypes = {
  formData: PropTypes.shape({
    about: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.object
    }).isRequired
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  isStepValid: PropTypes.bool.isRequired
};

export default AboutTab;
