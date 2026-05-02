import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp, clearError, resetLoginState } from "../../../redux/Slices/authSlice.js";
import "../StyleSheets/Login.css";

const RESEND_SECONDS = 30;

const Login = ({
  isModal = false,
  onSuccess = () => {},
  onSwitchToRegister = () => {},
}) => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const [phone, setPhone]               = useState("");
  const [otp, setOtp]                   = useState("");
  const [otpVerified, setOtpVerified]   = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [whatsappAgree, setWhatsappAgree] = useState(true);
  const [resendTimer, setResendTimer]   = useState(0);
  const [canResend, setCanResend]       = useState(false);

  const { isSendingOtp, isVerifyingOtp, error, otpSent, id } =
    useSelector((s) => s.auth);

  useEffect(() => { dispatch(resetLoginState()); }, [dispatch]);

  /* Resend countdown */
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(p => p - 1), 1000);
    } else if (resendTimer === 0 && otpSent) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer, otpSent]);

  const showError = (msgs) => {
    setValidationErrors(msgs);
    setTimeout(() => setValidationErrors([]), 5000);
  };

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      showError(["Enter a valid 10-digit mobile number."]);
      return;
    }
    try {
      setCanResend(false);
      setResendTimer(RESEND_SECONDS);
      await dispatch(sendOtp(phone)).unwrap();
    } catch {}
  };

  const handleVerifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      showError(["Enter a valid 6-digit OTP."]);
      return;
    }
    try {
      await dispatch(verifyOtp({ id, otp: Number(otp) })).unwrap();
      setOtpVerified(true);
    } catch {
      setOtp("");
    }
  };

  const handleLogin = () => {
    if (!otpVerified) {
      showError(["Please verify the OTP before logging in."]);
      return;
    }
    if (isModal && onSuccess) { onSuccess(); }
    navigate("/");
  };

  return (
    <div className={isModal ? "modal-style" : "login-container"}>
      <div className="login-box">

        {/* Logo mark */}
        <div className="login-logo-mark" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="10" stroke="white" strokeWidth="2"/>
            <path d="M9 13l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Header */}
        <div className="login-header">
          <h2>Welcome <span>Back!</span></h2>
          <p>Sign in to continue to Danta Sports</p>
        </div>

        {/* Phone field */}
        <div className="login-field">
          <label htmlFor="login-phone">Mobile Number</label>
          <div className="input-group">
            <span className="country-code-login">🇮🇳 +91</span>
            <input
              id="login-phone"
              type="tel"
              maxLength="10"
              value={phone}
              placeholder="10-digit number"
              onChange={e => { setPhone(e.target.value); if (error) dispatch(clearError()); }}
              disabled={otpSent && !canResend}
              aria-label="Mobile number"
            />
            <button
              type="button"
              className={`otp-button${otpSent ? (canResend ? " resend-active" : " resend-disabled") : ""}`}
              onClick={handleSendOtp}
              disabled={isSendingOtp || (otpSent && !canResend)}
            >
              {isSendingOtp
                ? "Sending…"
                : otpSent
                  ? canResend
                    ? "Resend OTP"
                    : `Resend (${resendTimer}s)`
                  : "Send OTP"}
            </button>
          </div>
        </div>

        {/* OTP field */}
        <div className="login-field">
          <label htmlFor="login-otp">Enter OTP</label>
          <div className="input-group">
            <input
              id="login-otp"
              type="text"
              maxLength="6"
              value={otp}
              placeholder="6-digit OTP"
              onChange={e => { setOtp(e.target.value); if (error) dispatch(clearError()); }}
              aria-label="OTP"
            />
            <button
              type="button"
              className={`otp-button${otpVerified ? " otp-verified" : ""}`}
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp || otpVerified}
            >
              {otpVerified ? "Verified ✓" : isVerifyingOtp ? "Verifying…" : "Verify OTP"}
            </button>
          </div>
        </div>

        {/* Errors */}
        {(validationErrors.length > 0 || error) && (
          <div className="error-box">
            {validationErrors.map((e, i) => <p key={i} className="error-text">{e}</p>)}
            {error && <p className="error-text">{error}</p>}
          </div>
        )}

        {/* Login button */}
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={isVerifyingOtp || !otpSent}
        >
          Log In
        </button>

        {/* Divider */}
        <div className="login-divider">
          <span>Don't have an account?</span>
        </div>

        {/* Register button */}
        <button
          type="button"
          className="register-button"
          onClick={onSwitchToRegister}
        >
          Create Account
        </button>

        {/* Terms */}
        <div className="checkbox">
          <input
            type="checkbox"
            id="login-terms"
            checked={whatsappAgree}
            onChange={() => setWhatsappAgree(p => !p)}
          />
          <span>
            I agree to the{" "}
            <Link to="/terms-and-conditions">Terms of Use</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
