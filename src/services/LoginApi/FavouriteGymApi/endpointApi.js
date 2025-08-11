import api from "../../api";


export const addFavoriteGym = async ({ userId, gymId }) => {
  try {
    const response = await api.post("user/gym/addGymFavourite", {
      userId,
      gymId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite gym:", error);
    throw error;
  }
};

export const removeFavoriteGym = async (gymFavouriteId) => {
  try {
    const response = await api.post("user/gym/removeGymFavourite", {
      gymFavouriteId
    });
    return response.data;
  } catch (error) {
    console.error("Error removing favorite gym:", error);
    throw error;
  }
};