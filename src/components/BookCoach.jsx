import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ".//StyleSheets/BookCoach.css";

import star from "../assets/images/home/bookvenues/star.svg";
import likeIcon from "../assets/images/home/bookvenues/like.svg";
import shareIcon from "../assets/images/home/bookvenues/share.svg";
import mapIcon from "../assets/images/home/bookrun/map.svg";
import gymImg from "../assets/images/home/bookcoach/coach1.png";
import sportIcons from "../assets/images/home/bookcoach/Basketball.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeartFilled from "../features/auth/assets/VenueCardLogo/heartfilled.png";

import { useQueryClient } from "@tanstack/react-query";
import { useFetchCoach } from "../hooks/CoachList/useFetchCoach";
import { useLikeCoach } from "../hooks/favouriteCoach/useLikeCoach";
import { useUnlikeCoach } from "../hooks/favouriteCoach/useUnlikeCoach";

function BookCoach() {
  const { lat, lng } = useSelector((state) => state.location);
  const auth = useSelector((state) => state.auth);
  const [coachList, setCoachList] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: AllCoachdata, isLoading } = useFetchCoach({
    lat,
    lng,
    userId: auth?.id,
  });

  const likeCoach = useLikeCoach();
  const unlikeCoach = useUnlikeCoach();

  useEffect(() => {
    if (AllCoachdata?.status === 200) {
      setCoachList(AllCoachdata.result.slice(0, 4)); // show only 4 coaches
    }
  }, [AllCoachdata]);

  const toggleCoachFavourite = (coach) => {
    if (!auth || !auth?.id) {
      alert("Please login first to like or unlike a coach.");
      return;
    }

    setCoachList((prev) =>
      prev.map((c) =>
        c.id === coach.id ? { ...c, favourite: !c.favourite } : c
      )
    );

    if (!coach.favourite) {
      likeCoach.mutate(
        { coachesId: coach.id, userId: auth?.id },
        {
          onSuccess: (data) => {
            setCoachList((prev) =>
              prev.map((c) =>
                c.id === coach.id
                  ? { ...c, favourite: true, favourite_coach_id: data.favouriteId }
                  : c
              )
            );
            queryClient.invalidateQueries(["coachList", auth?.id]);
          },
        }
      );
    } else {
      const favouriteId =
        coach.favourite_coach_id ||
        coach.favourite_coach ||
        coach.favouriteCoachesId;

      unlikeCoach.mutate(
        { favouriteCoachesId: favouriteId },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(["coachList", auth?.id || null]);
          },
        }
      );
    }
  };

  const handleShareClick = async (coach) => {
    const shareUrl = window.location.href;
    const shareData = {
      title: coach.name,
      text: coach.about,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${coach.name} - ${shareUrl}`);
        alert("Coach link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleClick = (coach) => {
    navigate(`/Coach/${coach?.id}`);
  };

  return (
    <section className="coach_section_home">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="section_title">
            <h2>Book Coach</h2>
          </div>
          <div className="see_all">
            <a href="/Coach">See All</a>
          </div>
        </div>
        <Row className="g-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : coachList.length > 0 ? (
            coachList.map((coach) => (
              <Col xl={3} lg={4} md={6} sm={6} key={coach.id} className="position-relative">
                <div className="card border-0">
                  <div className="card_img">
                    <img
                      src={
                        coach.desktop_image ||
                        coach.mobile_image ||
                        gymImg
                      }
                      alt={coach.name}
                    />
                  </div>

                  <div className="card_icons">
                    <img
                      src={coach.favourite ? HeartFilled : likeIcon}
                      className="like"
                      alt="like"
                      onClick={() => toggleCoachFavourite(coach)}
                    />
                    <img
                      src={shareIcon}
                      className="share"
                      alt="share"
                      onClick={() => handleShareClick(coach)}
                    />
                  </div>

                  <div className="rating_box position-absolute d-flex align-items-center">
                    <img src={star} alt="rating" />
                    <span>
                      {coach.average_rating || 0} ({coach.review_count || 0})
                    </span>
                  </div>

                  <div className="trainerbox">
                    <span>{coach.type === 1 ? "Trainer" : "Academy"}</span>
                  </div>

                  <div className="txt_wrapper">
                    <div className="d-flex justify-content-between">
                      <h2 className="text_wrap2 card_heading m-0">
                        {coach.name}
                      </h2>
                      <p className="adult m-0">{coach.training_type}</p>
                    </div>

                    <div className="sport_icon d-flex mt-3">
                      {coach.linked_sports?.slice(0, 2).map((sport, i) => (
                        <div key={i} className="sport">
                          <img
                            src={sport.sports_images || sportIcons}
                            alt={sport.sports_name}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="d-flex">
                      <p className="map_location">
                        <span className="me-2">
                          <img src={mapIcon} alt="map" />
                        </span>
                        {coach.locations?.area}, {coach.locations?.city}
                      </p>
                    </div>

                    <div className="card_line2"></div>

                    <div
                      className="offer d-flex justify-content-between align-items-center"
                      onClick={() => handleClick(coach)}
                    >
                      <a>Enquire Now</a>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p>No coaches found</p>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default BookCoach;
