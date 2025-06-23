import api from "../../api";


export const fetchVenueList = async () => {

  try {
    const response = await api.get('/home/venueList');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Venue list:", error);
    throw error;
  }
}

export const fetchVenueById = async (venueId) => {
  try {
    console.log('📡 Sending venueId:', venueId);

    const response = await api.post('/home/getSingleVenue', { venueId }); // JSON body
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch venue:", error);
    throw error;
  }
};

// export const fetchVenueById = async (venueId) => {
//   try {
//     const formData = new URLSearchParams();
//     formData.append('venueId', venueId);

//     const response = await api.gpost('/home/getSingleVenue', formData, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("❌ Failed to fetch venue:", error);
//     throw error;
//   }
// };

// export const fetchVenueById = async (venueId) => {
//   try {
//     const response = await api.get(`/home/getSingleVenue?venueId=${venueId}`);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Failed to fetch venue:", error);
//     throw error;
//   }
// };


