import React, { useEffect, useState } from "react";
import "../StyleSheets/AddSportModal.css";
import { useSportList } from "../../../../hooks/favouriteSport/useSportList";
import { useAddSports } from "../../../../hooks/favouriteSport/useAddSports";


const AddSportModal = ({ title, onClose, onSubmit, preSelected = [] }) => {
  const [selectedSport, setSelectedSport] = useState([]);

  const { data, isLoading, isError, error } = useSportList();
  const sportList = data?.result || [];
  const { mutate: addSports } = useAddSports();
  useEffect(() => {
    setSelectedSport(preSelected);
  }, [preSelected]);

  const toggleSportSelection = (sport) => {
    setSelectedSport((prev) => {
      const exists = prev.some(s => s.id === sport.id);

      if (exists && prev.length === 1) {
        alert("At least 1 sport must remain selected.");
        return prev;
      }

      return exists
        ? prev.filter(s => s.id !== sport.id)
        : [...prev, sport];
    });
  };


  const handleSave = () => {
    if (selectedSport.length > 0) {
      addSports(selectedSport.map((sport) => sport.id));
    }
    handleClose();
  };

  const handleClose = () => {
    // setSelectedSport([]);
    onClose();
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="sport-modal-overlay">
      <div className="sport-modal-content">
        <button className="sport-modal-close" onClick={onClose}>×</button>
        <h2>{title || "Select a Sport"}</h2>

        <div className="sport-grid">
          {sportList.map((sport) => (
            <div
              key={sport.id}
              className={`sport-card ${selectedSport.some((s) => s.id === sport.id) ? "selected" : ""}`}
              onClick={() => toggleSportSelection(sport)}
            >
              <img src={sport.sports_images} alt={sport.sports_name} className="sport-card-image" />
              <span className="sport-card-title">{sport.sports_name}</span>
            </div>
          ))}
        </div>

        <div className="sport-modal-actions">
          <button className="save-button" onClick={handleSave} disabled={selectedSport.length === 0}>Save Sport</button>
        </div>
      </div>
    </div>
  );
};

export default AddSportModal;
