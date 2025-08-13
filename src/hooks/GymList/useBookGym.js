import { useMutation } from "@tanstack/react-query";
import { BookGym } from "../../services/LoginApi/BookGymApi/endpointApi";


export const useBookGym = () => {
  return useMutation({
    mutationKey: ["BookGym"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload must be an required");
      }
      console.log("in mutation section payload", payload);
      return BookGym(payload);
    },
    onSuccess: (data) => {
      console.log("Book gym successfully:", data);
    },
    onError: (error) => {
      console.error("Error book gym:", error);
    },
  });
};