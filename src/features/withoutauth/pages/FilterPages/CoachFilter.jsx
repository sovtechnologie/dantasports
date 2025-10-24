
import "../../Stylesheets/Filterpages/CoachFilter.css";
import "../../Stylesheets/Filterpages/Cards.css";
import CoachCard from "../../components/CoachCard.jsx";
import AppDownloadBanner from "../../components/AppDownloadBanner.jsx";
import { useState, useEffect, useMemo } from "react";
import { useFetchCoach } from "../../../../hooks/CoachList/useFetchCoach.js";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useSelector } from "react-redux";
import AdvancedFilter from "../../components/AdvanceFilter.jsx";
import SortSection from "../../components/SortSection-old.jsx";
import { Container, Row, Col, Card } from "react-bootstrap";
import SortBy from "../../components/SortBy.jsx";
import like from "../../assets/icons/like.svg";
import share from "../../assets/icons/share.svg";
import date from "../../assets/icons/date.svg";
import map from "../../assets/icons/map.svg";
import coach1 from "../../assets/coach/coach1.png";
import users from "../../assets/downloadAppLogo/team-u1.svg";
import star from "../../assets/icons/star-white.svg";
import FilterTow from "../../components/FilterTow.jsx";
import SortModal from "../../components/SortModal.jsx";
import FliterModal from "../../components/FliterModal.jsx";
import FilterTowModal from "../../components/FilterTowModal.jsx";
import { useNavigate } from "react-router-dom";

