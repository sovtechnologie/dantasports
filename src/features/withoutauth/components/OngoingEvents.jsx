import React, { memo } from "react";
import "../../withoutauth/Stylesheets/Filterpages/OngoingEvents.css";

const OngoingEvents = ({ banners = [] }) => {
  // ✅ Fallback agar koi banner na ho
  const fallbackBanners = [
    { banner_image: "https://via.placeholder.com/400x200/4B0C1B/FFFFFF?text=Event+1" },
    { banner_image: "https://via.placeholder.com/400x200/F5EAEA/000000?text=Event+2" },
    { banner_image: "https://via.placeholder.com/400x200/F5EAEA/000000?text=Event+3" },
    { banner_image: "https://via.placeholder.com/400x200/4B0C1B/FFFFFF?text=Event+4" },
  ];

  const displayBanners = Array.isArray(banners) && banners.length > 0 ? banners : fallbackBanners;

  return (
    <div className="event-banner-container">
      <h2 className="event-banner-heading">Ongoing Events</h2>

      <div className="event-banner-carousel">
        <div className="event-banner-track">
          {/* 👇 Duplicate banners for seamless infinite scroll */}
          {displayBanners.concat(displayBanners).map((item, i) => (
            <div key={i} className="event-banner">
              <img
                src={item.banner_image}
                alt={`Ongoing Event ${i + 1}`}
                className="event-banner-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(OngoingEvents);
