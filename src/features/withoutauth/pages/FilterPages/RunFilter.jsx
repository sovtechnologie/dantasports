import React, { useEffect, useState, useMemo } from "react";
import { useRef } from "react";
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
import HeartFilled from "../../assets/VenueCardLogo/heartfilled.png"
import shareIcon from "../../assets/icons/share.svg";
import star from "../../assets/icons/star-white.svg";
import bookrunn from "../../assets/bookrun/bookrun.png";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchEvent } from "../../../../hooks/EventList/useFetchEvents.js";
import { useSelector } from "react-redux";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useUnlikeEvent } from "../../../../hooks/favouriteEvent/useUnLikeEvent.js";
import { useLikeEvent } from "../../../../hooks/favouriteEvent/useLikeEvent.js";
import eventImage from "../../../withoutauth/assets/events/events1.png";
import PageSearch from "../../components/PageSearch.jsx";
import sortIcon from "../../assets/icons/sort.svg"
import CustomDatePicker from "../../components/CustomDatePicker.jsx";
import Difficulty from "../../components/Difficulty.jsx";
import Amenities from "../../components/Amenities.jsx";
import DistanceSlider from "../../components/DistanceSlider.jsx";
import PriceSlider from "../../components/PriceSlider.jsx";
import Kids from "../../components/Kids.jsx";
import fliterIcon from "../../assets/icons/filter.svg"
import OngoingEvents from "../../components/OngoingEvents.jsx";
import { useBanner } from "../../../../hooks/useBanner.js";
import { Link } from "react-router-dom";

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
  const { data: bannerData, isLoading: bannerLoading, error: bannerError } = useBanner(1);
  const banners = bannerData?.result || [];

  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filteredRuns, setFilteredRuns] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  console.log("selectedAmenities", selectedAmenities);
  const auth = useSelector((state) => state.auth);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [runList, setRunList] = useState([]);
  const [search, setSearch] = useState("");
  const [kidsFriendly, setKidsFriendly] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
