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

export default function GymFilterPage() {
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);
  const queryClient = useQueryClient();

  const [gymList, setGymList] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const payload = { lat, lng, userId: userId || null };
  const { data: AllGymdata, isLoading, isError, error } = useFetchGym(payload);
  const likeGym = useLikeGym();
  const unlikeGym = useUnlikeGym();

  // --- LIKE / UNLIKE ---
  const toggleFavourite = (gym) => {
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

  // --- FILTER ---
  const filteredGyms = useMemo(() => {
    return gymList.filter((gym) => {
      if (search && !gym.gym_name?.toLowerCase().includes(search.toLowerCase()))
        return false;

      if (filters.date) {
        const selectedDate = new Date(filters.date).toISOString().split("T")[0];
        if (!gym.available_dates?.includes(selectedDate)) return false;
      }

      if (filters.price && gym.gym_price_slot?.[0]?.price > filters.price)
        return false;

      if (
        filters.amenities?.length &&
        !filters.amenities.every((a) =>
          gym.amenities?.some((g) => g.name === a || g.id === a)
        )
      )
        return false;

      if (filters.womenOnly && gym.only_women !== 1) return false;

      return true;
    });
  }, [gymList, filters, search]);

  useEffect(() => {
    if (AllGymdata?.status === 200) setGymList(AllGymdata.result);
  }, [AllGymdata]);

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading gyms: {error.message}</div>;
  const handleShare = (gym) => {
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

  return (
    <section className="pt-3 pt-lg-5 pb-lg-5 pb-3" style={{ background: "#F1F3F2" }}>
      <Container>
        <Row>
          <Col lg={3} md={4} className="d-none d-lg-block d-md-block">
            <SortBy />
            <FilterThree />
          </Col>

          <Col className="d-lg-none d-md-none text-end mb-4 d-flex justify-content-end">
            <SortModal />
            <FilterModalThree />
          </Col>

          <Col lg={9} md={8}>
            <div className="row g-3">
              {filteredGyms.length > 0 ? (
                filteredGyms.map((gym) => {
                  const imageSrc = gym.desktop_image || gym.mobile_image || fallbackGymImg;

                  return (
                    <div className="col-lg-4 col-md-6" key={gym.Id}>
                      <Card className="card">
                        <div className="card_img">
                          <img src={imageSrc} alt="" className="w-100" />
                        </div>

                        <div className="card_icons">
                          <button
                            className="like-btn"
                            onClick={() => toggleFavourite(gym)}
                          >
                            <img src={gym.favourite ? HeartFilled : like} alt="like" className="like" />
                          </button>

                          <button
                            className="share-btn"
                            onClick={() => handleShare(gym)}
                          >
                            <img src={share} alt="share" className="share" />
                          </button>
                        </div>

                        <div className="txt_wrapper">
                          <div className="card_txt">
                            <h2>{gym.gym_name}</h2>
                            <p>
                              <span><img src={date} className="pe-2" alt="date" /></span>
                              {gym.create_at || "Timings not available"}
                            </p>
                            <p>
                              <span><img src={map} className="pe-2" alt="map" /></span>
                              {gym.full_address || "Address not available"}
                            </p>
                          </div>

                          <div className="sports_title">
                            <p>{gym.sports_name || "Multiple Sports"}</p>
                          </div>

                          <div className="offer d-flex justify-content-between align-items-center">
                            <p>{gym.offer_text || "Upto 50% off"}</p>
                            <a href={`/gym/${gym.Id}`}>Join Now</a>
                          </div>
                        </div>
                      </Card>

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
