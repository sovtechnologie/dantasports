import api from "../../api";

export const BookGym = async(payload) =>{
  try {
    const response = await api.post("user/gym/getBookGymPasses",payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to book gym");
    throw error;
  }
}