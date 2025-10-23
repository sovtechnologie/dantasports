import React, { useEffect, useState, useMemo } from "react";
import "../../Stylesheets/Filterpages/RunFilter.css";
import { Container, Row, Col } from "react-bootstrap";
import AppDownloadBanner from "../../components/AppDownloadBanner.jsx";
import Filter from "../../components/Filter.jsx";
import SortModal from "../../components/SortModal.jsx";
import FliterModal from "../../components/FliterModal.jsx";
import SortBy from "../../components/SortBy.jsx";
import bookrun from "../../assets/bookrun/bookrun.png";
import map from "../../assets/playhost/map.svg";
import date from "../../assets/playhost/date.svg";
import likeIcon from "../../assets/icons/like.svg";
import shareIcon from "../../assets/icons/share.svg";
import bookrunn from '../../assets/bookrun/bookrun.png'
import { useQueryClient } from "@tanstack/react-query";
import { useFetchEvent } from "../../../../hooks/EventList/useFetchEvents.js";
import { useSelector } from "react-redux";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useUnlikeEvent } from "../../../../hooks/favouriteEvent/useUnLikeEvent.js";
import { useLikeEvent } from "../../../../hooks/favouriteEvent/useLikeEvent.js";
import eventImage from "../../../withoutauth/assets/events/events1.png";
function formatTime(timeStr = "00:00") {
  if (!timeStr) return "";
  const [h, m, s] = timeStr.split(":").map(Number);
  const dt = new Date();
  dt.setHours(h, m, s || 0);
  return dt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function parseTimeToMinutes(timeStr = "00:00:00") {
  if (!timeStr) return 0;
  const [h, m, s] = timeStr.split(":").map(Number);
  return h * 60 + m + (s || 0) / 60;
}

function toDateOnly(str) {
  return new Date(str).toISOString().split("T")[0];
}

export default function RunFilterPage() {
  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);

  const [runList, setRunList] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    service: null,
    difficulty: [],
    price: null,
    amenities: [],
    sortBy: null,
    date: null,
    time: null,
  });

  // ✅ Fetch Events API
  const payload = { lat, lng, userId: userId || null, type: 2 };
  const {
    data: AllRundata,
    isLoading,
    isError,
    error,
  } = useFetchEvent(payload);

  const likeEvent = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();

  // ✅ Toggle Like API
  const toggleFavourite = (event) => {
    const eventId = event.id;
    const type = event?.type;

    setRunList((prev) =>
      prev.map((v) =>
        v.id === eventId ? { ...v, favourite: !v.favourite } : v
      )
    );

    if (!event.favourite) {
      likeEvent.mutate(
        { eventId, userId, type },
        { onSuccess: () => queryClient.invalidateQueries(["EventList", userId || null]) }
      );
    } else {
      unlikeEvent.mutate(
        { favouriteEventId: event.favourite_event_id },
        { onSuccess: () => queryClient.invalidateQueries(["EventList", userId || null]) }
      );
    }
  };

  // ✅ Filter Events
  const filteredEvents = useMemo(() => {
    let result = [...runList];

    if (search) {
      result = result.filter((evt) =>
        evt.event_title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.date) {
      const chosenDate = new Date(filters.date).toISOString().split("T")[0];
      result = result.filter((evt) => {
        const eventStartDate = toDateOnly(evt.start_date);
        const eventEndDate = toDateOnly(evt.end_date);

        if (chosenDate < eventStartDate || chosenDate > eventEndDate) return false;

        if (filters.time) {
          const evtStart = parseTimeToMinutes(evt.start_time);
          const evtEnd = parseTimeToMinutes(evt.end_time);
          const chosenTime = parseTimeToMinutes(filters.time);
          return chosenTime >= evtStart && chosenTime <= evtEnd;
        }
        return true;
      });
    }

    if (filters.service) {
      result = result.filter((evt) =>
        evt.sports?.some((s) => s.name === filters.service)
      );
    }

    if (filters.price) {
      result = result.filter(
        (evt) => parseFloat(evt.lowest_ticket_price) <= filters.price
      );
    }

    if (filters.sortBy === "nearby") {
      result = result.sort((a, b) => a.distance - b.distance);
    } else if (filters.sortBy === "favourite") {
      result = result.filter((evt) => evt.favourite === 1);
    } else if (filters.sortBy === "lowtohigh") {
      result = result.sort(
        (a, b) =>
          parseFloat(a.lowest_ticket_price) - parseFloat(b.lowest_ticket_price)
      );
    }

    return result;
  }, [runList, search, filters]);

  useEffect(() => {
    if (AllRundata?.status === 200) setRunList(AllRundata.result);
  }, [AllRundata]);

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading events: {error.message}</div>;

  // ✅ Handle Share
  const handleShare = (event) => {
    const url = `${window.location.origin}/event/${event.id}`;
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

  return (
    <>
      <section
        className="book_venue_section pt-3 pt-lg-5 pb-lg-5 pb-3"
        style={{ background: "#F1F3F2" }}
      >
        <Container>
          <Row>
            <Col lg={3} md={5} className="d-none d-lg-block d-md-block">
              <SortBy />
              <div className="mt-3">
                <Filter />
              </div>
            </Col>

            <Col className="d-lg-none d-md-none text-end mb-4">
              <FliterModal />
              <SortModal />
            </Col>

            <Col lg={9} md={7}>
              <div className="row g-3">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <div key={event.id} className="col-lg-4">
                      <div className="card">
                        <div className="card_img">
                          <img
                            src={event.desktop_image ||bookrunn }
                            className="w-100"
                            alt=""
                              onError={(e) => {
                                  e.target.onerror = null; 
                                  e.target.src = bookrunn; 
                                }}
                          />
                        </div>
                        <div className="card_icons">
                          <img
                            className="like"
                            src={likeIcon}
                            alt="like"
                            onClick={() => toggleFavourite(event)}
                            style={{
                              filter: event.favourite ? "invert(40%) sepia(100%) saturate(5000%) hue-rotate(340deg)" : "none",
                              cursor: "pointer",
                            }}
                          />
                          <img
                            className="share"
                            src={shareIcon}
                            alt="share"
                            onClick={() => handleShare(event)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <div className="txt_wrapper">
                          <div className="card_txt">
                            <h2>{event.event_title}</h2>
                            <p>
                              <span>
                                <img className="pe-2" src={date} alt="" />
                              </span>
                              {new Date(event.start_date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })}{" "}
                              -{" "}
                              {new Date(event.end_date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })}{" "}
                              | {formatTime(event.start_time)} onwards
                            </p>
                            <p>
                              <span>
                                <img className="pe-2" src={map} alt="" />
                              </span>
                              {event.locations?.[0]?.area},{" "}
                              {event.locations?.[0]?.city}
                            </p>
                          </div>
                         <div className="no_off_users mt-2">
  <ul className="d-flex p-0 align-items-center m-0">
    {event.sports?.slice(0, 5).map((sport, index) => (
      <li key={index} className="me-2 list-unstyled">
        <img
          src={sport.image} 
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

    {event.sports && event.sports.length > 5 && (
      <li
        className="list-unstyled"
        style={{
          color: "#858585",
          fontSize: "14px",
          lineHeight: 1,
        }}
      >
        +{event.sports.length - 5} more
      </li>
    )}
  </ul>
</div>

                          <div className="offer d-flex justify-content-between align-items-center">
                            <p>
                              {event.offer ? `${event.offer}% Off` : "No Offer"}
                            </p>
                            <a href={`/run/${event.id}`}>Join Now</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">No Events Found</div>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <div className="run-footer-banner">
            <AppDownloadBanner />
          </div>
        </Container>
      </section>
    </>
  );
}
