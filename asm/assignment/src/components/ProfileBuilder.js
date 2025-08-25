import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AboutTab from './ProfileTabs/AboutTab';
import AccountTab from './ProfileTabs/AccountTab';
import AddressTab from './ProfileTabs/AddressTab';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ABOUT':
      return { ...state, about: { ...state.about, [action.field]: action.value } };
    case 'UPDATE_ACCOUNT':
      return { ...state, account: { ...state.account, [action.field]: action.value } };
    case 'UPDATE_ADDRESS':
      return { ...state, address: { ...state.address, [action.field]: action.value } };
    case 'RESET_FORM':
      return {
        about: { firstName: '', lastName: '', email: '', avatar: null },
        account: { username: '', password: '', confirmPassword: '', secretQuestion: '', answer: '' },
        address: { street: '', city: '', state: '', country: '' }
      };
    default:
      return state;
  }
};

const ProfileBuilder = ({ show, onHide }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const initialState = {
    about: { firstName: '', lastName: '', email: '', avatar: null },
    account: { username: '', password: '', confirmPassword: '', secretQuestion: '', answer: '' },
    address: { street: '', city: '', state: '', country: '' }
  };

  const [formData, dispatch] = useReducer(formReducer, initialState);

  const tabs = useMemo(() => ([
    { key: 'about', title: 'About', component: AboutTab },
    { key: 'account', title: 'Account', component: AccountTab },
    { key: 'address', title: 'Address', component: AddressTab }
  ]), []);

  const progressPercentage = useMemo(() => ((currentStep + 1) / tabs.length) * 100, [currentStep, tabs.length]);

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          formData.about.firstName.trim() !== '' &&
          formData.about.lastName.trim() !== '' &&
          formData.about.email.trim() !== '' &&
          formData.about.avatar !== null
        );
      case 1:
        return (
          formData.account.username.length >= 6 &&
          formData.account.password.length >= 8 &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.account.password) &&
          formData.account.password === formData.account.confirmPassword &&
          formData.account.secretQuestion !== '' &&
          formData.account.answer.trim() !== ''
        );
      case 2:
        return (
          formData.address.street.trim() !== '' &&
          formData.address.city.trim() !== '' &&
          formData.address.state.trim() !== '' &&
          formData.address.country !== ''
        );
      default:
        return false;
    }
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    if (currentStep < tabs.length - 1 && isStepValid) setCurrentStep(currentStep + 1);
  }, [currentStep, tabs.length, isStepValid]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const onFileChange = useCallback((file) => {
    dispatch({ type: 'UPDATE_ABOUT', field: 'avatar', value: file });
  }, []);

  const onFieldChange = useCallback((section, field, value) => {
    dispatch({ type: `UPDATE_${section.toUpperCase()}`, field, value });
  }, []);

  const handleFinish = useCallback(() => {
    if (!isStepValid) return;
    setShowSuccessModal(true);
    setShowToast(true);
    setTimeout(() => {
      dispatch({ type: 'RESET_FORM' });
      setCurrentStep(0);
      setShowSuccessModal(false);
      onHide();
    }, 3000);
  }, [isStepValid, onHide]);

  useEffect(() => {
    if (!show) {
      dispatch({ type: 'RESET_FORM' });
      setCurrentStep(0);
      setShowToast(false);
    }
  }, [show]);

  const CurrentTabComponent = tabs[currentStep].component;

  return (
    <>
      {show && (
        <div className="profile-overlay">
          <div className="profile-modal">
            <div className="profile-header">
              <h3 className="profile-title">Build Your Profile</h3>
              <button className="profile-close" onClick={onHide}>×</button>
            </div>
            <div className="profile-body">
              <div className="profile-progress">
                <div className="profile-progress-track">
                  <div className="profile-progress-bar" style={{ width: `${progressPercentage}%` }} />
                </div>
                <div className="profile-steps">Step {currentStep + 1} of {tabs.length}</div>
              </div>

              <div className="profile-tabs">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.key}
                    onClick={() => index <= currentStep && setCurrentStep(index)}
                    disabled={index > currentStep}
                    className={`profile-tab ${index === currentStep ? 'active' : ''}`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              <div className="profile-content">
              <CurrentTabComponent
                formData={formData}
                onFieldChange={onFieldChange}
                onFileChange={onFileChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                isStepValid={isStepValid}
              />
              </div>
            </div>
            <div className="profile-footer">
              <button onClick={prevStep} disabled={currentStep === 0} className="btn btn-secondary">Previous</button>
              {currentStep < tabs.length - 1 ? (
                <button onClick={nextStep} disabled={!isStepValid} className="btn btn-primary">Next</button>
              ) : (
                <button onClick={handleFinish} disabled={!isStepValid} className="btn btn-success">Finish</button>
              )}
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="profile-overlay">
          <div className="profile-modal" style={{ maxWidth: 560 }}>
            <div className="profile-header">
              <h3 className="profile-title">Your Profile</h3>
              <button className="profile-close" onClick={() => setShowSuccessModal(false)}>×</button>
            </div>
            <div className="profile-body">
              {formData.about.avatar && (
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <img src={URL.createObjectURL(formData.about.avatar)} alt="Avatar" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }} />
                </div>
              )}
              <h4>About</h4>
              <div style={{ marginBottom: 8 }}>
                <strong>Name:</strong> {formData.about.firstName} {formData.about.lastName}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Email:</strong> {formData.about.email}
              </div>
              <h4>Account</h4>
              <div style={{ marginBottom: 8 }}>
                <strong>Username:</strong> {formData.account.username}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Secret Question:</strong> {formData.account.secretQuestion}
              </div>
              <h4>Address</h4>
              <div style={{ marginBottom: 8 }}>
                <strong>Street:</strong> {formData.address.street}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>City:</strong> {formData.address.city}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>State:</strong> {formData.address.state}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Country:</strong> {formData.address.country}
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div style={{ position: 'fixed', top: 16, right: 16, background: '#fff', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 6, zIndex: 1200 }}>
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Success!</div>
          <div style={{ padding: '10px 12px' }}>Submitted successfully!</div>
        </div>
      )}
    </>
  );
};

ProfileBuilder.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default ProfileBuilder;


