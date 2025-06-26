import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import "../stylesheets/layouts/Navbar.css";
import whiteLogo from "../assets/sportdantaLogo/whiteLogo.png";
import blueLogo from "../assets/sportdantaLogo/blueLogo.png";
import userLogo from "../assets/UserLogo.png";
import arrowlogo from "../assets/arrowlogo.png";
import LoginModal from "../features/auth/components/loginModal";


function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
   
  const { user } = useSelector((state) => state.auth);
  const token  = Cookies.get('token');
  console.log("User in Naber:",user,token)
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleProfileClick = (e) => {
  if (!user || !token) {
    
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
          <button className="app-btn">Get the App<img src={arrowlogo} height={20} width={20} style={{ marginLeft: '8px', verticalAlign: 'middle', marginTop: '-2px' }} alt="Arrow" /></button>
           <Link to={user && token ? `/profile/${user.id}` : '#'} className="user-icon" onClick={handleProfileClick}>
            <img src={userLogo} alt="User Profile" />
          </Link>
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </nav>
  );
}

export default Navbar;
