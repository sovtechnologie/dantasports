import api from "../../api";

export const fetchVenueList = async (payload) => {
  try {
    const response = await api.post("home/venueList",payload);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Venue list:", error);
    throw error;
  }
};

export const fetchVenueListByUserId = async (payload) => {
  try {
    const response = await api.post("home/venueList", payload);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Venue list with favourite Venue:", error);
    throw error;
  }
};

export const fetchVenueById = async (venueId, userId) => {
  try {
    console.log("📡 Sending venueId:", venueId, userId);

    const response = await api.post("home/getSingleVenue", { venueId, userId }); // JSON body
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch venue:", error);
    throw error;
  }
};
