import React from 'react';
import './StyleSheets/PopularSports.css'; // Assuming you have a CSS file for styling
import sports from "../StaticData/PopularSporsData" // your data file or replace with static list

const PopularSports = () => {
  return (
    <section className="popular-sports">
      <h3 className="section-title">Popular Sport Collections</h3>
      <div className="sport-buttons">
        {sports.map((sport, index) => (
          <button className="sport-button" key={index}>
            <img src={sport.icon} alt={sport.name} />
            <span>{sport.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PopularSports;
