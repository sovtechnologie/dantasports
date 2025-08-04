import "../../Stylesheets/Filterpages/GymFilter.css"
import GymCard from '../../components/GymCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import gymImage from '../../assets/GymImage.svg';
import { useState } from "react";

const gyms = Array.from({ length: 12 }, (_, i) => ({
    id: 1 + i,
    image: gymImage,
    title: "Gold's Gym Magarpatta City",
    location: "Magarpatta City",
    distance: "0.7",
    rating: "4.0",
    ratingCount: "175",
    discountText: "Upto 50% off",
    priceText: "1000 onwards",
}));

export default function GymFilterPage() {

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});

    const handleReset = () => {
        setSearch('');
        setFilters({});
    };
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
                    />

                </aside>

                <section className="gym-grid">
                    {gyms.map((gym) => (
                        <GymCard key={gym.id} gym={gym} />
                    ))}
                </section>
            </div>
            <div className='gym-footer-banner'>
                <AppDownloadBanner />
            </div>
        </>
    )
}