import React, { useState } from "react";
import "../StyleSheets/RegisterSportModal.css";
import { useSportList } from "../../../../hooks/favouriteSport/useSportList";
import { useAddSports } from "../../../../hooks/favouriteSport/useAddSports";

export const RegisterSportModal = ({ title, onClose, onSubmit }) => {
    const [selectedSport, setSelectedSport] = useState([]);
    const { data, isLoading, isError, error } = useSportList();
    const sportList = data?.result || [];
    const { mutate: addSports } = useAddSports();

    const toggleSportSelection = (sport) => {
        setSelectedSport((prev) =>
            prev.find((s) => s.id === sport.id)
                ? prev.filter((s) => s.id !== sport.id)
                : [...prev, sport]
        );
    };

    const handleSave = () => {
        if (selectedSport.length > 0) {
            addSports(selectedSport.map((sport) => sport.id));
        }
        handleClose();
    };

    const handleClose = () => {
        setSelectedSport([]);
        onClose();
    }

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }
    if (isError) {
        return <div className="error">Error: {error.message}</div>;
    }
    return (
        <div className="registerSport-modal-overlay">
            <div className="registerSport-modal-content">
                <button className="registerSport-modal-close" onClick={onClose}>×</button>
                <h2>{title || "Select a Sport"}</h2>

                <div className="registerSport-grid">
                    {sportList.map((sport) => (
                        <div
                            key={sport.id}
                            className={`registerSport-card ${selectedSport.some((s) => s.id === sport.id) ? "selected" : ""}`}
                            onClick={() => toggleSportSelection(sport)}
                        >
                            <img src={sport.sports_images} alt={sport.sports_name} className="registerSport-card-image" />
                            <span className="registerSport-card-title">{sport.sports_name}</span>
                        </div>
                    ))}
                </div>

                <div className="registerSport-modal-actions">
                    <button className="skip-button" onClick={handleClose}>Skip</button>
                    <button className="SaveSport-button" onClick={handleSave} disabled={selectedSport.length === 0}>Get Started</button>
                </div>

            </div>

        </div>
    )
}

