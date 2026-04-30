import React from "react";
import "./StyleSheets/PopularSports.css"; // Assuming you have a CSS file for styling
// import sports from "../StaticData/PopularSporsData" // your data file or replace with static list

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import { useQuery } from "@tanstack/react-query";
import { fetchSportList } from "../services/withoutLoginApi/SportListApi/endpointApi.js";
import Football from "../assets/PopularSportLogo/Football.png";
import { useNavigate } from "react-router-dom";

const PopularSports = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sports"],
    queryFn: () => fetchSportList(),
    retry: 1,
  });

  const sports = data?.result || [];
  const navigate = useNavigate();

  if (isLoading) return <p>Loading sports...</p>;
  if (isError) return <p>Error loading sports data.</p>;

  return (
    <section className="popular-sports">
      <h3 className="section-title">Popular Sport Collections</h3>
      <Swiper
        modules={[Navigation, A11y]}
        navigation
        observer={true}
        observeParents={true}
        spaceBetween={10}
        slidesPerView={4}
        watchOverflow={true}
        allowTouchMove
        grabCursor
        breakpoints={{
          480: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1200: { slidesPerView: 9 },
        }}
      >
        <div className="sport-buttons">
          {sports.map((sport, index) => (
            <SwiperSlide key={sport.id}>
              <div className="sport-slide">
                <button
                  className="sport-button"
                  key={sport.id}
                  onClick={() =>
                    navigate(`/search/${encodeURIComponent(sport.sports_name)}`)
                  }
                >
                  <img
                    src={sport.sports_images || Football}
                    alt={sport.sports_name}
                    onError={(e) => (e.target.src = "/default-icon.png")}
                  />
                  <span>{sport.sports_name}</span>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default PopularSports;
