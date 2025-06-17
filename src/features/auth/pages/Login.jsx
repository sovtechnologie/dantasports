import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '../redux/slices/authSlice';
import '../StyleSheets/login.css';
import qrImage from '../assets/qr.png';

const Login = () => {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [whatsappAgree, setWhatsappAgree] = useState(true);

  const { loading, error, otpSent, token } = useSelector((state) => state.auth);

  const handleSendOtp = () => {
    if (/^\d{10}$/.test(phone)) {
      dispatch(sendOtp('+91' + phone));
    } else {
      alert('Enter a valid 10-digit mobile number');
    }
  };

  const handleVerifyOtp = () => {
    if (/^\d{6}$/.test(otp)) {
      dispatch(verifyOtp({ mobile: '+91' + phone, otp }));
    } else {
      alert('Enter a valid 6-digit OTP');
    }
  };

  useEffect(() => {
    if (token) {
      // Navigate to profile or home after successful login
      window.location.href = '/profile'; // or use useNavigate if you're using react-router-dom v6+
    }
  }, [token]);

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Side */}
        <div className="left-panel">
          <h2>Welcome back</h2>
          <p className="subtitle">You're Almost There!</p>

          {/* Phone Number Input */}
          <label>Enter Mobile Number</label>
          <div className="input-group">
            <span className="country-code">🇮🇳 +91</span>
            <input
              type="tel"
              maxLength="10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter number"
              disabled={otpSent}
            />
            <button onClick={handleSendOtp} className="otp-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>

          {/* OTP Input */}
          {otpSent && (
            <>
              <label>Enter OTP</label>
              <div className="input-group">
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button onClick={handleVerifyOtp} className="otp-button" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </>
          )}

          {/* Login Button */}
          <button className="login-button" onClick={handleVerifyOtp} disabled={loading || !otpSent}>
            LOG IN
          </button>

          {/* Whatsapp Consent */}
          <div className="checkbox">
            <input
              type="checkbox"
              checked={whatsappAgree}
              onChange={() => setWhatsappAgree(!whatsappAgree)}
            />
            <span>I agree to receive updates over WhatsApp</span>
          </div>

          {/* Sign Up Link */}
          <p className="signup-text">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>

          {/* Error Display */}
          {error && <p className="error-text">{error}</p>}
        </div>

        {/* Right Side */}
        <div className="right-panel">
          <img src={qrImage} alt="QR Code" />
          <h3>Log in with QR code</h3>
          <p>Scan this with our App to log in instantly</p>
        </div>
      </div>
    </div>
  );
};

export default Login;









// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { sendOtp, verifyOtp, loginUser } from '../redux/actions/authActions';
// import "../StyleSheets/login.css";
// import qrImage from '../assets/qr.png';

// const Login = () => {
//   const dispatch = useDispatch();
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [whatsappAgree, setWhatsappAgree] = useState(true);

//   const handleSendOtp = () => {
//     if (phone.length === 10) {
//       dispatch(sendOtp('+91' + phone));
//     } else {
//       alert('Enter a valid 10-digit mobile number');
//     }
//   };

//   const handleVerifyOtp = () => {
//     if (otp.length === 6) {
//       dispatch(verifyOtp({ phone: '+91' + phone, otp }));
//     } else {
//       alert('Enter a valid 6-digit OTP');
//     }
//   };

//   const handleLogin = () => {
//     dispatch(loginUser({ phone: '+91' + phone, otp }));
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="left-panel">
//           <h2>Welcome back</h2>
//           <p className="subtitle">You're Almost There!</p>
//           <label>Enter Mobile Number</label>
//           <div className="input-group">
//             <span className="country-code">🇮🇳 +91</span>
//             <input
//               type="tel"
//               maxLength="10"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter number"
//             />
//             <button onClick={handleSendOtp} className="otp-button">Send OTP</button>
//           </div>
//           <label>Enter OTP</label>
//           <div className="input-group">
//             <input
//               type="text"
//               maxLength="6"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//             />
//             <button onClick={handleVerifyOtp} className="otp-button">Verify OTP</button>
//           </div>
//           <button className="login-button" onClick={handleLogin}>LOG IN</button>
//           <div className="checkbox">
//             <input
//               type="checkbox"
//               checked={whatsappAgree}
//               onChange={() => setWhatsappAgree(!whatsappAgree)}
//             />
//             <span>I agree to receive updates over whatsapp</span>
//           </div>
//           <p className="signup-text">
//             Don’t have an account? <a href="/signup">Sign up</a>
//           </p>
//         </div>
//         <div className="right-panel">
//           <img src={qrImage} alt="QR Code" />
//           <h3>Log in with QR code</h3>
//           <p>Scan this with our App to log in instantly</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
