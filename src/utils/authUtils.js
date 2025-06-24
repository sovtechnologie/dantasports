// authUtils.js
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { logout } from '../redux/Slices/authSlice';


let logoutTimer = null;

export const handleLogout = (dispatch) => {
    Cookies.remove('token');
    dispatch(logout());
    window.location.href = '/';
};

export const scheduleAutoLogout = (token, dispatch) => {
    if (!token) return;

    try {
        const decoded = jwtDecode(token);
        const expiresAt = decoded.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expiresAt - currentTime;

        if (timeLeft <= 0) {
            handleLogout(dispatch);
        } else {
            if (logoutTimer) clearTimeout(logoutTimer);
            logoutTimer = setTimeout(() => {
                handleLogout(dispatch);
            }, timeLeft);
        }
    } catch (err) {
        console.error("Invalid token in scheduleAutoLogout", err);
        handleLogout(dispatch);
    }
};
