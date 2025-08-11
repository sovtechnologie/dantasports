import { useMutation } from "@tanstack/react-query";
import { CreateQuery } from "../../services/withoutLoginApi/CoachListApi/endpointApi";

export const useCreateQuery = () => {
    return useMutation({
        mutationFn: ({ academyCoachesId }) => {
            if (!academyCoachesId) {
                throw new Error("academyCoachesId are required");
            }
            console.log("Calling createquery with:", { academyCoachesId });
            return CreateQuery(academyCoachesId);
        },
    })
}