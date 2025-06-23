import api from "../../api";

export const FetchBanner = async ({ pageNo }) => {
    try {
        const response = await api.post('/home/getBannerDisplay', { pageNo: [pageNo] });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch banner:", error);
        throw error;
    }
}
