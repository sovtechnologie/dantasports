// src/features/auth/components/LoginModal.jsx
import React, { useState } from 'react';
import './StyleSheets/LoginModal.css';
import Login from '../pages/Login';
import RegisterModal from '../pages/Register';

const LoginModal = ({ onClose }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleSwitchToRegister = () => {
    setShowRegisterModal(true);
  };

  return (
    <>
      {!showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={onClose}>×</button>
            <Login isModal={true} onSuccess={onClose} onSwitchToRegister={handleSwitchToRegister} />
          </div>
        </div>
      )}
      {showRegisterModal && <RegisterModal isModal={true} onSuccess={onClose} onSwitchToRegister={handleSwitchToRegister} />}
    </>
  );
};

export default LoginModal;

