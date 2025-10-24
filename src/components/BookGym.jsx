import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchGym } from "../hooks/GymList/useFetchGym.js";

import "./StyleSheets/BookRun.css";

import star from "../assets/images/home/bookvenues/star.svg";
import like from "../assets/images/home/bookvenues/like.svg";
import share from "../assets/images/home/bookvenues/share.svg";
import date from "../assets/images/home/bookrun/date.svg";
import map from "../assets/images/home/bookrun/map.svg";
import fallbackImage from "../assets/images/home/bookgym/bookgym.png";

function BookGym() {
  const { lat, lng } = useSelector((state) => state.location);
  const userId = useSelector((state) => state.auth.id);

  const [coords, setCoords] = useState({ lat, lng, userId });

  useEffect(() => {
    setCoords((prev) => {
      if (prev.lat !== lat || prev.lng !== lng) {
        return { ...prev, lat, lng };
      }
      return prev;
    });
  }, [lat, lng]);

  const { data, isLoading, error } = useFetchGym(coords);
  const gyms = data?.result || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading gyms: {error.message}</p>;

  return (
    <section className="book_venue_section">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="section_title">
            <h2>Book Gym</h2>
          </div>
          <div className="see_all">
            <Link to="/gym">See All</Link>
          </div>
        </div>

        <Row className="g-3">
          {gyms.slice(0, 4).map((gym) => {
            const minPriceObj =
              gym.gym_price_slot &&
              gym.gym_price_slot.reduce((min, curr) =>
                curr.price < min.price ? curr : min
              );

            return (
              <Col lg={3} md={6} sm={6} key={gym.id}>
                <Card>
                  <div className="card_img">
                    <img
                      src={
                        gym.desktop_image || gym.mobile_image || fallbackImage
                      }
                      className="w-100"
                      alt={gym.gym_name}
                    />
                  </div>

                  <div className="card_icons">
                    <a href="#">
                      <img className="like" src={like} alt="like" />
                    </a>
                    <a href="#">
                      <img className="share" src={share} alt="share" />
                    </a>
                  </div>

                  <div className="txt_wrapper">
                    <div className="card_txt">
                      <h2 className="text_wrap card_heading">{gym.gym_name}</h2>

                      <p className="sports_title_km">
                        <span>
                          {/* <img className="pe-2" src={map} alt="map" /> */}
                        </span>
                        {/* {gym.full_address || "Location not available"} */}
                        Magarpatta City (~O.7 Km)
                      </p>

                      {/* <p>
                        <span className="star pe-2">
                          <img src={star} alt="rating" />
                        </span>
                        <strong className="pe-2">
                          {gym.average_rating || "0.0"} ({gym.review_count || 0}
                          )
                        </strong>
                        ~ {Math.floor(gym.distance) || 0} km
                      </p> */}
                    </div>

                    {/* <div className="sports_title">
                      <p
                        className="text-ellipsis"
                        title={
                          Array.isArray(gym.amenities)
                            ? gym.amenities.map((a) => a.name).join(", ")
                            : "Amenities not available"
                        }
                      >
                        {Array.isArray(gym.amenities) && gym.amenities.length > 0 ? (
                          <>
                            {gym.amenities
                              .slice(0, 5)
                              .map((a) => a.name)
                              .join(", ")}
                            {gym.amenities.length > 5 && (
                              <span className="more-amenities">
                                {" "}+{gym.amenities.length - 5}
                              </span>
                            )}
                          </>
                        ) : (
                          "Amenities not available"
                        )}
                      </p>
                    </div> */}



                    <div className="d-flex justify-content-between">
                      <p className="mb-0 upto_text">
                        {gym.coupon_type === "percentage" && gym.discount_offer
                          ? `Upto ${parseFloat(gym.discount_offer)}% Off`
                          : gym.coupon_type === "flat" && gym.discount_offer
                            ? `Upto ₹${parseFloat(gym.discount_offer)} Off`
                            : ""}
                      </p>
                      {minPriceObj && (
                        <div className="price_info">
                          <p style={{ fontWeight: 500, marginTop: "5px" }} className="mb-0">
                            ₹{minPriceObj.price} onwards
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="card_line"></div>
                    <div className="offer d-flex justify-content-between align-items-center w-100">

                      <Link to={`/Gym/${gym.Id}`}>Join Now</Link>
                    </div>
                    <div className="rating">
                      <span><img src={star} className="pe-2" alt="" />4.4</span>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default BookGym;
