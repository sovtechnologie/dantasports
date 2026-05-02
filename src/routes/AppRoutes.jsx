import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "../components/ScrollToTop";
import PageLoader from "../components/PageLoader";

/* Helper: redirect /OldPath/:id → /newpath/:id preserving the id param */
function RedirectWithId({ base }) {
  const { id } = useParams();
  return <Navigate to={`${base}/${id}`} replace />;
}

/* ── Public pages ── */
const Home               = lazy(() => import("../pages/Home"));
const About              = lazy(() => import("../pages/About"));
const NotFound           = lazy(() => import("../pages/NotFound"));
const CommingSoon        = lazy(() => import("../pages/CommingSoon"));
const PrivacyAndPolicy   = lazy(() => import("../pages/PrivacyAndPolicy"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions"));
const RefundPolicy       = lazy(() => import("../pages/RefundPolicy"));
const AccountDeactivate  = lazy(() => import("../pages/AccountDeactivate"));

/* ── Auth pages ── */
const Register         = lazy(() => import("../features/auth/pages/Register"));
const ProfilePage      = lazy(() => import("../features/auth/pages/ProfilePage"));
const MyBooking        = lazy(() => import("../features/auth/pages/MyBooking"));
const Favorites        = lazy(() => import("../features/auth/pages/Favorites"));
const EditProfile      = lazy(() => import("../features/auth/components/EditProfile"));
const PrivateRoute     = lazy(() => import("../features/auth/components/PrivateRoute"));
const SucessfulBooking = lazy(() => import("../features/auth/components/paymentSuccess"));

/* ── Venue ── */
const VenuePage        = lazy(() => import("../features/withoutauth/pages/VenuePage"));
const VenueDetailsPage = lazy(() => import("../features/withoutauth/pages/VenueDetailsPage"));

/* ── Search ── */
const SearchResult = lazy(() => import("../features/withoutauth/pages/SearchResult"));

/* ── Corporate / Partner ── */
const CorporateBookingPage = lazy(() => import("../features/withoutauth/pages/CorporateBookingPage"));
const PartnerPage          = lazy(() => import("../features/withoutauth/pages/PartnerPage"));

/* ── Payment ── */
const PaymentFailed = lazy(() => import("../features/withoutauth/components/paymentFailed"));

/* ── Filter pages (canonical lowercase) ── */
const RunFilterPage   = lazy(() => import("../features/withoutauth/pages/FilterPages/RunFilter"));
const RunDetailPage   = lazy(() => import("../features/withoutauth/pages/RunDetailPage"));
const EventFilterPage = lazy(() => import("../features/withoutauth/pages/FilterPages/EventFilter"));
const EventDetailPage = lazy(() => import("../features/withoutauth/pages/EventDetailPage"));
const CoachFilterPage = lazy(() => import("../features/withoutauth/pages/FilterPages/CoachFilter"));
const CoachDetailPage = lazy(() => import("../features/withoutauth/pages/CoachDetailPage"));
const GymFilterPage   = lazy(() => import("../features/withoutauth/pages/FilterPages/GymFilter"));
const GymDetailPage   = lazy(() => import("../features/withoutauth/pages/GymDetailPage"));
const HostFilterPage  = lazy(() => import("../features/withoutauth/pages/FilterPages/HostPlayFilter"));

export default function AppRoutes() {
  const location = useLocation();
  const isHome   = location.pathname === "/";

  return (
    <>
      <ScrollToTop />
      <div style={{ marginTop: isHome ? 0 : "64px" }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Home ── */}
            <Route path="/" element={<Home />} />

            {/* ── Static pages ── */}
            <Route path="/about"        element={<About />} />
            <Route path="/coming-soon"  element={<CommingSoon />} />
            {/* Legacy redirect */}
            <Route path="/CommingSoon"  element={<Navigate to="/coming-soon" replace />} />

            {/* ── Legal pages (SEO-friendly lowercase slugs) ── */}
            <Route path="/privacy-policy"       element={<PrivacyAndPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/refund-policy"        element={<RefundPolicy />} />
            <Route path="/account-deactivate"   element={<AccountDeactivate />} />

            {/* Legacy redirects for old URLs */}
            <Route path="/pp"                 element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/PrivacyAndPolicy"   element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/TermsAndConditions" element={<Navigate to="/terms-and-conditions" replace />} />
            <Route path="/RefundPolicy"       element={<Navigate to="/refund-policy" replace />} />

            {/* ── Auth ── */}
            <Route path="/register" element={<Register />} />

            {/* ── Venue ── */}
            <Route path="/venue"     element={<VenuePage key={location.pathname} />} />
            <Route path="/venue/:id" element={<VenueDetailsPage />} />

            {/* ── Search ── */}
            <Route path="/search/:query" element={<SearchResult />} />

            {/* ── Corporate / Partner ── */}
            <Route path="/corporate-booking" element={<CorporateBookingPage />} />
            <Route path="/partner"           element={<PartnerPage />} />
            {/* Legacy redirects */}
            <Route path="/CorporateBooking" element={<Navigate to="/corporate-booking" replace />} />
            <Route path="/Partner"          element={<Navigate to="/partner" replace />} />

            {/* ── Payment ── */}
            <Route path="/payment-success" element={<SucessfulBooking />} />
            <Route path="/payment-failed"  element={<PaymentFailed />} />
            {/* Legacy redirect */}
            <Route path="/payment-sucesss" element={<Navigate to="/payment-success" replace />} />

            {/* ── Filter pages (canonical lowercase) ── */}
            <Route path="/run"    element={<RunFilterPage />} />
            <Route path="/host"   element={<HostFilterPage />} />
            <Route path="/coach"  element={<CoachFilterPage />} />
            <Route path="/events" element={<EventFilterPage />} />
            <Route path="/gym"    element={<GymFilterPage />} />

            {/* Legacy uppercase redirects */}
            <Route path="/Run"    element={<Navigate to="/run"    replace />} />
            <Route path="/Host"   element={<Navigate to="/host"   replace />} />
            <Route path="/Coach"  element={<Navigate to="/coach"  replace />} />
            <Route path="/Events" element={<Navigate to="/events" replace />} />
            <Route path="/Gym"    element={<Navigate to="/gym"    replace />} />

            {/* ── Detail pages (canonical lowercase) ── */}
            <Route path="/run/:id"    element={<RunDetailPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/gym/:id"    element={<GymDetailPage />} />
            <Route path="/coach/:id"  element={<CoachDetailPage />} />

            {/* Legacy uppercase detail redirects — use render function to preserve :id */}
            <Route path="/Run/:id"    element={<RedirectWithId base="/run" />} />
            <Route path="/Events/:id" element={<RedirectWithId base="/events" />} />
            <Route path="/Gym/:id"    element={<RedirectWithId base="/gym" />} />
            <Route path="/Coach/:id"  element={<RedirectWithId base="/coach" />} />

            {/* ── Protected routes ── */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile/:id" element={<ProfilePage />}>
                <Route index element={<Navigate to="bookings" replace />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="bookings"     element={<MyBooking />} />
                <Route path="favorites"    element={<Favorites />} />
              </Route>
            </Route>

            {/* ── 404 — must be LAST ── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
