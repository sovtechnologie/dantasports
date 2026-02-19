import React, { useEffect, useState, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactSlickSlider from "../components/ReactSlickSlider";
import "../Stylesheets/VenuePageSection.css";
import BookBtn from "../components/BookBtn";
import save from "./../assets/downloadAppLogo/save.svg";
import share from "./../assets/downloadAppLogo/share.svg";
import whaitestart from "./../assets/downloadAppLogo/white-star.svg";
import users from "../assets/downloadAppLogo/team-u1.svg";
import SortBy from "../components/SortBy";
import Filter from "../components/Filter";
import { useRef } from "react";

import SortModal from "../components/SortModal";
import FliterModal from "../components/FliterModal";
import AppDownloadBanner from "../components/AppDownloadBanner";
import { useSelector } from "react-redux";
import { useFetchVenue } from "../../../hooks/VenueList/useFetchVenue";
import { useLikeVenue } from "../../../hooks/favouriteVenue/useLikeVenue";
import { useUnlikeVenue } from "../../../hooks/favouriteVenue/useUnlikeVenue";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchSportList } from "../../../services/withoutLoginApi/SportListApi/endpointApi.js";
import { VenueListShimmer } from "../components/Shimmer/VenueListShimmer";
import latestt from "../assets/latest.jpeg";
import PageSearch from "../components/PageSearch.jsx";
import { useFilterVenue } from "../../../hooks/SortAndFilter/useFilterVenue.js";
import sortIcon from "../../withoutauth/assets/icons/sort.svg";
import filterIcon from "../../withoutauth/assets/icons/filter.svg";
import HeartFilled from "../../withoutauth/assets/VenueCardLogo/heartfilled.png"
import likeIcon from "../assets/icons/like.svg";
import OngoingEvents from "../components/OngoingEvents.jsx";
import { useBanner } from "../../../hooks/useBanner.js";
import { Link } from "react-router-dom";

