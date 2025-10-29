import { useMutation } from "@tanstack/react-query";
import { removeFavoriteCoach } from "../../services/LoginApi/FavouritCoachApi/endpointApi";

export const useUnlikeCoach = (options = {}) => {
  return useMutation({
    mutationFn: ({ favouriteCoachesId }) => {
      if (!favouriteCoachesId) {
        throw new Error("favouriteCoachesId is required");
      }
      console.log("Calling removeFavoriteCoach with:", { favouriteCoachesId });
      return removeFavoriteCoach({ favouriteCoachesId });
    },

     ...options,
  });
};
