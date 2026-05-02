import React, { useEffect, useState } from "react";
import "../Stylesheets/Filterpages/FilterSystem.css";
import { getAmenitiesList } from "../../../services/LoginApi/Amenities/endpointApi";

export default function Amenities({ selectedAmenities = [], setSelectedAmenities }) {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    getAmenitiesList()
      .then((res) => {
        const list = Array.isArray(res) ? res : Array.isArray(res?.result) ? res.result : [];
        setAmenities(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="amenities_card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h2 style={{ margin: 0 }}>🏋️ Amenities</h2>
        {selectedAmenities.length > 0 && (
          <button
            onClick={() => setSelectedAmenities([])}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 11, color: "#858585", fontFamily: "DM Sans,sans-serif",
              padding: "2px 8px", borderRadius: 10,
              border: "1px solid #e0e0e0",
            }}
          >
            Clear
          </button>
        )}
      </div>

      <div className="amenities_box">
        {loading ? (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} style={{
                height: 30, width: 80, borderRadius: 20,
                background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.4s infinite",
              }} />
            ))}
          </div>
        ) : amenities.length === 0 ? (
          <p style={{ fontSize: 13, color: "#858585", margin: 0 }}>No amenities available</p>
        ) : (
          <div className="amenities-grid">
            {amenities.map((item) => {
              const selected = selectedAmenities.includes(item.id);
              return (
                <button
                  key={item.id}
                  className={`amenity-chip${selected ? " selected" : ""}`}
                  onClick={() => toggle(item.id)}
                  type="button"
                >
                  {item.amenities_name || item.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
