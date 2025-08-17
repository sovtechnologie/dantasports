// src/redux/store.js


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';
import authReducer from './Slices/authSlice.js';
import locationReducer from "./Slices/locationSlice.js"
// import createEncryptor from 'redux-persist-transform-encrypt';



// const encryptor = createEncryptor({
//   secretKey: 'your-super-secret-key',
//   onError: function (error) {
//     console.log('Encrypt error', error);
//   },
// });

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','location'], // Only persist the auth slice
  // transforms: [encryptor],
};

// Combine reducers if you have more slices
const rootReducer = combineReducers({
  auth: authReducer,
  location:locationReducer,
  // other reducers...
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Important for redux-persist
    }),
});

// Persistor for React integration
export const persistor = persistStore(store);

