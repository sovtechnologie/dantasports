import React, { useEffect, useState } from 'react';
import '../StyleSheets/Favorites.css';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriteVenue } from '../../../services/LoginApi/FavouritesVenueApi/endpointApi';
import { fetchfavoriteSport } from '../../../services/LoginApi/FavouriteSportApi/endpointApi.js';
import FavoriteVenueCard from '../components/FavoriteVenueCard';
import CricketLogo from "../assets/VenueCardLogo/CricketLogo.png";
import FootballLogo from "../assets/VenueCardLogo/FootballLogo.png";
import { useUnlikeVenue } from "../../../hooks/favouriteVenue/useUnlikeVenue.js";
import { useDeleteSport } from '../../../hooks/favouriteSport/useDeleteSport.js';
import { useQueryClient } from '@tanstack/react-query';
import AddSportModal from "../components/Modal/AddSportModal.jsx";
import DeleteIcon from "../assets/DeleteIcon.png";
import { fetchFavoriteGym } from '../../../services/LoginApi/FavouriteGymApi/endpointApi.js';
import { fetchFavoriteEvent } from '../../../services/LoginApi/FavouriteEventApi/endpointApi.js';
import { useUnlikeGym } from '../../../hooks/FavouriteGym/useUnlikeGym.js';
import { useUnlikeEvent } from '../../../hooks/favouriteEvent/useUnLikeEvent.js';




const ITEMS_PER_PAGE = 4;
const SPORTS_PER_PAGE = 12;

const tabs = ["Venue","Gym","Event","Sport"];

const Favorites = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const [activeTab, setActiveTab] = useState("Venue");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSportModalOpen, setIsSportModalOpen] = useState(false);
  const [sportPage, setSportPage] = useState(1);
  const [gymPage, setGymPage] = useState(1);
const [eventPage, setEventPage] = useState(1);

   const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const queryClient = useQueryClient();

  const { data: sportList, isLoading: isSportListLoading, isError: isSportListError, error } = useQuery({
    queryKey: ['favoritesSport'],
    queryFn: () => fetchfavoriteSport(), // Assuming this fetches the sport list,
    enabled: !!token, // Only fetch if token is available
  });

  const { data: gymData, isLoading: isFavoriteGym, isError: isFavouriteGymError } = useQuery({
  queryKey: ['favoritesGym', lat, lng],
  queryFn: () => fetchFavoriteGym(lat, lng),
  enabled: !!token && !!lat && !!lng, 
});

const FavoritesGymData = Array.isArray(gymData?.result) ? gymData.result : [];

console.log("FavoritesGymData", FavoritesGymData);

const { data: eventData, isLoading: isFavoriteEvent, isError: isFavouriteEventError } = useQuery({
  queryKey: ['favoritesEvent', lat, lng],
  queryFn: () => fetchFavoriteEvent(lat, lng),
  enabled: !!token && !!lat && !!lng,
});

