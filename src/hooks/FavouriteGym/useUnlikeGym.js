import { useMutation } from "@tanstack/react-query";
import { removeFavoriteGym } from "../../services/LoginApi/FavouriteGymApi/endpointApi";

export const useUnlikeGym = (options = {}) => {
  return useMutation({
    mutationFn: async ({ gymFavouriteId }) => {
      if (!gymFavouriteId) {
        throw new Error("favouriteGymId is required");
      }
      return await removeFavoriteGym(gymFavouriteId);
    },
    ...options,
  });
};
