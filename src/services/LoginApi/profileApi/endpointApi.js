import api from "../../api";

export const fetchProfile = async () => {
  try {
    const response = await api.get("user/home/getUserDataByToken");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error; // re-throw if you want the calling code to handle it
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.post("auth/editUserProfile", profileData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error; // re-throw if you want the calling code to handle it
  }
};
