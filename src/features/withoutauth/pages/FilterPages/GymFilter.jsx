import "../../Stylesheets/Filterpages/GymFilter.css";
import "../../Stylesheets/Filterpages/Cards.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

import { useFetchGym } from "../../../../hooks/GymList/useFetchGym.js";
import { useLikeGym } from "../../../../hooks/FavouriteGym/useLikeGym.js";
import { useUnlikeGym } from "../../../../hooks/FavouriteGym/useUnlikeGym.js";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";

import AppDownloadBanner from "../../components/AppDownloadBanner.jsx";
import SortBy from "../../components/SortBy.jsx";
import FilterThree from "../../components/FilterThree.jsx";
import SortModal from "../../components/SortModal.jsx";
import FilterModalThree from "../../components/FilterModalThree.jsx";

import like from "../../assets/icons/like.svg";
import HeartFilled from "../../assets/VenueCardLogo/heartfilled.png";
import share from "../../assets/icons/share.svg";
import map from "../../assets/icons/map.svg";
import date from "../../assets/icons/date.svg";
import fallbackGymImg from "../../assets/bookgym/bookgym.png";
import star from "../../assets/icons/star-white.svg"
import PageSearch from "../../components/PageSearch.jsx";
import sortIcon from "../../assets/icons/sort.svg";
import filterIcon from "../../assets/icons/filter.svg";
import OngoingEvents from "../../components/OngoingEvents.jsx";
import { useBanner } from "../../../../hooks/useBanner.js";
import { Link } from "react-router-dom";


