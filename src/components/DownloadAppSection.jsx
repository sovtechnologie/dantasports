import React, { useEffect, useState } from "react";
import "./StyleSheets/DownloadAppSection.css";
import iphoneImage from "../assets/downloadAppLogo/iPhone 15.png";
import appleicon from "../assets/downloadAppLogo/appleicon.png";
import googleplaystoreicon from "../assets/downloadAppLogo/google icon.png";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setSubtextIndex((prev) => (prev + 1) % subtexts.length);
        setAnimate(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className={`download-app-section${isVisible ? " app-visible" : ""}`}
    >
      {/* Decorative shapes */}
      <div className="shape big-blob" aria-hidden="true"></div>
      <div className="shape small-dot" aria-hidden="true"></div>
      <div className="shape middle-dot" aria-hidden="true"></div>
      <div className="shape bottom-dot" aria-hidden="true"></div>

      <div className="text-content">
        <p className="tagline">#It's Not About Skills It's About You!</p>
        <h2 className="heading">Get the Danta Sports App now!</h2>
        <p className={`subtext${animate ? " subtext-animate" : ""}`}>
          {subtexts[subtextIndex]}
        </p>
        <div className="store-buttons">
          <a
            href="https://play.google.com/store/apps"
            className="google-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={googleplaystoreicon} alt="Google Play" loading="lazy" />
            Google Play
          </a>
          <a
            href="https://apps.apple.com/apps"
            className="apple-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={appleicon} alt="Apple Store" loading="lazy" />
            Apple Store
          </a>
        </div>
      </div>

      <div className="image-container">
        <img
          src={iphoneImage}
          alt="Danta Sports App on iPhone"
          className="iphone-image"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default DownloadAppSection;
