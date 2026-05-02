import React, { useState } from "react";
import "./StyleSheets/LoginModal.css";
import Login from "../pages/Login";
import RegisterModal from "../pages/Register";
import { RegisterSportModal } from "../components/Modal/RegisterSportModal";

/**
 * LoginModal — handles the full auth flow:
 *   login → register → sport selection
 *
 * Props:
 *   onClose  — called when the modal should close (backdrop click or ×)
 */
const LoginModal = ({ onClose }) => {
  const [step, setStep] = useState("login"); // "login" | "register" | "sport"

  const handleClose = () => {
    if (typeof onClose === "function") onClose();
  };

  /* Backdrop click closes modal */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  /* ── Login step ── */
  if (step === "login") {
    return (
      <div className="login-modal-overlay" onClick={handleOverlayClick}>
        <div className="login-modal-content">
          <button
            className="login-modal-close"
            type="button"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
          <Login
            isModal={true}
            onSuccess={handleClose}
            onSwitchToRegister={() => setStep("register")}
          />
        </div>
      </div>
    );
  }

  /* ── Register step ── */
  if (step === "register") {
    return (
      <RegisterModal
        isModal={true}
        onClose={() => setStep("login")}
        onSuccess={() => setStep("sport")}
        onSwitchToLogin={() => setStep("login")}
      />
    );
  }

  /* ── Sport selection step ── */
  if (step === "sport") {
    return (
      <RegisterSportModal
        title="Pick your favourite sport"
        onClose={handleClose}
      />
    );
  }

  return null;
};

export default LoginModal;
