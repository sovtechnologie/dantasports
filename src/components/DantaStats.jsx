import React from "react";
import "./StyleSheets/DantaStats.css";
import leftpattern from "../assets/left-datastats-pattern.png";
import rightpattern from  "../assets/right-datastats-pattern.png";

const stats = [
  { value: "1M+", label: "Users" },
  { value: "75+", label: "Sports" },
  { value: "5M+", label: "Sports Activities Enabled" },
  { value: "6M+", label: "Players Connections Enabled" },
];

const DantaStats = () => {
  return (
    <section
      className="danta-stats"
    >
        <img src={leftpattern}/>
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
        {/* <img src={rightpattern}/> */}
      </div>
       
    </section>
  );
};

export default DantaStats;
