import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  Modal, 
  Button, 
  Form, 
  Nav, 
  Card, 
  Toast, 
  ToastContainer,
  ProgressBar
} from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AboutTab from './ProfileTabs/AboutTab';
import AccountTab from './ProfileTabs/AccountTab';
import AddressTab from './ProfileTabs/AddressTab';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'UPDATE_ABOUT':
      return {
        ...state,
        about: {
          ...state.about,
          [action.field]: action.value
        }
      };
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: {
          ...state.account,
          [action.field]: action.value
        }
      };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.value
        }
      };
    case 'RESET_FORM':
      return {
        about: {
          firstName: '',
          lastName: '',
          email: '',
          avatar: null
        },
        account: {
          username: '',
          password: '',
          confirmPassword: '',
          secretQuestion: '',
          answer: ''
        },
        address: {
          street: '',
          city: '',
          state: '',
          country: ''
        }
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
    about: {
      firstName: '',
      lastName: '',
      email: '',
      avatar: null
    },
    account: {
      username: '',
      password: '',
      confirmPassword: '',
      secretQuestion: '',
      answer: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      country: ''
    }
  };

  const [formData, dispatch] = useReducer(formReducer, initialState);

  const tabs = [
    { key: 'about', title: 'About', component: AboutTab },
    { key: 'account', title: 'Account', component: AccountTab },
    { key: 'address', title: 'Address', component: AddressTab }
  ];



  const progressPercentage = useMemo(() => {
    return ((currentStep + 1) / tabs.length) * 100;
  }, [currentStep, tabs.length]);

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 0:
        return formData.about.firstName.trim() !== '' &&
               formData.about.lastName.trim() !== '' &&
               formData.about.email.trim() !== '' &&
               formData.about.avatar !== null;
      case 1:
        return formData.account.username.length >= 6 &&
               formData.account.password.length >= 8 &&
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.account.password) &&
               formData.account.password === formData.account.confirmPassword &&
               formData.account.secretQuestion !== '' &&
               formData.account.answer.trim() !== '';
      case 2:
        return formData.address.street.trim() !== '' &&
               formData.address.city.trim() !== '' &&
               formData.address.state.trim() !== '' &&
               formData.address.country !== '';
      default:
        return false;
    }
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    if (currentStep < tabs.length - 1 && isStepValid) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, tabs.length, isStepValid]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const onFileChange = useCallback((file) => {
    dispatch({ type: 'UPDATE_ABOUT', field: 'avatar', value: file });
  }, []);

  const onFieldChange = useCallback((section, field, value) => {
    dispatch({ type: `UPDATE_${section.toUpperCase()}`, field, value });
  }, []);

  const handleFinish = useCallback(() => {
    if (isStepValid) {
      setShowSuccessModal(true);
      setShowToast(true);
      setTimeout(() => {
        dispatch({ type: 'RESET_FORM' });
        setCurrentStep(0);
        setShowSuccessModal(false);
        onHide();
      }, 3000);
    }
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
      <Modal show={show} onHide={onHide} size="xl" centered className="profile-builder-modal">
        <Modal.Header closeButton>
          <Modal.Title>Build Your Profile</Modal.Title>
        </Modal.Header>
                         <Modal.Body>
          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar 
              now={progressPercentage} 
              className="mb-2"
            />
            <small className="text-muted">
              Step {currentStep + 1} of {tabs.length}
            </small>
          </div>

          {/* Navigation Tabs */}
          <Nav variant="tabs" className="mb-4">
            {tabs.map((tab, index) => (
              <Nav.Item key={tab.key}>
                <Nav.Link 
                  active={index === currentStep}
                  disabled={index > currentStep}
                  onClick={() => index <= currentStep && setCurrentStep(index)}
                >
                  {tab.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Tab Content */}
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
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < tabs.length - 1 ? (
            <Button 
              variant="primary" 
              onClick={nextStep}
              disabled={!isStepValid}
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="success" 
              onClick={handleFinish}
              disabled={!isStepValid}
            >
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              {/* Avatar */}
              {formData.about.avatar && (
                <div className="text-center mb-3">
                  <img 
                    src={URL.createObjectURL(formData.about.avatar)} 
                    alt="Avatar" 
                    className="rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* About Section */}
              <Card.Title>About</Card.Title>
                             <Card.Text>
                 <strong>Name:</strong> {formData.about.firstName} {formData.about.lastName}<br />
                 <strong>Email:</strong> {formData.about.email}
               </Card.Text>

              {/* Account Section */}
              <Card.Title>Account</Card.Title>
              <Card.Text>
                <strong>Username:</strong> {formData.account.username}<br />
                <strong>Secret Question:</strong> {formData.account.secretQuestion}
              </Card.Text>

              {/* Address Section */}
              <Card.Title>Address</Card.Title>
                             <Card.Text>
                 <strong>Street:</strong> {formData.address.street}<br />
                 <strong>City:</strong> {formData.address.city}<br />
                 <strong>State:</strong> {formData.address.state}<br />
                 <strong>Country:</strong> {formData.address.country}
               </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>

      {/* Toast Message */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

ProfileBuilder.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default ProfileBuilder;
