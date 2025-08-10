import "../../Stylesheets/Filterpages/CoachFilter.css"
import CoachCard from '../../components/CoachCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import coachImage from '../../assets/CoachImage1.svg';
import coachImage1 from "../../assets/CoachImage2.svg";
import sportIcon from '../../assets/VenueCardLogo/CricketLogo.png';
import { useState, useEffect, useMemo } from "react";
import { useFetchCoach } from "../../../../hooks/CoachList/useFetchCoach.js";
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";



export default function CoachFilterPage() {
    const [coachList, setCoachList] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});


    const { data: AllCoachdata, isLoading, isError, error } = useFetchCoach();

    const handleReset = () => {
        setSearch('');
        setFilters({});
    };

    useEffect(() => {
        if (AllCoachdata?.status === 200) {
            setCoachList(AllCoachdata.result);
        }
    }, [AllCoachdata]);
    console.log(coachList);

    const formattedCoachList = useMemo(() => {
        return coachList.map((coach) => ({
            id: coach.id,
            image: coach.desktop_image || coach.mobile_image,
            name: coach.name,
            location: `${coach.locations?.area},${coach.locations?.city}`,
            rating: coach.average_rating || 0,
            ratingCount: coach.review_count || 0,
            sportIcon: coach.linked_sports,
            category: coach.training_type,
            tag: coach.type === 1 ? "Trainer" : "Academy",
        }));
    }, [coachList]);

    if (isLoading) return <div> <VenueListShimmer /></div>;
    if (isError) return <div>Error loading coaches: {error.message}</div>;

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
                    />

                </aside>

                <section className="coach-grid">
                    {formattedCoachList.map((coach) => (
                        <CoachCard key={coach.id} coach={coach} />
                    ))}
                </section>
            </div>
            <div className='coach-footer-banner'>
                <AppDownloadBanner />
            </div>
        </>
    )
}