export default function CoachFilterPage() {
  const { lat, lng } = useSelector((state) => state.location);
  const [coachList, setCoachList] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
  const {
    data: AllCoachdata,
    isLoading,
    isError,
    error,
  } = useFetchCoach({ lat, lng });

  const handleReset = () => {
    setSearch("");
    setFilters({});
    setSelectedCoach(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  useEffect(() => {
    if (AllCoachdata?.status === 200) {
      setCoachList(AllCoachdata.result);
    }
  }, [AllCoachdata]);

  const filteredCoaches = coachList
    .filter((coach) => {
      const coachName = (coach.name || "").trim().toLowerCase();
      const searchText = (search || "").trim().toLowerCase();

      if (searchText && !coachName.includes(searchText)) return false;

      if (selectedCoach) {
        const selectedName =
          typeof selectedCoach === "string"
            ? selectedCoach.toLowerCase()
            : selectedCoach.name?.toLowerCase();
        if (coach.name.toLowerCase() !== selectedName) return false;
      }

      if (filters.date) {
        const chosenDate = new Date(filters.date).toISOString().split("T")[0];
        if (!coach.available_dates?.includes(chosenDate)) return false;
      }

      if (filters.ageGroup) {
        const coachAge = (coach.training_type || "").toLowerCase();
        if (
          (filters.ageGroup === "kids" && coachAge !== "kids") ||
          (filters.ageGroup === "adult" && coachAge !== "adults")
        )
          return false;
      }

      if (filters.batchType?.length) {
        const coachBatch = (coach.classes || "").toLowerCase();
        const matchesBatch = filters.batchType.some((bt) =>
          coachBatch.includes(bt.toLowerCase())
        );
        if (!matchesBatch) return false;
      }

      if (filters.type?.length) {
        const matchType =
          (filters.type.includes("coachOnly") && coach.type === 1) ||
          (filters.type.includes("academyOnly") && coach.type === 2);
        if (!matchType) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const aAvailable = a.is_available;
      const bAvailable = b.is_available;
      if (aAvailable && !bAvailable) return -1;
      if (!aAvailable && bAvailable) return 1;
      return 0;
    });

  const formattedCoachList = useMemo(() => {
    return filteredCoaches.map((coach) => ({
      id: coach.id,
      image: coach.desktop_image || coach.mobile_image || coach1, // fallback image
      name: coach.name,
      location: `${coach.locations?.area}, ${coach.locations?.city}`,
      // rating:
      //   typeof coach.average_rating === "number"
      //     ? coach.average_rating.toFixed(1)
      //     : 0,
      rating: coach.average_rating || 0,



      ratingCount: coach.review_count || 0,
      linked_sports: coach.linked_sports,
      category: coach.training_type,
      tag: coach.type === 1 ? "Trainer" : "Academy",
    }));
  }, [filteredCoaches]);

  const handleClick = (coach) => {

    navigate(`/Coach/${coach?.id}`);
  };


  if (isLoading) return <VenueListShimmer />;
  if (isError)
    return (
      <div>Error loading coaches: {error?.message || "Unknown error"}</div>
    );

  const userList = [
    { id: 1, type: "img", src: users, alt: "User1" },
    { id: 2, type: "img", src: users, alt: "User2" },
    { id: 3, type: "img", src: users, alt: "User3" },
    { id: 5, type: "img", src: users, alt: "User4" },
    { id: 5, type: "img", src: users, alt: "User5" },
  ];

  return (
    <>
      <section
        style={{ background: "#F1F3F2" }}
        className="coach_page_section pt-3 pt-lg-5 pb-lg-5 pb-3"
      >
        <Container>
          <Row>
            <Col lg={3} md={5} className="d-none d-lg-block d-md-block">
              <SortBy />
              <FilterTow />
            </Col>
            <Col className="d-lg-none d-md-none text-end mb-4 d-flex  justify-content-end">
              <SortModal />
              <FilterTowModal />
            </Col>
            <Col lg={9} md={7}>
              <div className="row g-3">
                {formattedCoachList.length > 0 ? (
                  formattedCoachList.map((coach) => (
                    <div className="col-lg-4" key={coach.id}>
                      <Card>
                        <div className="card_img">
                          <img
                            src={coach.image}
                            className="w-100"
                            alt={coach.name || "Coach"}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = coach1;
                            }}
                          />
                        </div>
                        <div className="card_icons">
                          <a href="">
                            <img className="like" src={like} alt="like" />
                          </a>
                          <a href="">
                            <img className="share" src={share} alt="share" />
                          </a>
                          <div className="reating">
                            <span>
                              <img className="me-2" src={star} alt="" />
                              {coach.rating} ({coach.ratingCount})
                            </span>
                          </div>
                        </div>
                        <div className="trainerbox position-relative">
                          <span className="trainer_type">{coach.tag}</span>
                        </div>
                        <div className="txt_wrapper">
                          <div className="card_txt">
                            <div className="d-flex justify-content-between mb-3 align-items-center">
                              <h2 className="m-0 text_wrap">{coach.name}</h2>
                              <p className="m-0 memebercat">{coach.category}</p>
                            </div>
                            <div
                              className="coach-sports d-flex align-items-center flex-wrap mt-2"
                              style={{
                                overflow: "visible",
                                position: "relative",
                                zIndex: 10,
                                gap: "5px",
                              }}
                            >
                              {coach.linked_sports?.slice(0, 5).map((sport, index) => (
                                <div
                                  key={index}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                  }} 
                                >
                                  <img
                                    src={sport.sports_images}
                                    alt={sport.sports_name}
                                    title={sport.sports_name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      display: "block",
                                    }}
                                    onError={(e) => {
                                      e.currentTarget.src = "/default-sport.png";
                                    }}
                                  />
                                </div>
                              ))}

                              {coach.linked_sports?.length > 5 && (
                                <span
                                  style={{
                                    fontSize: "13px",
                                    color: "#333",
                                    fontWeight: 600,
                                    marginLeft: "6px",
                                  }}
                                >
                                  +{coach.linked_sports.length - 5}
                                </span>
                              )}
                            </div>

                            <p className="mt-3">
                              <span>
                                <img className="pe-2" src={map} alt="" />
                              </span>
                              {coach.location}
                            </p>
                          </div>
                          {/* <hr /> */}
                          <div className="offer" onClick={() => handleClick(coach)}>
                            <a href="#" className="">
                              Enquire Now
                            </a>
                          </div>

                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="no-data-card">No coaches found</div>
                )}
              </div>
            </Col>
          </Row>
          <div className="coach-footer-banner">
            <AppDownloadBanner />
          </div>
        </Container>
      </section>
    </>
  );
}
