import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import star from "../assets/images/home/bookvenues/star.svg";
import { useFetchEvent } from "../hooks/EventList/useFetchEvents.js";
import { useLikeEvent } from "../hooks/favouriteEvent/useLikeEvent.js";
import { useUnlikeEvent } from "../hooks/favouriteEvent/useUnLikeEvent.js";
import { CardShimmer } from "../features/withoutauth/components/Shimmer/CardShimmer.jsx";
import bookeventt from "../assets/images/home/bookevents/bookevents.png";
import "./StyleSheets/BookRun.css";
import likeIcon from "../assets/images/home/bookvenues/like.svg";
import shareIcon from "../assets/images/home/bookvenues/share.svg";
import dateIcon from "../assets/images/home/bookrun/date.svg";
import mapIcon from "../assets/images/home/bookrun/map.svg";
import HeartFilled from "../features/withoutauth/assets/VenueCardLogo/heartfilled.png";

function formatTime(timeStr = "00:00") {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  const h = Number(parts[0] || 0);
  const m = Number(parts[1] || 0);
  const s = parts.length > 2 ? Number(parts[2]) : 0;
  const dt = new Date();
  dt.setHours(h, m, s);
  return dt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function BookEvents() {
  const { lat, lng } = useSelector((state) => state.location);
  // const [coords] = useState({ lat, lng, type: 1, userId: null }); // type 1 for events
  const userId = useSelector((state) => state.auth.id);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useFetchEvent({
    lat,
    lng,
    type: 1,
    userId,
  });
  const events = data?.result || [];
  const likeEvent = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();
  const [eventList, setEventList] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (events?.length) setEventList(events);
  }, [events]);


  const toggleFavourite = async (event) => {
    const eventId = event.id;
    const type = event?.type || 1;
    const wasFavourite = event.favourite;

    if (!auth || !auth?.id) {
      alert("Please login first to like or unlike a venue.");
      return;
    }

    // UI instant update
    setEventList((prev) =>
      prev.map((v) =>
        v.id === eventId ? { ...v, favourite: !wasFavourite } : v
      )
    );

    try {
      if (!wasFavourite) {
        // Like
        const res = await likeEvent.mutateAsync({ eventId, userId, type });
        // Update favourite_event_id in state after like
        setEventList((prev) =>
          prev.map((v) =>
            v.id === eventId
              ? { ...v, favourite_event_id: res.favourite_event_id }
              : v
          )
        );
      } else {
        // Unlike → use the favourite_event_id from state
        await unlikeEvent.mutateAsync({
          favouriteEventId: event.favourite_event_id,
          type,
        });
      }
      queryClient.invalidateQueries(["EventList", userId || null]);
    } catch (err) {
      console.error("Error updating favourite:", err);
      // rollback UI
      setEventList((prev) =>
        prev.map((v) =>
          v.id === eventId ? { ...v, favourite: wasFavourite } : v
        )
      );
    }
  };


  const handleShare = (event) => {
    const url = `${window.location.origin}/Events/${event.id}`;
    if (navigator.share) {
      navigator.share({
        title: event.event_title,
        text: "Check out this event!",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Event link copied to clipboard!");
    }
  };

  if (isLoading) return <CardShimmer />;
  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <section className="book_venue_section">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="section_title">
            <h2>Book Events</h2>
          </div>
          <div className="see_all">
            <Link to="/Events">See All</Link>
          </div>
        </div>

        <Row className="g-3">
          {eventList.slice(0, 4).map((evt) => {
            const eventDate = `${new Date(evt.start_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} – ${new Date(evt.end_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} | ${formatTime(evt.start_time)}‑${formatTime(evt.end_time.slice(0, 5))}`;

            return (
              <Col lg={3} md={6} sm={6} key={evt.id}>
                <Card>

                  <div className="card_img">
                    <img
                      src={evt.desktop_image || bookeventt}
                      className="w-100"
                      alt={evt.event_title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = bookeventt;
                      }}
                    />
                  </div>
                  <div className="card_icons1">
                    <button
                      onClick={() => toggleFavourite(evt)}
                      className="icon-btn me-3"
                      style={{ background: "none", border: "none" }}
                    >
                      <img
                        className="like1"
                        src={evt.favourite ? HeartFilled : likeIcon}
                        alt="like"
                      />
                    </button>
                    <button
                      onClick={() => handleShare(evt)}
                      className="icon-btn"
                      style={{ background: "none", border: "none" }}
                    >
                      <img className="share1" src={shareIcon} alt="share" />
                    </button>
                  </div>


                  <div className="txt_wrapper">

                    <div className="card_txt">
                      <h2 className="text_wrap card_heading">{evt.event_title}</h2>
                      <p className="card_date mb-2">
                        <span className="me-2">
                          <img src={dateIcon} alt="" />
                        </span>
                        {eventDate}
                      </p>
                      <p className="card_date my-0">
                        <span className="me-2">
                          <img src={mapIcon} alt="" />
                        </span>
                        {evt.locations[0]?.area}, {evt.locations[0]?.city}
                      </p>
                    </div>
                    {/* <div className="no_off_users mt-2">
                      <ul className="d-flex p-0 align-items-center m-0">
                        {evt.sports?.slice(0, 5).map((sport, index) => (
                          <li key={index} className="me-2 list-unstyled">
                            <img
                              src={sport.image}
                              alt={sport.name || "sport"}
                              title={sport.name || "sport"}
                              
                            />
                          </li>
                        ))}

                        {evt.sports && evt.sports.length > 5 && (
                          <li
                            className="list-unstyled"
                            style={{
                              color: "#858585",
                              fontSize: "14px",
                              lineHeight: 1,
                            }}
                          >
                            +{evt.sports.length - 5} more
                          </li>
                        )}
                      </ul>
                    </div> */}
                    <div className="d-flex justify-content-between no_off_users">
                      <p className="up_to_offer m-0">
                        {evt.coupon_type === "percentage" && evt.discount_offer
                          ? `Upto ${parseFloat(evt.discount_offer)}% Off`
                          : evt.coupon_type === "flat" && evt.discount_offer
                            ? `Upto ₹${parseFloat(evt.discount_offer)} Off`
                            : ""}

                        <p className="onwards_rup mb-2">{evt.pricing
                          ? `₹${parseFloat(evt.pricing).toFixed(0)} onwards`
                          : ""}</p></p>

                    </div>
                    <div className="card_line mb-2"></div>
                    <div className="easy2">
                      <span> {evt.difficulty === 0 ? (
                        <span className="Moderate">Moderate</span>
                      ) : evt.difficulty === 1 ? (
                        <span className="easy">Easy</span>
                      ) : evt.difficulty === 2 ? (
                        <span className="difficult">Difficult</span>
                      ) : (
                        <span className="unknown">Not Specified</span>
                      )}</span>
                    </div>

                    <div className="offer d-flex justify-content-between align-items-center">


                      <Link to={`/Events/${evt.id}`}>Join Now</Link>
                    </div>
                    <div className="rating">
                      <span><img src={star} className="pe-2" alt="" />{evt.average_rating || "0.0"}( {evt.review_count || 0})</span>
                    </div>
                  </div>

                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default BookEvents;
