import { useMutation } from "@tanstack/react-query";
import { removeFavoriteEvent } from "../../services/LoginApi/FavouriteEventApi/endpointApi";

export const useUnlikeEvent = (options = {}) => {
  return useMutation({
    mutationFn: async ({ favouriteEventId ,type}) => {
      if (!favouriteEventId) {
        throw new Error("favouriteEventId is required");
      }
      return await removeFavoriteEvent({ favouriteEventId, type});
    },
    ...options,
  });
};
