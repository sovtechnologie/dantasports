import React, { useEffect, useState, useMemo } from "react";
import "../../Stylesheets/Filterpages/RunFilter.css";
import RunCard from "../../components/RunCard.jsx";
import SortSection from "../../components/SortSection-old.jsx";
import AppDownloadBanner from "../../components/AppDownloadBanner.jsx";
import eventImage from "../../assets/EventImage.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchEvent } from "../../../../hooks/EventList/useFetchEvents.js";
import { useSelector } from "react-redux";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useUnlikeEvent } from "../../../../hooks/favouriteEvent/useUnLikeEvent.js";
import { useLikeEvent } from "../../../../hooks/favouriteEvent/useLikeEvent.js";
import AdvancedFilter from "../../components/AdvanceFilter.jsx";
import { Container, Row, Col } from "react-bootstrap";
import SortBy from "../../components/SortBy.jsx";
import map from "../../assets/playhost/map.svg";
import date from "../../assets/playhost/date.svg";
import like from "../../assets/icons/like.svg";
import share from "../../assets/icons/share.svg";
import bookrun from "../../assets/bookrun/bookrun.png";
import Filter from "../../components/Filter.jsx";
import SortModal from "../../components/SortModal.jsx";
import FliterModal from "../../components/FliterModal.jsx";

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [filters, setFilters] = useState({
    service: null,
    difficulty: [],
    price: null,
    amenities: [],
    sortBy: null,
    date: null,
    time: null,
  });

  const payload = { lat, lng, userId: userId || null, type: 2 };
  const {
    data: AllRundata,
    isLoading,
    isError,
    error,
  } = useFetchEvent(payload);
  console.log("AllRundataAllRundata", AllRundata);
  const likeEvent = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();

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

        if (chosenDate < eventStartDate || chosenDate > eventEndDate) {
          return false;
        }

        if (filters.time) {
          const evtStart = parseTimeToMinutes(evt.start_time);
          const evtEnd = parseTimeToMinutes(evt.end_time);
          const chosenTime = parseTimeToMinutes(filters.time);

          if (chosenTime < evtStart || chosenTime > evtEnd) {
            return false;
          }
        }

        return true;
      });
    } else if (filters.time) {
      result = result.filter((evt) => {
        const evtStart = parseTimeToMinutes(evt.start_time);
        const evtEnd = parseTimeToMinutes(evt.end_time);
        const chosenTime = parseTimeToMinutes(filters.time);
        return chosenTime >= evtStart && chosenTime <= evtEnd;
      });
    }

    if (filters.service) {
      result = result.filter((evt) =>
        evt.sports?.some((s) => s.name === filters.service)
      );
    }

    if (filters.difficulty?.length > 0) {
      result = result.filter((evt) =>
        filters.difficulty.includes(evt.difficulty)
      );
    }

    if (filters.price) {
      result = result.filter(
        (evt) => parseFloat(evt.lowest_ticket_price) <= filters.price
      );
    }

    if (filters.amenities?.length > 0) {
      result = result.filter((evt) => {
        const eventAmenities = evt.amenities.map((a) => a.name);
        return filters.amenities.every((a) => eventAmenities.includes(a));
      });
    }

    if (filters.sortBy === "nearby") {
      result = result.sort((a, b) => a.distance - b.distance);
    } else if (filters.sortBy === "favourite") {
      result = result.filter((evt) => evt.favourite === 1);
    } else if (filters.sortBy === "popularity") {
      result = result.sort(
        (a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating)
      );
    } else if (filters.sortBy === "lowtohigh") {
      result = result.sort(
        (a, b) =>
          parseFloat(a.lowest_ticket_price) - parseFloat(b.lowest_ticket_price)
      );
    }

    return result;
  }, [runList, search, filters]);

  const handleReset = () => {
    setSearch("");
    setSelectedEvent(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFilters({
      service: null,
      difficulty: [],
      price: null,
      amenities: [],
      sortBy: null,
      date: null,
      time: null,
    });
  };

  useEffect(() => {
    if (AllRundata?.status === 200) setRunList(AllRundata.result);
  }, [AllRundata]);

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading events: {error.message}</div>;

  return (
    <>
      <section className="book_venue_section pt-3 pt-lg-5 pb-lg-5 pb-3" style={{background: "#F1F3F2"}}>
        <Container>
          <Row>
            <Col lg={3} md={5} className='d-none d-lg-block d-md-block'>
              <SortBy />
             <div className="mt-3">
               <Filter/>
             </div>
            </Col>
              <Col className='d-lg-none d-md-none text-end mb-4'>
          <FliterModal/>
          <SortModal/>

          </Col>
            <Col lg={9} md={7}>
              <div className="row g-3">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card_img">
                      <img src={bookrun} className="w-100" alt="" />
                    </div>
                    <div className="card_icons">
                      <a href="">
                        <img className="like" src={like} alt="like" />
                      </a>
                      <a href="">
                        <img className="share" src={share} alt="like" />
                      </a>
                    </div>
                    <div className="txt_wrapper">
                      <div className="card_txt">
                        <h2>Green Run Marathon</h2>
                        <p>
                          <span>
                            <img className="pe-2" src={date} alt="" />
                          </span>
                          22 Jun - 23 Jun l 6AM onwards
                        </p>
                        <p>
                          <span>
                            <img className="pe-2" src={map} alt="" />
                          </span>
                          Palika Bazar Gate 1, Delhi-451200
                        </p>
                      </div>
                      <div className="sports_title">
                        <p>Football, Cricket</p>
                      </div>
                      <div className="offer d-flex justify-content-between align-items-center">
                        <p>Upto 50%off</p>
                        <a href="">Join Now</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card_img">
                      <img src={bookrun} className="w-100" alt="" />
                    </div>
                    <div className="card_icons">
                      <a href="">
                        <img className="like" src={like} alt="like" />
                      </a>
                      <a href="">
                        <img className="share" src={share} alt="like" />
                      </a>
                    </div>
                    <div className="txt_wrapper">
                      <div className="card_txt">
                        <h2>Green Run Marathon</h2>
                        <p>
                          <span>
                            <img className="pe-2" src={date} alt="" />
                          </span>
                          22 Jun - 23 Jun l 6AM onwards
                        </p>
                        <p>
                          <span>
                            <img className="pe-2" src={map} alt="" />
                          </span>
                          Palika Bazar Gate 1, Delhi-451200
                        </p>
                      </div>
                      <div className="sports_title">
                        <p>Football, Cricket</p>
                      </div>
                      <div className="offer d-flex justify-content-between align-items-center">
                        <p>Upto 50%off</p>
                        <a href="">Join Now</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card_img">
                      <img src={bookrun} className="w-100" alt="" />
                    </div>
                    <div className="card_icons">
                      <a href="">
                        <img className="like" src={like} alt="like" />
                      </a>
                      <a href="">
                        <img className="share" src={share} alt="like" />
                      </a>
                    </div>
                    <div className="txt_wrapper">
                      <div className="card_txt">
                        <h2>Green Run Marathon</h2>
                        <p>
                          <span>
                            <img className="pe-2" src={date} alt="" />
                          </span>
                          22 Jun - 23 Jun l 6AM onwards
                        </p>
                        <p>
                          <span>
                            <img className="pe-2" src={map} alt="" />
                          </span>
                          Palika Bazar Gate 1, Delhi-451200
                        </p>
                      </div>
                      <div className="sports_title">
                        <p>Football, Cricket</p>
                      </div>
                      <div className="offer d-flex justify-content-between align-items-center">
                        <p>Upto 50%off</p>
                        <a href="">Join Now</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card_img">
                      <img src={bookrun} className="w-100" alt="" />
                    </div>
                    <div className="card_icons">
                      <a href="">
                        <img className="like" src={like} alt="like" />
                      </a>
                      <a href="">
                        <img className="share" src={share} alt="like" />
                      </a>
                    </div>
                    <div className="txt_wrapper">
                      <div className="card_txt">
                        <h2>Green Run Marathon</h2>
                        <p>
                          <span>
                            <img className="pe-2" src={date} alt="" />
                          </span>
                          22 Jun - 23 Jun l 6AM onwards
                        </p>
                        <p>
                          <span>
                            <img className="pe-2" src={map} alt="" />
                          </span>
                          Palika Bazar Gate 1, Delhi-451200
                        </p>
                      </div>
                      <div className="sports_title">
                        <p>Football, Cricket</p>
                      </div>
                      <div className="offer d-flex justify-content-between align-items-center">
                        <p>Upto 50%off</p>
                        <a href="">Join Now</a>
                      </div>
                    </div>
                  </div>
                </div>
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
