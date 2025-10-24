import api from "../../api";

export const fetchFavoriteEvent= async (latitude, longitude) => {
  try {
    const response = await api.get(`user/event/getEventFavouriteList/${latitude}/${longitude}`);
    console.log("09987565565t5656",response);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite venue:", error);
    throw error;
  }
};



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
