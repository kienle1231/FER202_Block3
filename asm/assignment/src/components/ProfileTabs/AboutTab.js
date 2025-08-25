import React from 'react';
import PropTypes from 'prop-types';

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

      <div className="about-grid">
        <div>
          <div className="avatar-section p-4 bg-light rounded-3 border">
            <div className="mb-0">
              <label className="fw-semibold text-dark mb-4">Ảnh đại diện *</label>
              <div className="text-center">
                {formData.about.avatar ? (
                  <div className="avatar-preview mb-4">
                    <img src={URL.createObjectURL(formData.about.avatar)} alt="Preview" className="rounded-circle shadow-sm" style={{ objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                  </div>
                ) : (
                  <div
                    className="avatar-placeholder mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: '4px solid #fff', color: 'white', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative' }}
                    onClick={() => document.getElementById('avatar-input').click()}
                  >
                    <div className="text-center position-absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                      <div className="fw-semibold" style={{ fontSize: '1.2rem', lineHeight: '1.2' }}>CHOOSE PICTURE</div>
                    </div>
                  </div>
                )}
                <input id="avatar-input" type="file" accept="image/*" onChange={handleFileChange} className={!formData.about.avatar && isStepValid ? 'is-invalid' : ''} style={{ display: 'none' }} />
                <button type="button" className="btn btn-outline-primary w-100" onClick={() => document.getElementById('avatar-input').click()}>
                  {formData.about.avatar ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                </button>
              </div>
              {!formData.about.avatar && isStepValid && (
                <div className="invalid-feedback d-block text-center mt-2">Vui lòng chọn ảnh đại diện</div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="form-section p-4 bg-white rounded-3 border">
            <h5 className="mb-4 text-dark fw-semibold">Thông tin cơ bản</h5>

            <div className="g-3 mb-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="fw-semibold text-dark">Họ *</label>
                <input
                  type="text"
                  placeholder="Nhập họ của bạn"
                  value={formData.about.firstName}
                  onChange={(e) => onFieldChange('about', 'firstName', e.target.value)}
                  className="form-control form-control-lg"
                />
              </div>
              <div>
                <label className="fw-semibold text-dark">Tên *</label>
                <input
                  type="text"
                  placeholder="Nhập tên của bạn"
                  value={formData.about.lastName}
                  onChange={(e) => onFieldChange('about', 'lastName', e.target.value)}
                  className="form-control form-control-lg"
                />
              </div>
            </div>

            <div className="mb-0">
              <label className="fw-semibold text-dark">Email *</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.about.email}
                onChange={(e) => onFieldChange('about', 'email', e.target.value)}
                className="form-control form-control-lg"
              />
              <small className="text-muted mt-2 d-block">Chúng tôi sẽ không chia sẻ email của bạn với bất kỳ ai khác.</small>
            </div>
          </div>
        </div>
      </div>
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


