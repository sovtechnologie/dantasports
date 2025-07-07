import { useQuery } from "@tanstack/react-query";
import { fetchVenueById } from "../../services/withoutLoginApi/VenueListApi/endpointApi";

export const useFetchSingleVenue = (venueId, userId) => {
  console.log("in react-query userID is", userId);
  return useQuery({
    queryKey: ["fetchSingleVenue", venueId, userId],
    queryFn: () => fetchVenueById(venueId, userId),
    enabled: !!venueId, // Only run the query if venueId is provided
  });
};
