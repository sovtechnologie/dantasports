import React, { useEffect, useState, useMemo } from "react";
import "../../Stylesheets/Filterpages/EventFilter.css";
import "../../Stylesheets/Filterpages/Cards.css";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchEvent } from "../../../../hooks/EventList/useFetchEvents.js";
import { useSelector } from "react-redux";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useUnlikeEvent } from "../../../../hooks/favouriteEvent/useUnLikeEvent.js";
import { useLikeEvent } from "../../../../hooks/favouriteEvent/useLikeEvent.js";
import { Col, Container, Row, Card } from "react-bootstrap";
import SortBy from "../../components/SortBy.jsx";
import EventFilter from "../../components/EventFilter.jsx";
import SortModal from "../../components/SortModal.jsx";
import EventPageModal from "../../components/EventPageModal.jsx";
import AppDownloadBanner from "../../components/AppDownloadBanner.jsx";
import map from "../../assets/icons/map.svg";
import date from "../../assets/icons/date.svg";
import likeIcon from "../../assets/icons/like.svg";
import shareIcon from "../../assets/icons/share.svg";
import fallbackEventImage from "../../assets/events/events1.png";
import { useNavigate } from "react-router-dom";
import { Share } from "../../../../utils/share";
import HeartFilled from "../../assets/VenueCardLogo/heartfilled.png";
import PageSearch from "../../components/PageSearch.jsx";
import star from "../../assets/icons/star-white.svg"
import OngoingEvents from "../../components/OngoingEvents.jsx";
import { useBanner } from "../../../../hooks/useBanner.js";

