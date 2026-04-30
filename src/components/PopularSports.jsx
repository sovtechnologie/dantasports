import React from "react";
import "./StyleSheets/PopularSports.css";
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
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const PopularSports = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sports"],
    queryFn: () => fetchSportList(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  const sports = data?.result || [];
  const navigate = useNavigate();

  if (isLoading) return null;
  if (isError) return null;

  return (
    <section ref={ref} className="popular-sports">
      <h3 className={`section-title${isVisible ? " visible" : ""}`}>
        Popular Sport Collections
      </h3>
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
          {sports.map((sport) => (
            <SwiperSlide key={sport.id}>
              <div className="sport-slide">
                <button
                  className="sport-button"
                  onClick={() =>
                    navigate(`/search/${encodeURIComponent(sport.sports_name)}`)
                  }
                  aria-label={`Search for ${sport.sports_name}`}
                >
                  <img
                    src={sport.sports_images || Football}
                    alt={sport.sports_name}
                    loading="lazy"
                    onError={(e) => (e.target.src = Football)}
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
