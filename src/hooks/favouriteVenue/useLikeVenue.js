import { useMutation } from "@tanstack/react-query";
import { addFavoriteVenue } from "../../services/LoginApi/FavouritesVenueApi/endpointApi";

export const useLikeVenue = () => {
  return useMutation({
    mutationFn: ({ venueId, userId }) => {
      if (!venueId || !userId) {
        throw new Error("venueId and userId are required");
      }
      return addFavoriteVenue({ venueId, userId });
    },
  });
};
