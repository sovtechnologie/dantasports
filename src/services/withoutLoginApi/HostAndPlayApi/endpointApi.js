import api from "../../api";

export const fetchHostList = async(payload) =>{
    try {
        const response = await api.post("user/hostAndPlay/getHostAndPlayList",payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch host and play list");
        throw error;
    }
}