const FavoritesEventData = Array.isArray(eventData?.data) ? eventData.data : [];
console.log("FavoritesEventData", FavoritesEventData);



  const FavoritesSportData = sportList?.result || [];
   
  // ✅ Step 1: Get user location once component mounts
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      (error) => {
        console.error("Location access denied:", error);
        // fallback (in case user denies)
        setLat(28.42624);
        setLng(77.33248);
      }
    );
  }, []);

   const { data, isLoading: isFavoriteVenue, isError: isFavouriteVenueError } = useQuery({
    queryKey: ['favoritesVenue', lat, lng],
    queryFn: () => fetchFavoriteVenue(lat, lng),
    enabled: !!token && !!lat && !!lng, // ✅ only run when token + location available
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
const { mutate: unlikeGym } = useUnlikeGym({
  onSuccess: () => queryClient.invalidateQueries(['favoritesGym'])
});

const { mutate: unlikeEvent } = useUnlikeEvent({
  onSuccess: () => queryClient.invalidateQueries(['favoritesEvent'])
});
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
  const paginatedGyms = FavoritesGymData.slice(
  (gymPage - 1) * ITEMS_PER_PAGE,
  gymPage * ITEMS_PER_PAGE
);

const totalGymPages = Math.ceil(FavoritesGymData.length / ITEMS_PER_PAGE);

const paginatedEvents = FavoritesEventData.slice(
  (eventPage - 1) * ITEMS_PER_PAGE,
  eventPage * ITEMS_PER_PAGE
);

const totalEventPages = Math.ceil(FavoritesEventData.length / ITEMS_PER_PAGE);


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

      {/* {activeTab === "Venue" ? (
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
          {/* {isSportModalOpen && (
            <AddSportModal
              title="Add New Sport"
              onClose={() => setIsSportModalOpen(false)}
              onSubmit={handleAddSport}
            />
          )}
        </>

      )} */} 
      {activeTab === "Venue" ? (
  // ✅ Venue UI
  <>
    {FavoritesVenueData.length === 0 ? (
      <p>No favorite venues yet.</p>
    ) : (
      <>
        <div className="favorites-list">
          {paginatedVenues.map((venue) => {
            const sportsIcons = (venue.venue_favourite_sports || []).map(
    (sport) => sport.image
  );
            const formattedVenue = {
              id: venue.id,
              image: venue.cover_image,
              sportsIcons: sportsIcons,
              name: venue.venue_name,
              about: venue.about_venue,
              rating: venue.average_rating || "0",
              reviews: venue.review_count||"0",
              address: `${venue.area}, ${venue.city}`,
             distance: venue.distance_km ? parseFloat(venue.distance_km).toFixed(1) : "0",
              offer: "10% Off",
              price: `₹${venue.pricing}`,
              favourite: venue.favourite
            };
            return (
              <div key={venue.id} className="favorite-card">
                <FavoriteVenueCard venue={formattedVenue} onLikeToggle={() => toggleFavourite(venue)} />
              </div>
            );
          })}
        </div>

        <div className="pagination-controls">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </>
    )}
  </>
) : activeTab === "Sport" ? (
  // ✅ Sport UI
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
              <button className="remove-sport-button">
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
      </>
    )}

    {isSportModalOpen && (
      <AddSportModal
        title="Add New Sport"
        onClose={() => setIsSportModalOpen(false)}
        onSubmit={handleAddSport}
      />
    )}
  </>
) : activeTab === "Gym" ? (
  // ✅ Gym UI
  <>
    {isFavoriteGym ? (
      <p>Loading favorite gyms...</p>
    ) : isFavouriteGymError ? (
      <p>Error loading favorite gyms.</p>
    ) : FavoritesGymData.length === 0 ? (
      <p>No favorite gyms yet.</p>
    ) : (
      <div className="favorites-list">
        {paginatedGyms.map((gym) => {
           const sportsIcons = (gym.gym_favourite_sports || []).map(
    (sport) => sport.image
  );
          const formattedGym = {
            id: gym.id,
            image: gym.cover_image,
            name: gym.gym_name,
            rating: gym.average_rating || "0",
            reviews: gym.review_count||"0",
            about: gym.about_gym,
            address: `${gym.area}, ${gym.city}`,
           distance: gym.distance ? parseFloat(gym.distance).toFixed(1) : "0",
            price: `₹${"0"}`,
              sportsIcons:  sportsIcons, 
          };
          return (
            <div key={gym.id} className="favorite-card">
              <FavoriteVenueCard  key={gym.id} venue={formattedGym}   onLikeToggle={() => unlikeGym({ gymFavouriteId: gym.favourite_id })} />
            </div>
          );
        })}
      </div>
    )}
    <div className="pagination-controls">
  <button onClick={() => setGymPage((prev) => Math.max(prev - 1, 1))} disabled={gymPage === 1}>
    Previous
  </button>
  <span>Page {gymPage} of {totalGymPages}</span>
  <button onClick={() => setGymPage((prev) => Math.min(prev + 1, totalGymPages))} disabled={gymPage === totalGymPages}>
    Next
  </button>
</div>

  </>
 ) : activeTab === "Event" ? (
  
  <>
    {isFavoriteEvent ? (
      <p>Loading favorite events...</p>
    ) : isFavouriteEventError ? (
      <p>Error loading favorite events.</p>
    ) : FavoritesEventData.length === 0 ? (
      <p>No favorite events yet.</p>
    ) : (
      <div className="favorites-list">
        {paginatedEvents.map((event) => {
         
  const sportsIcons = (event.even_favourite_sports || []).map(
    (sport) => sport.image
  );
          const formattedEvent = {
            id: event.Id,
            image: event.desktop_image,
            sportsIcons: sportsIcons, 
            name: event.event_title,
            about: event.about_event,
            address: event.locations && event.locations.length > 0 
            ? `${event.locations[0].area}, ${event.locations[0].city}` 
            : "Address not available",
            rating: event.average_rating || 4.2,
             reviews: event.review_count||"0",
            distance: `${parseFloat(event.distance || 0).toFixed(1)}`,
            price: `₹${event.ticket_price || 0}`,
          };
          return (
            <div key={event.Id} className="favorite-card">
              <FavoriteVenueCard key={event.id} venue={formattedEvent} onLikeToggle={() => unlikeEvent({ eventFavouriteId: event.favourite_id })}   />
            </div>
          );
        })}
      </div>
    )}
    <div className="pagination-controls">
  <button onClick={() => setEventPage((prev) => Math.max(prev - 1, 1))} disabled={eventPage === 1}>
    Previous
  </button>
  <span>Page {eventPage} of {totalEventPages}</span>
  <button onClick={() => setEventPage((prev) => Math.min(prev + 1, totalEventPages))} disabled={eventPage === totalEventPages}>
    Next
  </button>
</div>

  </>
) : (
  <p>Coming soon...</p>
)}
    </div>
  );
};

export default Favorites;



