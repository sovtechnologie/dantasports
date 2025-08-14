import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lng: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { lat, lng } = action.payload;
      state.lat = lat;
      state.lng = lng;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
