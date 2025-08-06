import "../../Stylesheets/Filterpages/GymFilter.css"
import GymCard from '../../components/GymCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import gymImage from '../../assets/GymImage.svg';
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchGym } from "../../../../hooks/GymList/useFetchGym.js"
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";

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
    const userId = useSelector((state) => state.auth.id);
    const [gymList, setGymList] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});

    // fetch eventlist
    const payload = {
        lat: null,
        lng: null,
        userId: userId || null,
    }
    const { data: AllGymdata, isLoading, isError, error } = useFetchGym(payload);

    const handleReset = () => {
        setSearch('');
        setFilters({});
    };

    useEffect(() => {
        if (AllGymdata?.status === 200) {
            setGymList(AllGymdata.result);
        }
    }, [AllGymdata]);
    console.log(gymList)

    const formattedGymList = useMemo(() => {
        return gymList.map((gym) => ({
            id: gym.Id,
            image: gym.desktop_image || gym.mobile_image,
            title: gym.gym_name,
            location: gym.full_address,
            distance: gym.distance || 0,
            rating: gym.rating || 0,
            ratingCount: gym.ratingCount || 0,
            discountText: gym.discountText || 'Upto 50% off',
            priceText: gym.priceText || '1000 onwards',
            vendorId: gym.vendor_id,
            favouriteId: gym.favourite_gym_id,
            favourite: gym.favourite,
        }));
    }, [gymList]);


    if (isLoading) return <div> <VenueListShimmer /></div>;
    if (isError) return <div>Error loading events: {error.message}</div>;

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
                    {/* {gyms.map((gym) => (
                        <GymCard key={gym.id} gym={gym} />
                    ))} */}
                    {formattedGymList.map((gym) => (
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