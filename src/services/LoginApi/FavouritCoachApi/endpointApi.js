import api from "../../api";

export const addFavoriteCoach = async ({ userId, coachesId }) => {
  try {
    const response = await api.post("user/favouriteCoaches/addFavouriteCoaches", {
      coachesId,
      userId
    });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite coach:", error);
    throw error;
  }
};

export const removeFavoriteCoach = async ({ favouriteCoachesId }) => {
  try {
    const response = await api.post("user/favouriteCoaches/removeFavouriteCoaches", {
      favouriteCoachesId,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing favorite coach:", error);
    throw error;
  }
};

export const getFavoriteCoachesList = async (latitude, longitude) => {
  try {
    const response = await api.get(
      `user/favouriteCoaches/getFavouriteCoachesList/${latitude}/${longitude}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite coaches list:", error);
    throw error;
  }
};
