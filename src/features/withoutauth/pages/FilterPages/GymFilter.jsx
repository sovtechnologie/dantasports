import "../../Stylesheets/Filterpages/GymFilter.css";
import GymCard from "../../components/GymCard.jsx";
import SortSection from "../../components/SortSection-old.jsx";
import AppDownloadBanner from "../../components/AppDownloadBanner.jsx";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchGym } from "../../../../hooks/GymList/useFetchGym.js";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useLikeGym } from "../../../../hooks/FavouriteGym/useLikeGym.js";
import { useUnlikeGym } from "../../../../hooks/FavouriteGym/useUnlikeGym.js";
import { useQueryClient } from "@tanstack/react-query";
import AdvancedFilter from "../../components/AdvanceFilter.jsx";
import { Container, Row,Col,Card } from "react-bootstrap";
import SortBy from "../../components/SortBy.jsx";
import FilterTow from "../../components/FilterTow.jsx";
import FilterThree from "../../components/FilterThree.jsx";
import like from "../../assets/icons/like.svg";
import date from "../../assets/icons/date.svg";
import share from "../../assets/icons/share.svg";
import map from "../../assets/icons/map.svg";
import GymImg from "../../assets/bookgym/bookgym.png"
import FilterModalThree from "../../components/FilterModalThree.jsx";
import SortModal from "../../components/SortModal.jsx";

