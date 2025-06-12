import React from 'react';
import "./Stylesheets/VenueCard.css";
// import { Star, Heart, Share2 } from 'lucide-react';
import ShareLogo from "../assets/VenueCardLogo/ShareLogo.png";
import HeartLogo from "../assets/VenueCardLogo/LikeLogo.png";

const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card-wrapper">
      <div className="venue-image-container">
        <img src={venue.image} alt={venue.name} className="venue-image" />
        
        <div className="venue-sports-icons">
          {venue.sportsIcons.map((icon, idx) => (
            <img src={icon} key={idx} alt="sport" className="sport-icon" />
          ))}
        </div>

        <div className="venue-top-icons">
          <button className="icon-btns">
            
            <img src={HeartLogo} alt="Like" className="Like-icon" />
              
          </button>
          <button className="icon-btns">
           
            <img src={ShareLogo} alt="Share" className="share-icon" />
          </button>
        </div>
      </div>

      <div className="venue-details">
        <div className="venue-header">
          <h4>{venue.name}</h4>
          <p className="venue-rating">
           
            <span className="star">★</span>
            {venue.rating} ({venue.reviews})
          </p>
        </div>
        <p className="venue-locations">{venue.address} (~{venue.distance} Km)</p>
        <div className="venue-footer">
          <span className="venue-discount">{venue.offer}</span>
          <span className="venue-price">{venue.price} onwards</span>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
