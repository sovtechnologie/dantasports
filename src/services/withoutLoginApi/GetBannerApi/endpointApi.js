import api from "../../api";

export const FetchBanner = async ({ pageNo }) => {
  try {
    const response = await api.post("home/getBannerDisplay", {
    pageNo,
    lat:28.41124000,
    lng:77.37160000
});
    return response.data;
  } catch (error) {
    console.error("Failed to fetch banner:", error);
    throw error;
  }
};
