import React, { useRef, useEffect, useState } from "react";
import "./StyleSheets/CultureValues.css";
import ownershipIcon  from "../assets/svg-icons/medal.svg";
import playerIcon     from "../assets/svg-icons/sport-ball.svg";
import teamIcon       from "../assets/svg-icons/team.svg";
import innovationIcon from "../assets/svg-icons/spark.svg";
import longTermIcon   from "../assets/svg-icons/check-circle.svg";
import detailIcon     from "../assets/svg-icons/detail.svg";

const VALUES = [
  {
    icon: ownershipIcon,
    title: "High Ownership",
    description: "We take responsibility end-to-end. Every outcome matters.",
    color: "#e8f0fd",
    accent: "#1163C7",
  },
  {
    icon: playerIcon,
    title: "Player Experience Is Paramount",
    description: "If it doesn't serve our players and partners, it doesn't ship.",
    color: "#fef3e8",
    accent: "#FC8019",
  },
  {
    icon: teamIcon,
    title: "Team > Individuals",
    description: "We win together. Growth is collective.",
    color: "#e8fdf0",
    accent: "#0FA903",
  },
  {
    icon: innovationIcon,
    title: "Constant Excellence & Innovation",
    description: "We move fast, learn faster, and build better every day.",
    color: "#f0e8fd",
    accent: "#7B2FBE",
  },
  {
    icon: longTermIcon,
    title: "Building For The Long Term",
    description: "Short-term wins never come at the cost of long-term trust.",
    color: "#fde8f0",
    accent: "#E65B00",
  },
  {
    icon: detailIcon,
    title: "Attention To Detail",
    description: "Great experiences are built in the smallest moments.",
    color: "#e8fdf8",
    accent: "#0891B2",
  },
];

const CultureValues = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`cv-section${visible ? " cv-visible" : ""}`} ref={ref}>
      {/* Header */}
      <div className="cv-header">
        <span className="cv-eyebrow">Who We Are</span>
        <h2 className="cv-title">
          Our Culture <span className="cv-highlight">and Values</span>
        </h2>
        <p className="cv-subtitle">
          The principles that guide every decision we make at Danta Sports.
        </p>
      </div>

      {/* Grid */}
      <div className="cv-grid">
        {VALUES.map((v, i) => (
          <div
            className="cv-card"
            key={i}
            style={{
              "--card-bg": v.color,
              "--card-accent": v.accent,
              transitionDelay: `${0.08 + i * 0.1}s`,
            }}
          >
            {/* Icon circle */}
            <div className="cv-icon-wrap">
              <img src={v.icon} alt={v.title} loading="lazy" />
            </div>

            {/* Text */}
            <h3 className="cv-card-title">{v.title}</h3>
            <p className="cv-card-desc">{v.description}</p>

            {/* Bottom accent line */}
            <div className="cv-card-line" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CultureValues;
