import { useQuery } from "@tanstack/react-query";
import {
  fetchVenueList,
  fetchVenueListByUserId,
} from "../../services/withoutLoginApi/VenueListApi/endpointApi";

export const useFetchVenue = (payload) => {
  return useQuery({
    queryKey: ["venueList", payload.userId,payload.lat, payload.lng],
    queryFn: () => {
      if (payload.userId) {
        return fetchVenueListByUserId(payload);
      } else {
        return fetchVenueList(payload);
      }
    },
    enabled: Boolean(payload.lat && payload.lng),
  });
};
