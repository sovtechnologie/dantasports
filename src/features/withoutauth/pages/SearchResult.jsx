import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoCard from "../../../components/InfoCard";
import { fetchGlobalSearchQuery } from "../../../services/withoutLoginApi/SportListApi/endpointApi";
import "../Stylesheets/SearchResult.css";
import searchlogo from "../assets/SearchIcon/Searchlogo.png";
import AppDownloadBanner from "../components/AppDownloadBanner";

const SearchResult = () => {
  const { query } = useParams();
  const [groupedResults, setGroupedResults] = useState({
    1: [],
    2: [],
    3: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchGlobalSearchQuery(query || "")
      .then((res) => {
        const data = Array.isArray(res.result) ? res.result : [];

        const grouped = {
          1: [],
          2: [],
          3: [],
        };

        data.forEach((item) => {
          if (grouped[item.type]) {
            grouped[item.type].push(item);
          }
        });

        setGroupedResults(grouped);
      })
      .catch((err) => console.error("Search failed:", err))
      .finally(() => setLoading(false));
  }, [query]);

  const typeHeading = {
    1: "Venues",
    2: "Events",
    3: "Coaches",
  };

  return (
    <div className="search-result-page">
      <div className="filter-bar">
        <h3 className="filter-title">Search by Venue, Sports, Location</h3>
        <div className="search-input">
          <img src={searchlogo} height={20} width={20} alt="searchlogo" />
          <input type="text" placeholder="Search Venue/Sports Location" />
        </div>
      </div>

      <div className="search-result-container">
        {Object.keys(typeHeading).map((typeKey) => {
          const type = Number(typeKey);
          const items = groupedResults[type] || [];

          return (
            <div key={type} className="result-group">
              <h3 className="group-title">{typeHeading[type]}</h3>

              <div className="result-grid">
                {loading ? (
                  <p className="loading-text">Loading...</p>
                ) : items.length > 0 ? (
                  items.map((item, index) => (
                    <InfoCard
                      key={item.id || index}
                      title={item.name || "Untitled"}
                      subtitle={typeHeading[type]}
                      image={item.image || "defaultImage.png"}
                      routePath={`/${typeHeading[type].toLowerCase()}/${item.id}`}
                    />
                  ))
                ) : (
                  <p className="no-data">No data available</p>
                )}
              </div>
            </div>
          );
        })}

        <div className="gym-footer-banner">
          <AppDownloadBanner />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
