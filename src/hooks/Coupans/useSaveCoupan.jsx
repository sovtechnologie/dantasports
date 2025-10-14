import { SaveCoupan } from "../../services/LoginApi/CoupanApi/endpointApi";
import { useMutation } from "@tanstack/react-query";

export const useSaveCoupan = () =>{
    return useMutation({
        mutationFn: (payload) => SaveCoupan(payload)
    });
}
