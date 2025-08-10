

import React, { useEffect, useState } from 'react';
import '../../Stylesheets/Filterpages/RunFilter.css';
import RunCard from '../../components/RunCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import eventImage from '../../assets/EventImage.svg';
import sportIcon from '../../assets/VenueCardLogo/CricketLogo.png';
import { useFetchEvent } from "../../../../hooks/EventList/useFetchEvents.js";
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";

// Formats "15:00", "15:00:30" → "03:00 PM"
function formatTime(timeStr = "00:00") {
    if (!timeStr) return "";  // Return an empty string or suitable default

    const parts = timeStr.split(':');
    const h = Number(parts[0] || 0);
    const m = Number(parts[1] || 0);
    const s = parts.length > 2 ? Number(parts[2]) : 0;

    const dt = new Date();
    dt.setHours(h, m, s);

    return dt.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

const events = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Green Run Open Marathon",
    rating: 4.7,
    RatingCount: 173,
    price: '₹1000 onwards',
    offer: 'Upto 50% off',
    location: "Palika Bazar Gate 1, Delhi–451200",
    date: "22 Jun – 23 Jun | 6AM onwards",
    image: eventImage, // Use a sample image path
    sportIcon: sportIcon,
}));

export default function RunFilterPage() {
    const userId = useSelector((state) => state.auth.id);
    const queryClient = useQueryClient();
    const [runList, setRunList] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});

    // fetch eventlist
    const payload = {
        lat: null,
        lng: null,
        userId: userId || null,
        type: 2
    }
    const { data: AllRundata, isLoading, isError, error } = useFetchEvent(payload);


    const handleReset = () => {
        setSearch('');
        setFilters({});
    };

    useEffect(() => {
            if (AllRundata?.status == 200) {
                setRunList(AllRundata.result);
            }
        }, [AllRundata]);
        console.log(runList)
    
        if (isLoading) return <div> <VenueListShimmer /></div>;
        if (isError) return <div>Error loading events: {error.message}</div>;
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
