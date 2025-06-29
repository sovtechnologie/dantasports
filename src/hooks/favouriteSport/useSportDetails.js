import { fetchSportDetails } from "../../services/withoutLoginApi/SportListApi/endpointApi";
import { useQuery } from "@tanstack/react-query";


export const useSportDetails = (sportId) => {
    return useQuery({
        queryKey: ['sportDetails', sportId],
        queryFn: () => fetchSportDetails(sportId),
        enabled: !!sportId, // Only run the query if sportId is truthy
        refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
        staleTime: 1000 * 60 * 5, // Optional: data is fresh for 5 minutes
    });
    }
