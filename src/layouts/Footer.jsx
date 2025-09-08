import React from 'react';
import "../stylesheets/layouts/Footer.css"; // Ensure this path is correct
import logo from "../assets/sportdantaLogo/blueLogo.png"; // Replace with correct logo path
import { Link } from 'react-router-dom';
import phonelogo from "../assets/footerLogo/phone copy.png";
import emailLogo from "../assets/footerLogo/email copy.png";
import facebookLogo from "../assets/SocialmediaLogo/facebook copy.png";
import instagramLogo from "../assets/SocialmediaLogo/instagram copy.png";
import twitterLogo from "../assets/SocialmediaLogo/twitter copy 2.png";
import linkedinLogo from "../assets/SocialmediaLogo/linkdin copy.png";
import googleLogo from "../assets/SocialmediaLogo/google.png";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className='logo-section'>
            <img src={logo} alt="Danta Sports Logo" className="footer-logo" />
            <h2>Danta Sports</h2>
          </div>
          <div className='icon-section-footer'>

            <p>India's Leading<br />Sports Venue Booking App</p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/profile.php?id=61555453983938" target="_blank" rel="noopener noreferrer">
                <img src={facebookLogo} alt="Facebook" />
              </a>
              <a href=" https://www.instagram.com/dantasports?igsh=MXRnNWg0cmNsN3BycQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <img src={instagramLogo} alt="Instagram" />
              </a>
              {/* <a href="" target="_blank" rel="noopener noreferrer">
                <img src={googleLogo} alt="Google" />
              </a> */}
              <a href="https://x.com/dantasports" target="_blank" rel="noopener noreferrer">
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
            <h4>Services</h4>
            <ul>
              <li><Link to="/venue">Book</Link></li>
              <li><Link to="/Host">Host/Play</Link></li>
              <li><Link to="/Run">Run</Link></li>
              <li><Link to="/Coach">Coach</Link></li>
              <li><Link to="/Events">Events</Link></li>
              <li><Link to="/Gym">Gym</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              {/* <li><Link to="">Contact</Link></li> */}
              <li><Link to="/Partner">Partner With us</Link></li>
              <li><Link to="CorporateBooking">Corporate Booking</Link></li>
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
          <li><Link to="/RefundPolicy">Refund Policy</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
