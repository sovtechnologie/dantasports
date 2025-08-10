import { useQuery } from "@tanstack/react-query";
import { fetchEventPrice } from "../../services/withoutLoginApi/Event_RunListApi/endpointApi";

export const useFetchSingleEventPrice = (eventId) => {
  return useQuery({
    queryKey: ["EventPrice", eventId],
    queryFn: () => {
      if (eventId) {
        return fetchEventPrice(eventId);
      }
    },
  });
};