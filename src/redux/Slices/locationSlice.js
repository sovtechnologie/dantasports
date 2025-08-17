import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lng: null,
  autoDetect: true
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { lat, lng, autoDetect } = action.payload;
      state.lat = lat;
      state.lng = lng;
      state.autoDetect = autoDetect;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
