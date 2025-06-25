import { RemovefavoriteSport } from "../../services/LoginApi/FavouriteSportApi/endpointApi.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['removeFavoriteSport'],
        mutationFn: (favoriteSportsId) => {
            if (!favoriteSportsId) {
                throw new Error("sportId is required");
            }
            return RemovefavoriteSport({ favoriteSportsId: favoriteSportsId }); // single ID
        },
        onSuccess: (data) => {
            console.log("Sport removed successfully:", data);
            queryClient.invalidateQueries(['favoritesSport']);
        },
        onError: (error) => {
            console.error("Error removing sport:", error);
        },
    });
};
