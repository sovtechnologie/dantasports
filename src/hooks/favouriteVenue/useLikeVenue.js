import { useMutation } from '@tanstack/react-query';
import { addFavoriteVenue} from '../../services/LoginApi/FavouritesVenueApi.js/endpointApi';

export const useLikeVenue = () => {
  return useMutation({
    mutationFn: ({ venueId, userId }) => {
         if (!venueId || !userId) {
        throw new Error("venueId and userId are required");
      }
      console.log('Calling AddfavoriteVenue with:', { venueId, userId });
      return addFavoriteVenue({ venueId, userId });
    },
  });
};
