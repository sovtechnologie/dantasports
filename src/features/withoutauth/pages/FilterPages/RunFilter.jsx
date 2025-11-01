import React, { useEffect, useState, useMemo } from "react";
import "../../Stylesheets/Filterpages/RunFilter.css";
import "../../Stylesheets/Filterpages/Cards.css";
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
import star from "../../assets/icons/star-white.svg";
import bookrunn from '../../assets/bookrun/bookrun.png'
import { useQueryClient } from "@tanstack/react-query";
import { useFetchEvent } from "../../../../hooks/EventList/useFetchEvents.js";
import { useSelector } from "react-redux";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useUnlikeEvent } from "../../../../hooks/favouriteEvent/useUnLikeEvent.js";
import { useLikeEvent } from "../../../../hooks/favouriteEvent/useLikeEvent.js";
import eventImage from "../../../withoutauth/assets/events/events1.png";
import PageSearch from "../../components/PageSearch.jsx";
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
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filteredRuns, setFilteredRuns] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  console.log("selectedAmenities", selectedAmenities);
  const auth = useSelector((state) => state.auth);
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
    sportAvailability: [],
    slot: null,
  });
  const handleResetFilters = () => {
    setSelectedSports([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedAmenities([]);
    setSearch("");
    setFilters({
      service: null,
      difficulty: [],
      price: null,
      amenities: [],
      sortBy: [],
      date: null,
      time: null,
      sportAvailability: [],
      slot: null,
    });
    setRunList(AllRundata?.result || []);
  };


  const payload = { lat, lng, userId: userId || null, type: 2 };
  const {
    data: AllRundata,
    isLoading,
    isError,
    error,
  } = useFetchEvent(payload);

  const likeEvent = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();


  const toggleFavourite = (event) => {
    const eventId = event.id;
    const type = event?.type;

    if (!auth || !auth?.id) {
      alert("Please login first to like or unlike a venue.");
      return;
    }

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

    if (selectedSports.length > 0) {

      const selectedIds = selectedSports.map((sport) => sport.sports_id);

      result = result.filter((evt) => {
        const sportIds = evt.sports?.map((s) => s.id) || [];
        const match = sportIds.some((id) => selectedIds.includes(id));
        return match;
      });
    }


    if (selectedDate) {
      const chosenDate = new Date(selectedDate).toISOString().split("T")[0];
      result = result.filter((evt) => {
        const eventStartDate = toDateOnly(evt.start_date);
        const eventEndDate = toDateOnly(evt.end_date);
        return chosenDate >= eventStartDate && chosenDate <= eventEndDate;
      });
    }

    if (selectedTime) {
      const chosenMinutes = parseTimeToMinutes(selectedTime);
      result = result.filter((evt) => {
        const evtStart = parseTimeToMinutes(evt.start_time);
        const evtEnd = parseTimeToMinutes(evt.end_time);
        return chosenMinutes >= evtStart && chosenMinutes <= evtEnd;
      });


    }

    if (selectedAmenities.length > 0) {
      // Handle both numeric and object cases
      const selectedAmenityIds = selectedAmenities.map((a) =>
        typeof a === "object" ? a.id : a
      );

      console.log("✅ selectedAmenityIds", selectedAmenityIds);

      result = result.filter((evt) => {
        const eventAmenityIds = evt.amenities?.map((a) => a.id) || [];
        return selectedAmenityIds.every((id) =>
          eventAmenityIds.includes(Number(id))
        );
      });
    }


    // ✅ Sorting
    // ✅ Multiple sort options combined
    if (filters.sortBy?.length > 0) {
      // If favourite selected → filter only favourites first
      if (filters.sortBy.includes("favourite")) {
        result = result.filter((evt) => evt.favourite === 1 || evt.favourite === true);
      }

      // Then apply other sorting types in priority order
      if (filters.sortBy.includes("nearby")) {
        result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }

      if (filters.sortBy.includes("popularity")) {
        result.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
      }

      if (filters.sortBy.includes("priceLow")) {
        result.sort(
          (a, b) =>
            parseFloat(a.lowest_ticket_price || 0) -
            parseFloat(b.lowest_ticket_price || 0)
        );
      }
    }

    return result;
  }, [runList, search, filters, selectedSports, selectedDate, selectedAmenities, selectedTime]);

  useEffect(() => {
    if (AllRundata?.status === 200) {
      setRunList(AllRundata.result);
      setFilteredRuns(AllRundata.result); // ✅ initialize
    }
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
        className="book_venue_section pb-lg-4 pb-3"
        style={{ background: "#F1F3F2" }}
      >
        <PageSearch />
        <Container>
          <Row>
            <Col lg={3} md={5} className="d-none d-lg-block d-md-block">
              <SortBy
                sortBy={filters.sortBy}
                setSortBy={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
              />


              <div className="mt-3">
                <Filter
                  selectedSports={selectedSports}
                  setSelectedSports={setSelectedSports}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  searchTerm={search}
                  setSearchTerm={setSearch}
                  onReset={handleResetFilters}
                  venues={runList}
                  setFilteredVenues={setFilteredRuns}
                  selectedAmenities={selectedAmenities}
                  setSelectedAmenities={setSelectedAmenities}
                />

              </div>
            </Col>

            {/* <Col className="d-lg-none d-md-none text-end mb-4">
              <FliterModal />
              <SortModal />
            </Col> */}

            <Col lg={9} md={7}>
              <div className="row g-3">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <div key={event.id} className="col-lg-4">
                      <div className="card">
                        <div className="card_img">
                          <img
                            src={event.desktop_image || bookrunn}
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
                            <h2 className="text_wrap card_heading mb-3">{event.event_title}</h2>
                            <p className="card_date mb-3">
                              <span className="me-2">
                                <img src={date} alt="" />
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
                            <p className="card_date mb-3">
                              <span className="me-2">
                                <img src={map} alt="" />
                              </span>
                              {event.locations?.[0]?.area},{" "}
                              {event.locations?.[0]?.city}
                            </p>
                          </div>
                          {/* <div className="no_off_users mt-2">
                            <ul className="d-flex p-0 align-items-center m-0">
                              {event.sports?.slice(0, 5).map((sport, index) => (
                                <li key={index} className="me-2 list-unstyled">
                                  <img
                                    src={sport.image}
                                    alt={sport.name || "sport"}
                                    title={sport.name || "sport"}
                                   
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
                          </div> */}

                          <div className="d-flex justify-content-between">
                            <p className="up_to_offer m-0">Upto 50%off</p>
                            <p className="onwards_rup m-0">₹1000 onwards</p>
                          </div>
                          <div className="card_line"></div>

                          <div className="offer d-flex justify-content-between align-items-center">
                            {/* <p>
                              {event.coupon_type === "percentage" && event.offer
                                ? `Upto ${parseFloat(event.offer)}% Off`
                                : event.coupon_type === "flat" && event.offer
                                  ? `Upto ₹${parseFloat(event.offer)} Off`
                                  : ""}
                            </p> */}

                            <a href={`/run/${event.id}`}>Join Now</a>
                          </div>

                        </div>
                        <div className="rating">
                          <span><img src={star} className="pe-2" alt="" />4.4</span>
                        </div>
                        <div className="easy2">
                          <span> {event.difficulty === 0 ? (
                            <span className="Moderate">Moderate</span>
                          ) : event.difficulty === 1 ? (
                            <span className="easy">Easy</span>
                          ) : event.difficulty === 2 ? (
                            <span className="difficult">Difficult</span>
                          ) : (
                            <span className="unknown">Not Specified</span>
                          )}</span>
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
