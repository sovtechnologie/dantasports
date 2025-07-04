import api from "../../api";

export const submitInquiryForm = async (formData) => {
  try {
    const response = await api.post("home/sendBookingInquire", formData);
    return response.data;
  } catch (error) {
    console.error("Failed to submit inquiry form:", error);
    throw error; // re-throw if you want the calling code to handle it
  }
};
