import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: '12.971599',
  lng: '77.594566',
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
