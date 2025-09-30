import { useQuery } from "@tanstack/react-query";
import { fetchSingleEventRunDetail } from "../../services/withoutLoginApi/Event_RunListApi/endpointApi";

export const useFetchSingleEvent = (eventId) => {
  return useQuery({
    queryKey: ["EventDetails", eventId],
    queryFn: () => {
      if (eventId) {
        return fetchSingleEventRunDetail(eventId);
      }
    },
  });
};
