import React, { useEffect, useState } from "react";
import "../../withoutauth/Stylesheets/Filterpages/ActivityForEvent.css";
import search1 from "../../withoutauth/assets/icons/Search.svg";
import { fetchSportsList } from "../../../services/withoutLoginApi/VenueListApi/endpointApi";

function ActivityForEvent({ selectedSports, setSelectedSports }) {
    const [search, setSearch] = useState("");
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSelectSport = (item) => {
        const id = Number(item.id);
        const isSelected = selectedSports.includes(id);
        if (isSelected) {
            setSelectedSports(selectedSports.filter((s) => s !== id));
        } else {
            setSelectedSports([...selectedSports, id]);
        }
    };

    useEffect(() => {
        const getSportsList = async () => {
            try {
                const res = await fetchSportsList(4);
                if (res?.status === 200 && Array.isArray(res?.result)) {
                    setActivities(res.result);
                } else {
                    setActivities([]);
                }
            } catch (error) {
                console.error("Error fetching event sports list:", error);
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

    return (
        <div className="filter_inner_cards">
            <h2 className="text-start filter_sub_title">Activity/Services</h2>

            <div className="event-search-box position-relative">
                <img className="event-seach_icons" src={search1} alt="search" />
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
                <div className="event-activity-grid">
                    {filtered.length > 0 ? (
                        filtered.map((item) => {
                            const id = Number(item.id);
                            const isSelected = selectedSports.includes(id);
                            return (
                                <button
                                    key={id}
                                    className={`event-activity-btn ${isSelected ? "active" : ""}`}
                                    onClick={() => handleSelectSport(item)}
                                >
                                    {item.sports_name}
                                </button>
                            );
                        })
                    ) : (
                        <p className="text-center w-100 py-3 m-0">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ActivityForEvent;
