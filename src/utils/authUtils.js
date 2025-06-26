// authUtils.js
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { logout } from '../redux/Slices/authSlice';



let logoutTimer = null;
// Use useNavigate if available, otherwise fallback to window.location

export const handleLogout = (dispatch,navigate = null) => {
    Cookies.remove('token');
    dispatch(logout());
    if (navigate) {
        navigate('/'); // soft redirect
    } else {
        window.location.href = '/'; // fallback
    }
};

export const scheduleAutoLogout = (token, dispatch, navigate = null) => {
    if (!token) return;

    try {
        const decoded = jwtDecode(token);
        const expiresAt = decoded.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expiresAt - currentTime;

         console.log('Auto logout scheduled in:', timeLeft / 1000, 'seconds');

        if (timeLeft <= 0) {
            handleLogout(dispatch, navigate);;
        } else {
            if (logoutTimer) clearTimeout(logoutTimer);
            logoutTimer = setTimeout(() => {
                 handleLogout(dispatch, navigate);;
            }, timeLeft);
        }
    } catch (err) {
        console.error("Invalid token in scheduleAutoLogout", err);
         handleLogout(dispatch, navigate);;
    }
};
