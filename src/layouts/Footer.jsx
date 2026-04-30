import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../stylesheets/layouts/Footer.css";
import "../stylesheets/layouts/Global.css";
import dantasports from "../assets/sportdantaLogo/dantasports-white.png";
import { Link } from "react-router-dom";
import phone from "../assets/footerLogo/phone.svg";
import email from "../assets/footerLogo/email.svg";
import facebookLogo  from "../assets/SocialmediaLogo/facebook.svg";
import instagramLogo from "../assets/SocialmediaLogo/instagram.svg";
import twitterLogo   from "../assets/SocialmediaLogo/twitter.svg";
import linkedinLogo  from "../assets/SocialmediaLogo/linkdin.svg";
import appleIcon     from "../assets/downloadAppLogo/appleicon.svg";
import playStoreIcon from "../assets/downloadAppLogo/play-store.svg";

const COMPANY_LINKS = [
  { label: "About Us",          path: "/about"            },
  { label: "Partner With Us",   path: "/Partner"          },
  { label: "Corporate Booking", path: "/CorporateBooking" },
  { label: "Account Deactivate",path: "/account-deactivate"},
];

const SERVICE_LINKS = [
  { label: "Turf",   path: "/venue"  },
  { label: "Play",   path: "/Host"   },
  { label: "Run",    path: "/Run"    },
  { label: "Coach",  path: "/Coach"  },
  { label: "Events", path: "/Events" },
  { label: "Gym",    path: "/Gym"    },
];

const CITY_LINKS_1 = ["Bangalore","Mumbai","Pune","Hyderabad","Chennai","New Delhi"];
const CITY_LINKS_2 = ["Bhopal","Gurugram","Noida","Ahmedabad","Nagpur","Kolkata"];

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/profile.php?id=61555453983938", icon: facebookLogo,  label: "Facebook"  },
  { href: "https://www.instagram.com/dantasports/",                 icon: instagramLogo, label: "Instagram" },
  { href: "https://x.com/dantasports",                              icon: twitterLogo,   label: "Twitter"   },
  { href: "https://www.linkedin.com/company/dantasports/",          icon: linkedinLogo,  label: "LinkedIn"  },
];

function Footer() {
  return (
    <footer className="footer_section">
      <Container>
        <Row className="gy-4">
          {/* Brand column */}
          <Col lg={3} md={4} sm={12}>
            <div className="footer_brand">
              <Link to="/">
                <img src={dantasports} alt="Danta Sports" className="footer_logo" />
              </Link>
              <p className="footer_tagline">India's Leading Sports Venue Booking App</p>

              {/* Social icons */}
              <div className="footer_social">
                {SOCIAL_LINKS.map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social_link" aria-label={label}>
                    <img src={icon} alt={label} />
                  </a>
                ))}
              </div>

              {/* App store buttons */}
              <div className="footer_app_btns">
                <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" className="app_store_btn">
                  <img src={playStoreIcon} alt="Google Play" />
                  <span>Google Play</span>
                </a>
                <a href="https://apps.apple.com/apps" target="_blank" rel="noopener noreferrer" className="app_store_btn">
                  <img src={appleIcon} alt="App Store" />
                  <span>App Store</span>
                </a>
              </div>
            </div>
          </Col>

          {/* Links columns */}
          <Col lg={6} md={8} sm={12}>
            <Row>
              <Col md={4} sm={4} xs={6}>
                <h3 className="footer_heading">Company</h3>
                <ul className="footer_links">
                  {COMPANY_LINKS.map(({ label, path }) => (
                    <li key={path}><Link to={path}>{label}</Link></li>
                  ))}
                </ul>
              </Col>
              <Col md={3} sm={4} xs={6}>
                <h3 className="footer_heading">Services</h3>
                <ul className="footer_links">
                  {SERVICE_LINKS.map(({ label, path }) => (
                    <li key={path}><Link to={path}>{label}</Link></li>
                  ))}
                </ul>
              </Col>
              <Col md={5} sm={4} xs={12}>
                <h3 className="footer_heading">Top Cities</h3>
                <div className="footer_cities">
                  <ul className="footer_links">
                    {CITY_LINKS_1.map((city) => (
                      <li key={city}><Link to="/venue">{city}</Link></li>
                    ))}
                  </ul>
                  <ul className="footer_links">
                    {CITY_LINKS_2.map((city) => (
                      <li key={city}><Link to="/venue">{city}</Link></li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Contact column */}
          <Col lg={3} md={12} sm={12}>
            <h3 className="footer_heading">Contact</h3>
            <ul className="footer_contact">
              <li>
                <img src={phone} alt="Phone" />
                <a href="tel:+91-8884803877">+91-8884803877</a>
              </li>
              <li>
                <img src={email} alt="Email" />
                <a href="mailto:contact@dantasports.com">contact@dantasports.com</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Bottom bar */}
      <div className="footer_bottom">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12} className="text-lg-start text-center mb-2 mb-lg-0">
              <p className="footer_copy">© 2025 Danta Sports. All rights reserved.</p>
            </Col>
            <Col lg={6} md={12}>
              <ul className="footer_legal">
                <li><Link to="/pp">Privacy Policy</Link></li>
                <li><Link to="/TermsAndConditions">Terms of Use</Link></li>
                <li><Link to="/RefundPolicy">Refund Policy</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
