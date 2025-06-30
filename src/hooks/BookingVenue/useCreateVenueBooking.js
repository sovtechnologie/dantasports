import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../../services/LoginApi/BookingApi/endpointsApi";

export const useCreateVenueBooking = ({ payload }) => {
  return useMutation({
    mutationKey: ["createVenueBooking"],
    mutationFn: (sportsIds) => {
      if (!Array.isArray(sportsIds)) {
        throw new Error("sportsIds must be an array of IDs");
      }
      return AddfavoriteSport({ sportsId: sportsIds });
    },
    onSuccess: (data) => {
      console.log("Sports added successfully:", data);
      queryClient.invalidateQueries(["favoritesSport"]);
    },
    onError: (error) => {
      console.error("Error adding sports:", error);
    },
  });
};
