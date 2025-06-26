import { fetchSportPriceChart } from "../../services/withoutLoginApi/SportListApi/endpointApi";
import { useQuery } from "@tanstack/react-query";

export const useSportPriceChart = (sportId, venueId) => {
  return useQuery({
    queryKey: ['sportPriceChart', sportId, venueId],
    queryFn: () => fetchSportPriceChart(sportId, venueId),
    enabled: !!sportId && !!venueId, // Only run the query if sportId and venueId are provided
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
  });
}