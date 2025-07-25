import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import "../stylesheets/layouts/Navbar.css";
import { isIOS, isAndroid } from 'react-device-detect';
import whiteLogo from "../assets/sportdantaLogo/whiteLogo.png";
import blueLogo from "../assets/sportdantaLogo/blueLogo.png";
import userLogo from "../assets/UserLogo.png";
import arrowlogo from "../assets/arrowlogo.png";
import LoginModal from "../features/auth/components/loginModal";


function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const userId = useSelector((state) => state.auth?.id);
  const token = Cookies.get('token');
  console.log("User in Naber:", userId, token)
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClick = () => {
    const url = isAndroid
      ? `market://details?id=com.example.myapp`
      : isIOS
        ? `https://apps.apple.com/app/idYOUR_APP_ID`
        : "https://play.google.com/store/apps";

    window.location.href = url;
  };

  const handleProfileClick = (e) => {
    if (!userId || !token) {

      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <nav className={`navbar ${isHome ? 'home' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img
            src={isHome ? whiteLogo : blueLogo}
            alt="Danta Sport Logo"
            className="navbar-logo"
          />
        </Link>

        <div className="navbar-actions">
          <Link to="/CorporateBooking" className="navbar-link">Corporate Booking</Link>
          <Link to="/Partner" className="navbar-link">Become a Partner</Link>
          <button className="app-btn" onClick={handleClick}>Get the App<img src={arrowlogo}  width={25} style={{ verticalAlign: 'middle' }} alt="Arrow" /></button>
          <Link to={userId && token ? `/profile/${userId}` : '#'} className="user-icon" onClick={handleProfileClick}>
            <img src={userLogo} alt="User Profile" />
          </Link>
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </nav>
  );
}

export default Navbar;
