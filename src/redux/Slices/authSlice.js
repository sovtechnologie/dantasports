// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import Cookies from 'js-cookie';
import { scheduleAutoLogout } from '../../utils/authUtils';

// import API_BASE from '../../services/api';

// Replace with your actual API endpoints
const API_BASE = 'http://65.0.170.18:3000/api/v1';

// Send OTP
export const sendOtp = createAsyncThunk('auth/sendLoginOtp', async (mobileNumber, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/sendLoginOtp`, { mobileNumber });
        return response.data.result;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to send OTP');
    }
});

// Verify OTP and Log In
export const verifyOtp = createAsyncThunk('auth/verifyLoginOtp', async ({ id, otp }, { rejectWithValue ,dispatch}) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/verifyLoginOtp`, { id, otp });
        const token = response.data.token;
        const user = response.data.data;

        // Save token in cookies (expires in 7 days)
        Cookies.set('token', token, { expires: 1 });
        // ✅ Schedule logout inside the thunk using dispatch
      scheduleAutoLogout(token, dispatch);

        return { token, user };
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Invalid OTP');
    }
});

export const registerUserSendOtp = createAsyncThunk('auth/userRegister', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/userRegister`, data);
        return response.data.result;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
});

export const registerUserVerifyOtp = createAsyncThunk("auth/otpVerification", async ({ id, otp }, { rejectWithValue ,dispatch}) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/otpVerification`, { id, otp });
        const token = response.data.token;

        Cookies.set('token', token, { expires: 1 });
         // ✅ Schedule logout inside the thunk
      scheduleAutoLogout(token, dispatch);
        return { token };
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Otp Verification failed')
    }
})


const tokenFromCookie = Cookies.get('token');
 // Get dispatch from Redux

const initialState = {
    token: tokenFromCookie || null,
    user: null,
    loading: false,
    isSendingOtp: false,
    isVerifyingOtp: false,
    error: null,
    otpSent: false,
    devOtp: null,
    id: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            state.otpSent = false;
            state.id = null;
            state.devOtp = null;
            Cookies.remove('token');
        },
        resetLoginState: (state) => {
            state.otpSent = false;
            state.id = null;
            state.devOtp = null;
            state.error = null;
        },
        resetLoading(state) {
            state.loading = false;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOtp.pending, (state) => {
                state.isSendingOtp = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.isSendingOtp = false;
                state.otpSent = true;
                state.id = action.payload.id || null;
                // Assuming the OTP is returned in response for dev
                state.devOtp = action.payload.otp || null;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.isSendingOtp = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.isVerifyingOtp = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.isVerifyingOtp = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                // Auto-logout timer
               
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.isVerifyingOtp = false;
                state.error = action.payload;
            })
            .addCase(registerUserSendOtp.pending, (state) => {
                state.isSendingOtp = true;
                state.error = null;
            })
            .addCase(registerUserSendOtp.fulfilled, (state, action) => {
                state.isSendingOtp = false;
                state.devOtp = action.payload.otp || null;
                state.id = action.payload.id || null;
                state.otpSent = true;
                
            })
            .addCase(registerUserSendOtp.rejected, (state, action) => {
                state.isSendingOtp = false;
                state.error = action.payload;
            })
            .addCase(registerUserVerifyOtp.pending, (state) => {
                state.isVerifyingOtp = true;
                state.error = null;
            })
            .addCase(registerUserVerifyOtp.fulfilled, (state, action) => {
                state.isVerifyingOtp = false;
                state.token = action.payload.token;
              
            })
            .addCase(registerUserVerifyOtp.rejected, (state, action) => {
                state.isVerifyingOtp = false;
                state.error = action.payload;
            })
    },
});

export const { logout, resetLoginState, resetLoading, clearError } = authSlice.actions;
export default authSlice.reducer;
