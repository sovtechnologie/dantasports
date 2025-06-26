import api from "../../api.js"; // Correct import (use the actual exported name)

export const fetchSportList = async () => {
  try {
    const response = await api.get('/home/getSportsList'); 
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch sports list:", error);
    throw error; // re-throw if you want the calling code to handle it
  }
};

export const fetchSportPriceChart = async(sportId,venueId) =>{
  try {
    const response = await api.post('/user/home/getPriceListBySports', 
      { sportId, venueId }
    );
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch sport price chart:", error);
    throw error; // re-throw if you want the calling code to handle it
  }
}
