import React, { useEffect, useState } from "react";
import "./StyleSheets/DownloadAppSection.css"; // Assuming you have a CSS file for styling
import iphoneImage from "../assets/downloadAppLogo/iPhone.png"; // adjust the path as needed
import appleicon from "../assets/downloadAppLogo/appleicon.svg";
import googleplaystoreicon from "../assets/downloadAppLogo/play-store.svg";
import { Row,Col,Container} from "react-bootstrap";
import lineImg from '../assets/downloadAppLogo/line.png';
import line2 from '../assets/images/home/icons/line2.png';

const subtexts = [
  "For seamless bookings and exclusive access to top sports venues near you.",
  "To Connect. Host. Play!",
  "To Join the Run Club!",
  "To Find the Right Coach for You!",
  "Discover Gyms Around You!",
];

const DownloadAppSection = () => {
  const [subtextIndex, setSubtextIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setSubtextIndex((prev) => (prev + 1) % subtexts.length);
        setAnimate(false);
      }, 400); // Animation duration
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="downloads_container">
      <Row className="download-app-section">
        <Col lg={8} sm={12}>
                {/* Decorative shapes */}
        <div className="shape big-blob"></div>
        <div className="shape small-dot"></div>
        <div className="shape middle-dot"></div>
        <div className="shape bottom-dot"></div>

        <div className="text-content">
          <p className="tagline">#It's Not About Skills It's About You!</p>
          <h2 className="heading">Get the Danta Sports App now!</h2>
          <p className={`subtext ${animate ? "subtext-animate" : ""}`}>
            {subtexts[subtextIndex]}
          </p>
          <div className="store-buttons">
            <a href="https://play.google.com/store/apps" className="google-btn">
              <img src={googleplaystoreicon} alt="Google Play" />
              Google Play
            </a>
            <a href="https://apps.apple.com/apps" className="apple-btn">
              <img src={appleicon} alt="Apple Store" />
              Apple Store
            </a>
          </div>
        </div>
        </Col>
         <Col >
         <div className="lineicon">
          <img src={line2} alt="" />
         </div>
         </Col>
      </Row>
    </Container>
  );
};

export default DownloadAppSection;
