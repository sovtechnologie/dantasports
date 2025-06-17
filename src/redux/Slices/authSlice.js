// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
// import API_BASE from '../../services/api';

// Replace with your actual API endpoints
const API_BASE = 'https://your-api.com/api';

// Send OTP
export const sendOtp = createAsyncThunk('auth/sendOtp', async (mobile, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/send-otp`, { mobile });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to send OTP');
    }
});

// Verify OTP and Log In
export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ mobile, otp }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/verify-otp`, { mobile, otp });
        const { token, user } = response.data;

        // Save token in cookies (expires in 7 days)
        Cookies.set('token', token, { expires: 7 });

        return { token, user };
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Invalid OTP');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: Cookies.get('token') || null,
        user: null,
        loading: false,
        error: null,
        otpSent: false,
        devOtp: null,
    },
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            Cookies.remove('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
                // Assuming the OTP is returned in response for dev
                state.devOtp = action.payload.otp || null;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
