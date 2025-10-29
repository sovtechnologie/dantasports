import React, { useState, useMemo, useEffect } from "react";
import "../Stylesheets/SportsSlider.css";
import { useQuery } from "@tanstack/react-query";
import { fetchSportList } from "../../../services/withoutLoginApi/SportListApi/endpointApi.js";

const SportsSlider = ({ onSelectSports }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSports, setSelectedSports] = useState([]); // ✅ multiple allowed
  const itemsPerPage = 4;

  // 🔹 API se data la rahe hain
  const { data: sportsDataResponse, isLoading, isError } = useQuery({
    queryKey: ["sportsList"],
    queryFn: fetchSportList,
  });

  const sportsData = sportsDataResponse?.result || [];

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

  // 🔹 Select / Deselect
  const toggleSportSelect = (sport) => {
    setSelectedSports((prev) => {
      const alreadySelected = prev.some((s) => s.sports_id === sport.sports_id);
      if (alreadySelected) {
        // agar already selected hai, to hata do
        return prev.filter((s) => s.sports_id !== sport.sports_id);
      } else {
        // warna add karo
        return [...prev, sport];
      }
    });
  };

  // 🔹 Send selected sports to parent (Venue)
  useEffect(() => {
    if (onSelectSports) {
      onSelectSports(selectedSports); // ✅ sirf selected ka data jaega
    }
  }, [selectedSports, onSelectSports]);

  if (isLoading) return <p>Loading sports...</p>;
  if (isError) return <p>Failed to load sports.</p>;

  return (
    <div className="sport_slider_section">
      <div className="sports-slider">
        <h3>Sports</h3>

        {/* 🔍 Search */}
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
