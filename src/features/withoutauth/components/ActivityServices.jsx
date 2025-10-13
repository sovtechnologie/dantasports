import React, { useState } from "react";
import "../../withoutauth/Stylesheets/Filterpages/ActivityServices.css";

function ActivityServices() {
  const [search, setSearch] = useState("");

  const activities = [
    "Football",
    "Cricket",
    "Badminton",
    "Football",
    "Football",
    "Football",
    "Cricket",
    "Cricket",
    "Cricket",
  ];

  const filtered = activities.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="filter_inner_cards">
      <h2 className="text-start">Activity/Services</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="activity-grid">
        {filtered.map((item, index) => (
          <button key={index} className="activity-btn">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ActivityServices;
