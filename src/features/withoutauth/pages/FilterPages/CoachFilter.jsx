
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
import { useLikeCoach } from "../../../../hooks/favouriteCoach/useLikeCoach.js";
import { useUnlikeCoach } from "../../../../hooks/favouriteCoach/useUnlikeCoach.js";
import HeartFilled from "../../assets/VenueCardLogo/heartfilled.png";
import { useQueryClient } from "@tanstack/react-query";
import PageSearch from "../../components/PageSearch.jsx";

export default function CoachFilterPage() {
  const queryClient = useQueryClient();

  const { lat, lng } = useSelector((state) => state.location);
  const [coachList, setCoachList] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    sortBy: [],
  });
  // CoachFilterPage.jsx me top pe
  const [selectedSports, setSelectedSports] = useState([]); // 👈 yeh add karo

  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [selectedCoachType, setSelectedCoachType] = useState(null);





  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  console.log("Fetching coaches with payload:", { lat, lng, userId: auth?.id });


  const {
    data: AllCoachdata,
    isLoading,
    isError,
    error,
  } = useFetchCoach({ lat, lng, userId: auth?.id, });

  const handleReset = () => {
    setSearch("");
    setFilters({});
    setSelectedCoach(null);
    setSelectedDate(null);

  };

  useEffect(() => {
    if (AllCoachdata?.status === 200) {

      console.log("API result:", AllCoachdata.result);
      setCoachList(AllCoachdata.result);
    }
  }, [AllCoachdata]);

  const filteredCoaches = coachList
    .filter((coach) => {
      if (filters.sortBy?.includes("favourite") && !coach.favourite) return false;

      const coachName = (coach.name || "").trim().toLowerCase();
      const searchText = (search || "").trim().toLowerCase();

      if (searchText && !coachName.includes(searchText)) return false;

      if (selectedSports.length > 0) {
        const coachSportIds = coach.linked_sports?.map((s) => s.sports_id) || [];
        console.log("coachSportIdscoachSportIds", coachSportIds);
        const matches = selectedSports.some((id) => coachSportIds.includes(id));
        if (!matches) return false;
      }


      if (selectedCoach) {
        const selectedName =
          typeof selectedCoach === "string"
            ? selectedCoach.toLowerCase()
            : selectedCoach.name?.toLowerCase();
        if (coach.name.toLowerCase() !== selectedName) return false;
      }

      if (selectedDate) {
        const chosenDate = new Date(selectedDate).toISOString().split("T")[0];
        const coachUpdated = new Date(coach.updated_at).toISOString().split("T")[0];
        const coachCreated = new Date(coach.created_at).toISOString().split("T")[0];

        // ✅ Prefer updated_at for date match, fallback to created_at
        if (coachUpdated !== chosenDate && coachUpdated !== chosenDate) return false;
      }

      if (selectedAge.length > 0) {
        const coachAge = (coach.training_type || "").toLowerCase();
        const matchAge = selectedAge.some((a) => a.toLowerCase() === coachAge);
        if (!matchAge) return false;
      }
      if (selectedBatch.length > 0) {
        const coachBatch = (coach.classes || "").toLowerCase();
        const matchBatch = selectedBatch.some((b) => coachBatch.includes(b.toLowerCase()));
        if (!matchBatch) return false;
      }
      if (selectedCoachType !== null && Number(coach.type) !== Number(selectedCoachType)) {
        return false;
      }





      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy?.length > 0) {
        // ✅ 1. Favourite first
        if (filters.sortBy.includes("favourite")) {
          if (a.favourite && !b.favourite) return -1;
          if (!a.favourite && b.favourite) return 1;
        }

        // ✅ 2. Nearby first (if available)
        if (filters.sortBy.includes("nearby")) {
          return (a.distance || 0) - (b.distance || 0);
        }

        // ✅ 3. Popularity → Rating high to low
        if (filters.sortBy.includes("popularity")) {
          return (b.average_rating || 0) - (a.average_rating || 0);
        }

        // ✅ 4. Price low to high (if applicable)
        if (filters.sortBy.includes("priceLow")) {
          return (a.price || 0) - (b.price || 0);
        }

        // ✅ 5. Name (A–Z / Z–A)
        if (filters.sortBy.includes("name_a_to_z")) {
          return a.name.localeCompare(b.name);
        }
        if (filters.sortBy.includes("name_z_to_a")) {
          return b.name.localeCompare(a.name);
        }
      }

      // ✅ Default sorting (available first)
      const aAvailable = a.is_available ? 1 : 0;
      const bAvailable = b.is_available ? 1 : 0;
      return bAvailable - aAvailable;
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
      favourite: coach.favourite || false,
      favourite_coach_id: coach.favourite_coaches_id || "",




      ratingCount: coach.review_count || 0,
      linked_sports: coach.linked_sports,
      category: coach.training_type,
      tag: coach.type === 1 ? "Trainer" : "Academy",
    }));
  }, [filteredCoaches]);

  const likeCoach = useLikeCoach();
  const unlikeCoach = useUnlikeCoach();


  const [likedCoaches, setLikedCoaches] = useState({});

  const toggleCoachFavourite = (coach) => {
    if (!auth || !auth?.id) {
      alert("Please login first to like or unlike a coach.");
      return;
    }

    console.log("Coach clicked:", coach);
    console.log("Current favourite:", coach.favourite);



    // Optimistic update
    setCoachList((prev) =>
      prev.map((c) =>
        c.id === coach.id ? { ...c, favourite: !c.favourite } : c
      )
    );

    if (!coach.favourite) {
      // Like
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
          onError: () => {
            setCoachList((prev) =>
              prev.map((c) => (c.id === coach.id ? { ...c, favourite: false } : c))
            );
          },
        }
      );

    } else {
      // Unlike
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
          onError: () => {
            // Revert if error
            setCoachList((prev) =>
              prev.map((c) =>
                c.id === coach.id ? { ...c, favourite: true } : c
              )
            );
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
        await navigator.clipboard.writeText(
          `${coach.name} - ${shareUrl}`
        );
        alert("Venue link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("Unable to share this venue.");
    }
  };






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
        className="coach_page_section pb-lg-4 pb-3"
      >
        <PageSearch />
        <Container>
          <Row>
            <Col lg={3} md={5} className="d-none d-lg-block d-md-block">
              <SortBy
                sortBy={filters.sortBy}
                setSortBy={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
              />

              <FilterTow
                selectedSports={selectedSports}
                setSelectedSports={setSelectedSports}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedAge={selectedAge}
                setSelectedAge={setSelectedAge}
                selectedBatch={selectedBatch}
                setSelectedBatch={setSelectedBatch}
                selectedCoachType={selectedCoachType}
                setSelectedCoachType={setSelectedCoachType}

              />

            </Col>
            <Col className="d-lg-none d-md-none text-end mb-4 d-flex  justify-content-end">
              {/* <SortModal />
              <FilterTowModal /> */}
            </Col>
            <Col lg={9} md={7}>
              <div className="row g-3">
                {formattedCoachList.length > 0 ? (
                  formattedCoachList.map((coach) => (
                    <div className="col-lg-4 position-relative" key={coach.id}>


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
                        {/* <div className="card_icons">
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
                        </div> */}
                        <div className="card_icons">
                          <button
                            onClick={() => toggleCoachFavourite(coach)}
                            className="like-btn"
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            <img
                              className="like"
                              src={coach.favourite ? HeartFilled : like}
                              alt={coach.favourite ? "liked" : "like"}
                            />
                          </button>

                          <a>
                            <img className="share" src={share} alt="share" onClick={() => handleShareClick(coach)} />
                          </a>

                          <div className="reating">
                            <span>
                              <img className="me-2" src={star} alt="" />
                              {coach.rating} ({coach.ratingCount})
                            </span>
                          </div>
                        </div>


                        <div className="trainerbox">
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
                                  className="sport_icons"
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

                            <p className="card_date  ">
                              <span className="me-2">
                                <img src={map} alt="" />
                              </span>
                              {coach.location}
                            </p>
                          </div>
                          <div className="card_line"></div>
                          {/* <hr /> */}
                          <div className="offer" onClick={() => handleClick(coach)}>
                            <a>
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
