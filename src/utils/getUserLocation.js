export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
       
        console.error('Geolocation error code:', error.code);
        console.error('Geolocation error message:', error.message);
        // reject(error);
      },
      { timeout: 10000 }
    );
  });
};

// // src/hooks/useUserLocation.js
// import { useState, useEffect, useCallback } from "react";

// export function useUserLocation() {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [permissionBlocked, setPermissionBlocked] = useState(false);
//   const [error, setError] = useState(null);

//   const requestLocation = useCallback(() => {
//     if (!navigator.geolocation) {
//       setError(new Error("Geolocation not supported"));
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLocation({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//         setPermissionBlocked(false);
//         setLoading(false);
//       },
//       (err) => {
//         if (err.code === err.PERMISSION_DENIED) {
//           setPermissionBlocked(true);
//         }
//         setError(err);
//         setLoading(false);
//       },
//       { timeout: 10000 }
//     );
//   }, []);

//   useEffect(() => {
//     requestLocation();
//   }, [requestLocation]);

//   return { location, loading, error, permissionBlocked, requestLocation };
// }
