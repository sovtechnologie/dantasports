import { useMutation } from "@tanstack/react-query";
import { removeFavoriteVenue } from "../../services/LoginApi/FavouritesVenueApi/endpointApi";

export const useUnlikeVenue = (options = {}) => {
  return useMutation({
    mutationFn: async ({ favouriteVenueId }) => {
      if (!favouriteVenueId) {
        throw new Error("favouriteVenueId is required");
      }
      return await removeFavoriteVenue(favouriteVenueId);
    },
    ...options,
  });
};