const [isFetchingMore, setIsFetchingMore] = useState(false);
const observerRef = useRef(null);

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
    setSelectedDifficulty(null);
    setSelectedPrice(0);
    setSelectedTime(null);
    setSelectedAmenities([]);
    setKidsFriendly(false);
    setPetFriendly(false);

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

    const pageSearchTerm = useSelector((state) => state.search.searchTerm);
  

  const likeEvent = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();

  const toggleFavourite = (e, event) => {
    e.preventDefault();
    e.stopPropagation();
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

  useEffect(() => {
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > 300) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
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

    if (selectedDifficulty !== null) {
      result = result.filter((evt) => evt.difficulty === selectedDifficulty);
    }
    console.log("selectedDifficulty", selectedDifficulty);

    if (selectedPrice > 0) {
      result = result.filter(
        (evt) => Number(evt.lowest_ticket_price) <= selectedPrice
      );
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

    if (kidsFriendly) {
      result = result.filter(evt =>
        String(evt.kids_friendly).trim().toLowerCase() === "yes"
      );
    }

    if (petFriendly) {
      result = result.filter(evt =>
        String(evt.pet_friendly).trim().toLowerCase() === "yes"
      );
    }

    // if (kidsFriendly) {
    //   result = result.filter(evt => evt.kids_friendly === "Yes");
    // }

    // if (petFriendly) {
    //   result = result.filter(evt => evt.pet_friendly === "Yes");
    // }




    if (filters.sortBy?.length > 0) {

      if (filters.sortBy.includes("favourite")) {
        result = result.filter(
          (evt) => evt.favourite === 1 || evt.favourite === true
        );
      }

      // Then apply other sorting types in priority order
      if (filters.sortBy.includes("nearby")) {
        result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }

      if (filters.sortBy.includes("popularity")) {
        result.sort(
          (a, b) => (b.average_rating || 0) - (a.average_rating || 0)
        );
      }

      if (filters.sortBy.includes("priceLow")) {
        result.sort(
          (a, b) =>
            parseFloat(a.lowest_ticket_price || 0) -
            parseFloat(b.lowest_ticket_price || 0)
        );
      }
    }

     if (pageSearchTerm) {
      const lower = pageSearchTerm.toLowerCase();

      result = result.filter((evt) =>
        evt.event_title?.toLowerCase().includes(lower) ||
        evt.locations?.[0]?.city?.toLowerCase().includes(lower) ||
        evt.locations?.[0]?.area?.toLowerCase().includes(lower) ||
        evt.sports?.some((s) =>
          s.name?.toLowerCase().includes(lower)
        )
      );
    }

    return result;
  }, [
    runList,
    search,
    filters,
    selectedSports,
    selectedDate,
    selectedAmenities,
    selectedTime,
    selectedDifficulty,
    selectedPrice,
    kidsFriendly,
    petFriendly,
    pageSearchTerm
  ]);

  useEffect(() => {
  setVisibleCount(9);
}, [
  search,
  filters,
  selectedSports,
  selectedDate,
  selectedAmenities,
  selectedDifficulty,
  selectedPrice,
  kidsFriendly,
  petFriendly,
  pageSearchTerm
]);

useEffect(() => {
  if (!observerRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        if (visibleCount < filteredEvents.length) {
          setIsFetchingMore(true);

          setTimeout(() => {
            setVisibleCount((prev) => prev + 9);
            setIsFetchingMore(false);
          }, 500);
        }
      }
    },
    { threshold: 1 }
  );

  observer.observe(observerRef.current);

  return () => {
    observer.disconnect();
  };
}, [visibleCount, filteredEvents.length]);


  useEffect(() => {
    if (AllRundata?.status === 200) {
      setRunList(AllRundata.result);
      setFilteredRuns(AllRundata.result); // ✅ initialize
    }
  }, [AllRundata]);

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading events: {error.message}</div>;

  // ✅ Handle Share
  const handleShare = (e, event) => {

    e.preventDefault();
    e.stopPropagation();
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
        <PageSearch searchValue="RunPage" />
        <Container>
          <Row>
            <Col lg={4} md={12} xl={3} className="d-none d-lg-block">
              <SortBy
                sortBy={filters.sortBy}
                setSortBy={(value) =>
                  setFilters((prev) => ({ ...prev, sortBy: value }))
                }
              />
              <div className="mt-3">
                <div className="filter_container">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h3 class="m-0">Filter</h3>
                    <a
                      className="reset"
                      type="button"
                      onClick={handleResetFilters}
                    >
                      Reset
                    </a>

                  </div>
                  <CustomDatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                  <Difficulty
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty}
                  />
                  <PriceSlider
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                  />

                  <Amenities
                    setSelectedAmenities={setSelectedAmenities}
                    selectedAmenities={selectedAmenities}
                  />
                  <Kids
                    kidsFriendly={kidsFriendly}
                    setKidsFriendly={setKidsFriendly}
                    petFriendly={petFriendly}
                    setPetFriendly={setPetFriendly}
                  />

                </div>
              </div>
            </Col>

            <Col className="d-lg-none  text-end mb-4">

              <div className="d-flex modal_wraper_mobile text-end justify-content-end ">
                <div
                  class="modal fade"
                  id="exampleModalToggle11"
                  aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel"
                  tabindex="-1"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">

                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div className="filter_container">
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <h3 class="m-0">Filter</h3>
                            <a
                              className="reset"
                              type="button"
                              onClick={handleResetFilters}
                            >
                              Reset
                            </a>

                          </div>
                          <CustomDatePicker
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                          />
                          <Difficulty
                            selectedDifficulty={selectedDifficulty}
                            setSelectedDifficulty={setSelectedDifficulty}
                          />
                          <PriceSlider
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                          />

                          <Amenities
                            setSelectedAmenities={setSelectedAmenities}
                            selectedAmenities={selectedAmenities}
                          />
                          <Kids
                            kidsFriendly={kidsFriendly}
                            setKidsFriendly={setKidsFriendly}
                            petFriendly={petFriendly}
                            setPetFriendly={setPetFriendly}
                          />

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div
                  class="modal fade"
                  id="exampleModalToggle2"
                  aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel2"
                  tabindex="-1"
                >

                </div>

                <button class="btn_mobile"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle11"
                  role="button">
                  <img src={fliterIcon} alt="" />
                </button >
                <div
                  class="modal fade"
                  id="exampleModalToggle"
                  aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel"
                  tabindex="-1"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">

                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <SortBy
                          sortBy={filters.sortBy}
                          setSortBy={(value) =>
                            setFilters((prev) => ({ ...prev, sortBy: value }))
                          }
                        />
                      </div>

                    </div>
                  </div>
                </div>
                <div
                  class="modal fade"
                  id="exampleModalToggle2"
                  aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel2"
                  tabindex="-1"
                >

                </div>

                <button class="btn_mobile"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button">
                  <img src={sortIcon} alt="" />
                </button >
              </div>



            </Col>

            <Col lg={8} xl={9} md={12}>
              <div className="col-12 mb-4 onging_title_hid">
                <OngoingEvents banners={banners} />
              </div>
              <div className="row g-3">
                {filteredEvents.length > 0 ? (
                filteredEvents.slice(0, visibleCount).map((event) => (

                    <div key={event.id} className="col-xl-4 col-lg-6 col-md-6">
                      <Link
                        to={`/run/${event.id}`}
                        className="text-decoration-none text-reset d-block"
                      >
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
                              src={event.favourite ? HeartFilled : likeIcon}
                              alt="like"
                              onClick={(e) => {
                                toggleFavourite(e, event);
                              }}
                              style={{ cursor: "pointer" }}
                            />

                            <img
                              className="share"
                              src={shareIcon}
                              alt="share"
                              onClick={(e) => {
                                handleShare(e, event);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </div>

                          <div className="txt_wrapper">
                            <div className="card_txt">
                              <h2 className="text_wrap card_heading mb-3">
                                {event.event_title}
                              </h2>

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

                            <div className="d-flex justify-content-between">
                              <p className="up_to_offer m-0">
                                {event.coupon_type === "percentage" && event.discount_offer
                                  ? `Upto ${parseFloat(event.discount_offer)}% Off`
                                  : event.coupon_type === "flat" && event.discount_offer
                                    ? `Upto ₹${parseFloat(event.discount_offer)} Off`
                                    : ""}
                              </p>

                              <p className="onwards_rup m-0">
                                ₹ {parseFloat(event.lowest_ticket_price) || 0} onwards
                              </p>
                            </div>

                            {/* <div className="card_line"></div> */}
                          </div>

                          <div className="rating">
                            <span>
                              <img src={star} className="pe-2" alt="" />
                              {event.average_rating || 0} ({event.review_count || 0})
                            </span>
                          </div>

                          <div className="easy_run">
                            {event.difficulty === 0 ? (
                              <span className="Moderate">Moderate</span>
                            ) : event.difficulty === 1 ? (
                              <span className="easy">Easy</span>
                            ) : event.difficulty === 2 ? (
                              <span className="difficult">Difficult</span>
                            ) : (
                              <span className="unknown">Not Specified</span>
                            )}
                          </div>
                        </div>
                      </Link>

                    </div>
                  ))
                ) : (
                  <div className="text-center">No Events Found</div>
                )}

                {/* Infinite Scroll Loader */}
{visibleCount < filteredEvents.length && (
  <>
    <div ref={observerRef}></div>

    {!isFetchingMore && (
      <div className="text-center my-4">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-2">Loading more events...</p>
      </div>
    )}
  </>
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
        {showTopBtn && (
  <button
    onClick={scrollToTop}
    className="scrollTopBtn"
  >
    ↑
  </button>
)}
      </section>
    </>
  );
}
