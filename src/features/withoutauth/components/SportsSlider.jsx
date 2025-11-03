import React, { useState, useMemo, useEffect } from "react";
import "../Stylesheets/SportsSlider.css";
import { fetchSportsList } from "../../../services/withoutLoginApi/VenueListApi/endpointApi.js";

const SportsSlider = ({ onSelectSports }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSports, setSelectedSports] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 4;

  // 🔹 API call (without useQuery)
  useEffect(() => {
    const getSports = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchSportsList(1); // 1 = Venue
        console.log("📤 Sports API response:", response);

        if (response?.result) {
          setSportsData(response.result);
        } else {
          setSportsData([]);
        }
      } catch (err) {
        console.error("❌ Error fetching sports list:", err);
        setError("Failed to load sports");
      } finally {
        setLoading(false);
      }
    };

    getSports();
  }, []);

  // 🔹 Search logic
  const filteredSports = useMemo(() => {
    if (!searchTerm) return sportsData;
    return sportsData.filter((sport) =>
      sport.sports_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sportsData, searchTerm]);

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredSports.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredSports.slice(startIndex, startIndex + itemsPerPage);

  // 🔹 Select/Deselect Sports
  const toggleSportSelect = (sport) => {
    setSelectedSports((prev) => {
      const alreadySelected = prev.some((s) => s.sports_id === sport.sports_id);
      if (alreadySelected) {
        return prev.filter((s) => s.sports_id !== sport.sports_id);
      } else {
        return [...prev, sport];
      }
    });
  };

  // 🔹 Send selected sports to parent
  useEffect(() => {
    if (onSelectSports) {
      onSelectSports(selectedSports);
    }
  }, [selectedSports, onSelectSports]);

  // 🔹 Loading & Error states
  if (loading) return <p>Loading sports...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="sport_slider_section">
      <div className="sports-slider">
        <h3>Sports</h3>

        {/* 🔍 Search Box */}
        <div className="search_input">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>

        {/* 🎾 Sports Grid */}
        <div className="sports-grid">
          {currentItems.map((sport) => {
            const isSelected = selectedSports.some(
              (s) => s.sports_id === sport.sports_id
            );

            return (
              <div
                key={sport.sports_id}
                className={`sport-item ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSportSelect(sport)}
              >
                <div className="sport-icon">
                  <img
                    className="sport-img"
                    src={sport.sports_images}
                    alt={sport.sports_name}
                    onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/80?text=No+Image")
                    }
                  />
                </div>
                <p>{sport.sports_name}</p>
              </div>
            );
          })}
        </div>

        {/* 🔘 Pagination Dots */}
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
