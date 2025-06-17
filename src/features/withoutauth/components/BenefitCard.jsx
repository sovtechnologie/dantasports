// BenefitCarousel.jsx
import React, { useEffect, useRef } from "react";

import "./Stylesheets/BenifitCard.css";

const BenefitCard = ({ benefits = [] }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });

        if (
          container.scrollLeft + container.offsetWidth >= container.scrollWidth
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-card-container">
      <div className="carousel" ref={scrollRef}>
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="card"
          >
            <img src={benefit.icon} alt="icon" className="card-icon" />
            <h3 className="card-title">
              {benefit.title.split(benefit.highlight)[0]}
              <span className="highlight">{benefit.highlight}</span>
              {benefit.title.split(benefit.highlight)[1]}
            </h3>
            <p className="card-subtitle">{benefit.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitCard;
