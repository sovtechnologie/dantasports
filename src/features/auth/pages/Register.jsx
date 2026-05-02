import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserVerifyOtp,
  registerUserSendOtp,
  clearError,
  resetLoginState,
} from "../../../redux/Slices/authSlice";
import "../StyleSheets/Register.css";
import { useNavigate, Link } from "react-router-dom";
import LoginModal from "../components/loginModal";

/* ── Validation ── */
const validateForm = (form) => {
  const errors = [];
  if (!form.name.trim()) errors.push("Full name is required.");
  if (!/^\d{10}$/.test(form.phone)) errors.push("Enter a valid 10-digit phone number.");
  if (!form.gender) errors.push("Gender is required.");
  if (!form.email) errors.push("Email is required.");
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.push("Enter a valid email address (e.g. username@gmail.com).");
  if (!form.agreeTerms) errors.push("You must agree to the terms and conditions.");
  return errors;
};

const Register = ({
  isModal = false,
  onClose = () => {},
  onSuccess = () => {},
  onSwitchToLogin = () => {},
}) => {
  const [showOtp, setShowOtp]           = useState(false);
  /* When used standalone (not inside LoginModal), we show our own LoginModal.
     When used inside LoginModal, onSwitchToLogin is provided and we call that instead. */
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formErrors, setFormErrors]     = useState([]);
  const [otpVerified, setOtpVerified]   = useState(false);

  /* Switch to login — prefer the parent's handler if provided */
  const handleSwitchToLogin = () => {
    if (isModal && typeof onSwitchToLogin === "function") {
      onSwitchToLogin();
    } else {
      setShowLoginModal(true);
    }
  };

  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { isSendingOtp, isVerifyingOtp, otpSent, error, devOtp, id } =
    useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: "", phone: "", otp: "", gender: "",
    email: "", referralCode: "", agreeTerms: true, agreeSMS: true,
  });

  /* Dev OTP popup */
  useEffect(() => { if (devOtp) setShowOtp(true); }, [devOtp]);
  useEffect(() => { dispatch(resetLoginState()); setShowOtp(false); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setFormErrors([]);
    if (error) dispatch(clearError());
  };

  const handleCopyOtp = () => {
    if (devOtp) { navigator.clipboard.writeText(devOtp.toString()); setShowOtp(false); }
  };

  const handleSendOtp = async () => {
    const validationErrors = validateForm(form);
    if (validationErrors.length > 0) { setFormErrors(validationErrors); return; }
    const data = {
      fullName: form.name, mobileNumber: Number(form.phone),
      email: form.email, gender: form.gender,
      referralCode: form.referralCode, role: 1, marketingConsent: form.agreeSMS,
    };
    try {
      await dispatch(registerUserSendOtp(data)).unwrap();
    } catch (err) {
      const message = typeof err === "string" ? err : err?.message || "Failed";
      if (message.toLowerCase().includes("mobile") && message.toLowerCase().includes("exist")) {
        setForm({ name: "", phone: "", otp: "", gender: "", email: "", referralCode: "", agreeTerms: true, agreeSMS: true });
      }
      setFormErrors([message]);
    }
  };

  const handleVerifyOtp = async () => {
    if (!/^\d{6}$/.test(form.otp)) { setFormErrors(["Enter a valid 6-digit OTP"]); return; }
    try {
      await dispatch(registerUserVerifyOtp({ id, otp: Number(form.otp) })).unwrap();
      setOtpVerified(true);
    } catch (err) {
      setOtpVerified(false);
      const message = typeof err === "string" ? err : err?.message || "OTP Verification Failed";
      setFormErrors([message]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) { setFormErrors(["Please verify the OTP first."]); return; }
    if (isModal && typeof onSuccess === "function") onSuccess();
    navigate("/");
  };

  return (
    <>
      {!showLoginModal && (
        <div className="overlay">
          <div className="register-modal">

            {/* Close */}
            {isModal && (
              <button className="close-button" type="button" onClick={onClose} aria-label="Close">
                ×
              </button>
            )}

            {/* Header */}
            <h2>
              Hello!
              <span>Register to Get Started</span>
            </h2>

            {/* Dev OTP popup */}
            {showOtp && (
              <div className="otp-popup-overlay">
                <div className="otp-popup">
                  <h4>🔐 Dev OTP</h4>
                  <p>{devOtp}</p>
                  <button onClick={handleCopyOtp}>Copy &amp; Paste</button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              {/* Row 1 — Name + Email */}
              <div className="row g-3">
                <div className="col-lg-6 col-12">
                  <label htmlFor="name">Full Name</label>
                  <input
                    name="name" id="name" className="main-input"
                    placeholder="Your full name"
                    value={form.name} onChange={handleChange} required
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label htmlFor="email">Email Address</label>
                  <input
                    name="email" id="email" type="email" className="main-input"
                    placeholder="you@example.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2 — Phone + Gender */}
              <div className="row g-3">
                <div className="col-lg-6 col-12">
                  <label htmlFor="phone">Mobile Number</label>
                  <div className="phone-input">
                    <div className="country-code">
                      <img src="https://flagcdn.com/in.svg" alt="India" />
                      <span>+91</span>
                    </div>
                    <input
                      type="tel" name="phone" id="phone"
                      maxLength="10" placeholder="10-digit number"
                      value={form.phone} onChange={handleChange}
                      required disabled={otpSent}
                    />
                    <button
                      type="button" className="otp-btn"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp || otpSent}
                    >
                      {isSendingOtp && !otpSent ? "Sending…" : otpSent ? "Sent ✓" : "Send OTP"}
                    </button>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" id="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Referral */}
              <div>
                <label htmlFor="referralCode">Referral Code <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span></label>
                <input
                  name="referralCode" id="referralCode" className="main-input"
                  placeholder="Enter referral code"
                  value={form.referralCode} onChange={handleChange}
                />
              </div>

              {/* OTP verify */}
              {otpSent && (
                <div>
                  <label htmlFor="otp">Enter OTP</label>
                  <div className="otp-input">
                    <input
                      name="otp" id="otp" maxLength="6"
                      placeholder="6-digit OTP"
                      value={form.otp} onChange={handleChange} required
                    />
                    <button
                      type="button" className="otp-btn"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingOtp || otpVerified}
                    >
                      {isVerifyingOtp ? "Verifying…" : otpVerified ? "Verified ✓" : "Verify OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* Checkboxes */}
              <div className="checkbox-row">
                <input
                  type="checkbox" name="agreeTerms" id="agreeTerms"
                  checked={form.agreeTerms} onChange={handleChange}
                />
                <p>
                  By creating an account, I agree to the{" "}
                  <Link to="/terms-and-conditions">Terms of Use</Link> and{" "}
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </p>
              </div>

              <div className="checkbox-row">
                <input
                  type="checkbox" name="agreeSMS" id="agreeSMS"
                  checked={form.agreeSMS} onChange={handleChange}
                />
                <p>
                  I consent to receive SMS messages and emails about product updates,
                  events, and marketing promotions.
                </p>
              </div>

              {/* Errors */}
              {formErrors.length > 0 && (
                <div className="error-list">
                  {formErrors.map((err, i) => (
                    <p className="error-text" key={i}>{err}</p>
                  ))}
                </div>
              )}

              {/* Submit */}
              <div className="submit-row">
                <button
                  type="submit" className="signup-btn"
                  disabled={isVerifyingOtp || !otpVerified}
                >
                  Create Account
                </button>
                <p className="login-link">
                  Already have an account?{" "}
                  <button
                    type="button" className="link-button"
                    onClick={handleSwitchToLogin}
                  >
                    Log in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLoginModal && (
        <LoginModal
          isModal={true}
          onSuccess={onSuccess}
          onSwitchToRegister={() => setShowLoginModal(false)}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default Register;
