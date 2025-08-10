import "../../Stylesheets/Filterpages/EventFilter.css"
import EventCard from '../../components/EventCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import eventImage from '../../assets/EventImage2.svg';
import sportIcon from '../../assets/VenueCardLogo/CricketLogo.png';
import { useEffect, useState } from "react";
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
    name: "Kothaligad Fireflies Trek 2025 | Adventure Geek",
    rating: 4.7,
    RatingCount: 173,
    price: '₹1000 onwards',
    offer: 'Upto 50% off',
    location: "Karjat Junction, Karjat",
    date: "22 Jun – 23 Jun | 6AM -10PM",
    image: eventImage, // Use a sample image path
    sportIcon: sportIcon,
}));

export default function EventFilterPage() {
    const userId = useSelector((state) => state.auth.id);
    const queryClient = useQueryClient();
    const [eventList, setEventList] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});


    // fetch eventlist
    const payload = {
        lat: null,
        lng: null,
        userId: userId || null,
        type: 1
    }
    const { data: AllEventdata, isLoading, isError, error } = useFetchEvent(payload);

    const handleReset = () => {
        setSearch('');
        setFilters({});
    };

    useEffect(() => {
        if (AllEventdata?.status == 200) {
            setEventList(AllEventdata.result);
        }
    }, [AllEventdata]);
    console.log(eventList)

    if (isLoading) return <div> <VenueListShimmer /></div>;
    if (isError) return <div>Error loading events: {error.message}</div>;
    return (
        <>
            <div className="event-filter-container">
                <aside className="event-filter-sidebar">
                    <SortSection
                        filters={filters}
                        setFilters={setFilters}
                        search={search}
                        setSearch={setSearch}
                        handleReset={handleReset}
                    />

                </aside>

                <section className="event-grid">
                    {eventList.map((evt) => {
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
                            image: evt.desktop_image ||eventImage,
                            sportIcon: evt.sports|| ''
                        };

                        return (

                            <EventCard
                                key={evt.id}
                                event={formattedEvent}
                            />

                        );
                    })}

                </section>
            </div>
            <div className='event-footer-banner'>
                <AppDownloadBanner />
            </div>
        </>
    )
}