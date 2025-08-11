import api from "../../api";


export const addFavoriteEvent = async ({ userId, eventId ,type}) => {
  try {
    const response = await api.post("user/event/addEventFavourite", {
      userId,
      eventId,
      type
    });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite gym:", error);
    throw error;
  }
};

export const removeFavoriteEvent = async ({favouriteEventId,type}) => {
  try {
    const response = await api.post("user/event/removeEventFavourite", {
      favouriteEventId,type
    });
    return response.data;
  } catch (error) {
    console.error("Error removing favorite event:", error);
    throw error;
  }
};
