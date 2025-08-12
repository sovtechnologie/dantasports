import { useMutation } from "@tanstack/react-query";
import { ApplyCoupan } from "../../services/LoginApi/CoupanApi/endpointApi";

export const useApplyCoupan = () => {
    return useMutation({
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("payload are required");
            }
            console.log("Calling apply coupon with:", payload);
            return  ApplyCoupan(payload);
        },
    })
}