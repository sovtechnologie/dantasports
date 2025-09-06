import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, clearError } from '../../../redux/Slices/authSlice.js';
import { resetLoginState } from "../../../redux/Slices/authSlice.js";
import '../StyleSheets/Login.css';

const Login = ({ isModal = false, onSuccess = () => { }, onSwitchToRegister = () => { } }) => {

  // tempory code
  const [showOtpPopup, setShowOtpPopup] = useState(false); // new state
  const [otpJustSent, setOtpJustSent] = useState(false);

  // tempory code



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [whatsappAgree, setWhatsappAgree] = useState(true);

  const { isSendingOtp, isVerifyingOtp, error, otpSent, token, id, devOtp, user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (token && user) {
  //     console.log("✅ Verified User (from component):", user);
  //     console.log("✅ Token:", token);
  //     if (isModal && onSuccess) {
  //       onSuccess(); // Close modal
  //       navigate('/');
  //     }
  //   }
  // }, [token, user]);

  useEffect(() => {
    dispatch(resetLoginState());
    setShowOtpPopup(false)
  }, []);


  useEffect(() => {
    if (!user || !token) {
      setPhone('');
      setOtp(null);
      setWhatsappAgree(true);
    }
  }, [user, token]);

  const handleCopyOtp = () => {
    if (devOtp) {
      navigator.clipboard.writeText(devOtp.toString()); // Copy to clipboard
      setOtp(devOtp.toString()); // Auto-fill OTP input
      setShowOtpPopup(false); // Close popup
    }
  };


  useEffect(() => {
    if (devOtp && otpJustSent) {
      setShowOtpPopup(true);
      setOtpJustSent(false); // Reset flag after showing popup
    }
  }, [devOtp, otpJustSent]);

  const validateLoginForm = () => {
    const errors = [];

    if (!/^\d{10}$/.test(phone)) {
      errors.push("Enter a valid 10-digit mobile number.");
    }

    if (otp !== null && !/^\d{6}$/.test(otp)) {
      errors.push("Enter a valid 6-digit OTP.");
    }

    return errors;
  };

  const handleSendOtp = async () => {
    const errors = validateLoginForm();

    if (errors.length > 0) {
      setValidationErrors(errors);
      setTimeout(() => setValidationErrors([]), 5000);
      return;
    }

    try {
      await dispatch(sendOtp(phone)).unwrap();
      setOtpJustSent(true);
    } catch (err) {
      console.error("❌ Send OTP failed:", err);
    }
  };

  const handleVerifyOtp = async () => {
    const errors = validateLoginForm();

    if (errors.length > 0) {
      setValidationErrors(errors);
      setTimeout(() => setValidationErrors([]), 5000);
      return;
    }

    try {
      await dispatch(verifyOtp({ id, otp: Number(otp) })).unwrap();
      setOtpVerified(true);
    } catch (err) {
      console.error("❌ Verify OTP failed:", err);
      setOtp('');
    }
  };

  const handlelogIn = () => {
    if (!otpVerified) {
      setValidationErrors(["Please verify the OTP before logging in."]);
      setTimeout(() => setValidationErrors([]), 4000);
      return;
    }

    if (isModal && onSuccess) {
      onSuccess(); // Close modal
      navigate('/');
    }
  };



  return (
    <div className={` ${isModal ? 'modal-style' : ''}`}>
      <div className="login-box">


        {/* OTP Dev Popup */}
        {showOtpPopup && (
          <div className="otp-popup-overlay">
            <div className="otp-popup">
              <h4>🔐 Dev OTP</h4>
              <p>{devOtp}</p>
              <button onClick={handleCopyOtp}>Copy & Paste</button>
            </div>
          </div>
        )}

        {/* Left Side */}
        <div className="left-panel">
          <h2>Welcome back</h2>
          {/* <p className="subtitle">You're Almost There!</p> */}

          {/* Phone Number Input */}
          <label>Enter Mobile Number</label>
          <div className="input-group">
            <span className="country-code-login">🇮🇳 +91</span>
            <input
              type="tel"
              maxLength="10"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) dispatch(clearError());
              }}
              placeholder="Enter number"
              disabled={otpSent}
            />
            <button onClick={handleSendOtp} className="otp-button" disabled={isSendingOtp}>
              {isSendingOtp ? 'Sending...' : 'Send OTP'}
            </button>
          </div>

          {/* OTP Input */}
          {/* {otpSent && ( */}
          <>
            <label>Enter OTP</label>
            <div className="input-group">
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (error) dispatch(clearError());
                }}
                placeholder="Enter OTP"
              />
              <button onClick={handleVerifyOtp} className="otp-button" disabled={isVerifyingOtp}>
                {otpVerified ? 'OTP Verified' : isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </>
          {/* )} */}

          {/* Login Button */}
          <button className="login-button" onClick={handlelogIn} disabled={isVerifyingOtp || !otpSent}>
            LOG IN
          </button>

          {/* Whatsapp Consent */}
          <div className="checkbox">
            <input
              type="checkbox"
              checked={whatsappAgree}
              onChange={() => setWhatsappAgree(!whatsappAgree)}
            />
            <span>I agree to our{' '}
              <a href="/TermsAndConditions">Terms of use</a> and <a href="/PrivacyAndPolicy">Privacy Policy</a></span>
          </div>

          {/* Sign Up Link */}
          <p className="signup-text">
            Don’t have an account?{' '}
            <button type="button" className="link-button" onClick={onSwitchToRegister}>
              Sign up
            </button>
          </p>


          {/* Error Display */}
          {validationErrors.length > 0 && (
            <div className="error-box">
              {validationErrors.map((err, idx) => (
                <p key={idx} className="error-text">{err}</p>
              ))}
            </div>
          )}
          {error && <p className="error-text">{error}</p>}
        </div>

      </div>
    </div>
  );
};

export default Login;








