import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const CustomToastContainer = ({ toasts, onRemoveToast }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id} 
          show={true} 
          onClose={() => onRemoveToast(toast.id)}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toast.variant === 'success' && '✅ Thành công'}
              {toast.variant === 'info' && 'ℹ️ Thông tin'}
              {toast.variant === 'warning' && '⚠️ Cảnh báo'}
              {toast.variant === 'danger' && '❌ Lỗi'}
            </strong>
            <small>{toast.time}</small>
          </Toast.Header>
          <Toast.Body className={toast.variant === 'success' ? 'text-white' : ''}>
            {toast.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default CustomToastContainer;
