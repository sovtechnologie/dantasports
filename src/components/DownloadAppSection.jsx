import React, { useEffect, useState } from "react";
import "./StyleSheets/DownloadAppSection.css";
import iphoneImage from "../assets/downloadAppLogo/iPhone.png";
import appleicon from "../assets/downloadAppLogo/appleicon.svg";
import googleplaystoreicon from "../assets/downloadAppLogo/play-store.svg";
import { Container, Row, Col } from "react-bootstrap";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const SUBTEXTS = [
  "Seamless bookings & exclusive access to top sports venues.",
  "Connect. Host. Play!",
  "Join the Run Club!",
  "Find the Right Coach for You!",
  "Discover Gyms Around You!",
];

export default function DownloadAppSection() {
  const [idx, setIdx]       = useState(0);
  const [animate, setAnimate] = useState(false);
  const [ref, isVisible]    = useIntersectionObserver({ threshold: 0.12 });

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true);
      setTimeout(() => { setIdx((p) => (p + 1) % SUBTEXTS.length); setAnimate(false); }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={`da-section${isVisible ? " da-visible" : ""}`} ref={ref}>
      {/* Decorative blobs */}
      <div className="da-blob da-blob-1" aria-hidden="true" />
      <div className="da-blob da-blob-2" aria-hidden="true" />
      <div className="da-dots da-dots-1" aria-hidden="true" />
      <div className="da-dots da-dots-2" aria-hidden="true" />

      <Container>
        <Row className="align-items-center">
          {/* Text */}
          <Col lg={7} className="da-text-col">
            <span className="da-eyebrow">Download Now</span>
            <h2 className="da-heading">Get the Danta Sports App!</h2>
            <p className="da-tagline">#It's Not About Skills — It's About You!</p>
            <p className={`da-subtext${animate ? " da-subtext--out" : ""}`}>
              {SUBTEXTS[idx]}
            </p>
            <div className="da-btns">
              <a href="https://play.google.com/store/apps" className="da-btn da-btn--google"
                target="_blank" rel="noopener noreferrer">
                <img src={googleplaystoreicon} alt="Google Play" />
                <div>
                  <span className="da-btn-small">Get it on</span>
                  <span className="da-btn-big">Google Play</span>
                </div>
              </a>
              <a href="https://apps.apple.com/apps" className="da-btn da-btn--apple"
                target="_blank" rel="noopener noreferrer">
                <img src={appleicon} alt="App Store" />
                <div>
                  <span className="da-btn-small">Download on the</span>
                  <span className="da-btn-big">App Store</span>
                </div>
              </a>
            </div>
          </Col>

          {/* Phone image */}
          <Col lg={5} className="da-img-col">
            <div className="da-phone-wrap">
              <div className="da-phone-glow" aria-hidden="true" />
              <img src={iphoneImage} alt="Danta Sports App" className="da-phone-img" loading="lazy" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
