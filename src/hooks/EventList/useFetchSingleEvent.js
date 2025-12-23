import { useQuery } from "@tanstack/react-query";
import { fetchSingleEventRunDetail } from "../../services/withoutLoginApi/Event_RunListApi/endpointApi";

export const useFetchSingleEvent = (eventId,lat,lng) => {
  return useQuery({
    queryKey: ["EventDetails", eventId, lat, lng],
    queryFn: () => {
      if (eventId) {
         return fetchSingleEventRunDetail(eventId, lat, lng);
      }
    },
  });
};
