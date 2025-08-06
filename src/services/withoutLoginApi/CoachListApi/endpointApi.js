import api from "../../api";

export const fetchCoachList = async () => {
    try {
        const response = await api.post("user/academyCoaches/getAcademyCoachesList");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Coach list:", error);
        throw error;
    }
};

