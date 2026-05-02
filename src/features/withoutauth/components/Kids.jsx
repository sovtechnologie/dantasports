import React from "react";
import "../Stylesheets/Filterpages/FilterSystem.css";

export default function Kids({ kidsFriendly, setKidsFriendly, petFriendly, setPetFriendly }) {
  return (
    <div style={{ marginTop: 16 }}>
      <p className="filter_sub_title" style={{ marginBottom: 8 }}>🌟 More Options</p>
      <div className="friendly-options">

        {/* Kids Friendly */}
        <div
          className={`friendly-option${kidsFriendly ? " friendly-active" : ""}`}
          onClick={() => setKidsFriendly(!kidsFriendly)}
        >
          <label className="friendly-label" htmlFor="kidsFriend">
            <span className="friendly-emoji">👶</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#172A39" }}>Kids Friendly</div>
              <div style={{ fontSize: 11, color: "#858585", fontFamily: "DM Sans,sans-serif" }}>Suitable for children</div>
            </div>
          </label>
          <label className="fs-toggle">
            <input
              type="checkbox"
              id="kidsFriend"
              checked={kidsFriendly}
              onChange={(e) => setKidsFriendly(e.target.checked)}
            />
            <span className="fs-toggle-track" />
          </label>
        </div>

        {/* Pet Friendly */}
        <div
          className={`friendly-option${petFriendly ? " friendly-active" : ""}`}
          onClick={() => setPetFriendly(!petFriendly)}
        >
          <label className="friendly-label" htmlFor="petFriend">
            <span className="friendly-emoji">🐾</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#172A39" }}>Pet Friendly</div>
              <div style={{ fontSize: 11, color: "#858585", fontFamily: "DM Sans,sans-serif" }}>Pets are welcome</div>
            </div>
          </label>
          <label className="fs-toggle">
            <input
              type="checkbox"
              id="petFriend"
              checked={petFriendly}
              onChange={(e) => setPetFriendly(e.target.checked)}
            />
            <span className="fs-toggle-track" />
          </label>
        </div>

      </div>
    </div>
  );
}