function VenuePage() {
  // const [showSort, setShowSort] = useState(false);
  // const [filterShow, setFilterShow] = useState(false);

  // const banners = bannerData?.result || [];
const observerRef = useRef(null);

  const { data: bannerData, isLoading: dataLoading, error: dataError } = useBanner(1);
  const banners = bannerData?.result || [];



  const isSameDate = (venueDate, selectedDate) => {
    if (!venueDate || !selectedDate) return false;
    const d1 = new Date(venueDate);
    const d2 = new Date(selectedDate);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };
  const queryClient = useQueryClient();
  const auth = useSelector((state) => state.auth);
  const { lat, lng } = useSelector((state) => state.location);

  const [venueList, setVenueList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
const [visibleCount, setVisibleCount] = useState(9);
const [isFetchingMore, setIsFetchingMore] = useState(false);

  // FILTER STATES
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [lastPayload, setLastPayload] = useState(null);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [canApply, setCanApply] = useState(false); // ✅ Add this line

  const likeVenue = useLikeVenue();
  const unlikeVenue = useUnlikeVenue();

  // Fetch all venues
  const {
    data: AllVenuedata,
    isLoading,
    isError,
    error,
  } = useFetchVenue({
    lat,
    lng,
    userId: auth?.id,
  });

  useEffect(() => {
    if (AllVenuedata?.result) {
      setVenueList(AllVenuedata.result);
      setIsLoadingData(false);
    }
  }, [AllVenuedata]);

  const { data: sportsDataResponse, isLoading: sportsLoading } = useQuery({
    queryKey: ["sportsList"],
    queryFn: fetchSportList,
  });
  const sportsData = sportsDataResponse?.result || [];

  const [sportSearch, setSportSearch] = useState("");
  const filteredSports = useMemo(() => {
    if (!sportSearch) return sportsData;
    return sportsData.filter((sport) =>
      sport.sports_name.toLowerCase().includes(sportSearch.toLowerCase())
    );
  }, [sportsData, sportSearch]);

  // Filter venues hook
  const {
    mutate: filterVenues,
    data: filterData,
    isPending,
    isSuccess,
  } = useFilterVenue();

 
  

const loadMore = () => {
  if (isFetchingMore) return;

  setIsFetchingMore(true);

  setTimeout(() => {
    setVisibleCount((prev) => prev + 9);
    setIsFetchingMore(false);
  }, 500); // small delay for smooth UX
};




  useEffect(() => {
    if (isSuccess && filterData) {
      console.log("✅ Filtered data received:", filterData.result);
      setFilteredVenues(filterData.result || []);
      setIsFiltering(false);
    }
  }, [isSuccess, filterData]);



  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanApply(selectedSports.length > 0);
    }, 100);
    return () => clearTimeout(timeout);
  }, [selectedSports]);


  const handleApplyFilters = () => {
    if (!selectedSports.length) {
      alert("Please select a sport first");
      return;
    }

    const formatDateForMySQL = (date) => {
      if (!date) return null;
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formatTimeForMySQL = (time) => {
      if (!time) return null;
      if (/^\d{2}:\d{2}(:\d{2})?$/.test(time)) return time;
      if (typeof time === "string" && time.includes("AM")) {
        const d = new Date(`1970-01-01 ${time}`);
        return d.toTimeString().slice(0, 8);
      }
      return null;
    };

    const payload = {
      sportsId: selectedSports[0].id,
      ...(selectedAmenities.length && { amenties: selectedAmenities[0] }),
      ...(selectedDate && { date: formatDateForMySQL(selectedDate) }),
      ...(selectedTime && { time: formatTimeForMySQL(selectedTime) }),
      lat,
      lng,
      userId: auth?.id,
    };

    console.log("🎯 APPLY CLICK API PAYLOAD:", payload);
    setIsFiltering(true);
    filterVenues(payload)
  };

  useEffect(() => {
    const sortArray = Array.isArray(sortBy) ? sortBy : sortBy ? [sortBy] : [];

    const allData = AllVenuedata?.result || [];

    const baseVenues = filteredVenues.length > 0 ? filteredVenues : allData;

    let processedVenues = [...baseVenues];

    if (sortArray.includes("favourite")) {
      processedVenues = processedVenues.filter(
        (v) => v.favourite === 1 || v.favourite === true
      );
    }

    if (sortArray.includes("nearby")) {
      processedVenues.sort(
        (a, b) => (a.distance_km || 0) - (b.distance_km || 0)
      );
    }

    if (sortArray.includes("popularity")) {
      processedVenues.sort(
        (a, b) => (b.average_rating || 0) - (a.average_rating || 0)
      );
    }

    if (sortArray.includes("priceLow")) {
      processedVenues.sort((a, b) => (a.pricing || 0) - (b.pricing || 0));
    }

    if (filteredVenues.length > 0) {
      setFilteredVenues(processedVenues);
    } else {
      setVenueList(processedVenues);
    }
  }, [sortBy]);

  const handleLikeClick = (e, venue) => {
    e.preventDefault();   // Link navigation roke
    e.stopPropagation();  // Card click bubble roke
    // toggleFavourite(venue);
    const venueId = venue.id;
    if (!auth || !auth?.id) {
      alert("Please login first to like or unlike a venue.");
      return;
    }

    setVenueList((prevList) =>
      prevList.map((v) =>
        v.id === venueId ? { ...v, favourite: !v.favourite } : v
      )
    );
    setFilteredVenues((prevList) =>
      prevList.map((v) =>
        v.id === venueId ? { ...v, favourite: !v.favourite } : v
      )
    );

    if (!venue.favourite) {
      likeVenue.mutate(
        { venueId, userId: auth?.id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries([
              "venueList",
              auth?.id || null,
            ]);
          },
        }
      );
    } else {
      unlikeVenue.mutate(
        { favouriteVenueId: venue.favourite_venue_id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries([
              "venueList",
              auth?.id || null,
            ]);
          },
        }
      );
    }
  };


  const handleShareBtnClick = async (e, venue) => {
    e.preventDefault();
    e.stopPropagation();
    // handleShareClick(venue);
    const shareUrl = `${window.location.origin}/venue/${venue.id}`;

    const shareData = {
      title: venue.venue_name,
      text: venue.about_venue || "Check out this venue!",
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${venue.venue_name} - ${shareUrl}`
        );
        alert("Venue link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("Unable to share this venue.");
    }
  };

  // const handleShareClick = async (venue) => {
  //   const shareUrl = window.location.href;
  //   const shareData = {
  //     title: venue.venue_name,
  //     text: venue.about_venue,
  //     url: shareUrl,
  //   };

  //   try {
  //     if (navigator.share) {
  //       await navigator.share(shareData);
  //     } else {
  //       await navigator.clipboard.writeText(
  //         `${venue.venue_name} - ${shareUrl}`
  //       );
  //       alert("Venue link copied to clipboard!");
  //     }
  //   } catch (err) {
  //     console.error("Share failed:", err);
  //     alert("Unable to share this venue.");
  //   }
  // };
  const searchTermes = useSelector((state) => state.search.searchTerm);

  const displayedVenues = useMemo(() => {
    const list = filteredVenues.length > 0 ? filteredVenues : venueList;

    if (!searchTermes) return list;

    const lowerText = searchTermes.toLowerCase();

    return list.filter((venue) =>
      venue.venue_name?.toLowerCase().includes(lowerText) ||
      venue.city?.toLowerCase().includes(lowerText) ||
      venue.sports?.some((sport) =>
        sport.name?.toLowerCase().includes(lowerText)
      )
    );
  }, [searchTermes, venueList, filteredVenues]);

  const finalVenues =
  selectedSports.length > 0 ||
  selectedAmenities.length > 0 ||
  selectedDate ||
  selectedTime
    ? filteredVenues
    : displayedVenues;

useEffect(() => {
  if (!observerRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0];

      if (
        target.isIntersecting &&
        visibleCount < finalVenues.length
      ) {
        setIsFetchingMore(true);

        setTimeout(() => {
          setVisibleCount((prev) => prev + 9);
          setIsFetchingMore(false);
        }, 600); // smooth delay
      }
    },
    {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    }
  );

  observer.observe(observerRef.current);

  return () => {
    if (observerRef.current) {
      observer.unobserve(observerRef.current);
    }
  };
}, [visibleCount, finalVenues.length]);



  useEffect(() => {
  setVisibleCount(9);
}, [filteredVenues, displayedVenues]);

if (isLoadingData || isLoading || sportsLoading) {
  return (
    <div className="py-5">
      <VenueListShimmer />
    </div>
  );
}

  if (isError) return <div>Error loading venues: {error?.message}</div>;

  return (
    <>
      <section
        className="venue_page_section pb-lg-5 pb-3"
        style={{ background: "#F1F3F2" }}
      >
        <PageSearch searchValue="venuepage" />
        <Container>
          <Row className="g-3">
            <Col lg="4" xl={3} md="12" className="d-none d-lg-block">
              <Filter
                sportsData={filteredSports}
                selectedSports={selectedSports}
                setSelectedSports={setSelectedSports}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                sportSearch={sportSearch}
                setSportSearch={setSportSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setFilteredVenues={setFilteredVenues}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
                onApply={handleApplyFilters}
              />
              <SortBy sortBy={sortBy} setSortBy={(value) => setSortBy(value)} />
            </Col>

            <Col className="d-lg-none  text-end">
              <div className="modal_wraper d-flex justify-content-end">
                <div>
                  <div
                    class="modal fade"
                    id="exampleModalToggleFilter"
                    aria-hidden="true"
                    aria-labelledby="sortby"
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
                          <Filter
                            sportsData={filteredSports}
                            selectedSports={selectedSports}
                            setSelectedSports={setSelectedSports}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                            sportSearch={sportSearch}
                            setSportSearch={setSportSearch}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            setFilteredVenues={setFilteredVenues}
                            selectedAmenities={selectedAmenities}
                            setSelectedAmenities={setSelectedAmenities}
                            onApply={handleApplyFilters}

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
                  ></div>

                  <button
                    class="btn_mobile"
                    data-bs-toggle="modal"
                    href="#exampleModalToggleFilter"
                    role="button"
                  >
                    <img src={filterIcon} alt="" />
                  </button>
                </div>
                <div>
                  <div
                    class="modal fade"
                    id="exampleModalToggleSort"
                    aria-hidden="true"
                    aria-labelledby="sortby"
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
                          <SortBy sortBy={sortBy} setSortBy={(value) => setSortBy(value)} />
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
                  ></div>

                  <button
                    class="btn_mobile"
                    data-bs-toggle="modal"
                    href="#exampleModalToggleSort"
                    role="button"
                  >
                    <img src={sortIcon} alt="" />
                  </button>
                </div>
              </div>
            </Col>

            <Col lg="8" xl={9} md="12">
              <Col className="col-12 mb-4 onging_title_hid">
                <OngoingEvents banners={banners} />
              </Col>
              <div className="row g-3">
                {isFiltering || isPending ? (
                  "Loding......."
                ) : (
                  <>
                    {selectedSports.length > 0 ||
                      selectedAmenities.length > 0 ||
                      selectedDate ||
                      selectedTime ? (
                      filteredVenues.length > 0 ? (
                       finalVenues
  .slice(0, visibleCount)
  .map((venue) => (
                          <div
                            key={venue.id}
                            className="col-lg-6 col-md-6 col-xl-4 position-relative"
                          >
                            <div className="card d-flex justify-content-between">
                              <div className="card_slider">
                                <ReactSlickSlider
                                  coverImage={venue.cover_image || latestt}
                                />
                              </div>

                              <div className="reating">
                                <div className="start">
                                  <img src={whaitestart} alt="star" />
                                  <span className="ps-2">
                                    {venue.average_rating || "0.0"} (
                                    {venue.review_count || 0})
                                  </span>
                                </div>

                                <div
                                  className="save_btn"
                                  onClick={(e) => handleLikeClick(e, venue)}
                                >
                                  <img
                                    src={venue.favourite ? HeartFilled : likeIcon}
                                    alt="save"
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>

                                <div
                                  className="share_btn"
                                  onClick={(e) => handleShareBtnClick(e, venue)}
                                >
                                  <img
                                    src={share}
                                    alt="share"
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              </div>

                              <div className="inner_txt">
                                <div className="d-flex justify-content-between mb-3 align-items-center">
                                  <h2 className="text_wrap2 card_heading m-0">
                                    {venue.venue_name}
                                  </h2>
                                  <p className="m-0 card_date">
                                    ~
                                    {venue.distance_km
                                      ? venue.distance_km.toFixed(1)
                                      : "0"}{" "}
                                    km
                                  </p>
                                </div>

                                <div className="no_off_users">
                                  <ul className="d-flex p-0 align-items-center">
                                    {venue.sports
                                      ?.slice(0, 5)
                                      .map((sport, index) => (
                                        <li key={index} className="me-2">
                                          <img
                                            src={sport.image || users}
                                            alt={sport.name || "user"}
                                            title={sport.name || "user"}
                                          />
                                        </li>
                                      ))}

                                    {venue.sports &&
                                      venue.sports.length > 5 && (
                                        <li
                                          className="me-2"
                                          style={{
                                            color: "#858585",
                                            lineHeight: 1,
                                          }}
                                        >
                                          +{venue.sports.length - 5} more
                                        </li>
                                      )}
                                  </ul>
                                </div>

                                <div className="offers d-flex justify-content-between">
                                  <span>
                                    {venue.coupon_type === "percentage" &&
                                      venue.discount_offer
                                      ? `Upto ${parseFloat(venue.discount_offer)}% Off`
                                      : venue.coupon_type === "flat" &&
                                        venue.discount_offer
                                        ? `Upto ₹${parseFloat(venue.discount_offer)} Off`
                                        : ""}
                                  </span>

                                  <p className="mb-0">
                                    ₹{parseFloat(venue.pricing || 0).toFixed(0)}{" "}
                                    onwards
                                  </p>
                                </div>
                                {venue.available_courts !== undefined && (
                                  <p
                                    style={{ color: "green", fontWeight: 600 }}
                                    className="mt-2 mt-lg-3 mb-0"
                                  >
                                    Available court ({venue.available_courts})
                                  </p>
                                )}
                                <div className="card_line"></div>
                                <BookBtn venueId={venue.id} />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-5">
                          <h5>No venues found matching your filters</h5>
                        </div>
                      )
                    ) : (
                    displayedVenues
  .filter(
    (venue) =>
      !selectedDate ||
      isSameDate(venue.created_at, selectedDate)
  )
  .slice(0, visibleCount)  
  .map((venue) => (

                          <div
                            key={venue.id}
                            className="col-xl-4 col-lg-6 col-md-6 position-relative"
                          >
                            <Link to={`/venue/${venue.id}`} className="text-decoration-none">
                              <div className="card">
                                <div className="card_slider">
                                  <ReactSlickSlider
                                    coverImage={venue.cover_image || latestt}
                                  />
                                </div>

                                <div className="reating">
                                  <div className="start">
                                    <img src={whaitestart} alt="star" />
                                    <span className="ps-2">
                                      {venue.average_rating || "0.0"} (
                                      {venue.review_count || 0})
                                    </span>
                                  </div>

                                  <div
                                    className="save_btn"
                                    onClick={(e) => handleLikeClick(e, venue)}
                                  >
                                    <img
                                      src={venue.favourite ? HeartFilled : likeIcon}
                                      alt="save"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>

                                  <div
                                    className="share_btn"
                                    onClick={(e) => handleShareBtnClick(e, venue)}
                                  >
                                    <img
                                      src={share}
                                      alt="share"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                </div>

                                <div className="inner_txt">
                                  <div className="d-flex justify-content-between mb-3 align-items-center">
                                    <h2 className="text_wrap2 card_heading m-0">
                                      {venue.venue_name}
                                    </h2>
                                    <p className="m-0 card_date custom_width_km">
                                      ~
                                      {venue.distance_km
                                        ? venue.distance_km.toFixed(1)
                                        : "0"}{" "}
                                      km
                                    </p>
                                  </div>



                                  <div className="offers  d-flex justify-content-between">
                                    <p className="up_to_offer m-0">
                                      {venue.coupon_type === "percentage" &&
                                        venue.discount_offer
                                        ? `Upto ${parseFloat(venue.discount_offer)}% Off`
                                        : venue.coupon_type === "flat" &&
                                          venue.discount_offer
                                          ? `Upto ₹${parseFloat(venue.discount_offer)} Off`
                                          : ""}
                                    </p>

                                    <p className="onwards_rup m-0">
                                      ₹{parseFloat(venue.pricing || 0).toFixed(0)}{" "}
                                      onwards
                                    </p>
                                  </div>
                                  <div className="no_off_users">
                                    <ul className="d-flex p-0 align-items-center m-0">
                                      {venue.sports
                                        ?.slice(0, 5)
                                        .map((sport, index) => (
                                          <li key={index} className="me-2">
                                            <img
                                              src={sport.image || users}
                                              alt={sport.name || "user"}
                                              title={sport.name || "user"}
                                            />
                                          </li>
                                        ))}

                                      {venue.sports &&
                                        venue.sports.length > 5 && (
                                          <li
                                            className="me-2"
                                            style={{
                                              color: "#858585",
                                              lineHeight: 1,
                                            }}
                                          >
                                            +{venue.sports.length - 5} more
                                          </li>
                                        )}
                                    </ul>
                                  </div>

                                  {/* <div className="card_line"></div> */}
                                  {/* <BookBtn venueId={venue.id} /> */}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
<div ref={observerRef}></div>

{isFetchingMore && (
  <div className="text-center my-4">
    <div className="spinner-border text-success" role="status"></div>
    <p className="mt-2">Loading more venues...</p>
  </div>
)}
          <AppDownloadBanner />
        </Container >
      </section >
    </>
  );
}

export default VenuePage;
