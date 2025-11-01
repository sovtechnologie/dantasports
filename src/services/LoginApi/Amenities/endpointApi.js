import api from "../../api";

export const getAmenitiesList = async () => {
  try {
    const response = await api.get("home/getAmentiesActiveList");
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch amenities list:", error);
    throw error;
  }
};
