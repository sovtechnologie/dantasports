import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchVenue } from "../hooks/VenueList/useFetchVenue";
import HeartFilled from "../features/withoutauth/assets/VenueCardLogo/heartfilled.png";
import "./StyleSheets/BookVenues.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import star from "../assets/images/home/bookvenues/star.svg";
import likeIcon from "../assets/images/home/bookvenues/like.svg";
import shareIcon from "../assets/images/home/bookvenues/share.svg";
import { useLikeVenue } from "../hooks/favouriteVenue/useLikeVenue.js";
import { useUnlikeVenue } from "../hooks/favouriteVenue/useUnlikeVenue.js";
import fallback from "../assets/quickbooking/latest.jpeg";

export default function BookVenues() {
  const queryClient = useQueryClient();
  const userId = useSelector((s) => s.auth.id);
  const { lat, lng } = useSelector((s) => s.location);
  const auth = useSelector((s) => s.auth);
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0.06 });
  const [venueList, setVenueList] = useState([]);

  const { data, isLoading } = useFetchVenue({ lat, lng, userId: userId || null });
  const likeVenue   = useLikeVenue();
  const unlikeVenue = useUnlikeVenue();

  useEffect(() => {
    if (data?.status === 200) setVenueList(data.result);
  }, [data]);

  const toggleFav = (e, venue) => {
    e.preventDefault();
    e.stopPropagation();
    if (!auth?.id) { alert("Please login first."); return; }
    const id = venue.id;
    setVenueList((p) => p.map((v) => v.id === id ? { ...v, favourite: !v.favourite } : v));
    if (!venue.favourite) {
      likeVenue.mutate({ venueId: id, userId: auth.id }, {
        onSuccess: () => queryClient.invalidateQueries(["venueList", auth.id]),
        onError: () => setVenueList((p) => p.map((v) => v.id === id ? { ...v, favourite: false } : v)),
      });
    } else {
      unlikeVenue.mutate({ favouriteVenueId: venue.favourite_venue_id }, {
        onSuccess: () => queryClient.invalidateQueries(["venueList", auth.id]),
        onError: () => setVenueList((p) => p.map((v) => v.id === id ? { ...v, favourite: true } : v)),
      });
    }
  };

  const handleShare = (e, venue) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/venue/${venue.id}`;
    if (navigator.share) navigator.share({ title: venue.venue_name, url });
    else { navigator.clipboard.writeText(url); }
  };

  if (isLoading || !venueList.length) return null;

  return (
    <section className={`hs-section${sectionVisible ? " section-in" : ""}`} ref={sectionRef}>
      <Container>
        <div className="hs-header">
          <div className="hs-title-wrap">
            <span className="hs-eyebrow">Nearby</span>
            <h2 className="hs-title">Book Venues</h2>
          </div>
          <Link to="/venue" className="hs-see-all">
            See All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="hs-grid">
          {venueList.slice(0, 4).map((venue) => (
            <Link to={`/venue/${venue.id}`} className="hs-card" key={venue.id}>
              <div className="hs-card-img">
                <img src={venue.cover_image || fallback} alt={venue.venue_name} loading="lazy"
                  onError={(e) => { e.target.src = fallback; }} />
                <div className="hs-rating">
                  <img src={star} alt="★" />
                  <span>{venue.average_rating || "0.0"} ({venue.review_count || 0})</span>
                </div>
                <div className="hs-actions">
                  <button className="hs-action-btn" onClick={(e) => toggleFav(e, venue)} aria-label="Like">
                    <img src={venue.favourite ? HeartFilled : likeIcon} alt="like" />
                  </button>
                  <button className="hs-action-btn" onClick={(e) => handleShare(e, venue)} aria-label="Share">
                    <img src={shareIcon} alt="share" />
                  </button>
                </div>
              </div>
              <div className="hs-card-body">
                <h3 className="hs-card-name">{venue.venue_name}</h3>
                <p className="hs-card-meta">
                  <span>~{venue.distance_km ? `${venue.distance_km.toFixed(1)} km` : "0.0 km"}</span>
                </p>
                <div className="hs-sports">
                  {venue.sports?.slice(0, 5).map((s, i) => (
                    <div className="hs-sport-icon" key={i} title={s.name}>
                      <img src={s.image || fallback} alt={s.name} loading="lazy"
                        onError={(e) => { e.target.src = fallback; }} />
                    </div>
                  ))}
                  {venue.sports?.length > 5 && (
                    <span style={{ fontSize: 11, color: "#858585", alignSelf: "center" }}>+{venue.sports.length - 5}</span>
                  )}
                </div>
                <div className="hs-card-footer">
                  <span className="hs-offer">
                    {venue.coupon_type === "percentage" && venue.discount_offer
                      ? `Upto ${parseFloat(venue.discount_offer)}% Off`
                      : venue.coupon_type === "flat" && venue.discount_offer
                      ? `Upto ₹${parseFloat(venue.discount_offer)} Off`
                      : ""}
                  </span>
                  <span className="hs-price">
                    {venue.pricing ? `₹${parseFloat(venue.pricing).toFixed(0)} onwards` : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
