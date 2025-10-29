import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const BusinessHours = () => {
  const hours = [
    { day: "Thursday", time: "5 am–11:30 pm", note: "(Diwali/Bhai Dooj)", differ: true },
    { day: "Friday", time: "5 am–11:30 pm" },
    { day: "Saturday", time: "5 am–11:30 pm" },
    { day: "Sunday", time: "Closed" },
    { day: "Monday", time: "5 am–11:30 pm" },
    { day: "Tuesday", time: "5 am–11:30 pm" },
    { day: "Wednesday", time: "5 am–11:30 pm" },
  ];

  return (
    <div className="business-hours">
      <h4 className="fw-semibold mb-1">Hours:</h4>

      {hours.map((item, index) => (
        <div key={index}>
          {/* Main Row */}
          <div className="d-flex justify-content-between align-items-start">
            <p className={`m-0 ${index === 0 ? "fw-semibold text-dark" : "text-body"}`}>
              {item.day}
            </p>
            <p
              className={`m-0 ${
                item.time === "Closed"
                  ? "text-secondary"
                  : index === 0
                  ? "fw-semibold text-dark"
                  : "text-body"
              }`}
            >
              {item.time}
            </p>
          </div>

          {/* Holiday Notes */}
          {item.note && (
            <div className="d-flex justify-content-between sub-text">
              <p className="m-0 text-muted">{item.note}</p>
              {item.differ && (
                <p className="m-0 text-warning-dark">Hours might differ</p>
              )}
            </div>
          )}

          {/* Divider */}
          {index !== hours.length - 1 && <div className="card_line"></div>}
        </div>
      ))}

     
    </div>
  );
};

export default BusinessHours;
