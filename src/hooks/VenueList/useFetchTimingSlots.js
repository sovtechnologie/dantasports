import { useQuery } from "@tanstack/react-query";
import { fetchTimingslotVenues } from "../../services/withoutLoginApi/VenueListApi/endpointApi";


export function useFetchTimeslotForVenue(payload) {
  return useQuery({
    queryKey: ["timeslotVenue", payload], // caching based on unique payload
    queryFn: () => fetchTimingslotVenues(payload),
    enabled: !!payload?.date && !!payload?.sportsId && !!payload?.venueId, 
  });
}