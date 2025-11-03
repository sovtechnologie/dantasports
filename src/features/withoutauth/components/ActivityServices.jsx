import React, { useEffect, useState } from "react";
import "../../withoutauth/Stylesheets/Filterpages/ActivityServices.css";
import search1 from "../../withoutauth/assets/icons/Search.svg";
import { fetchSportsList } from "../../../services/withoutLoginApi/VenueListApi/endpointApi";

function ActivityServices({ selectedSports, setSelectedSports }) {
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSportsList = async () => {
      try {
        const res = await fetchSportsList(2);
        console.log("✅ Sports List API Response:", res);
        if (res?.status === 200 && Array.isArray(res?.result)) {
          setActivities(res.result);
        } else {
          setActivities([]);
        }
      } catch (error) {
        console.error("❌ Error fetching sports list:", error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    getSportsList();
  }, []);

  const filtered = activities.filter((item) =>
    item.sports_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSport = (item) => {
    const isSelected = selectedSports.includes(item.id);
    const updated = isSelected
      ? selectedSports.filter((id) => id !== item.id)
      : [...selectedSports, item.id];
    setSelectedSports(updated);
    console.log("🎯 Selected Sports IDs:", updated);
  };

  return (
    <div className="filter_inner_cards">
      <h2 className="text-start">Activity/Services</h2>

      <div className="search-box position-relative">
        <img className="seach_icons" src={search1} alt="search" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center py-3">Loading...</p>
      ) : (
        <div className="activity-grid">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <button
                key={index}
                className={`activity-btn ${selectedSports.includes(item.id) ? "active" : ""
                  }`}
                onClick={() => handleSelectSport(item)}
              >
                {item.sports_name}
              </button>
            ))
          ) : (
            <p className="text-center w-100 py-3 m-0">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}


export default ActivityServices;
