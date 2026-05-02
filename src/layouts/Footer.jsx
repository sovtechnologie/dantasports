import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../stylesheets/layouts/Footer.css";
import dantasports    from "../assets/sportdantaLogo/whiteLogo.svg";
import { Link }       from "react-router-dom";
import phone          from "../assets/footerLogo/phone.svg";
import email          from "../assets/footerLogo/email.svg";
import facebookLogo   from "../assets/SocialmediaLogo/facebook.svg";
import instagramLogo  from "../assets/SocialmediaLogo/instagram.svg";
import twitterLogo    from "../assets/SocialmediaLogo/twitter.svg";
import linkedinLogo   from "../assets/SocialmediaLogo/linkdin.svg";
import appleIcon      from "../assets/downloadAppLogo/appleicon.svg";
import playStoreIcon  from "../assets/downloadAppLogo/play-store.svg";

/* ── Data ── */
const COMPANY_LINKS = [
  { label: "About Us",           path: "/about"              },
  { label: "Partner With Us",    path: "/partner"            },
  { label: "Corporate Booking",  path: "/corporate-booking"  },
  { label: "Account Deactivate", path: "/account-deactivate" },
];

const SERVICE_LINKS = [
  { label: "Book Turf",   path: "/venue"  },
  { label: "Play & Host", path: "/host"   },
  { label: "Run Clubs",   path: "/run"    },
  { label: "Find Coach",  path: "/coach"  },
  { label: "Events",      path: "/events" },
  { label: "Gym",         path: "/gym"    },
];

