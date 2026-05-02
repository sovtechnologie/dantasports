import React from "react";
import venueIcon from "../../../assets/svg-icons/sport-ball.svg";
import SchuleImage from "../../../assets/svg-icons/calendar.svg";
import ChampionImage from "../../../assets/svg-icons/medal.svg";
import "./Stylesheets/SportEventCardList.css";

const cardData = [
  {
    id: 1,
    title: "Venue Reservations",
    subtitle: "Book verified sports venues across cities",
    icon: venueIcon,
  },
  {
    id: 2,
    title: "Scheduling Fixtures",
    subtitle: " Plan leagues, matches, and recurring sessions",
    icon: SchuleImage,
  },
  {
    id: 3,
    title: "Hospitality Services",
    subtitle: " Support services coordinated with venues",
    icon: ChampionImage,
  },
  {
    id: 4,
    title: "Season Passes",
    subtitle: " Long-term access plans for teams or departments",
    icon: venueIcon,
  },
  {
    id: 5,
    title: "Multi-Date Booking",
    subtitle: "Block calendars weeks or months in advance",
    icon: venueIcon,
  },
  {
    id: 6,
    title: "Group Rate Plans",
    subtitle: "Optimized pricing for bulk and recurring bookings",
    icon: venueIcon,
  },
];

function SportEventCardList() {
  return (
    <div className="sport-event-card-wrapper ">
      <div className="sport-card-list-container row g-3 ">
        {cardData.map((item) => (
          <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={item.id}>
            <div className="sport-card-cb ">

           
            <img
              src={item.icon}
              alt={item.title}
              className="sport-card-icon"
            />
            <p className="sport-card-title">{item.title}</p>
            <p className="sport-card-subtitle">{item.subtitle}</p>
          </div>
           </div>
        ))}
      </div>
    </div>
  );
}

export default SportEventCardList;
