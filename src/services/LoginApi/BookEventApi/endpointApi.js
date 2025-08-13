import api from "../../api";

export const BookEvent = async(payload) =>{
    try {
        const response = await api.post("user/event/bookEvent",payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to book Event");
        throw error;
    }
}

export const CancelEvent = async(payload) =>{
    try {
        const response = await api.post("user/event/CancelEventBooking",payload)
        return response?.data;
    } catch (error) {
        console.error("Failed to cancel event");
        throw error;
    }
}