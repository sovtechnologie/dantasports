import { useQuery } from '@tanstack/react-query';
import { fetchVenueList,fetchVenueListByUserId } from '../../services/withoutLoginApi/VenueListApi/endpointApi';

export const useFetchVenue = (userId = null) => {
  return useQuery({
    queryKey: ['venueList', userId],
    queryFn: () => {
      if (userId) {
        return fetchVenueListByUserId(userId);
      } else {
        return fetchVenueList();
      }
    },
  });
};
