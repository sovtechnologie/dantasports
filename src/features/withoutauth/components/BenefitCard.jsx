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
    <div className="container my-lg-5 my-3">
      <div className="row g-3 justify-content-center" ref={scrollRef}>
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="col-lg-3 col-md-4 col-sm-6 col-12"
          >
           <div className="card p-3 p-lg-4 h-100 text-center rounded-3"  style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)" }}>
             <div className="text-center">
               <img src={benefit.icon} alt="icon" className="card-icon" />
             </div>
            <h3 className="card-title mb-3 border-none">
              {benefit.title.split(benefit.highlight)[0]}
              <span className="highlight">{benefit.highlight}</span>
              {benefit.title.split(benefit.highlight)[1]}
            </h3>
            <p className="card-subtitle">{benefit.subtitle}</p>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitCard;
