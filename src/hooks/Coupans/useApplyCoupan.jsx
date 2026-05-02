import { useMutation } from "@tanstack/react-query";
import { ApplyCoupan } from "../../services/LoginApi/CoupanApi/endpointApi";

export const useApplyCoupan = () => {
    return useMutation({
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("payload are required");
            }
            return  ApplyCoupan(payload);
        },
    })
}