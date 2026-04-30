import React from "react";
import "./StyleSheets/DantaStats.css";
import leftpattern from "../assets/left-datastats-pattern.png";
import rightpattern from "../assets/right-datastats-pattern.png";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const stats = [
  { value: "1M+", label: "Users" },
  { value: "75+", label: "Sports" },
  { value: "5M+", label: "Sports Activities Enabled" },
  { value: "6M+", label: "Players Connections Enabled" },
];

const DantaStats = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`danta-stats${isVisible ? " stats-visible" : ""}`}
    >
      <img src={leftpattern} alt="" aria-hidden="true" loading="lazy" />
      <div className="danta-overlay">
        <h2 className="stats-heading">Danta Stats</h2>
        <p className="stats-subheading">
          "Where the Crowd Competes and Legends Are Born"
        </p>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <img src={rightpattern} alt="" aria-hidden="true" loading="lazy" />
    </section>
  );
};

export default DantaStats;
