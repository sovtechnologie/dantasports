<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import "../Stylesheets/TimeSlotSelector.css";
import addIcon from "../../withoutauth/assets/icons/add.svg"
import subIcon from "../../withoutauth/assets/icons/sub.svg"
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
const TimeSlotSelector = ({ date, selectedTime, setSelectedTime }) => {
  const [timeSlots, setTimeSlots] = useState([]);

  // 🕒 Generate 24-hour half-hour slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const timeString = new Date(0, 0, 0, hour, min).toLocaleTimeString(
          "en-US",
          { hour: "numeric", minute: "2-digit" }
        );
        slots.push(timeString);
      }
    }
    setTimeSlots(slots);
  };

  // ⏳ Check if slot is in past (only for today)
  const isPastTime = (timeString) => {
    if (!date) return false;

    const selectedDate = new Date(date);
    const now = new Date();

    const isToday = selectedDate.toDateString() === now.toDateString();
    if (!isToday) return false;

    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < now;
  };

  // 🕓 Automatically select current nearest slot
  const autoSelectCurrentTime = (slots) => {
    if (!date || !slots.length) return;

    const now = new Date();
    const selectedDate = new Date(date);
    const isToday = selectedDate.toDateString() === now.toDateString();

    // If selected date is today → auto-select current or next half-hour slot
    if (isToday) {
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let nearestSlot = slots[0];
      let nearestDiff = Infinity;

      slots.forEach((slot) => {
        const [time, modifier] = slot.split(" ");
        let [h, m] = time.split(":");
        h = parseInt(h);
        m = parseInt(m);
        if (modifier === "PM" && h < 12) h += 12;
        if (modifier === "AM" && h === 12) h = 0;

        const slotMinutes = h * 60 + m;
        const diff = slotMinutes - currentMinutes;

        if (diff >= 0 && diff < nearestDiff) {
          nearestSlot = slot;
          nearestDiff = diff;
        }
      });

      // Auto-set nearest future slot
      setSelectedTime(nearestSlot);
    } else {
      // Future date → default 12:00 PM
      setSelectedTime("12:00 PM");
    }
  };

  useEffect(() => {
    generateTimeSlots();
  }, [date]);

  // Once slots generated, auto-select current time
  useEffect(() => {
    if (timeSlots.length > 0) {
      autoSelectCurrentTime(timeSlots);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSlots, date]);

  return (
    <section className="timeslot_section">
      <div className="inner">
        {/* <div className="mb-3 d-flex align-items-center justify-content-between">
          <div>
             <label className="time">Time:</label>
          <input
            type="text"
            className="form-control text-center"
            value={selectedTime || ""}
            readOnly
          />
          </div>
          <div>
            <label className="time">Duration</label>

          <div className="d-flex text-center duration_box">
            <button className="p-0 border-0 bg-white" type="button"><img src={subIcon} alt="" /></button>
            <input type="text" disabled placeholder="11:30 AM" />
            <button className="p-0 border-0 bg-white" type="button"><img src={addIcon} alt="" /></button>
          </div>
          </div>

        </div> */}

        {/* Time Buttons */}
        <div className="mb-3 timeslot_buttons">
          {timeSlots.map((time, i) => {
            const disabled = isPastTime(time);
            return (
              <button
                key={i}
                className={`time-btn ${selectedTime === time ? "active" : ""
                  } ${disabled ? "disabled" : ""}`}
                onClick={() => !disabled && setSelectedTime(time)}
                disabled={disabled}
              >
                {time}
              </button>
            );
          })}
        </div>

       
      </div>
       {selectedTime && (
          <div className="book_a_time">
            <p>
              Badminton |{" "}
              {date
                ? new Date(date).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                : "Select Date"}{" "}
              | {selectedTime}
            </p>
          </div>
        )}
    </section>
=======
import React, { useState } from "react";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import  addIcon from "../../withoutauth/assets/icons/add.svg"
import  subIcon from "../../withoutauth/assets/icons/sub.svg"
function TimeSlotSelector() {
  const timeSlots = [
    "11:30 AM",
    "12:30 PM",
    "01:30 PM",
    "02:30 PM",
    "03:30 PM",
    "04:30 PM",
  ];

  const [selectedTime, setSelectedTime] = useState("12:30 PM");
  const [duration, setDuration] = useState(60); 

  return (
    <Container className="p-3 border rounded mt-3" style={{ maxWidth: 650 }}>
      <Row className="align-items-center g-3">
        <Col md={6}>
          <Form.Label>Time:</Form.Label>
          <Form.Control value={selectedTime} readOnly />
        </Col>

        <Col md={6}>
          <Form.Label>Duration:</Form.Label>
            <InputGroup>
           

=======
import React, { useState } from "react";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import  addIcon from "../../withoutauth/assets/icons/add.svg"
import  subIcon from "../../withoutauth/assets/icons/sub.svg"
function TimeSlotSelector() {
  const timeSlots = [
    "11:30 AM",
    "12:30 PM",
    "01:30 PM",
    "02:30 PM",
    "03:30 PM",
    "04:30 PM",
  ];

  const [selectedTime, setSelectedTime] = useState("12:30 PM");
  const [duration, setDuration] = useState(60); 

  return (
    <Container className="p-3 border rounded mt-3" style={{ maxWidth: 650 }}>
      <Row className="align-items-center g-3">
        <Col md={6}>
          <Form.Label>Time:</Form.Label>
          <Form.Control value={selectedTime} readOnly />
        </Col>

        <Col md={6}>
          <Form.Label>Duration:</Form.Label>
            <InputGroup>
           

>>>>>>> Stashed changes
            <button className="bg-white border-0" onClick={() => setDuration(Math.max(30, duration - 30))}>
              <img src={subIcon} alt="" />
            </button>
            <Form.Control className="p-0" value={`${duration} min`} readOnly />
            <button  className="bg-white border-0" onClick={() => setDuration(duration + 30)}>
             <img src={addIcon} alt="" />
            </button>
          </InputGroup>
        </Col>
      </Row>

      {/* Scrollable Time Selection */}
      <div
        className="d-flex mt-3 gap-2 overflow-auto"
        style={{ whiteSpace: "nowrap", paddingBottom: 8 }}
      >
        {timeSlots.map((slot) => (
          <Button
            key={slot}
            variant={selectedTime === slot ? "primary" : "outline-secondary"}
            onClick={() => setSelectedTime(slot)}
            className="px-3"
          >
            {slot}
          </Button>
        ))}
      </div>
    </Container>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  );
}

export default TimeSlotSelector;
