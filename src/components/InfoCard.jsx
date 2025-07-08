// InfoCard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./StyleSheets/InfoCard.css"; // Assuming you have a CSS file for styling


function InfoCard({ title, subtitle, video, routePath, className = "" }) {

  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setSubtitleIndex((prev) => (prev + 1) % subtitle.length);
        setAnimate(false);
      }, 400); // Animation duration
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Link to={routePath} className="info-card-link">
      <div className={`info-card ${className}`}>
        {/* <div className="info-card-image" style={{ backgroundImage: `url(${image})` }} /> */}
        <div className="video-wrapper">
          <video
            className="info-card-video"
            src={video}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            controls={false}
          />
        </div>
        <div className="info-card-content">
          <h3>{title}</h3>
          <p className={`subtext ${animate ? "subtext-animate" : ""}`}>
            {subtitle[subtitleIndex]}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default InfoCard;
