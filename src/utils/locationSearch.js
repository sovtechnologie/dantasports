// src/loader.js
import { Loader } from '@googlemaps/js-api-loader';

export const googleMapsLoader = new Loader({
  apiKey: "AIzaSyA2otw_MlUBXXfpinfgDEuJQoiqSRoYElg", // replace with your actual API key
  version: "weekly",
  libraries: ["places"], // load all libraries you'll need from the start
});
