import React, { useState } from 'react';
import './StyleSheets/LoginModal.css';
import Login from '../pages/Login';
import RegisterModal from '../pages/Register';
import { RegisterSportModal } from '../components/Modal/RegisterSportModal';

const LoginModal = ({ onClose }) => {
  const [step, setStep] = useState('login'); // 'login', 'register', 'sport'

  return (
    <>
      {step === 'login' && (
        <div className="login-modal-overlay">
          <div className="login-modal-content">
            <button className="login-modal-close" onClick={onClose}>×</button>
            <Login
              isModal={true}
              onSuccess={onClose}
              onSwitchToRegister={() => setStep('register')}
            />
          </div>
        </div>
      )}

      {step === 'register' && (
        <RegisterModal
          isModal={true}
          onClose={onClose} // Back to Login
          onSuccess={() => setStep('sport')}         // Register → Sport
          onSwitchToLogin={() => setStep('login')}   // Back to Login
        />
      )}

      {step === 'sport' && (
        <RegisterSportModal
          title="Pick your favourite sport"
          onClose={onClose} // Final close
        />
      )}
    </>
  );
};

export default LoginModal;
