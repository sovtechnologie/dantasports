// src/components/MapEmbed.jsx
import React from 'react';

const CustomMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return <p>Location data not available</p>;

  const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="map-container">
      <iframe
        src={embedUrl}
        width="100%"
        height="325"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Venue Map"
      ></iframe>
      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="map-link"
        style={{
          display: "inline-block",
          marginTop: "10px",
          color: "#007bff",
          textDecoration: "underline",
          lineHeight: "19.6px"
        }}
      >
        View on Google Maps
      </a>
    </div>
  );
};

export default CustomMap;





// // src/components/InteractiveMap.jsx
// npm install @react-google-maps/api
// import React from 'react';
// import {
//   GoogleMap,
//   Marker,
//   useJsApiLoader,
//   DirectionsRenderer,
// } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const centerOffset = 0.002; // to offset map slightly above marker

// const InteractiveMap = ({ latitude, longitude }) => {
//   const [directions, setDirections] = React.useState(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // 🔒 Replace this with your actual key
//     libraries: ['places'],
//   });

//   const mapCenter = {
//     lat: parseFloat(latitude) + centerOffset,
//     lng: parseFloat(longitude),
//   };

//   React.useEffect(() => {
//     // Optional: get directions from a dummy location to venue
//     const directionsService = new window.google.maps.DirectionsService();

//     const origin = { lat: latitude - 0.01, lng: longitude - 0.01 };
//     const destination = { lat: latitude, lng: longitude };

//     directionsService.route(
//       {
//         origin,
//         destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === 'OK') {
//           setDirections(result);
//         }
//       }
//     );
//   }, [latitude, longitude]);

//   if (!isLoaded) return <p>Loading Map...</p>;

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={mapCenter}
//       zoom={15}
//     >
//       <Marker position={{ lat: latitude, lng: longitude }} />

//       {directions && (
//         <DirectionsRenderer
//           directions={directions}
//           options={{ suppressMarkers: false }}
//         />
//       )}
//     </GoogleMap>
//   );
// };

// export default InteractiveMap;
