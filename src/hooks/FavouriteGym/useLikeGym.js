import { useMutation } from "@tanstack/react-query";
import { addFavoriteGym } from "../../services/LoginApi/FavouriteGymApi/endpointApi";

export const useLikeGym = () => {
  return useMutation({
    mutationFn: ({ gymId, userId }) => {
      if (!gymId || !userId) {
        throw new Error("gymId and userId are required");
      }
      console.log("Calling AddfavoriteGym with:", { gymId, userId });
      return addFavoriteGym({ gymId, userId });
    },
  });
};
