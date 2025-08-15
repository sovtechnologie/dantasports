// Timeslot.js
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import TextField from "@mui/material/TextField";
import "./Stylesheets/Timeslot.css";

function formatTo24HourString(date) {
  if (!(date instanceof Date)) return "";
  const pad = (num) => num.toString().padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function Timeslot({ selectedTime, onTimeSlotChange }) {
  const [time, setTime] = useState(selectedTime || null);

  // const handleChange = (newValue) => {
  //   setTime(newValue);
  //   const formatted = formatTo24HourString(newValue);
  //   onTimeSlotChange(formatted);
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="time-picker-box">
        <DesktopTimePicker
          label="Select Time"
          value={time}
          onChange={(newValue) => setTime(newValue)} // update local state on every change (optional)
          onAccept={(selectedDate) => {
            const formatted = formatTo24HourString(selectedDate);
            onTimeSlotChange(formatted);
          }}
          ampm
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}

export default React.memo(Timeslot);



