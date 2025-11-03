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

function VenuePage() {
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

  // FILTER STATES
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [filteredVenues, setFilteredVenues] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [sortBy, setSortBy] = useState("");

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
  const { mutate: filterVenues, data: filterData, isPending, isSuccess } = useFilterVenue();

  useEffect(() => {
    if (isSuccess && filterData) {
      setFilteredVenues(filterData.result || []);
      setIsFiltering(false);
    }
  }, [isSuccess, filterData]);
  useEffect(() => {

    if (
      !selectedSports.length &&
      !selectedDate &&
      !selectedTime &&
      !selectedAmenities.length
    ) return;


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
      ...(selectedSports.length && { sportsId: selectedSports.map((s) => s.id) }),
      ...(selectedAmenities.length && { amenties: selectedAmenities }),
      ...(selectedDate && { date: formatDateForMySQL(selectedDate) }),
      ...(selectedTime && { time: formatTimeForMySQL(selectedTime) }),
      lat,
      lng,
      userId: auth?.id,
    };

    console.log("📤 Filter API payload:", payload);
    filterVenues(payload);
  }, [selectedSports, selectedDate, selectedTime, selectedAmenities]);


  useEffect(() => {
    const sortArray = Array.isArray(sortBy)
      ? sortBy
      : sortBy
        ? [sortBy]
        : [];

    const allData = AllVenuedata?.result || [];

    const baseVenues = filteredVenues.length > 0 ? filteredVenues : allData;

    let processedVenues = [...baseVenues];

    if (sortArray.includes("favourite")) {
      processedVenues = processedVenues.filter(
        (v) => v.favourite === 1 || v.favourite === true
      );
    }


    if (sortArray.includes("nearby")) {
      processedVenues.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
    }


    if (sortArray.includes("popularity")) {
      processedVenues.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
    }


    if (sortArray.includes("priceLow")) {
      processedVenues.sort((a, b) => (a.pricing || 0) - (b.pricing || 0));
    }

    if (filteredVenues.length > 0) {
      setFilteredVenues(processedVenues);
    } else {
      setVenueList(processedVenues);
    }
  }, [sortBy, AllVenuedata, filteredVenues]);





  const toggleFavourite = (venue) => {
    const venueId = venue.id;
    if (!auth || !auth?.id) {
      alert("Please login first to like or unlike a venue.");
      return;
    }

    setVenueList((prevList) =>
      prevList.map((v) => (v.id === venueId ? { ...v, favourite: !v.favourite } : v))
    );
    setFilteredVenues((prevList) =>
      prevList.map((v) => (v.id === venueId ? { ...v, favourite: !v.favourite } : v))
    );

    if (!venue.favourite) {
      likeVenue.mutate(
        { venueId, userId: auth?.id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(["venueList", auth?.id || null]);
          },
        }
      );
    } else {
      unlikeVenue.mutate(
        { favouriteVenueId: venue.favourite_venue_id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(["venueList", auth?.id || null]);
          },
        }
      );
    }
  };

  const handleShareClick = async (venue) => {
    const shareUrl = window.location.href;
    const shareData = {
      title: venue.venue_name,
      text: venue.about_venue,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${venue.venue_name} - ${shareUrl}`);
        alert("Venue link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("Unable to share this venue.");
    }
  };

  if (isLoadingData || isLoading || sportsLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading venues: {error?.message}</div>;

  return (
    <>
      <section className="venue_page_section" style={{ background: "#F1F3F2" }}>
        <PageSearch />
        <Container>
          <Row className="g-3">
            {/* Left Filter */}
            <Col lg="3" md="5" className="d-none d-lg-block d-md-block">
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

              />
              <SortBy
                sortBy={sortBy}
                setSortBy={(value) => setSortBy(value)}
              />

            </Col>

            {/* Mobile Sort/Filter */}
            <Col className="d-lg-none d-md-none text-end">
              {/* <SortModal /> */}
            </Col>


            <Col lg="9" md="7">
              <div className="row g-3">
                {isFiltering || isPending ? (
                  "Loding......."
                ) : (
                  <>

                    {selectedSports.length > 0 || selectedAmenities.length > 0 || selectedDate || selectedTime ? (
                      filteredVenues.length > 0 ? (
                        filteredVenues.map((venue) => (
                          <div key={venue.id} className="col-lg-4 position-relative">
                            <div className="card">
                              <div className="card_slider">
                                <ReactSlickSlider coverImage={venue.cover_image || latestt} />
                              </div>

                              <div className="reating">
                                <div className="start">
                                  <img src={whaitestart} alt="star" />
                                  <span className="ps-2">
                                    {venue.average_rating || "0.0"} ({venue.review_count || 0})
                                  </span>
                                </div>

                                <div className="save_btn" onClick={() => toggleFavourite(venue)}>
                                  <img
                                    src={save}
                                    alt="save"
                                    style={{
                                      filter: venue.favourite
                                        ? "invert(40%) sepia(100%) saturate(5000%) hue-rotate(340deg)"
                                        : "none",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>

                                <div className="share_btn" onClick={() => handleShareClick(venue)}>
                                  <img src={share} alt="share" style={{ cursor: "pointer" }} />
                                </div>
                              </div>

                              <div className="inner_txt">
                                <div className="d-flex justify-content-between mb-3 align-items-center">
                                  <h2 className="m-0 text_wrap pe-2">{venue.venue_name}</h2>
                                  <p className="m-0">
                                    ~{venue.distance_km ? venue.distance_km.toFixed(1) : "0"} km
                                  </p>
                                </div>

                                <div className="no_off_users">
                                  <ul className="d-flex p-0 align-items-center">
                                    {venue.sports?.slice(0, 5).map((sport, index) => (
                                      <li key={index} className="me-2">
                                        <img
                                          src={sport.image || users}
                                          alt={sport.name || "user"}
                                          title={sport.name || "user"}
                                        />
                                      </li>
                                    ))}

                                    {venue.sports && venue.sports.length > 5 && (
                                      <li
                                        className="me-2"
                                        style={{ color: "#858585", lineHeight: 1 }}
                                      >
                                        +{venue.sports.length - 5} more
                                      </li>
                                    )}
                                  </ul>
                                </div>

                                <div className="offers d-flex justify-content-between">
                                  <span>
                                    {venue.coupon_type === "percentage" && venue.discount_offer
                                      ? `Upto ${parseFloat(venue.discount_offer)}% Off`
                                      : venue.coupon_type === "flat" && venue.discount_offer
                                        ? `Upto ₹${parseFloat(venue.discount_offer)} Off`
                                        : ""}
                                  </span>

                                  <p className="mb-0">
                                    ₹
                                    {parseFloat(venue.pricing || 0).toFixed(0)} onwards
                                  </p>
                                </div>
                                {venue.available_courts !== undefined && (
                                  <p style={{ color: "green", fontWeight: 600 }}>
                                    Available court ({venue.available_courts})
                                  </p>
                                )}
                                <hr className="mb-3" />
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

                      venueList
                        .filter((venue) => !selectedDate || isSameDate(venue.created_at, selectedDate))
                        .map((venue) => (
                          <div key={venue.id} className="col-lg-4 position-relative">
                            <div className="card">
                              <div className="card_slider">
                                <ReactSlickSlider coverImage={venue.cover_image || latestt} />
                              </div>

                              <div className="reating">
                                <div className="start">
                                  <img src={whaitestart} alt="star" />
                                  <span className="ps-2">
                                    {venue.average_rating || "0.0"} ({venue.review_count || 0})
                                  </span>
                                </div>

                                <div className="save_btn" onClick={() => toggleFavourite(venue)}>
                                  <img
                                    src={save}
                                    alt="save"
                                    style={{
                                      filter: venue.favourite
                                        ? "invert(40%) sepia(100%) saturate(5000%) hue-rotate(340deg)"
                                        : "none",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>

                                <div className="share_btn" onClick={() => handleShareClick(venue)}>
                                  <img src={share} alt="share" style={{ cursor: "pointer" }} />
                                </div>
                              </div>

                              <div className="inner_txt">
                                <div className="d-flex justify-content-between mb-3 align-items-center">
                                  <h2 className="m-0 text_wrap pe-2">{venue.venue_name}</h2>
                                  <p className="m-0">
                                    ~{venue.distance_km ? venue.distance_km.toFixed(1) : "0"} km
                                  </p>
                                </div>

                                <div className="no_off_users">
                                  <ul className="d-flex p-0 align-items-center">
                                    {venue.sports?.slice(0, 5).map((sport, index) => (
                                      <li key={index} className="me-2">
                                        <img
                                          src={sport.image || users}
                                          alt={sport.name || "user"}
                                          title={sport.name || "user"}
                                        />
                                      </li>
                                    ))}

                                    {venue.sports && venue.sports.length > 5 && (
                                      <li className="me-2" style={{ color: "#858585", lineHeight: 1 }}>
                                        +{venue.sports.length - 5} more
                                      </li>
                                    )}
                                  </ul>
                                </div>

                                <div className="offers d-flex justify-content-between">
                                  <span>
                                    {venue.coupon_type === "percentage" && venue.discount_offer
                                      ? `Upto ${parseFloat(venue.discount_offer)}% Off`
                                      : venue.coupon_type === "flat" && venue.discount_offer
                                        ? `Upto ₹${parseFloat(venue.discount_offer)} Off`
                                        : ""}
                                  </span>

                                  <p className="mb-0">
                                    ₹{parseFloat(venue.pricing || 0).toFixed(0)} onwards
                                  </p>
                                </div>

                                <hr className="mb-3" />
                                <BookBtn venueId={venue.id} />
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>

          <AppDownloadBanner />
        </Container>
      </section>
    </>
  );
}

export default VenuePage;
