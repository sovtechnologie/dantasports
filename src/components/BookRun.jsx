import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ".//StyleSheets/BookRun.css";
import star from "../assets/images/home/bookvenues/star.svg";
import likeIcon from "../assets/images/home/bookvenues/like.svg";
import shareIcon from "../assets/images/home/bookvenues/share.svg";
import dateIcon from "../assets/images/home/bookrun/date.svg";
import mapIcon from "../assets/images/home/bookrun/map.svg";
import { useSelector } from "react-redux";
import { useFetchEvent } from "../hooks/EventList/useFetchEvents.js";
import { useLikeEvent } from "../hooks/favouriteEvent/useLikeEvent.js";
import { useUnlikeEvent } from "../hooks/favouriteEvent/useUnLikeEvent.js";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import bookrunn from '../assets/images/home/bookrun/bookrun.png'

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

function BookRun() {
  const { lat, lng } = useSelector((state) => state.location);
  const userId = useSelector((state) => state.auth.id);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useFetchEvent({
    lat,
    lng,
    type: 2,
    userId,
  });
  const events = data?.result || [];

  const likeEvent = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    setEventList(events);
  }, [events]);

  const toggleFavourite = (event) => {
    const eventId = event.id;
    setEventList((prev) =>
      prev.map((v) =>
        v.id === eventId ? { ...v, favourite: !v.favourite } : v
      )
    );

    if (!event.favourite) {
      likeEvent.mutate(
        { eventId, userId, type: event.type },
        {
          onSuccess: () =>
            queryClient.invalidateQueries(["EventList", userId || null]),
        }
      );
    } else {
      unlikeEvent.mutate(
        { favouriteEventId: event.favourite_event_id },
        {
          onSuccess: () =>
            queryClient.invalidateQueries(["EventList", userId || null]),
        }
      );
    }
  };

  const handleShare = (event) => {
    const url = `${window.location.origin}/Run/${event.id}`;
    if (navigator.share) {
      navigator.share({
        title: event.event_title,
        text: "Check out this event!",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  const visibleEvents = eventList.slice(0, 4);

  return (
    <section className="book_venue_section">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="section_title">
            <h2>Book Run</h2>
          </div>
          <div className="see_all">
            <a href="">See All</a>
          </div>
        </div>
        <Row className="g-3">
          {visibleEvents.map((evt) => (
            <Col lg={3} md={6} sm={6} key={evt.id}>
              <Card>
                <div className="card_img">
                  <img
                    src={evt.desktop_image || bookrunn}
                    className="w-100"
                    alt={evt.event_title}
                      onError={(e) => {
      e.target.onerror = null; 
      e.target.src = bookrunn; 
    }}
                  />
                </div>

                {/* Like & Share */}
                <div className="card_icons">
                  <img
                    className="like"
                    src={likeIcon}
                    alt="like"
                    onClick={() => toggleFavourite(evt)}
                    style={{
                      filter: evt.favourite
                        ? "invert(40%) sepia(100%) saturate(5000%) hue-rotate(340deg)"
                        : "none",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    className="share"
                    src={shareIcon}
                    alt="share"
                    onClick={() => handleShare(evt)}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div className="txt_wrapper">
                  <div className="card_txt">
                    <h2 className="text_wrap">{evt.event_title}</h2>
                    <p className="text_wrap">
                      <span>
                        <img className="pe-2" src={dateIcon} alt="date" />
                      </span>
                      {`${new Date(evt.start_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })} - ${new Date(evt.end_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })} | ${formatTime(evt.start_time)} onwards`}
                    </p>
                    <p>
                      <span>
                        <img className="pe-2" src={mapIcon} alt="map" />
                      </span>
                      {evt.locations[0]?.area}, {evt.locations[0]?.city}
                    </p>
                  </div>

                  <div className="no_off_users mt-2">
  <ul className="d-flex p-0 align-items-center m-0">
    {evt.sports?.slice(0, 5).map((sport, index) => (
      <li key={index} className="me-2 list-unstyled">
        <img
          src={sport.image }
          alt={sport.name || "sport"}
          title={sport.name || "sport"}
          style={{
            width: "25px",
            height: "25px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
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
</div>


                  {/* Offer / Join Now */}
                  <div className="offer d-flex justify-content-between align-items-center">
                    {evt.coupon_type === "percentage" ? (
                      <p>
                        Upto {Math.floor(evt.offer || 0)}
                        <span className="percent_icon">%</span> off
                      </p>
                    ) : (
                      <p>Save ₹{Math.floor(evt.offer || 0)}</p>
                    )}
                    <Link to={`/Run/${evt.id}?venueId=${evt.id}`}>Join Now</Link>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default BookRun;
