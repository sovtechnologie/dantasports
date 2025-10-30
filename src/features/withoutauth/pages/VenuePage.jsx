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
import HeartFilled from "../../auth/assets/VenueCardLogo/heartfilled.png";
import like from "../../../assets/images/home/bookvenues/like.svg";

import latestt from "../assets/latest.jpeg";
import PageSearch from "../components/PageSearch.jsx";

function VenuePage() {
  const queryClient = useQueryClient();
  const auth = useSelector((state) => state.auth);
  const { lat, lng } = useSelector((state) => state.location);

  const [venueList, setVenueList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // Filter states
  const [sportSearch, setSportSearch] = useState(""); // text input for searching sports
  const [selectedSport, setSelectedSport] = useState(null); // selected sport id

  const likeVenue = useLikeVenue();
  const unlikeVenue = useUnlikeVenue();

  // Fetch Venues
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

  // Fetch sports
  const { data: sportsDataResponse, isLoading: sportsLoading } = useQuery({
    queryKey: ["sportsList"],
    queryFn: fetchSportList,
  });

  const sportsData = sportsDataResponse?.result || [];

  // Filter sports in search input
  const filteredSports = useMemo(() => {
    if (!sportSearch) return sportsData;
    return sportsData.filter((sport) =>
      sport.sports_name.toLowerCase().includes(sportSearch.toLowerCase())
    );
  }, [sportsData, sportSearch]);

  // Filter venues by selected sport
  const filteredVenues = useMemo(() => {
    let filtered = venueList;

    // ✅ Sport filter
    if (selectedSport) {
      filtered = filtered.filter((venue) =>
        venue.sports.some((sport) => sport.id === selectedSport)
      );
    }

    // ✅ Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((venue) =>
        venue.venue_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [venueList, selectedSport, searchTerm]);

  // Toggle Favourite
  const toggleFavourite = (venue) => {
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
          onError: () => {
            setVenueList((prevList) =>
              prevList.map((v) =>
                v.id === venueId ? { ...v, favourite: false } : v
              )
            );
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
          onError: () => {
            setVenueList((prevList) =>
              prevList.map((v) =>
                v.id === venueId ? { ...v, favourite: true } : v
              )
            );
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

  if (isLoadingData || isLoading || sportsLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading venues: {error?.message}</div>;

  return (
    <>
   
    <section
      className="venue_page_section pb-lg-4 pb-3"
      style={{ background: "#F1F3F2" }}
    >
       <PageSearch/>
      <Container>
        <Row className="g-3">
          {/* Left Filter Section */}
          <Col lg="3" md="5" className="d-none d-lg-block d-md-block">
            <Filter
              sportsData={filteredSports}
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              sportSearch={sportSearch}
              setSportSearch={setSportSearch}

            />
            <SortBy />
          </Col>

          {/* Mobile Filter/Sort */}
          <Col className="d-lg-none d-md-none text-end">
            {/* <FliterModal
              sportsData={filteredSports}
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              sportSearch={sportSearch}
              setSportSearch={setSportSearch}
            /> */}
            <SortModal />
          </Col>

          {/* Venue Cards */}
          <Col lg="9" md="7">
            <div className="row g-3">
              {filteredVenues.map((venue) => {
                const discount = venue.discount_offer
                  ? parseFloat(venue.discount_offer).toString()
                  : "0";

                return (
                  <div
                    key={venue.id}
                    className="col-lg-4  position-relative"
                  >
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
                          onClick={() => toggleFavourite(venue)}
                        >
                          <img
                            src={save}
                            alt="save"
                            style={{
                              filter: venue.favourite
                                ? "invert(40%) sepia(100%) saturate(5000%) hue-rotate(340deg"
                                : "none",
                              cursor: "pointer",
                            }}
                          />
                        </div>

                        <div
                          className="share_btn"
                          onClick={() => handleShareClick(venue)}
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
                          <h2 className="m-0 text_wrap pe-2">
                            {venue.venue_name}
                          </h2>
                          <p className="m-0">
                            ~
                            {venue.distance_km
                              ? venue.distance_km.toFixed(1)
                              : "0"}{" "}
                            km
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
                            {venue.coupon_type === "percentage" &&
                              venue.discount_offer
                              ? `Upto ${parseFloat(venue.discount_offer)}% Off`
                              : venue.coupon_type === "flat" &&
                                venue.discount_offer
                                ? `Upto ₹${parseFloat(venue.discount_offer)} Off`
                                : ""}
                          </span>

                          <p className="mb-0">
                            ₹{parseFloat(venue.pricing).toFixed(0) || 0} onwards
                          </p>
                        </div>

                        <hr className="mb-3" />
                        <BookBtn venueId={venue.id} />
                      </div>
                    </div>
                  </div>
                );
              })}
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
