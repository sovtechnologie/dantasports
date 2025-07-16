import api from "../../api";

export const Sort = async (payload) => {
    try {
        
        const response = await api.post('user/home/getVenueSort',payload);
        return response.data;

    } catch(error) {
        console.error("Failed to sort venues", error);
        throw error;
    }
}