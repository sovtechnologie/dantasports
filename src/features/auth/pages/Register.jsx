
// src/components/Auth/Register.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserVerifyOtp, registerUserSendOtp, clearError, resetLoginState } from '../../../redux/Slices/authSlice';
import '../StyleSheets/Register.css';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/loginModal';




const validateForm = (form) => {
  const errors = [];

  if (!form.name.trim()) {
    errors.push('Full name is required.');
  }

  if (!/^\d{10}$/.test(form.phone)) {
    errors.push('Enter a valid 10-digit phone number.');
  }

  if (!form.gender) {
    errors.push('Gender is required.');
  }
  if (!form.email) {
    errors.push('Email is required.');
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.push('Enter a valid email address (e.g. username@gmail.com).');
  }

  if (!form.agreeTerms) {
    errors.push('You must agree to the terms and conditions.');
  }

  return errors;
};

const Register = ({ isModal = false, onClose = () => { }, onSuccess = () => { }, onSwitchToLogin = () => { } }) => {

  // tempory code
  const [showOtp, setShowOtp] = useState(false); // new state

  // tempory code

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLoginModal(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSendingOtp, isVerifyingOtp, otpSent, error, devOtp, id } = useSelector((state) => state.auth);


  const [form, setForm] = useState({
    name: '',
    phone: '',
    otp: '',
    gender: '',
    email: '',
    referralCode: '',
    agreeTerms: true,
    agreeSMS: true,
  });

  const handleCopyOtp = () => {
    if (devOtp) {
      navigator.clipboard.writeText(devOtp.toString()); // Copy to clipboard
      // setOtp(devOtp.toString()); // Auto-fill OTP input
      setShowOtp(false); // Close popup
    }
  };



  useEffect(() => {
    if (devOtp) {
      setShowOtp(true);
    }
  }, [devOtp]);

  useEffect(() => {
    dispatch(resetLoginState());
    setShowOtp(false);
  }, []);

  // useEffect(() => {
  //   if (otpVerified) {
  //     console.log("✅ Token:", token);
  //     if (isModal && onSuccess) {
  //       onSuccess(); // Close modal
  //     } else {
  //       navigate('/'); // For full-page login
  //     }
  //   }
  // }, [otpVerified]);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setFormErrors([]);
    if (error) {
      dispatch(clearError());
    }
  };






  const handleSendOtp = async () => {
    const validationErrors = validateForm(form);
    if (validationErrors.length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    const data = {
      fullName: form.name,
      mobileNumber: Number(form.phone),
      email: form.email,
      gender: form.gender,
      referralCode: form.referralCode,
      role: 1,
      marketingConsent: form.agreeSMS,
    };

    try {
      await dispatch(registerUserSendOtp(data)).unwrap();
    } catch (err) {
      const message = typeof err === 'string' ? err : err?.message || 'Failed';

      console.error("❌ Registration OTP send failed:", message);

      // 🔁 Reset form if mobile number already exists
      if (message.toLowerCase().includes("mobile") && message.toLowerCase().includes("exist")) {
        setForm({
          name: '',
          phone: '',
          otp: '',
          gender: '',
          email: '',
          referralCode: '',
          agreeTerms: true,
          agreeSMS: true,
        });
        setFormErrors([message]);
        console.error('❌ Registration OTP send failed:', message);
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!/^\d{6}$/.test(form.otp)) {
      setFormErrors(['Enter a valid 6-digit OTP']);
      return;
    }

    try {
      await dispatch(registerUserVerifyOtp({ id, otp: Number(form.otp) })).unwrap();
      setOtpVerified(true);
    } catch (err) {
      setOtpVerified(false);
      const message = typeof err === 'string' ? err : err?.message || 'OTP Verification Failed';
      setFormErrors([message]);
      console.error("❌ OTP Verification Failed:", err);
      alert(err);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setFormErrors(['Please verify the OTP first.']);
      return;
    }

    // ✅ Close modal if it's opened as a modal
    if (isModal && typeof onSuccess === 'function') {
      onSuccess();
    }
    navigate('/')
  }

  return (
    <>
      {!showLoginModal && (
        <div className="overlay">
          <div className="register-modal ">
            {isModal && (
              <button className="close-button" type="button" onClick={onClose}>
                ×
              </button>
            )}
            <h2>Hello! <br/> <span>Register  To Get Started</span></h2>
            {/* OTP Dev Popup */}
            {showOtp && (
              <div className="otp-popup-overlay">
                <div className="otp-popup">
                  <h4>🔐 Dev OTP</h4>
                  <p>{devOtp}</p>
                  <button onClick={handleCopyOtp}>Copy & Paste</button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className='col-6'>
                <label htmlFor="name">Full Name</label>
                <input name="name" id="name" placeholder='Full Name' value={form.name} onChange={handleChange} required className='main-input' />
              </div>
              <div className='col-6'>
                <label htmlFor="email">Email Address</label>
                <input name="email" placeholder='Email address' id="email" value={form.email} onChange={handleChange} type="email" className='main-input' />
              </div>
              </div>


             <div className="row">
               <div className='col-6'>
                <label htmlFor="phone">Mobile Number</label>
                <div className="phone-input">
                  <div className="country-code">
                    <img src="https://flagcdn.com/in.svg" alt="India" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    maxLength="10"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter number"

                    required
                    disabled={otpSent}
                  />
                  <button type="button" onClick={handleSendOtp} disabled={isSendingOtp || otpSent} className="otp-btn">
                    {isSendingOtp && !otpSent ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </div>

              <div className='col-6'>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
             </div>
              
              <div>
                <label htmlFor="referralCode">Referral Code (Optional)</label>
                <input name="referralCode" id="referralCode" value={form.referralCode} onChange={handleChange} className='main-input' />
              </div>
              {otpSent && (
                <>
                  <label htmlFor="otp">Enter OTP</label>
                  <div className="otp-input">
                    <input
                      name="otp"
                      id="otp"
                      maxLength="6"
                      value={form.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP"
                      required
                    />
                    <button type="button" onClick={handleVerifyOtp} disabled={isVerifyingOtp || otpVerified} className="otp-btn">
                      {isVerifyingOtp ? 'Verifying...' : otpVerified ? 'Verified' : 'Verify OTP'}
                    </button>
                  </div>
                </>
              )}

              <div className="checkbox-row">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                />
                <p>
                  By creating an account, I agree to our{' '}
                  <a href="/TermsAndConditions">Terms of use</a> and <a href="/PrivacyAndPolicy">Privacy Policy</a>
                </p>
              </div>

              <div className="checkbox-row">
                <input
                  type="checkbox"
                  name="agreeSMS"
                  id="agreeSMS"
                  checked={form.agreeSMS}
                  onChange={handleChange}
                />
                <p>
                  By creating an account, I am also consenting to receive SMS
                  messages and emails, including product new feature updates, events,
                  and marketing promotions.
                </p>
              </div>

              {formErrors.length > 0 && (
                <div className="error-list">
                  {formErrors.map((err, i) => (
                    <p className="error-text" key={i}>
                      {err}
                    </p>
                  ))}
                </div>
              )}
              {/* {error && <p className="error-text">{error}</p>} */}

              <div className="submit-row">
                <button type="submit" className="signup-btn" disabled={isVerifyingOtp || !otpVerified}>
                  SIGN UP
                </button>

                <p className="login-link">
                  Already have an account?{' '}
                  <button type="button" className="link-button" onClick={handleSwitchToRegister}>
                  Log in
                  </button>
                </p>

              </div>
            </form>

          </div>
        </div>
      )}
      {showLoginModal && <LoginModal isModal={true} onSuccess={onSuccess} onSwitchToRegister={handleSwitchToRegister} />}
    </>
  );
};

export default Register;


