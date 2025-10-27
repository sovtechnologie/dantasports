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
export default function EventFilterPage() {
  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);
  const navigate = useNavigate();

  const [eventList, setEventList] = useState([]);

  const payload = { lat, lng, userId: userId || null, type: 1 };
  const {
    data: AllEventdata,
    isLoading,
    isError,
    error,
  } = useFetchEvent(payload);

  const likeEvent = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();

  const toggleFavourite = async (event) => {
    const eventId = event.id;
    const type = event?.type;
    const wasFavourite = event.favourite;

    // ✅ Update UI instantly
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

  useEffect(() => {
    if (AllEventdata?.status === 200) setEventList(AllEventdata.result);
  }, [AllEventdata]);

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading events: {error?.message}</div>;

  return (
    <>
      <section
        className="pt-3 pt-lg-5 pb-lg-5 pb-3"
        style={{ background: "#F1F3F2" }}
      >
        <Container>
          <Row>
            <Col lg={3} md={4} className="d-none d-lg-block d-md-block">
              <SortBy />
              <EventFilter />
            </Col>

            <Col className="d-lg-none d-md-none mb-3 text-end">
              <SortModal />
              <EventPageModal />
            </Col>

            <Col lg={9} md={8}>
              <div className="row g-3">
                {eventList.length > 0 ? (
                  eventList.map((evt) => (
                    <div className="col-lg-4 col-md-6 position-relative" key={evt.id}>
                      <div className="card_icons events">
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
                      <Card className="event-card">

                        <div
                          className="card_img"
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



                        <div className="reating">
                          <span>
                            {evt.review_count?.toFixed(1) || 0} (
                            {evt.review_count || 0})
                          </span>
                        </div>

                        <div className="easy">
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
                            <p>
                              <span>
                                <img className="pe-2" src={date} alt="" />
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
                            <p>
                              <span>
                                <img className="pe-2" src={map} alt="" />
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
