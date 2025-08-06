import api from "../../api";

export const fetchGymList = async (payload) => {
    try {
        const response = await api.post("user/gym/getGymList", payload);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Gym list:", error);
        throw error;
    }
};

export const fetchGymListById = async (payload) => {
    try {
        const response = await api.post("user/gym/getGymList", payload);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Gym list:", error);
        throw error;
    }
}