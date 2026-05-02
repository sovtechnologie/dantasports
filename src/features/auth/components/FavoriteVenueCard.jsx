import React from 'react';
import './StyleSheets/FavoriteVenueCard.css';
import ShareLogo from '../../../assets/svg-icons/share-circle.svg';
import HeartFilled from '../../../assets/svg-icons/heart-filled.svg';
import image from '../assets/image.png';

const FavoriteVenueCard = ({ venue, onLikeToggle }) => {
const handleLikeClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  onLikeToggle();
};


const handleShare = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const userId = venue?.user_id || venue?.id; 
  // Agar tumhare paas logged-in user id redux se aa rahi hai
  // to usko use karna better hoga

  const shareUrl = `${window.location.origin}/profile/${userId}/favorites`;

  const shareData = {
    title: "My Favorites",
    text: "Check my favorite items",
    url: shareUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    }
  } catch {
    // Share cancelled or failed silently
  }
};



  return (
    <div className="favorite-venue-card-wrapper">
      <div className="favorite-venue-image-container">
        <img
          src={venue.image || image}
          alt={venue.name}
          className="favorite-venue-image"
          onError={(e) => (e.target.src = image)}
        />

        <div className="favorite-venue-sports-icons">
         {(venue.sportsIcons || []).map((icon, idx) => (
  <img src={icon} key={idx} alt="sport" className="favorite-sport-icon" />
))}

        </div>

        <div className="favorite-venue-top-icons">
          <button className="favorite-icon-btns" onClick={handleLikeClick}>
            <img
              src={HeartFilled}
              alt="Like"
              className="favorite-like-icon"
            />
          </button>
          <button className="favorite-icon-btns" onClick={handleShare}>
            <img src={ShareLogo} alt="Share" className="favorite-share-icon" />
          </button>
        </div>
      </div>

      <div className="favorite-venue-details">
        <div className="favorite-venue-header">
          <h4>{venue.name}</h4>
          <p className="favorite-venue-rating">
            <span className="star">★</span>
            {venue.rating} ({venue.reviews})
          </p>
        </div>
        <p className="favorite-venue-location">{venue.address} (~{venue.distance} Km)</p>
        <div className="favorite-venue-footer">
          <span className="favorite-venue-discount">{venue.offer}</span>
          <span className="favorite-venue-price">{venue.price} onwards</span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteVenueCard;