const CITY_LINKS_1 = [
  { city: "Bangalore", path: "/search/Bangalore" },
  { city: "Mumbai",    path: "/search/Mumbai"    },
  { city: "Pune",      path: "/search/Pune"      },
  { city: "Hyderabad", path: "/search/Hyderabad" },
  { city: "Chennai",   path: "/search/Chennai"   },
  { city: "New Delhi", path: "/search/New Delhi" },
];
const CITY_LINKS_2 = [
  { city: "Bhopal",    path: "/search/Bhopal"    },
  { city: "Gurugram",  path: "/search/Gurugram"  },
  { city: "Noida",     path: "/search/Noida"     },
  { city: "Ahmedabad", path: "/search/Ahmedabad" },
  { city: "Nagpur",    path: "/search/Nagpur"    },
  { city: "Kolkata",   path: "/search/Kolkata"   },
];

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/profile.php?id=61555453983938", icon: facebookLogo,  label: "Facebook"  },
  { href: "https://www.instagram.com/dantasports/",                 icon: instagramLogo, label: "Instagram" },
  { href: "https://x.com/dantasports",                              icon: twitterLogo,   label: "Twitter"   },
  { href: "https://www.linkedin.com/company/dantasports/",          icon: linkedinLogo,  label: "LinkedIn"  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",  path: "/privacy-policy"       },
  { label: "Terms of Use",    path: "/terms-and-conditions" },
  { label: "Refund Policy",   path: "/refund-policy"        },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    setNewsletterEmail("");
  };

  return (
    <footer className="footer_section" role="contentinfo">
      <Container style={{ position: "relative", zIndex: 1 }}>

        {/* ── Newsletter strip ── */}
        <div className="footer_newsletter">
          <div>
            <strong>Stay in the game</strong>
            <p>Get the latest sports events, venue deals, and coaching tips.</p>
          </div>
          <form className="footer_newsletter_form" onSubmit={handleNewsletter}>
            <input
              type="email"
              className="footer_newsletter_input"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              aria-label="Newsletter email"
            />
            <button type="submit" className="footer_newsletter_btn">Subscribe</button>
          </form>
        </div>

        <hr className="footer_divider" />

        <Row className="gy-4 pt-4">

          {/* ── Brand ── */}
          <Col lg={3} md={6} sm={12}>
            <div className="footer_brand">
              <Link to="/" aria-label="Danta Sports — Home">
                <img src={dantasports} alt="Danta Sports" className="footer_logo" />
              </Link>
              <p className="footer_tagline">India's leading sports venue booking platform</p>

              {/* Social */}
              <div className="footer_social" aria-label="Social media">
                {SOCIAL_LINKS.map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_link"
                    aria-label={label}
                    title={label}
                  >
                    <img src={icon} alt={label} width={17} height={17} />
                  </a>
                ))}
              </div>

              {/* App store */}
              <div className="footer_app_btns">
                <a
                  href="https://play.google.com/store/apps/details?id=com.dantasports.app"
                  target="_blank" rel="noopener noreferrer"
                  className="app_store_btn"
                  aria-label="Download on Google Play"
                >
                  <img src={playStoreIcon} alt="" width={17} height={17} aria-hidden="true" />
                  <span>Google Play</span>
                </a>
                <a
                  href="https://apps.apple.com/in/app/danta-sports/id6741440498"
                  target="_blank" rel="noopener noreferrer"
                  className="app_store_btn"
                  aria-label="Download on App Store"
                >
                  <img src={appleIcon} alt="" width={17} height={17} aria-hidden="true" />
                  <span>App Store</span>
                </a>
              </div>
            </div>
          </Col>

          {/* ── Links ── */}
          <Col lg={6} md={6} sm={12}>
            <Row>
              <Col md={4} sm={4} xs={6}>
                <h3 className="footer_heading">Company</h3>
                <nav aria-label="Company links">
                  <ul className="footer_links">
                    {COMPANY_LINKS.map(({ label, path }) => (
                      <li key={path}><Link to={path}>{label}</Link></li>
                    ))}
                  </ul>
                </nav>
              </Col>

              <Col md={3} sm={4} xs={6}>
                <h3 className="footer_heading">Services</h3>
                <nav aria-label="Service links">
                  <ul className="footer_links">
                    {SERVICE_LINKS.map(({ label, path }) => (
                      <li key={path}><Link to={path}>{label}</Link></li>
                    ))}
                  </ul>
                </nav>
              </Col>

              <Col md={5} sm={4} xs={12}>
                <h3 className="footer_heading">Top Cities</h3>
                <nav aria-label="City links">
                  <div className="footer_cities">
                    <ul className="footer_links">
                      {CITY_LINKS_1.map(({ city, path }) => (
                        <li key={city}>
                          <Link to={path} title={`Book sports venues in ${city}`}>{city}</Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="footer_links">
                      {CITY_LINKS_2.map(({ city, path }) => (
                        <li key={city}>
                          <Link to={path} title={`Book sports venues in ${city}`}>{city}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </Col>
            </Row>
          </Col>

          {/* ── Contact ── */}
          <Col lg={3} md={12} sm={12}>
            <h3 className="footer_heading">Contact Us</h3>
            <address style={{ fontStyle: "normal" }}>
              <ul className="footer_contact">
                <li>
                  <img src={phone} alt="" aria-hidden="true" />
                  <a href="tel:+918884803877" aria-label="Call Danta Sports">+91-8884803877</a>
                </li>
                <li>
                  <img src={email} alt="" aria-hidden="true" />
                  <a href="mailto:contact@dantasports.com" aria-label="Email Danta Sports">
                    contact@dantasports.com
                  </a>
                </li>
              </ul>
            </address>

            {/* Quick links */}
            <div style={{ marginTop: 20 }}>
              <h3 className="footer_heading">Legal</h3>
              <ul className="footer_links">
                {LEGAL_LINKS.map(({ label, path }) => (
                  <li key={path}><Link to={path}>{label}</Link></li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ── Bottom bar ── */}
      <div className="footer_bottom">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12} className="text-lg-start text-center mb-2 mb-lg-0">
              <p className="footer_copy">
                © {new Date().getFullYear()} Danta Sports Pvt. Ltd. All rights reserved.
              </p>
            </Col>
            <Col lg={6} md={12}>
              <nav aria-label="Legal links">
                <ul className="footer_legal">
                  {LEGAL_LINKS.map(({ label, path }) => (
                    <li key={path}><Link to={path}>{label}</Link></li>
                  ))}
                </ul>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
