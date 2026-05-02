import React, { useRef, useEffect, useState } from "react";
import "./StyleSheets/DantaStats.css";

const STATS = [
  { value: "1K+",  label: "Active Users",              icon: "👥" },
  { value: "75+",  label: "Sports",                    icon: "🏅" },
  { value: "500+", label: "Sports Activities Enabled", icon: "⚡" },
  { value: "6K+",  label: "Player Connections",        icon: "🤝" },
];

const DantaStats = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`ds-section${visible ? " ds-visible" : ""}`} ref={ref}>
      {/* Background decorative elements */}
      <div className="ds-bg-circle ds-bg-circle-1" aria-hidden="true" />
      <div className="ds-bg-circle ds-bg-circle-2" aria-hidden="true" />
      <div className="ds-grid-lines" aria-hidden="true" />

      <div className="ds-inner">
        {/* Header */}
        <div className="ds-header">
          <span className="ds-eyebrow">By the Numbers</span>
          <h2 className="ds-title">Danta Stats</h2>
          <p className="ds-subtitle">
            "Where the crowd competes, connects, and grows together"
          </p>
        </div>

        {/* Stats grid */}
        <div className="ds-grid">
          {STATS.map((stat, i) => (
            <div
              className="ds-card"
              key={i}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              <span className="ds-icon" aria-hidden="true">{stat.icon}</span>
              <span className="ds-value">{stat.value}</span>
              <span className="ds-label">{stat.label}</span>
              <div className="ds-card-glow" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DantaStats;
