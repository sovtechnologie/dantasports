import React from 'react';
import "../stylesheets/layouts/Footer.css"; // Ensure this path is correct
import logo from "../assets/sportdantaLogo/blueLogo.png"; // Replace with correct logo path
import { Link } from 'react-router-dom';
import phonelogo from "../assets/footerLogo/phone.png";
import emailLogo from "../assets/footerLogo/email.png";
import facebookLogo from "../assets/SocialmediaLogo/facebook.png";
import instagramLogo from "../assets/SocialmediaLogo/instagram.png";
import twitterLogo from "../assets/SocialmediaLogo/twitter.png";
import linkedinLogo from "../assets/SocialmediaLogo/linkdin.png";
import googleLogo from "../assets/SocialmediaLogo/google.png";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={logo} alt="Danta Sports Logo" className="footer-logo" />
          <div>
            <h2>Danta Sports</h2>
            <p>India's Leading<br />Sports Venue Booking App</p>
            <div className="footer-socials">
              <a href="" target="_blank" rel="noopener noreferrer">
                <img src={facebookLogo} alt="Facebook" />
              </a>
              <a href=" https://www.instagram.com/dantasports?igsh=MXRnNWg0cmNsN3BycQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <img src={instagramLogo} alt="Instagram" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img src={googleLogo} alt="Google" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img src={twitterLogo} alt="Twitter" />
              </a>
              <a href="https://www.linkedin.com/company/dantasports/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinLogo} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/Partner">Partner With us</Link></li>
              <li><Link to="CorporateBooking">Corporate Booking</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link to="/Book">Book</Link></li>
              <li><Link to="/host-play">Host/Play</Link></li>
              <li><Link to="/run">Run</Link></li>
              <li><Link to="/coach">Coach</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gym">Gym</Link></li>
            </ul>
          </div>
          {/* <div>
            <h4>Our communities</h4>
            <ul>
              <li><Link to="/communities">MM Communities</Link></li>
              <li><Link to="/forum">MM Forum</Link></li>
              <li><Link to="/chat">MM Chat</Link></li>
            </ul>
          </div> */}
          <div>
            <h4>Contact</h4>
            <ul>
              <li><img src={phonelogo} alt='phonelogo'></img>+91-8884803877</li>
              <li><img src={emailLogo} alt='emaillogo' />contact@dantasports.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Danta Sports. All rights reserved.</p>
        <ul>
          <li><Link to="/PrivacyAndPolicy">Privacy Policy</Link></li>
          <li><Link to="/TermsAndConditions">Terms of Use</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
