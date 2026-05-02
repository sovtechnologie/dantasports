// import { useMutation } from "@tanstack/react-query";
// import { updateProfile } from "../../services/LoginApi/profileApi/endpointApi.js";

// export const useEditProfile = () => {
//   return useMutation({
//     mutationFn: async ({ id, fullName, email, dob, gender }) => {
//       if (!id || !fullName || !email || !dob || !gender) {
//         throw new Error("All fields are required: userId, fullName, email, dob,  gender");
//       }

//       console.log("🔄 Updating profile with:", {
//         id,
//         fullName,
//         email,
//         dob,
//         gender,
//       });

//       return await updateProfile({ id, fullName, email, dob, gender });
//     },
//     onSuccess: () => {
//     },
//     onError: (error) => {
//       console.error("❌ Error updating profile:", error.message);
//     },
//   });
// };

import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../services/LoginApi/profileApi/endpointApi.js";

export const useEditProfile = () => {
  return useMutation({
    mutationFn: async (formData) => {
      if (!(formData instanceof FormData)) {
        throw new Error("Payload must be FormData.");
      }

      return await updateProfile(formData);
    },
    onSuccess: () => {
    },
    onError: () => {},
  });
};
