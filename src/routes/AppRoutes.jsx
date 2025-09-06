import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import NotFound from '../pages/NotFound';

const ScrollToTop = lazy(() => import("../components/ScrollToTop"));


const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));

const Register = lazy(() => import('../features/auth/pages/Register'));

const VenuePage = lazy(() => import('../features/withoutauth/pages/VenuePage'));
const VenueDetailsPage = lazy(() => import('../features/withoutauth/pages/VenueDetailsPage'));

const ProfilePage = lazy(() => import('../features/auth/pages/ProfilePage'));
const MyBooking = lazy(() => import("../features/auth/pages/MyBooking"));
const Favorites = lazy(() => import('../features/auth/pages/Favorites'));
const EditProfile = lazy(() => import('../features/auth/components/EditProfile'));
const CorporateBookingPage = lazy(() => import('../features/withoutauth/pages/CorporateBookingPage'));
const PartnerPage = lazy(() => import("../features/withoutauth/pages/PartnerPage"));
const PrivacyAndPolicy = lazy(() => import("../pages/PrivacyAndPolicy"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions"));
const RefundPolicy = lazy(() => import('../pages/RefundPolicy'));
const CommingSoon = lazy(() => import('../pages/CommingSoon'));
const SucessfulBooking = lazy(()=>import('../features/auth/components/paymentSuccess'));
const PaymentFailed = lazy(()=>import('../features/withoutauth/components/paymentFailed'))

// Filter pages
const RunFilterPage = lazy(()=>import("../features/withoutauth/pages/FilterPages/RunFilter"));
const RunDetailPage = lazy(()=>import("../features/withoutauth/pages/RunDetailPage"));
const EventFilterPage = lazy(()=>import("../features/withoutauth/pages/FilterPages/EventFilter"));
const EventDetailPage = lazy(()=>import("../features/withoutauth/pages/EventDetailPage"))
const CoachFilterPage = lazy(()=>import("../features/withoutauth/pages/FilterPages/CoachFilter"));
const CoachDetailPage = lazy(()=>import("../features/withoutauth/pages/CoachDetailPage"))
const GymFilterPage = lazy(()=>import("../features/withoutauth/pages/FilterPages/GymFilter"))
const GymDetailPage = lazy(()=>import("../features/withoutauth/pages/GymDetailPage"));
const HostFilterPage = lazy(()=>import("../features/withoutauth/pages/FilterPages/HostPlayFilter"))

// Private Route to protected the route
const PrivateRoute = lazy(() => import('../features/auth/components/PrivateRoute'));

export default function AppRoutes() {

    const location = useLocation();

    return (
        <div style={{ marginTop: "4.6rem" }}>
            <Suspense fallback={<div>Loading...</div>}>

                <ScrollToTop />
                <Routes>
                    <Route path="*" element={<NotFound />} />s
                    <Route path="/" element={<Home />} />
                    <Route path='/about' element={<About />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/register" element={<Register />} />

                    <Route path="/venue" element={<VenuePage key={location.pathname} />} />
                    <Route path="/venue/:id" element={<VenueDetailsPage />} />
                    <Route path='/CorporateBooking' element={<CorporateBookingPage />} />
                    <Route path='/payment-sucesss' element={<SucessfulBooking />} />
                    <Route path='/payment-failed' element={<PaymentFailed/>} />
                    <Route path='/Partner' element={<PartnerPage />} />
                    <Route path='/PrivacyAndPolicy' element={<PrivacyAndPolicy />} />
                    <Route path='/TermsAndConditions' element={<TermsAndConditions />} />
                    <Route path='/RefundPolicy' element={<RefundPolicy />} />
                    <Route path="/CommingSoon" element={<CommingSoon />} />

                    {/* Filter Pages */}
                    <Route path = '/Run' element={<RunFilterPage />} />
                    <Route path = '/Host' element={<HostFilterPage/>} />
                    <Route path = '/Coach' element={<CoachFilterPage/>} />
                    <Route path = '/Events' element={<EventFilterPage />} />
                    <Route path = '/Gym' element={<GymFilterPage/>} />

                    <Route path = "/Run/:id" element={<RunDetailPage/>}/>
                    <Route path = "/Events/:id" element={<EventDetailPage/>}/>
                    <Route path = '/Gym/:id' element={<GymDetailPage/>} />
                    <Route path='/Coach/:id' element={<CoachDetailPage />} />

                    {/* Auth Routes */}
                    {/* <Route path="/profile/:id" element={<ProfilePage />} /> */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/profile/:id" element={<ProfilePage />}>
                            <Route index element={<Navigate to="bookings" replace />} />
                            <Route path="edit-profile" element={<EditProfile />} />
                            <Route path="bookings" element={<MyBooking />} />
                            <Route path="favorites" element={<Favorites />} />

                        </Route>
                    </Route>

                    {/* Add more routes as needed */}
                </Routes>

            </Suspense>
        </div>
    );
}

