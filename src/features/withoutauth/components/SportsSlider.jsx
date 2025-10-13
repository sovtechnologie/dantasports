import React, { useState } from "react";
import {
  FaFutbol,
  FaBasketballBall,
  FaTableTennis,
  FaBaseballBall,
} from "react-icons/fa";
import { GiCricketBat, GiTennisRacket } from "react-icons/gi";
import "../Stylesheets/SportsSlider.css";

const SportsSlider = () => {
  const sports = [
    { name: "Football", icon: <FaFutbol /> },
    { name: "Basketball", icon: <FaBasketballBall /> },
    { name: "Cricket", icon: <GiCricketBat /> },
    { name: "Tennis", icon: <GiTennisRacket /> },
    { name: "Table Tennis", icon: <FaTableTennis /> },
    { name: "Baseball", icon: <FaBaseballBall /> },
    { name: "Football", icon: <FaFutbol /> },
    { name: "Basketball", icon: <FaBasketballBall /> },
    { name: "Cricket", icon: <GiCricketBat /> },
    { name: "Tennis", icon: <GiTennisRacket /> },
    { name: "Table Tennis", icon: <FaTableTennis /> },
    { name: "Baseball", icon: <FaBaseballBall /> },
    { name: "Football", icon: <FaFutbol /> },
    { name: "Basketball", icon: <FaBasketballBall /> },
    { name: "Cricket", icon: <GiCricketBat /> },
    { name: "Tennis", icon: <GiTennisRacket /> },
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(sports.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;
  const currentItems = sports.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="sport_slider_section">
      {/* <div className="filter_header">
        <h2>Filter</h2>
        <a href="#">Reset</a>
      </div> */}

      <div className="sports-slider">
        <h3>Sports</h3>
        <div className="search_input">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>

        <div className="sports-grid">
          {currentItems.map((sport, index) => (
            <div key={index} className="sport-item">
              <div className="sport-icon">{sport.icon}</div>
              <p>{sport.name}</p>
            </div>
          ))}
        </div>

        <div className="sports-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsSlider;
