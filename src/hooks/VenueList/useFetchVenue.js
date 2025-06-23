import { useQuery } from '@tanstack/react-query';
import { fetchVenueList } from '../../services/withoutLoginApi/VenueListApi/endpointApi';

export const useFetchVenue = () => {
  return useQuery({
    queryKey: ['fetchVenueList'],
    queryFn: fetchVenueList,
  });
};