export default function GymFilterPage() {

  const { data: bannerData, isLoading: dataLoading, error: dataError } = useBanner(1);
  const banners = bannerData?.result || [];

  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);
  const queryClient = useQueryClient();

  const [gymList, setGymList] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    date: null,
    minPrice: 0,
    maxPrice: 10000,
    onlyWomen: false,
    coachAvailable: false,
    amenities: [],
  });
  const [gyms, setGyms] = useState([]);

  const [sortBy, setSortBy] = useState([]);
  const payload = { lat, lng, userId: userId || null };
  const { data: AllGymdata, isLoading, isError, error } = useFetchGym(payload);
  const likeGym = useLikeGym();
  const unlikeGym = useUnlikeGym();
  const [selectedDate, setSelectedDate] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [coachAvailable, setCoachAvailable] = useState({
    onlyWomen: false,
    coachAvailable: false,
  });

  // --- LIKE / UNLIKE ---
  const toggleFavourite = (e, gym) => {
    e.preventDefault();
    e.stopPropagation();
    const gymId = gym.Id;
    setGymList((prev) =>
      prev.map((v) =>
        v.Id === gymId ? { ...v, favourite: !v.favourite } : v
      )
    );

    if (!gym.favourite) {
      likeGym.mutate(
        { gymId, userId },
        {
          onSuccess: async () =>
            await queryClient.invalidateQueries(["GymList", userId || null]),
          onError: () =>
            setGymList((prev) =>
              prev.map((v) =>
                v.Id === gymId ? { ...v, favourite: false } : v
              )
            ),
        }
      );
    } else {
      unlikeGym.mutate(
        { gymFavouriteId: gym.favourite_gym_id },
        {
          onSuccess: async () =>
            await queryClient.invalidateQueries(["GymList", userId || null]),
          onError: () =>
            setGymList((prev) =>
              prev.map((v) =>
                v.Id === gymId ? { ...v, favourite: true } : v
              )
            ),
        }
      );
    }
  };

  // --- RESET ---
  const handleReset = () => {
    setSearch("");
    setFilters({ date: "", price: "", amenities: [], womenOnly: false });
  };

  const filteredGyms = useMemo(() => {
    if (!gymList?.length) return [];

    let result = [...gymList];
    const sortBy = filters.sortBy || [];


    if (search) {
      result = result.filter((gym) =>
        gym.gym_name?.toLowerCase().includes(search.toLowerCase())
      );
    }




    if (priceRange[1] > 0) {
      result = result.filter((gym) => {
        const price =
          gym?.gym_price_slot?.reduce(
            (min, curr) => (curr.price < min ? curr.price : min),
            Infinity
          ) ?? 0;

        return price <= priceRange[1];
      });
    }



    if (selectedAmenities.length > 0) {
      result = result.filter(gym =>
        selectedAmenities.every(a =>
          gym.amenities?.some((am) => am.id === a)
        )
      );
    }


    if (coachAvailable) {
      if (coachAvailable.coachAvailable) {
        result = result.filter((gym) => gym.has_gym_coaches === 1);
      }

      if (coachAvailable.onlyWomen) {
        result = result.filter((gym) => gym.only_woman === 1);
      }
    }


    if (sortBy.includes("favourite")) {
      result = result.filter((gym) => gym.favourite === 1 || gym.favourite === true);
    }

    if (sortBy.includes("priceLow")) {
      result.sort((a, b) => {
        const priceA = a.gym_price_slot?.[0]?.price ?? 999999;
        const priceB = b.gym_price_slot?.[0]?.price ?? 999999;
        return priceA - priceB;
      });
    }

    if (sortBy.includes("popularity")) {
      result.sort(
        (a, b) =>
          (b.review_count || b.reviewCount || 0) -
          (a.review_count || a.reviewCount || 0)
      );
    }

    if (sortBy.includes("nearby")) {
      result.sort(
        (a, b) => (Number(a.distance) || 9999) - (Number(b.distance) || 9999)
      );
    }

    return result;
  }, [gymList, filters, search, selectedDate, priceRange, selectedAmenities, coachAvailable]);



  useEffect(() => {
    if (AllGymdata?.status === 200) setGymList(AllGymdata.result);

  }, [AllGymdata]);

  
  const handleShare = (e, gym) => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
      title: gym.gym_name,
      text: `Check out ${gym.gym_name} on Danta Sports!`,
      url: `${window.location.origin}/gym/${gym.Id}`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error("Share failed:", error));
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading gyms: {error.message}</div>;
  return (
    <section style={{ background: "#F1F3F2" }} className="pb-lg-4 pb-3">
      <PageSearch searchValue="GymPage" />
      <Container>
        <Row>
          <Col xl={3} lg={4} md={12} className="d-none d-lg-block ">
            <SortBy
              sortBy={filters.sortBy}
              setSortBy={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value }))
              }
            />
            <FilterThree
              // selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              coachAvailable={coachAvailable}
              setCoachAvailable={setCoachAvailable}
            />




          </Col>

          <Col className="d-lg-none  text-end mb-4 d-flex justify-content-end">
            {/* <SortModal /> */}
            {/* <FilterModalThree /> */}
            <div className="modal_wraper">
              <div
                class="modal fade mobile-filter-modal"
                id="mobileSortModal"
                aria-hidden="true"
                aria-labelledby="mobileFilter"
                tabindex="-1"
              >
                <div class="modal-dialog modal-dialog-centered modal-bottom">
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
                      {/* <SortBy /> */}
                      {/* <p>Filter / Sort Options Here</p> */}
                      <FilterThree
                        // selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedAmenities={selectedAmenities}
                        setSelectedAmenities={setSelectedAmenities}
                        coachAvailable={coachAvailable}
                        setCoachAvailable={setCoachAvailable}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                class="btn_mobile"
                data-bs-toggle="modal"
                href="#mobileSortModal"
                role="button"
              >
                <img src={filterIcon} alt="" />
              </button>
              <div
                class="modal fade"
                id="exampleModalToggle"
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

              <button
                class="btn_mobile"
                data-bs-toggle="modal"
                href="#exampleModalToggle"
                role="button"
              >
                <img src={sortIcon} alt="" />
              </button>


            </div>
          </Col>

          <Col xl={9} lg={8} md={12}>
            <Col className="col-12 mb-4 onging_title_hid">
              <OngoingEvents banners={banners} />
            </Col>
            <div className="row g-3">
              {filteredGyms.length > 0 ? (
                filteredGyms.map((gym) => {
                  const imageSrc = gym.desktop_image || gym.mobile_image || fallbackGymImg;

                  return (
                    <div className="col-lg-6 col-md-6 col-xl-4" key={gym.Id}>
                      <Link to={`/gym/${gym.Id}`} className="text-decoration-none">

                        <Card className="card">
                          <div className="card_img">
                            <img src={imageSrc} alt="" className="w-100" />
                          </div>

                          <div className="card_icons">
                            <button
                              className="like"
                              onClick={(e) => toggleFavourite(e, gym)}
                            >
                              <img src={gym.favourite ? HeartFilled : like} className="like1" />
                            </button>

                            <button
                              className="share"
                              onClick={(e) => handleShare(e, gym)}
                            >
                              <img src={share} className="share1" />
                            </button>
                          </div>


                          <div className="txt_wrapper">
                            <div className="card_txt">
                              <h2 className="text_wrap card_heading">{gym.gym_name}</h2>
                              <p className="sports_title_km">
                                {gym.city} {gym.state}  (~{gym.distance ? gym.distance.toFixed(1) : 0} Km)
                              </p>

                            </div>



                            <div className="d-flex justify-content-between no_off_users">
                              <p className="up_to_offer m-0"> {gym.coupon_type === "percentage" && gym.discount_offer
                                ? `Upto ${parseFloat(gym.discount_offer)}% Off`
                                : gym.coupon_type === "flat" && gym.discount_offer
                                  ? `Upto ₹${parseFloat(gym.discount_offer)} Off`
                                  : ""}</p>
                              <p className="onwards_rup m-0">₹{gym.gym_price_slot && gym.gym_price_slot.length > 0
                                ? gym.gym_price_slot.reduce((min, curr) =>
                                  curr.price < min.price ? curr : min
                                ).price
                                : 0}{" "}onwards</p>
                            </div>
                            {/* <div className="card_line mb-2"></div> */}
                            <div className="offer d-flex justify-content-between align-items-center">


                            </div>
                            <div className="rating">
                              <span><img src={star} className="pe-2" alt="" />{gym.average_rating || "0.0"}  ( {gym.review_count || 0})</span>
                            </div>

                          </div>
                        </Card>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="no-data-card">No gyms found</div>
              )}
            </div>
          </Col>
        </Row>

        <div className="gym-footer-banner">
          <AppDownloadBanner />
        </div>
      </Container>
    </section>
  );
}
