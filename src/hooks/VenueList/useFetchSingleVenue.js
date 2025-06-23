import { useQuery } from '@tanstack/react-query';
import { fetchVenueById } from '../../services/withoutLoginApi/VenueListApi/endpointApi';

export const useFetchSingleVenue = (venueId) => {
  return useQuery({
    queryKey: ['fetchSingleVenue', venueId],
    queryFn: () => fetchVenueById(venueId),
    enabled: !!venueId, // Only run the query if venueId is provided
  });
};
