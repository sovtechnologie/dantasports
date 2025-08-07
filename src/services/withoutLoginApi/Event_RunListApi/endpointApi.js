import api from "../../api";

export const fetchEventRunList = async (payload) => {
  try {
    const response = await api.post("user/event/getEventList",payload);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Events list:", error);
    throw error;
  }
};

export const fetchEventRunListById =async (payload) =>{
    try {
    const response = await api.post("user/event/getEventList",payload);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Events list:", error);
    throw error;
  } 
}

export const fetchSingleEventRunDetail = async(eventId)=>{
  try {
    const response = await api.post("user/event/getSingleEventList",{eventId});
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Events Details:", error);
    throw error;
  }
}


export const fetchEventPrice = async(eventId) =>{
  try {
    const response = await api.post('user/event/getPriceDeatilsPage',{eventId});
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Events Price:", error);
    throw error;
  }
}
