import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../stylesheets/layouts/Navbar.css";
import whiteLogo from "../assets/sportdantaLogo/whiteLogo.png";
import blueLogo from "../assets/sportdantaLogo/blueLogo.png";
import userLogo from "../assets/UserLogo.png";
import arrowlogo from "../assets/arrowlogo.png";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

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
          <button className="app-btn">Get the App<img src={arrowlogo} height={20} width={20}  style={{ marginLeft: '8px', verticalAlign:'middle' ,marginTop: '-2px'}} alt="Arrow" /></button>
          <Link to="/profile/:id" className="user-icon">
            <img src={userLogo} alt="User Profile" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
