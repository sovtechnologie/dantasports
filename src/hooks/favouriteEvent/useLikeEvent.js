import { useMutation } from "@tanstack/react-query";
import { addFavoriteEvent } from "../../services/LoginApi/FavouriteEventApi/endpointApi";

export const useLikeEvent = () => {
  return useMutation({
    mutationFn: ({ eventId, userId,type }) => {
      if (!eventId || !userId) {
        throw new Error("eventId and userId are required");
      }
      console.log("Calling AddfavoriteEvent with:", { eventId, userId,type });
      return addFavoriteEvent({ eventId, userId ,type});
    },
  });
};