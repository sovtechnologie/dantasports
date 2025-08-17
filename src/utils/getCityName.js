export async function getCityName(lat, lng) {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK") {
    const results = data.results;
    for (let component of results[0].address_components) {
      if (component.types.includes("locality")) {
        return component.long_name; // this is the city name
      }
    }
    return "City not found";
  } else {
    return "Geocoding failed";
  }
}