export default function EventFilterPage() {

  const { data: bannerData, isLoading: dataLoading, error: dataError } = useBanner(2);
  const banners = bannerData?.result || [];

  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({
    sortBy: [],
  });

  const payload = { lat, lng, userId: userId || null, type: 1 };
  console.log("payloadpayload", payload);
  const {
    data: AllEventdata,
    isLoading,
    isError,
    error,
  } = useFetchEvent(payload);

  useEffect(() => {
    if (AllEventdata?.status === 200) setEventList(AllEventdata.result);
  }, [AllEventdata]);

  console.log("AllEventdataAllEventdata", AllEventdata);
  console.log("eventListeventListeventList", eventList);

  const likeEvent = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();



  const toggleFavourite = async (event) => {
    const eventId = event.id;
    const type = event?.type;
    const wasFavourite = event.favourite;

    if (!auth || !auth?.id) {
      alert("Please login first to like or unlike a Event.");
      return;
    }

    setEventList((prev) =>
      prev.map((v) =>
        v.id === eventId ? { ...v, favourite: !wasFavourite } : v
      )
    );

    try {
      if (!wasFavourite) {
        await likeEvent.mutateAsync(
          { eventId, userId, type },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(["EventList", userId || null]);
            },
          }
        );
      } else {
        await unlikeEvent.mutateAsync(
          { favouriteEventId: event.favourite_event_id },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(["EventList", userId || null]);
            },
          }
        );
      }
    } catch (err) {
      console.error("Error updating favourite:", err);
    }
  };

  const filteredEvents = useMemo(() => {

    let result = [...eventList];


    if (selectedSports.length > 0) {
      console.log("Selected Sports:", selectedSports);
      result = result.filter((evt) =>
        evt.sports?.some((s) => selectedSports.includes(s.id))
      );
      console.log("After sports filter:", result);
    }

    if (selectedDate) {
      const selected = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );

      result = result.filter((evt) => {
        if (!evt.start_date || !evt.end_date) return false;

        const start = new Date(evt.start_date);
        const end = new Date(evt.end_date);

        // Normalize all to start of day (local)
        const startLocal = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endLocal = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);

        return selected >= startLocal && selected <= endLocal;
      });
    }


    if (selectedDifficulty !== null) {
      result = result.filter((evt) => evt.difficulty === selectedDifficulty);
    }

    if (selectedDistance !== null && selectedDistance > 0) {
      result = result.filter((evt) => {
        const eventDistance = parseFloat(evt.distance || 0);
        // Only include events within selectedDistance km range
        return eventDistance <= selectedDistance;
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

    if (search) {
      result = result.filter((evt) =>
        evt.event_title.toLowerCase().includes(search.toLowerCase())
      );
    }


    if (filters.sortBy?.length > 0) {

      if (filters.sortBy.includes("favourite")) {
        result = result.filter((evt) => evt.favourite === 1 || evt.favourite === true);
      }


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
  }, [eventList, search, filters, selectedSports, selectedDistance, selectedDate, selectedDifficulty, selectedAmenities]);


  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading events: {error?.message}</div>;

  return (
    <>
      <section className="pb-lg-4 pb-3"

        style={{ background: "#F1F3F2" }}
      >
         <PageSearch searchValue="EventPage"/>
        <Container>
          <Row>
            <Col xl={3}lg={4} md={12} className="d-none d-lg-block d-md-block">
              <SortBy
                sortBy={filters.sortBy}
                setSortBy={(value) =>
                  setFilters((prev) => ({ ...prev, sortBy: value }))
                }
              />
              <EventFilter
                selectedSports={selectedSports}
                setSelectedSports={setSelectedSports}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setSelectedDifficulty={setSelectedDifficulty}
                selectedDifficulty={selectedDifficulty}
                setSelectedDistance={setSelectedDistance}
                selectedDistance={selectedDistance}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
              />
            </Col>

            <Col className="d-lg-none d-md-none mb-3 text-end">
              <SortModal />
            </Col>

            <Col lg="8" xl={9} md="12">
              <div className="col-12 mb-4">
              <OngoingEvents banners={banners} />
            </div>
              <div className="row g-3">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((evt) => (
                    <div className="col-lg-4 col-md-6 position-relative" key={evt.id}>

                      <Card className="event-card">
                        <div
                          className="card_img position-relative"
                          onClick={() => navigate(`/Events/${evt.id}`)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={evt.desktop_image || fallbackEventImage}
                            className="w-100"
                            alt={evt.event_title}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = fallbackEventImage;
                            }}
                          />
                        </div>
                        <div className="card_icons">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavourite(evt);
                            }}
                            className="icon-btn"
                            style={{ background: "none", border: "none" }}
                          >
                            <img
                              className="like"
                              src={evt.favourite ? HeartFilled : likeIcon}
                              alt="like"
                            />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              Share();
                            }}
                            className="icon-btn"
                            style={{ background: "none", border: "none" }}
                          >
                            <img
                              className="share"
                              src={shareIcon}
                              alt="share"
                            />
                          </button>
                        </div>

                        <div className="rating_box position-absolute d-flex align-items-center">
                          <img src={star} alt="" />
                          <span>
                            {evt.review_count?.toFixed(1) || 0} (
                            {evt.review_count || 0})
                          </span>
                        </div>

                        <div className="easy_box">
                          <span>{evt.difficulty === 0 ? (
                            <span className="Moderate">Moderate</span>
                          ) : evt.difficulty === 1 ? (
                            <span className="easy">Easy</span>
                          ) : evt.difficulty === 2 ? (
                            <span className="difficult">Difficult</span>
                          ) : (
                            <span className="unknown">Not Specified</span>
                          )}</span>
                        </div>

                        <div
                          className="txt_wrapper"
                          onClick={() => navigate(`/Events/${evt.id}`)}
                        >
                          <div className="card_txt">
                            <h2 className="text_wrap card_heading">{evt.event_title}</h2>
                            <p className="card_date">
                              <span className="me-2">
                                <img  src={date} alt="" />
                              </span>
                              {new Date(evt.start_date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                }
                              )}{" "}
                              -{" "}
                              {new Date(evt.end_date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                }
                              )}{" "}
                              | {evt.start_time?.slice(0, 5)} onwards
                            </p>
                            <p className="card_date">
                              <span className="me-2">
                                <img  src={map} alt="" />
                              </span>
                              {evt.locations?.[0]?.area},{" "}
                              {evt.locations?.[0]?.city}
                            </p>
                          </div>

                          <div className="sports_title d-flex justify-content-between">
                            <p>
                              {evt.coupon_type === "percentage" && evt.offer
                                ? `Upto ${parseFloat(evt.offer)}% Off`
                                : evt.coupon_type === "flat" && evt.offer
                                  ? `Upto ₹${parseFloat(evt.offer)} Off`
                                  : ""}
                            </p>

                            {evt.lowest_ticket_price ? (
                              <p>
                                <span>
                                  ₹{parseInt(evt.lowest_ticket_price)} onwards
                                </span>
                              </p>
                            ) : (
                              <p></p>
                            )}
                          </div>

                          {/* <hr /> */}
                          <div className="offer">
                            <a

                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/Events/${evt.id}`);
                              }}
                            >
                              Join Now
                            </a>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="no-data">No Event Data Available</div>
                )}
              </div>
              
            </Col>
           
          </Row>

          <div className="event-footer-banner">
            <AppDownloadBanner />
          </div>
        </Container>
      </section>
    </>
  );
}
