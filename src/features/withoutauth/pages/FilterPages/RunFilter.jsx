

import React, { useState } from 'react';
import '../../Stylesheets/Filterpages/RunFilter.css';
import RunCard from '../../components/RunCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import eventImage from '../../assets/EventImage.svg';
import sportIcon from '../../assets/VenueCardLogo/CricketLogo.png';

const events = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Green Run Open Marathon",
    rating: 4.7,
    RatingCount:173,
    price: '₹1000 onwards',
    offer:'Upto 50% off',
    location: "Palika Bazar Gate 1, Delhi–451200",
    date: "22 Jun – 23 Jun | 6AM onwards",
    image: eventImage, // Use a sample image path
    sportIcon:sportIcon,
}));

export default function RunFilterPage() {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});

    const handleReset = () => {
        setSearch('');
        setFilters({});
    };

    return (
        <>
            <div className="run-filter-container">
                <aside className="run-filter-sidebar">
                    <SortSection
                        filters={filters}
                        setFilters={setFilters}
                        search={search}
                        setSearch={setSearch}
                        handleReset={handleReset}
                    />

                </aside>

                <section className="run-grid">
                    {events.map((event) => (
                        <RunCard key={event.id} event={event} />
                    ))}
                </section>
            </div>
            <div className='run-footer-banner'>
                <AppDownloadBanner />
            </div>
        </>
    );
}
