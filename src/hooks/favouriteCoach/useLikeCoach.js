import { useMutation } from "@tanstack/react-query";
import { addFavoriteCoach } from "../../services/LoginApi/FavouritCoachApi/endpointApi";

export const useLikeCoach = () => {
  return useMutation({
    mutationFn: ({ coachesId }) => {
      if (!coachesId) {
        throw new Error("coachesId is required");
      }
      console.log("Calling addFavoriteCoach with:", { coachesId });
      return addFavoriteCoach({ coachesId });
    },
  });
};
