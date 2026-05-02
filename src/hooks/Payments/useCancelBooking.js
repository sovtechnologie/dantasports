import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelBooking } from "../../services/LoginApi/PaymentApi/endpointsApi.js";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // API ko object bhejna jaruri hai
    mutationFn: (payload) => CancelBooking(payload),

    onSuccess: () => {

      // Refetch updated booking lists
      queryClient.invalidateQueries(["CancelBookingData"]);
      queryClient.invalidateQueries(["AllBookingData"]);
    },

    onError: () => {
      // Cancel failed silently — booking state unchanged
    },
  });
};
