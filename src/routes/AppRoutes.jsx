import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import NotFound from '../pages/NotFound';

const ScrollToTop = lazy(() => import("../components/ScrollToTop"));


const Home = lazy(() => import('../pages/Home'));
// const Login = lazy(() => import('../features/auth/pages/Login'));
const VenuePage = lazy(() => import('../features/withoutauth/pages/VenuePage'));
const VenueDetailsPage = lazy(() => import('../features/withoutauth/pages/VenueDetailsPage'));
const VenueCheckoutPage = lazy(() => import('../features/withoutauth/pages/VenueCheckoutPage'));
const ProfilePage = lazy(() => import('../features/auth/pages/ProfilePage'));
const MyBooking = lazy(() => import("../features/auth/pages/MyBooking"));
const Favorites = lazy(() => import('../features/auth/pages/Favorites'));
const PlayedGames = lazy(() => import('../features/auth/pages/PlayedGames'));

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>

            <ScrollToTop />
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/venue" element={<VenuePage />} />
                <Route path="/venue/:id" element={<VenueDetailsPage />} />
                <Route path="/venueCheckout/:id" element={<VenueCheckoutPage />} />

                {/* Auth Routes */}
                {/* <Route path="/profile/:id" element={<ProfilePage />} /> */}
                <Route path="/profile/:id/" element={<ProfilePage />}>
                    {/* Default route redirect to "bookings" */}
                    <Route index element={<Navigate to="bookings" replace />} />
                    {/* nested route */}
                    <Route path="bookings" element={<MyBooking />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="played-games" element={<PlayedGames />} />
                </Route>
                {/* Add more routes as needed */}
            </Routes>

        </Suspense>
    );
}
