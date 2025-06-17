import React from 'react';
import venueIcon from "../assets/Venue-Card-Image.png";
import SchuleImage from "../assets/Schedule-Image.png";
import ChampionImage from "../assets/Champion-Image.png";
import "./Stylesheets/SportEventCardList.css"

const cardData = [
  { id: 1, title: 'Venue Reservations', icon: venueIcon },
  { id: 2, title: 'Scheduling Fixtures', icon: SchuleImage },
  { id: 3, title: 'Hospitality services', icon: ChampionImage },
  { id: 4, title: 'Season Passes', icon: venueIcon },
  { id: 5, title: 'Multi-Date Booking', icon: venueIcon },
  { id: 6, title: 'Group Rate Plans', icon: venueIcon },
];

function SportEventCardList() {
  return (
    <div className='sport-event-card-wrapper'>
     <div className="sport-card-list-container">
      {cardData.map((item) => (
        <div className="sport-card" key={item.id}>
          <img src={item.icon} alt={item.title} className="sport-card-icon" />
          <p className="sport-card-title">{item.title}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default SportEventCardList;