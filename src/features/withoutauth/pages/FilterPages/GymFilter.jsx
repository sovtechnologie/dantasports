import "../../Stylesheets/Filterpages/GymFilter.css";
import GymCard from "../../components/GymCard.jsx";
import SortSection from "../../components/SortSection";
import AppDownloadBanner from "../../components/AppDownloadBanner.jsx";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchGym } from "../../../../hooks/GymList/useFetchGym.js";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useLikeGym } from "../../../../hooks/FavouriteGym/useLikeGym.js";
import { useUnlikeGym } from "../../../../hooks/FavouriteGym/useUnlikeGym.js";
import { useQueryClient } from "@tanstack/react-query";
import AdvancedFilter from "../../components/AdvanceFilter.jsx";

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
      <div className="gym-filter-container">
        <aside className="gym-filter-sidebar">
          <SortSection
            filters={filters}
            setFilters={setFilters}
            search={search}
            setSearch={setSearch}
            handleReset={handleReset}
            selectedEvent={selectedGym}
            setSelectedEvent={setSelectedGym}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            runList={gymList.map((gym) => ({
              ...gym,
              event_title: gym.gym_name,
            }))}
          />
          <AdvancedFilter
            runList={gymList}
            filters={filters}
            setFilters={setFilters}
            onReset={handleReset}
            mode="gym"
          />
        </aside>

        <section className="gym-grid">
          {filteredGyms.length > 0 ? (
            filteredGyms.map((gym) => {
              const formattedGym = formattedGymList.find(
                (g) => g.id === gym.Id
              );

              return (
                <GymCard
                  key={formattedGym.id}
                  gym={formattedGym}
                  isLiked={formattedGym?.favourite}
                  onLikeToggle={() => toggleFavourite(gym)}
                />
              );
            })
          ) : (
            <div className="no-data-card">No gyms found</div>
          )}
        </section>
      </div>
      <div className="gym-footer-banner">
        <AppDownloadBanner />
      </div>
    </>
  );
}
