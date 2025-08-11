import "../../Stylesheets/Filterpages/GymFilter.css"
import GymCard from '../../components/GymCard.jsx';
import SortSection from '../../components/SortSection';
import AppDownloadBanner from '../../components/AppDownloadBanner.jsx';
import gymImage from '../../assets/GymImage.svg';
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchGym } from "../../../../hooks/GymList/useFetchGym.js"
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer.jsx";
import { useLikeGym } from "../../../../hooks/FavouriteGym/useLikeGym.js";
import { useUnlikeGym } from "../../../../hooks/FavouriteGym/useUnlikeGym.js";
import { useQueryClient } from "@tanstack/react-query";


export default function GymFilterPage() {
    const userId = useSelector((state) => state.auth.id);
    const queryClient = useQueryClient();
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
    const likeGym = useLikeGym();
    const unlikeGym = useUnlikeGym();

    const toggleFavourite = (gym) => {
        const gymId = gym.id;

        setGymList((prevList) =>
            prevList.map((v) =>
                v.id === gymId ? { ...v, favourite: !v.favourite } : v
            )
        );

        if (!gym.favourite) {
            likeGym.mutate({ gymId, userId: userId }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(['GymList', userId || null]);
                },
                onError: () => {
                    setGymList((prevList) =>
                        prevList.map((v) =>
                            v.id === gymId ? { ...v, favourite: false } : v
                        )
                    );
                },
            });
        } else {
            unlikeGym.mutate({ gymFavouriteId: gym.favouriteId }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(['GymList', userId || null]);
                },
                onError: () => {
                    setGymList((prevList) =>
                        prevList.map((v) =>
                            v.id === gymId ? { ...v, favourite: true } : v
                        )
                    );
                },
            });
        }
    };

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

                    {formattedGymList.map((gym) => (
                        <GymCard
                            key={gym.id}
                            gym={gym}
                            isLiked={gym?.favourite}
                            onLikeToggle={() => toggleFavourite(gym)}
                        />
                    ))}
                </section>
            </div>
            <div className='gym-footer-banner'>
                <AppDownloadBanner />
            </div>
        </>
    )
}