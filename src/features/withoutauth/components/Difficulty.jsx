import React from "react";
import "../../withoutauth/Stylesheets/Filterpages/ActivityForEvent.css";

function Difficulty({ selectedDifficulty, setSelectedDifficulty }) {
    const handleSelect = (value) => {
        // same checkbox toggle logic
        if (selectedDifficulty === value) {
            setSelectedDifficulty(null); // unselect if same clicked
        } else {
            setSelectedDifficulty(value);
        }
    };

    return (
        <>
            <h2 className="mt-3 text-start">Difficulty</h2>
            <div className="filter_inner_cards kids_check_box">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-check-label">Easy</label>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedDifficulty === 1}
                        onChange={() => handleSelect(1)}
                    />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-check-label">Moderate</label>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedDifficulty === 0}
                        onChange={() => handleSelect(0)}
                    />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <label className="form-check-label">Difficult</label>
                    <input
                        className="form-check-input"
                        type="checkbox"s
                        checked={selectedDifficulty === 2}
                        onChange={() => handleSelect(2)}
                    />
                </div>
            </div>
        </>
    );
}

export default Difficulty;
