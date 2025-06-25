import { AddfavoriteSport } from "../../services/LoginApi/FavouriteSportApi/endpointApi.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSports = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['addFavoriteSport'],
        mutationFn: (sportsIds) => {
            if (!Array.isArray(sportsIds)) {
                throw new Error("sportsIds must be an array of IDs");
            }
            return AddfavoriteSport({ sportsId: sportsIds });
        },
        onSuccess: (data) => {
            console.log("Sports added successfully:", data);
            queryClient.invalidateQueries(['favoritesSport']);
        },
        onError: (error) => {
            console.error("Error adding sports:", error);
        },
    });
};
