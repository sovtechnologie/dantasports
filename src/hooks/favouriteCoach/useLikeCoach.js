import { useMutation } from "@tanstack/react-query";
import { addFavoriteCoach } from "../../services/LoginApi/FavouritCoachApi/endpointApi";

export const useLikeCoach = () => {
  return useMutation({
    mutationFn: ({ userId, coachesId }) => {
      if ( !userId || !coachesId) {
        throw new Error("coachesId is required");
      }
      return addFavoriteCoach({ userId ,coachesId });
    },
  });
};
