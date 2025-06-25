import React, { useState } from 'react';
import '../StyleSheets/Favorites.css';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriteVenue } from '../../../services/LoginApi/FavouritesVenueApi.js/endpointApi';
import { fetchfavoriteSport } from '../../../services/LoginApi/FavouriteSportApi/endpointApi.js';
import FavoriteVenueCard from '../components/FavoriteVenueCard';
import CricketLogo from "../assets/VenueCardLogo/CricketLogo.png";
import FootballLogo from "../assets/VenueCardLogo/FootballLogo.png";
import { useUnlikeVenue } from "../../../hooks/favouriteVenue/useUnlikeVenue.js";
import { useDeleteSport } from '../../../hooks/favouriteSport/useDeleteSport.js';
import { useQueryClient } from '@tanstack/react-query';
import AddSportModal from "../components/Modal/AddSportModal.jsx";
import DeleteIcon from "../assets/DeleteIcon.png";



const ITEMS_PER_PAGE = 4;
const SPORTS_PER_PAGE = 12;

const tabs = ["Venue", "Sport"];

const Favorites = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const [activeTab, setActiveTab] = useState("Venue");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSportModalOpen, setIsSportModalOpen] = useState(false);
  const [sportPage, setSportPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: sportList, isLoading: isSportListLoading, isError: isSportListError, error } = useQuery({
    queryKey: ['favoritesSport'],
    queryFn: () => fetchfavoriteSport(), // Assuming this fetches the sport list,
    enabled: !!token, // Only fetch if token is available
  });

  const FavoritesSportData = sportList?.result || [];

  const { data, isLoading: isFavoriteVenue, isError: isFavouriteVenueError } = useQuery({
    queryKey: ['favoritesVenue'],
    queryFn: () => fetchFavoriteVenue(),
    enabled: !!token, // Only fetch if userId is available
  });

  const FavoritesVenueData = data?.result || [];
  console.log("FavoritesVenueData", FavoritesVenueData);


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

  const { mutate: deleteSport, } = useDeleteSport();
  const handleSportDelete = (favoriteSportsId) => {
    deleteSport(favoriteSportsId);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when tab changes
    setSportPage(1);
  };

  const handleAddSport = () => {
    // Add sport logic (connect API/form here)
    console.log("Sport added");
    setIsSportModalOpen(false);
  };

  const paginatedVenues = FavoritesVenueData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(FavoritesVenueData.length / ITEMS_PER_PAGE);

  const paginatedSports = [...FavoritesSportData].slice(
    (sportPage - 1) * SPORTS_PER_PAGE,
    sportPage * SPORTS_PER_PAGE
  );


  const totalSportPages = Math.ceil(FavoritesSportData.length / SPORTS_PER_PAGE);

  if (isFavoriteVenue) return <p>Loading favorite venues...</p>;
  if (isFavouriteVenueError) return <p>Error loading favorite venues.</p>;
  if (isSportListLoading) return <p>Loading favorite sports...</p>;
  if (isSportListError) return <p>Error loading favorite sports. {error.message}</p>;

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

        <>
          <button className="add-sport-button" onClick={() => setIsSportModalOpen(true)}>
            <span className="add-sport-icon">+</span>
            <span className="add-sport-text">Add Sport</span>
          </button>

          {FavoritesSportData.length === 0 ? (
            <p>No favorite sports yet.</p>
          ) : (
            <>
              <div className="sport-list">
                {paginatedSports.map((sport) => (
                  <div key={sport.favoourite_sports_id} className="favorite-sport-card">
                    <img src={sport.sports_images} alt={sport.sports_name} className="sport-image" />
                    <h3 className='sport-name'>{sport.sports_name}</h3>
                    <button
                      className="remove-sport-button">
                      <img
                        src={DeleteIcon}
                        alt="Remove Sport"
                        className="remove-sport-icon"
                        onClick={() => handleSportDelete(sport.favoourite_sports_id)}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pagination-controls">
                <button
                  onClick={() => setSportPage((prev) => Math.max(prev - 1, 1))}
                  disabled={sportPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {sportPage} of {totalSportPages}
                </span>
                <button
                  onClick={() => setSportPage((prev) => Math.min(prev + 1, totalSportPages))}
                  disabled={sportPage === totalSportPages}
                >
                  Next
                </button>
              </div>

            </>
          )}
          {/* Reusable Modal for Adding Sport */}
          {isSportModalOpen && (
            <AddSportModal
              title="Add New Sport"
              onClose={() => setIsSportModalOpen(false)}
              onSubmit={handleAddSport}
            />
          )}
        </>

      )}
    </div>
  );
};

export default Favorites;



