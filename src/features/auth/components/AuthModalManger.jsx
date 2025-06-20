// src/components/AuthModalManager.jsx
import React, { useState } from 'react';
import Login from '../pages/Login';
import LoginModal from './loginModal';
import Register from '../pages/Register';
import './StyleSheets/AuthModalManager.css'; // Optional: style modal overlay here

function AuthModalManager() {
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | null

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <button onClick={() => setActiveModal('login')}>Login</button>
      <button onClick={() => setActiveModal('register')}>Register</button>

      {activeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>

            {activeModal === 'login' && (
              <LoginModal
                isModal={true}
                onSuccess={closeModal}
                onSwitchToRegister={() => setActiveModal('register')}
              />
            )}

            {activeModal === 'register' && (
              <Register
                isModal={true}
                onSuccess={closeModal}
                onSwitchToLogin={() => setActiveModal('login')}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModalManager;
