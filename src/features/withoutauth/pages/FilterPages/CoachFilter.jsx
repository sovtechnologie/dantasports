import "../../Stylesheets/Filterpages/CoachFilter.css";
import CoachCard from "../../components/CoachCard.jsx";
import AppDownloadBanner from "../../components/AppDownloadBanner.jsx";
import { useState, useEffect, useMemo } from "react";
import { useFetchCoach } from "../../../../hooks/CoachList/useFetchCoach.js";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useSelector } from "react-redux";
import AdvancedFilter from "../../components/AdvanceFilter.jsx";
import SortSection from "../../components/SortSection.jsx";

export default function CoachFilterPage() {
  const { lat, lng } = useSelector((state) => state.location);
  const [coachList, setCoachList] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    data: AllCoachdata,
    isLoading,
    isError,
    error,
  } = useFetchCoach({
    lat,
    lng,
  });
  console.log("AllCoachdataAllCoachdata", AllCoachdata);
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

        if (!coach.available_dates?.includes(chosenDate)) {
          return false;
        }
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
      image: coach.desktop_image || coach.mobile_image,
      name: coach.name,
      location: `${coach.locations?.area}, ${coach.locations?.city}`,
      rating: coach.average_rating || 0,
      ratingCount: coach.review_count || 0,
      sportIcon: coach.linked_sports,
      category: coach.training_type,
      tag: coach.type === 1 ? "Trainer" : "Academy",
    }));
  }, [filteredCoaches]);

  if (isLoading) return <VenueListShimmer />;
  if (isError)
    return (
      <div>Error loading coaches: {error?.message || "Unknown error"}</div>
    );

  return (
    <>
      <div className="coach-filter-container">
        <aside className="coach-filter-sidebar">
          <SortSection
            filters={filters}
            setFilters={setFilters}
            search={search}
            setSearch={setSearch}
            handleReset={handleReset}
            selectedEvent={selectedCoach}
            setSelectedEvent={setSelectedCoach}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            runList={coachList.map((coach) => ({
              ...coach,
              event_title: coach.name,
            }))}
          />

          <aside>
            <AdvancedFilter
              runList={coachList}
              filters={filters}
              setFilters={setFilters}
              onReset={handleReset}
              mode="coach"
            />
          </aside>
        </aside>

        <section className="coach-grid">
          {formattedCoachList.length > 0 ? (
            formattedCoachList.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))
          ) : (
            <div className="no-data-card">No coaches found</div>
          )}
        </section>
      </div>

      <div className="coach-footer-banner">
        <AppDownloadBanner />
      </div>
    </>
  );
}
