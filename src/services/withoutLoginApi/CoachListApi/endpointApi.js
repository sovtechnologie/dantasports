import api from "../../api";

export const fetchCoachList = async (payload) => {
    try {
        const response = await api.post("user/academyCoaches/getAcademyCoachesList",payload);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Coach list:", error);
        throw error;
    }
};

export const fetchCoachDetails = async(id) =>{
    try {
        const response = await api.post("user/academyCoaches/getSingelAcademyCoachesList",{id})
        return response.data;
    } catch (error) {
         console.error("Failed to fetch Coach Details:", error);
        throw error;
    }
}

export const CreateQuery = async(academyCoachesId) =>{
    try {
        const response = await api.post("user/academyCoaches/createQuery",{academyCoachesId});
        return response.data;
    } catch (error) {
          console.error("Failed to Create Query:", error);
        throw error;
    }
}