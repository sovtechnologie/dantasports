import "../../Stylesheets/Filterpages/CoachFilter.css"
import CoachCard from '../../components/CoachCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import coachImage from '../../assets/CoachImage1.svg';
import coachImage1 from "../../assets/CoachImage2.svg";

import sportIcon from '../../assets/VenueCardLogo/CricketLogo.png';
import { useState } from "react";

const coachs = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: i % 2 === 0 ? coachImage : coachImage1,
    avatar: sportIcon,
    name: "Prerak Arya",
    location: "Balewadi, Pune, Maharashtra",
    rating: "4.0",
    ratingCount: "175",
    category: "Adults",
    tag: i % 2 === 0 ? "Trainer" : "Academy",
}));

export default function CoachFilterPage() {

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});

    const handleReset = () => {
        setSearch('');
        setFilters({});
    };
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
                    {coachs.map((coach) => (
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