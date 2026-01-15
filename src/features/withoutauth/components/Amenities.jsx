import React, { useEffect, useState } from "react";
import "../Stylesheets/Amenities.css";
import { getAmenitiesList } from "../../../services/LoginApi/Amenities/endpointApi";

function Amenities({ selectedAmenities = [], setSelectedAmenities }) {
    const [amenities, setAmenities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAmenitiesList();
                if (Array.isArray(res)) {
                    setAmenities(res);
                } else if (Array.isArray(res?.result)) {
                    setAmenities(res.result);
                } else {
                    console.warn("Unexpected response:", res);
                }
            } catch (error) {
                console.error("Error fetching amenities:", error);
            }
        };
        fetchData();
    }, []);

    // ✅ Toggle amenity selection
    const handleAmenityClick = (id) => {
        setSelectedAmenities((prev) =>
            prev[0] === id ? [] : [id] // deselect if same, otherwise replace
        );
    };

    return (
        <div className="amenities_card">
            <h2 className="mb-3 text-start">Amenities</h2>
            <div className="amenities_box">
            <div className="d-flex flex-wrap ">
                {amenities.length > 0 ? (
                    amenities.map((item) => {
                        const isSelected = selectedAmenities.includes(item.id);
                        return (
                            <div className="d-flex flex-wrap " key={item.id}>
                                <div
                                    className={`inner ${isSelected ? "selected" : ""}`}
                                    onClick={() => handleAmenityClick(item.id)}

                                >

                                    <a>{item.amenities_name || item.name}</a>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center w-100">Loading amenities...</p>
                )}
            </div>
            </div>
        </div>
    );
}

export default Amenities;
