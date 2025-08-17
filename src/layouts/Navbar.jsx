import React, { useEffect, useState } from 'react';
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
import locationlogo from "../features/withoutauth/assets/locationlogo.png";
import { getCityName } from '../utils/getCityName';
import { FaBars, FaTimes } from 'react-icons/fa';




function Navbar() {
  const { lat, lng } = useSelector((state) => state.location);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isActive = (path) => location.pathname === path;
  const userId = useSelector((state) => state.auth?.id);
  const token = Cookies.get('token');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
  useEffect(() => {
    getCityName(lat, lng).then(city => setSearchTerm(city));
  }, [lat, lng])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


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
        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>


        {/* WRAP the nav and user icon in a collapsible container */}
        <div className={`navbar-actions ${mobileMenuOpen ? 'active' : ''}`}>
          {isHome ? (
            <>
              <div className='nav-Filter-wrapper'>
                <Link to="/venue" className={`nav-Filter-links ${isActive('/venue') ? 'active-link' : ''}`}>Book</Link>
                <Link to="/CommingSoon" className={`nav-Filter-links ${isActive('/CommingSoon') ? 'active-link' : ''}`}>Host/Play</Link>
                <Link to="/Run" className={`nav-Filter-links ${isActive('/Run') ? 'active-link' : ''}`}>Run</Link>
                <Link to="/Coach" className={`nav-Filter-links ${isActive('/Coach') ? 'active-link' : ''}`}>Coach</Link>
                <Link to="/Events" className={`nav-Filter-links ${isActive('/Events') ? 'active-link' : ''}`}>Events</Link>
                <Link to="/Gym" className={`nav-Filter-links ${isActive('/Gym') ? 'active-link' : ''}`}>Gym</Link>
              </div>
              <button className="app-btn" onClick={handleClick}>Get the App<img src={arrowlogo} width={25} style={{ verticalAlign: 'middle' }} alt="Arrow" /></button>
            </>
          ) : (
            <>
              <div className='nav-Filter-wrapper'>
                <div className="location-search-container">
                  <input type="text" placeholder="Search by location" className="location_Search_Input" value={searchTerm} />
                  <img src={locationlogo} alt="locationlogo" />
                </div>
                <Link to="/venue" className={`nav-Filter-link ${isActive('/venue') ? 'active-link' : ''}`}>Book</Link>
                <Link to="/CommingSoon" className={`nav-Filter-link ${isActive('/CommingSoon') ? 'active-link' : ''}`}>Host/Play</Link>
                <Link to="/Run" className={`nav-Filter-link ${isActive('/Run') ? 'active-link' : ''}`}>Run</Link>
                <Link to="/Coach" className={`nav-Filter-link ${isActive('/Coach') ? 'active-link' : ''}`}>Coach</Link>
                <Link to="/Events" className={`nav-Filter-link ${isActive('/Events') ? 'active-link' : ''}`}>Events</Link>
                <Link to="/Gym" className={`nav-Filter-link ${isActive('/Gym') ? 'active-link' : ''}`}>Gym</Link>
              </div>
            </>
          )}


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
