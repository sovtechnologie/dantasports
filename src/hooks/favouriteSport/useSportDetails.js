import { fetchSportDetails } from "../../services/withoutLoginApi/SportListApi/endpointApi";
import { useQuery } from "@tanstack/react-query";

// Pass both sportId and venueId
export const useSportDetails = (sportId, venueId) => {
  return useQuery({
    queryKey: ['sportDetails', sportId, venueId],
    queryFn: () => fetchSportDetails(sportId, venueId),
    enabled: !!sportId && !!venueId, // Only run if both are truthy
    refetchOnWindowFocus: false, // Optional
    staleTime: 1000 * 60 * 5, // Optional: 5 minutes
  });
};
