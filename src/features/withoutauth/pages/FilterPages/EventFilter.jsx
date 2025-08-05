import "../../Stylesheets/Filterpages/EventFilter.css"
import EventCard from '../../components/EventCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import eventImage from '../../assets/EventImage2.svg';
import sportIcon from '../../assets/VenueCardLogo/CricketLogo.png';
import { useState } from "react";

const events = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Kothaligad Fireflies Trek 2025 | Adventure Geek",
    rating: 4.7,
    RatingCount:173,
    price: '₹1000 onwards',
    offer:'Upto 50% off',
    location: "Karjat Junction, Karjat",
    date: "22 Jun – 23 Jun | 6AM -10PM",
    image: eventImage, // Use a sample image path
    sportIcon:sportIcon,
}));

export default function EventFilterPage(){

      const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});

    const handleReset = () => {
        setSearch('');
        setFilters({});
    };
    return(
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
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </section>
            </div>
            <div className='event-footer-banner'>
                <AppDownloadBanner />
            </div>
        </>
    )
}