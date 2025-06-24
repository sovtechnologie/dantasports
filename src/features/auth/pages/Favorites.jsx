import React, { useState } from 'react';
import '../StyleSheets/Favorites.css';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriteVenue } from '../../../services/LoginApi/FavouritesVenueApi.js/endpointApi';
import FavoriteVenueCard from '../components/FavoriteVenueCard';
import CricketLogo from "../assets/VenueCardLogo/CricketLogo.png";
import FootballLogo from "../assets/VenueCardLogo/FootballLogo.png";
import { useUnlikeVenue } from "../../../hooks/favouriteVenue/useUnlikeVenue.js";
import { useQueryClient } from '@tanstack/react-query';

// const FavoritesVenueData = [
//   {
//     id: 1,
//     title: "Red Meadows",
//     type: "5x5, Football",
//     date: "Wed, 04 Sep 2024",
//     time: "09:00 am – 10:00 am",
//     reference: "#00256",
//     status: "all Booking",
//   },
//   {
//     id: 2,
//     title: "Red Meadows",
//     type: "5x5, Football",
//     date: "Thu, 05 Sep 2024",
//     time: "11:00 am – 12:00 pm",
//     reference: "#00257",
//     status: "upcoming",
//   },
//   {
//     id: 3,
//     title: "Red Meadows",
//     type: "5x5, Football",
//     date: "Fri, 01 Sep 2024",
//     time: "08:00 am – 09:00 am",
//     reference: "#00258",
//     status: "completed",
//   },
//   {
//     id: 4,
//     title: "Red Meadows",
//     type: "5x5, Football",
//     date: "Sat, 02 Sep 2024",
//     time: "10:00 am – 11:00 am",
//     reference: "#00259",
//     status: "cancelled",
//   },
// ];

const FavoritesSportData = [
  {
    id: 1,
    title: "Football",
    image: "https://example.com/football.jpg",
  },
  {
    id: 2,
    title: "Basketball",
    image: "https://example.com/basketball.jpg",
  },
  {
    id: 3,
    title: "Cricket",
    image: "https://example.com/cricket.jpg",
  },
  {
    id: 4,
    title: "Tennis",
    image: "https://example.com/tennis.jpg",
  },
];

const ITEMS_PER_PAGE = 4;
const tabs = ["Venue", "Sport"];

const Favorites = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const [activeTab, setActiveTab] = useState("Venue");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading: isFavoriteVenue, isError: isFavouriteVenueError } = useQuery({
    queryKey: ['favoritesVenue'],
    queryFn: () => fetchFavoriteVenue(),
    enabled: !!token, // Only fetch if userId is available
  });

  const FavoritesVenueData = data?.result || [];


  const { mutate: unlikeVenue } = useUnlikeVenue();

  const toggleFavourite = (venue) => {
    unlikeVenue({ favouriteVenueId: venue.favoourite_venue_id }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['favoritesVenue']);
      },
      onError: (error) => {
        console.error("Error unliking venue:", error);
      },
    });

  };


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  const paginatedVenues = FavoritesVenueData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(FavoritesVenueData.length / ITEMS_PER_PAGE);

  if (isFavoriteVenue) return <p>Loading favorite venues...</p>;
  if (isFavouriteVenueError) return <p>Error loading favorite venues.</p>;

  return (
    <div className="Favourite-main-container">
      <div className="favorite-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <h3 className="favorite-section-title">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h3>

      {activeTab === "Venue" ? (
        <>
          {FavoritesVenueData.length === 0 ? (
            <p>No favorite venues yet.</p>
          ) : (
            <>
              <div className="favorites-list">
                {paginatedVenues.map((venue) => {
                  const formattedVenue = {
                    id: venue.id,
                    image: venue.cover_image,
                    sportsIcons: [CricketLogo, FootballLogo],
                    name: venue.venue_name,
                    about: venue.about_venue,
                    rating: 4.5,
                    reviews: 20,
                    address: `${venue.area}, ${venue.city}`,
                    distance: "3",
                    offer: "10% Off",
                    price: `₹${venue.pricing}`,
                    favourite: venue.favourite
                  };
                  return (
                    <div key={venue.id} className="favorite-card">
                      <FavoriteVenueCard venue={formattedVenue} onLikeToggle={() => toggleFavourite(venue)} />
                    </div>)
                })}
              </div>

              <div className="pagination-controls">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      ) : (

        <>{FavoritesSportData.length === 0 ? (
          <p>No favorite sports yet.</p>
        ) : (
          <>
            <div className="favorites-list sport-list">
              {FavoritesSportData.map((sport) => (
                <div key={sport.id} className="favorite-sport-card">
                  <img src={sport.image} alt={sport.title} className="sport-image" />
                  <h3>{sport.title}</h3>
                </div>
              ))}
            </div>
          </>
        )}
        </>

      )}
    </div>
  );
};

export default Favorites;



//  {FavoritesData?.length === 0 ? (
//         <p>No favorite venues yet.</p>
//       ) : (
//         <div className="favorites-list">
//           {FavoritesData.map((venue) => (
//             <div key={venue.id} className="favorite-card">
//               <h3>{venue.title}</h3>
//               <p>{venue.date}</p>
//               {/* Customize fields below based on your actual data shape */}
//               <p>Location: {venue.status}</p>
//               <p>Category: {venue.type}</p>
//               {/* Add image or buttons if needed */}
//             </div>
//           ))}
//         </div>
//       )}