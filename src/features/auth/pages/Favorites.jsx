import React from 'react';
import '../StyleSheets/Favorites.css';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriteVenue } from '../../../services/LoginApi/FavouritesVenueApi.js/endpointApi';
import { useSelector } from 'react-redux';

const Favorites = () => {
 const userId = useSelector((state) => state.auth?.id);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['favoriteVenues'],
    queryFn: fetchFavoriteVenue(userId),
  });

  if (isLoading) return <div className="main-content">Loading favorites...</div>;
  if (isError) return <div className="main-content">Error: {error.message}</div>;

  return (
    <div className="main-content">
      {data?.length === 0 ? (
        <p>No favorite venues yet.</p>
      ) : (
        <div className="favorites-list">
          {data.map((venue) => (
            <div key={venue.id} className="favorite-card">
              <h3>{venue.name}</h3>
              <p>{venue.description}</p>
              {/* Customize fields below based on your actual data shape */}
              <p>Location: {venue.location}</p>
              <p>Category: {venue.category}</p>
              {/* Add image or buttons if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
