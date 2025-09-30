import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../stylesheets/layouts/Footer.css"; // Ensure this path is correct
import "../stylesheets/layouts/Global.css";
import dantasports from "../assets/sportdantaLogo/dantasports.png"; // Replace with correct logo path
import { Link } from "react-router-dom";
import phone from "../assets/footerLogo/phone.svg";
import email from "../assets/footerLogo/email.svg";
import facebookLogo from "../assets/SocialmediaLogo/facebook.svg";
import instagramLogo from "../assets/SocialmediaLogo/instagram.svg";
import twitterLogo from "../assets/SocialmediaLogo/twitter.svg";
import linkedinLogo from "../assets/SocialmediaLogo/linkdin.svg";
import googleLogo from "../assets/SocialmediaLogo/google-plues.svg";

function Footer() {
  return (
    <>
      <div className="footer_section mt-lg-5">
        <Container>
          <Row>
            <Col lg={3} md={4} sm={6}>
              <div className="dantaspot_logo">
                <img src={dantasports} alt="" />
              </div>
              <div className="title mt-3">
                <p>
                  India's Leading <br /> Sports Venue Booking App
                </p>
              </div>
              <div className="follow_us d-flex justify-content-lg-between mt-4 pe-lg-5">
                <div className="links">
                  <a
                    href="https://www.facebook.com/profile.php?id=61555453983938"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={facebookLogo} alt="Facebook" />
                  </a>
                </div>
                <div className="links">
                  <a
                    href="https://www.instagram.com/dantasports/?igsh=MXRnNWg0cmNsN3BycQ%3D%3D&utm_source=qr#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagramLogo} alt="instagram" />
                  </a>
                </div>

                <div className="links">
                  <a
                    href="https://x.com/dantasports"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={twitterLogo} alt="twitter" />
                  </a>
                </div>
                <div className="links">
                  <a
                    href="https://www.linkedin.com/company/dantasports/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={linkedinLogo} alt="linkedin" />
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={6} md={8} sm={6}>
              <div className="inner row justify-content-center">
                <div className="sub_inner col-lg-3 col-md-4">
                  <h3>Company</h3>
                  <ul className="p-0 m-0">
                    <li>
                      <Link to="/about">About us</Link>
                    </li>
                    
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    
                    <li>
                      <Link to="/Partner">Partner With us</Link>
                    </li>
                    <li>
                      <Link to="/CorporateBooking">Corporate Booking</Link>
                    </li>
                  </ul>
                </div>
                <div className="sub_inner col-lg-3 col-md-4">
                  <h3>Services</h3>
                  <ul className="p-0 m-0">
                    <li>
                      <Link to="/venue">Book</Link>
                    </li>
                    <li>
                      <Link to="/Host">Host/Play</Link>
                    </li>
                    <li>
                      <Link to="/Run">Run</Link>
                    </li>
                    <li>
                      <Link to="/Coach">Coach</Link>
                    </li>
                    <li>
                      <Link to="/Events">Events</Link>
                    </li>
                    <li>
                      <Link to="/Gym">Gym</Link>
                    </li>
                  </ul>
                </div>
                <div className="sub_inner col-lg-6 col-md-4">
                  <h3>Top Cities</h3>
                  <div className="d-flex">
                    <ul className="p-0 m-0">
                      <li>
                        <Link to="/venue">Bangalore</Link>
                      </li>
                      <li>
                        <Link to="/Host">Mumbai</Link>
                      </li>
                      <li>
                        <Link to="/Run">Pune</Link>
                      </li>
                      <li>
                        <Link to="/Coach">Hyderabad</Link>
                      </li>
                      <li>
                        <Link to="/Events">Chennai</Link>
                      </li>
                      <li>
                        <Link to="/Gym">New Delhi</Link>
                      </li>
                    </ul>
                    <ul className="ps-4">
                      <li>
                        <Link to="/venue">Bhopal</Link>
                      </li>
                      <li>
                        <Link to="/Host">Gurugram</Link>
                      </li>
                      <li>
                        <Link to="/Run">Noida</Link>
                      </li>
                      <li>
                        <Link to="/Coach">Ahmedabad</Link>
                      </li>
                     
                      <li>
                        <Link to="/Gym">Nagpur</Link>
                      </li>
                      <li>
                        <Link to="/Gym">Kolkata</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} md={3} className="">
              <div className="sub_inner">
                <h3>Contact</h3>
                <ul className="p-0 m-0">
                  <div className="d-flex">
                    <img src={phone} alt="" />
                    <li className="ps-3">
                      <a href="tel:+91-8884803877">+91-8884803877</a>
                    </li>
                  </div>
                  <div className="d-flex">
                    <img src={email} alt="" />{" "}
                    <li className="ps-3">
                      <a href="mailto:contact@dantasports.com">contact@dantasports.com</a>
                    </li>
                  </div>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <hr />
      <Container className="sub_footer">
        <Row className="justify-content-lg-around justify-content-center  ">
          <Col lg={6} md={6} className="text-lg-start text-center">
            <p className="m-0">© 2025 Danta Sports. All rights reserved.</p>
          </Col>
          <Col lg={6} md={6}>
            <ul className="d-flex justify-content-center flex-wrap p-0">
              <li>
                <Link to="https://www.dantasports.com/pp">Privacy Policy</Link>
              </li>
              <li>
                <Link to="https://www.dantasports.com/TermsAndConditions">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="https://www.dantasports.com/RefundPolicy">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
