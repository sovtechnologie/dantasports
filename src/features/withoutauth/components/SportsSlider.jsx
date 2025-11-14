import React, { useState, useMemo, useEffect } from "react";
import "../Stylesheets/SportsSlider.css";
import { fetchSportsList } from "../../../services/withoutLoginApi/VenueListApi/endpointApi.js";

const SportsSlider = ({ setSelectedSports, selectedSports }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const getSports = async () => {
      try {
        setLoading(true);
        const response = await fetchSportsList(1);
        setSportsData(response?.result || []);
      } catch (err) {
        setError("Failed to load sports");
      } finally {
        setLoading(false);
      }
    };
    getSports();
  }, []);

  const filteredSports = useMemo(() => {
    if (!searchTerm) return sportsData;
    return sportsData.filter((sport) =>
      sport.sports_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sportsData, searchTerm]);

  const totalPages = Math.ceil(filteredSports.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredSports.slice(startIndex, startIndex + itemsPerPage);

  const toggleSportSelect = (sport) => {
    setSelectedSports((prev) => {
      const alreadySelected = prev.some((s) => s.id === sport.id);
      return alreadySelected ? [] : [sport];
    });
  };

  if (loading) return <p>Loading sports...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="sport_slider_section">
      <h3 className="filter_title">Sports</h3>
      <div className="search_input">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
        />
      </div>

      <div className="sports-grid">
        {currentItems.map((sport) => {
          const isSelected = selectedSports.some((s) => s.id === sport.id);
          return (
            <div
              key={sport.sports_id}
              className={`sport-item ${isSelected ? "selected" : ""}`}
              onClick={() => toggleSportSelect(sport)}
            >
              <img
                className="sport-img"
                src={sport.sports_images}
                alt={sport.sports_name}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/80?text=No+Image")
                }
              />
              <p>{sport.sports_name}</p>
            </div>
          );
        })}
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
  );
};

export default SportsSlider;
