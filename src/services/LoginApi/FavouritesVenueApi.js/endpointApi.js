
import api from "../../api";

export const fetchFavoriteVenue = async (userId) => {
  try {
    const response = await api.get('/user/favoriteVenue/getFavoriteVenueList',{userId});
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite venue:", error);
    throw error;
  }
}

export const addFavoriteVenue = async ({userId, venueId}) => {
  try {
    const response = await api.post('/user/favoriteVenue/addFavoriteVenue', { userId,venueId });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite venue:", error);
    throw error;
  }
}

export const removeFavoriteVenue = async (favoiritesVenueId) => {
  try {
    const response = await api.post('/user/favoriteVenue/removeFavoritesVenue', {
    favoiritesVenueId
    });
    return response.data;
  } catch (error) {
    console.error("Error removing favorite venue:", error);
    throw error;
  }
};

