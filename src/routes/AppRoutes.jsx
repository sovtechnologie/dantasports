import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import NotFound from '../pages/NotFound';

const ScrollToTop = lazy(() => import("../components/ScrollToTop"));


const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));

const Register = lazy(() => import('../features/auth/pages/Register'));

const VenuePage = lazy(() => import('../features/withoutauth/pages/VenuePage'));
const VenueDetailsPage = lazy(() => import('../features/withoutauth/pages/VenueDetailsPage'));
const VenueCheckoutPage = lazy(() => import('../features/withoutauth/pages/VenueCheckoutPage'));
const ProfilePage = lazy(() => import('../features/auth/pages/ProfilePage'));
const MyBooking = lazy(() => import("../features/auth/pages/MyBooking"));
const Favorites = lazy(() => import('../features/auth/pages/Favorites'));
const PlayedGames = lazy(() => import('../features/auth/pages/PlayedGames'));
const EditProfile = lazy(() => import('../features/auth/components/EditProfile'));
const CorporateBookingPage = lazy(() => import('../features/withoutauth/pages/CorporateBookingPage'));
const PartnerPage = lazy(() => import("../features/withoutauth/pages/PartnerPage"));
const PrivacyAndPolicy = lazy(() => import("../pages/PrivacyAndPolicy"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions"))


// Private Route to protected the route
const PrivateRoute = lazy(() => import('../features/auth/components/PrivateRoute'));

export default function AppRoutes() {

    const location = useLocation();

    return (
        <Suspense fallback={<div>Loading...</div>}>

            <ScrollToTop />
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path='/about' element={<About />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/register" element={<Register />} />

                <Route path="/venue" element={<VenuePage key={location.pathname} />} />
                <Route path="/venue/:id" element={<VenueDetailsPage />} />
                <Route path="/venueCheckout/:id" element={<VenueCheckoutPage />} />
                <Route path='/CorporateBooking' element={<CorporateBookingPage />} />
                <Route path='/Partner' element={<PartnerPage />} />
                <Route path='/PrivacyAndPolicy' element={<PrivacyAndPolicy />} />
                <Route path='/TermsAndConditions' element={<TermsAndConditions />} />

                {/* Auth Routes */}
                {/* <Route path="/profile/:id" element={<ProfilePage />} /> */}
                <Route element={<PrivateRoute />}>
                    <Route path="/profile/:id" element={<ProfilePage />}>
                        <Route index element={<Navigate to="bookings" replace />} />
                        <Route path="edit-profile" element={<EditProfile />} />
                        <Route path="bookings" element={<MyBooking />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="played-games" element={<PlayedGames />} />
                    </Route>
                </Route>

                {/* Add more routes as needed */}
            </Routes>

        </Suspense>
    );
}