export default function GymFilterPage() {
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);
  const queryClient = useQueryClient();

  const [gymList, setGymList] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedGym, setSelectedGym] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const payload = { lat, lng, userId: userId || null };
  const { data: AllGymdata, isLoading, isError, error } = useFetchGym(payload);
  console.log("AllGymdataAllGymdata", AllGymdata);
  const likeGym = useLikeGym();
  const unlikeGym = useUnlikeGym();

  const toggleFavourite = (gym) => {
    const gymId = gym.Id;

    setGymList((prevList) =>
      prevList.map((v) =>
        v.Id === gymId ? { ...v, favourite: !v.favourite } : v
      )
    );

    if (!gym.favourite) {
      likeGym.mutate(
        { gymId, userId },
        {
          onSuccess: async () =>
            await queryClient.invalidateQueries(["GymList", userId || null]),
          onError: () => {
            setGymList((prevList) =>
              prevList.map((v) =>
                v.Id === gymId ? { ...v, favourite: false } : v
              )
            );
          },
        }
      );
    } else {
      unlikeGym.mutate(
        { gymFavouriteId: gym.favourite_gym_id },
        {
          onSuccess: async () =>
            await queryClient.invalidateQueries(["GymList", userId || null]),
          onError: () => {
            setGymList((prevList) =>
              prevList.map((v) =>
                v.Id === gymId ? { ...v, favourite: true } : v
              )
            );
          },
        }
      );
    }
  };

  // reset
  const handleReset = () => {
    setSearch("");
    setFilters({});
    setSelectedGym(null);
    setSelectedTime(null);
    setFilters({ date: "", price: "", amenities: [], womenOnly: false });
  };

  const filteredGyms = gymList.filter((gym) => {
    // search
    if (search && !gym.gym_name?.toLowerCase().includes(search.toLowerCase()))
      return false;

    if (filters.date) {
      const selectedDate = new Date(filters.date).toISOString().split("T")[0];

      if (!gym.available_dates?.includes(selectedDate)) {
        return false;
      }
    }

    // price filter
    if (
      filters.price &&
      gym.gym_price_slot?.length > 0 &&
      gym.gym_price_slot[0].price > filters.price
    )
      return false;

    // amenities filter
    if (
      filters.amenities?.length &&
      !filters.amenities.every((a) =>
        gym.amenities?.some((g) => g.name === a || g.id === a)
      )
    )
      return false;

    // women only filter
    if (filters.womenOnly && gym.only_women !== 1) return false;

    return true;
  });

  useEffect(() => {
    if (AllGymdata?.status === 200) {
      setGymList(AllGymdata.result);
    }
  }, [AllGymdata]);

  // formatted data for UI cards
  const formattedGymList = useMemo(() => {
    return gymList.map((gym) => ({
      id: gym.Id,
      image: gym.desktop_image || gym.mobile_image,
      title: gym.gym_name,
      location: gym.full_address,
      distance: Math.floor(gym.distance) || 0,
      rating: gym.average_rating || 0,
      ratingCount: gym.review_count || 0,
      priceText:
        gym.gym_price_slot?.length > 0
          ? `${gym.gym_price_slot[0].price} onwards`
          : "Price not available",
      vendorId: gym.vendor_id,
      favouriteId: gym.favourite_gym_id,
      favourite: gym.favourite,
    }));
  }, [gymList]);

  if (isLoading) return <VenueListShimmer />;
  if (isError) return <div>Error loading gyms: {error.message}</div>;

  return (
    <>

      <section className="pt-3 pt-lg-5 pb-lg-5 pb-3" style={{background:"#F1F3F2"}}>
        <Container>
          <Row>
            <Col lg={3} md={4} className='d-none d-lg-block d-md-block'>
             <SortBy/>
             <FilterThree/>
             {/* <p>kmnvkdjs</p> */}
            </Col>
            <Col className="d-lg-none d-md-none text-end mb-4 d-flex  justify-content-end">
            <SortModal/>
            <FilterModalThree/>
            </Col>
            <Col lg={9} md={8}>
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                 <Card>
              <div className="card_img">
                <img src={GymImg} className="w-100" alt="" />
              </div>
              <div className="card_icons">
                <a href="">
                  <img className="like" src={like} alt="like" />
                </a>
                <a href="">
                  <img className="share" src={share} alt="like" />
                </a>
              </div>
              <div className="txt_wrapper">
                <div className="card_txt">
                  <h2>Harihar Fort Trek 2025</h2>
                  <p>
                    <span>
                      <img className="pe-2" src={date} alt="" />
                    </span>
                    22 Jun - 23 Jun l 6AM onwards
                  </p>
                  <p>
                    <span>
                      <img className="pe-2" src={map} alt="" />
                    </span>
                    Palika Bazar Gate 1, Delhi-451200
                  </p>
                </div>
                <div className="sports_title">
                  <p>Football, Cricket</p>
                </div>
                <div className="offer d-flex justify-content-between align-items-center">
                  <p>Upto 50%off</p>
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
              </div>
              <div className="col-lg-4 col-md-6">
                 <Card>
              <div className="card_img">
                <img src={GymImg} className="w-100" alt="" />
              </div>
              <div className="card_icons">
                <a href="">
                  <img className="like" src={like} alt="like" />
                </a>
                <a href="">
                  <img className="share" src={share} alt="like" />
                </a>
              </div>
              <div className="txt_wrapper">
                <div className="card_txt">
                  <h2>Harihar Fort Trek 2025</h2>
                  <p>
                    <span>
                      <img className="pe-2" src={date} alt="" />
                    </span>
                    22 Jun - 23 Jun l 6AM onwards
                  </p>
                  <p>
                    <span>
                      <img className="pe-2" src={map} alt="" />
                    </span>
                    Palika Bazar Gate 1, Delhi-451200
                  </p>
                </div>
                <div className="sports_title">
                  <p>Football, Cricket</p>
                </div>
                <div className="offer d-flex justify-content-between align-items-center">
                  <p>Upto 50%off</p>
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
              </div>
              <div className="col-lg-4 col-md-6">
                 <Card>
              <div className="card_img">
                <img src={GymImg} className="w-100" alt="" />
              </div>
              <div className="card_icons">
                <a href="">
                  <img className="like" src={like} alt="like" />
                </a>
                <a href="">
                  <img className="share" src={share} alt="like" />
                </a>
              </div>
              <div className="txt_wrapper">
                <div className="card_txt">
                  <h2>Harihar Fort Trek 2025</h2>
                  <p>
                    <span>
                      <img className="pe-2" src={date} alt="" />
                    </span>
                    22 Jun - 23 Jun l 6AM onwards
                  </p>
                  <p>
                    <span>
                      <img className="pe-2" src={map} alt="" />
                    </span>
                    Palika Bazar Gate 1, Delhi-451200
                  </p>
                </div>
                <div className="sports_title">
                  <p>Football, Cricket</p>
                </div>
                <div className="offer d-flex justify-content-between align-items-center">
                  <p>Upto 50%off</p>
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
              </div>
              <div className="col-lg-4 col-md-6">
                 <Card>
              <div className="card_img">
                <img src={GymImg} className="w-100" alt="" />
              </div>
              <div className="card_icons">
                <a href="">
                  <img className="like" src={like} alt="like" />
                </a>
                <a href="">
                  <img className="share" src={share} alt="like" />
                </a>
              </div>
              <div className="txt_wrapper">
                <div className="card_txt">
                  <h2>Harihar Fort Trek 2025</h2>
                  <p>
                    <span>
                      <img className="pe-2" src={date} alt="" />
                    </span>
                    22 Jun - 23 Jun l 6AM onwards
                  </p>
                  <p>
                    <span>
                      <img className="pe-2" src={map} alt="" />
                    </span>
                    Palika Bazar Gate 1, Delhi-451200
                  </p>
                </div>
                <div className="sports_title">
                  <p>Football, Cricket</p>
                </div>
                <div className="offer d-flex justify-content-between align-items-center">
                  <p>Upto 50%off</p>
                  <a href="">Join Now</a>
                </div>
              </div>
            </Card>
              </div>
            </div>
            </Col>
          </Row>
          <div className="gym-footer-banner">
            <AppDownloadBanner />
          </div>
        </Container>
      </section>
    </>
  );
}
