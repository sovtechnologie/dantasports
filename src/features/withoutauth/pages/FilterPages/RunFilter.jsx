

import React, { useEffect, useState } from 'react';
import '../../Stylesheets/Filterpages/RunFilter.css';
import RunCard from '../../components/RunCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import eventImage from '../../assets/EventImage.svg';
import sportIcon from '../../assets/VenueCardLogo/CricketLogo.png';
import { useFetchEvent } from "../../../../hooks/EventList/useFetchEvents.js";
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

// const events = Array.from({ length: 12 }, (_, i) => ({
//     id: i + 1,
//     name: "Green Run Open Marathon",
//     rating: 4.7,
//     RatingCount: 173,
//     price: '₹1000 onwards',
//     offer: 'Upto 50% off',
//     location: "Palika Bazar Gate 1, Delhi–451200",
//     date: "22 Jun – 23 Jun | 6AM onwards",
//     image: eventImage, 
//     sportIcon: sportIcon,
// }));

export default function RunFilterPage() {
    const userId = useSelector((state) => state.auth.id);
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
        if (AllRundata?.status === 200) {
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
                    {/* {events.map((event) => (
                        <RunCard key={event.id} event={event} />
                    ))} */}
                    {runList.map((evt) => {
                        const formattedEvent = {
                            id: evt.id,
                            name: evt.event_title,
                            rating: evt.rating ?? 0,
                            RatingCount: evt.ratingCount ?? 0,
                            price: `₹${parseInt(evt.lowest_ticket_price)} onwards`,
                            offer: evt.offer ?? 'No offer',
                            location: `${evt.locations[0]?.area}, ${evt.locations[0]?.city}` || '',
                            date: `${new Date(evt.start_date).toLocaleDateString('en-GB', {
                                day: '2-digit', month: 'short'
                            })} – ${new Date(evt.end_date).toLocaleDateString('en-GB', {
                                day: '2-digit', month: 'short'
                            })} | ${formatTime(evt.start_time)}‑${formatTime(evt.end_time.slice(0, 5))}`,
                            image: evt.desktop_image || eventImage,
                            sportIcon: evt.sports || ''
                        };

                        return (

                            <RunCard
                                key={evt.id}
                                event={formattedEvent}
                            />

                        );
                    })}
                </section>
            </div>
            <div className='run-footer-banner'>
                <AppDownloadBanner />
            </div>
        </>
    );
}
