import { useMutation } from "@tanstack/react-query";
import { BookEvent } from "../../services/LoginApi/BookEventApi/endpointApi";

export const useBookEvent = () => {
  return useMutation({
    mutationKey: ["BookEvent"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload must be an required");
      }
      console.log("in mutation section payload", payload);
      return BookEvent(payload);
    },
    onSuccess: (data) => {
      console.log("Book event successfully:", data);
    },
    onError: (error) => {
      console.error("Error book event:", error);
    },
  });
};