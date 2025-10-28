import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchVenue } from "../hooks/VenueList/useFetchVenue";
import { CardShimmer } from "../features/withoutauth/components/Shimmer/CardShimmer.jsx";

import "./StyleSheets/BookVenues.css";
import star from "../assets/images/home/bookvenues/star.svg";
import likeIcon from "../assets/images/home/bookvenues/like.svg";
import shareIcon from "../assets/images/home/bookvenues/share.svg";
import { useLikeVenue } from "../hooks/favouriteVenue/useLikeVenue.js";
import { useUnlikeVenue } from "../hooks/favouriteVenue/useUnlikeVenue.js";
import latestt from '../assets/quickbooking/latest.jpeg'

export default function BookVenues() {
  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);

  const [venueList, setVenueList] = useState([]);

  const payload = { lat, lng, userId: userId || null };
  const { data, isLoading, isError, error } = useFetchVenue(payload);
  const auth = useSelector((state) => state.auth);
  const likeVenue = useLikeVenue();
  const unlikeVenue = useUnlikeVenue();

  // ✅ Fetch venue data
  useEffect(() => {
    if (data?.status === 200) {
      setVenueList(data.result);
    }
  }, [data]);

  const toggleFavourite = (venue) => {
    const venueId = venue.id;
    console.log("toggle");

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


  const handleShare = (venue) => {
    const url = `${window.location.origin}/venue/${venue.id}`;
    if (navigator.share) {
      navigator.share({
        title: venue.venue_name,
        text: "Check out this venue!",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Venue link copied to clipboard!");
    }
  };

  if (isLoading) return <CardShimmer />;
  if (isError) return <p>Error loading venues: {error.message}</p>;

  return (
    <section className="book_venue_section">
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-lg-3">
          <div className="section_title">
            <h2>Book Venues</h2>
          </div>
          <div className="see_all">
            <Link to="/venue">See All</Link>
          </div>
        </div>

        <Row className="g-3">
          {venueList.slice(0, 4).map((venue) => (
            <Col lg={3} md={6} sm={6} key={venue.id}>
              <Card>
                <div className="card_img">
                  <img
                    src={venue.cover_image || latestt}
                    className="venue_img"
                    alt={venue.venue_name}
                  />
                </div>


                <div className="card_icons">
                  <img
                    className="like"
                    src={likeIcon}
                    alt="like"
                    onClick={() => toggleFavourite(venue)}
                    style={{
                      filter: venue.favourite
                        ? "invert(40%) sepia(100%) saturate(5000%) hue-rotate(340deg)"
                        : "none",
                      cursor: "pointer",
                    }}
                  />
                  <img
                    className="share"
                    src={shareIcon}
                    alt="share"
                    onClick={() => handleShare(venue)}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div className="txt_wrapper">
                  <div className="card_txt d-flex justify-content-between mb-3 align-items-center">
                    <h2 className="text_wrap card_heading m-0">{venue.venue_name}</h2>
                    <p className="m-0">
                      {/* <span className="star pe-2">
                        <img src={star} alt="rating" />
                      </span> */}
                      {/* <strong className="pe-2 fw-light">
                        {venue.average_rating || "0.0"} (
                        {venue.review_count || 0})
                      </strong> */}
                      ~
                      {venue.distance_km
                        ? `${venue.distance_km.toFixed(1)} km`
                        : "0.0"}
                    </p>
                    <div className="rating">
                      <span><img src={star} className="pe-2" alt="" /> {venue.average_rating || "0.0"}</span>
                    </div>
                  </div>

                  <div className="no_off_users mt-2">
                    <ul className="d-flex p-0  m-0">
                      {venue.sports?.slice(0, 5).map((sport, index) => (
                        <li key={index} className="me-2 list-unstyled">
                          <img
                            src={sport.image || latestt}
                            alt={sport.name || "sport"}
                            title={sport.name || "sport"}

                          />
                        </li>
                      ))}

                      {venue.sports && venue.sports.length > 5 && (
                        <li
                          className="list-unstyled"
                          style={{
                            color: "#858585",
                            fontSize: "14px",
                            lineHeight: 1,
                          }}
                        >
                          +{venue.sports.length - 5} more
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="d-flex justify-content-between no_off_users  mt-3">
                    <p className="up_to_offer">
                      {venue.coupon_type === "percentage" && venue.discount_offer
                        ? `Upto ${parseFloat(venue.discount_offer)}% Off`
                        : venue.coupon_type === "flat" && venue.discount_offer
                          ? `Upto ₹${parseFloat(venue.discount_offer)} Off`
                          : ""}
                    </p>

                    <p className="onwards_rup mb-2">
                      {venue.pricing
                        ? `₹${parseFloat(venue.pricing).toFixed(0)} onwards`
                        : ""}
                    </p>
                  </div>
                  <div className="card_line mb-2"></div>


                  <div className="offer d-flex justify-content-between align-items-center">


                    <Link to={`/venue/${venue.id}`}>Book Now</Link>
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
