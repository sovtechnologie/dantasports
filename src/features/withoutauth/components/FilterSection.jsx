import React, { useState } from "react";
import {
  TextField,
  Button,
  Chip,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "./Stylesheets/FilterSection.css";

const activities = ["Trekking", "Cycling", "Yoga", "Swimming", "Running"];
const amenitiesList = ["Parking", "WiFi", "Shower", "Locker"];

const FilterSidebar = () => {
  const [search, setSearch] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [difficulty, setDifficulty] = useState("");
  const [price, setPrice] = useState([100, 500]);
  const [amenities, setAmenities] = useState([]);

  const handleActivityToggle = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleAmenityToggle = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleReset = () => {
    setSearch("");
    setSelectedActivities([]);
    setDate(dayjs());
    setDifficulty("");
    setPrice([100, 500]);
    setAmenities([]);
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter</h3>
        <Button onClick={handleReset}>Reset</Button>
      </div>

      {/* Activity / Services */}
      <div className="filter-section">
        <h4>Activity/Services</h4>
        <TextField
          placeholder="Search..."
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="chip-container">
          {activities
            .filter((act) =>
              act.toLowerCase().includes(search.toLowerCase())
            )
            .map((act) => (
              <Chip
                key={act}
                label={act}
                clickable
                color={selectedActivities.includes(act) ? "primary" : "default"}
                onClick={() => handleActivityToggle(act)}
              />
            ))}
        </div>
      </div>

      {/* Date */}
      <div className="filter-section">
        <h4>Date</h4>
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{ textField: { size: "small", fullWidth: true } }}
        />
      </div>

      {/* Difficulty */}
      <div className="filter-section">
        <h4>Difficulty</h4>
        {["Easy", "Moderate", "Difficult"].map((level) => (
          <FormControlLabel
            key={level}
            control={
              <Checkbox
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
              />
            }
            label={level}
          />
        ))}
      </div>

      {/* Price */}
      <div className="filter-section">
        <h4>Price</h4>
        <Slider
          value={price}
          onChange={(e, newValue) => setPrice(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </div>

      {/* Amenities */}
      <div className="filter-section">
        <h4>Amenities</h4>
        <div className="chip-container">
          {amenitiesList.map((am) => (
            <Chip
              key={am}
              label={am}
              clickable
              color={amenities.includes(am) ? "primary" : "default"}
              onClick={() => handleAmenityToggle(am)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
