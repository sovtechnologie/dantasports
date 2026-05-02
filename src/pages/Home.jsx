import "../stylesheets/layouts/Home.css";
import "../stylesheets/layouts/Global.css";
import { Container, Row, Col } from "react-bootstrap";
import HomeBanner         from "../components/HomeBanner";
import QuickBooking       from "../components/QuickBooking";
import BookVenues         from "../components/BookVenues";
import BookRun            from "../components/BookRun";
import BookCoach          from "../components/BookCoach";
import BookEvents         from "../components/BookEvents";
import BookGym            from "../components/BookGym";
import PlayHost           from "../components/PlayHost";
import DantaStats         from "../components/DantaStats";
import CultureValues      from "../components/CultureValues";
import DownloadAppSection from "../components/DownloadAppSection";
import OngoingEvents      from "../features/withoutauth/components/OngoingEvents";
import { useBanner }      from "../hooks/useBanner.js";

const Home = () => {
  const { data: bannerData } = useBanner(1);
  const banners = bannerData?.result || [];

  return (
    <div className="main-Home-container">

      {/* ── 1. Hero Banner ── */}
      <HomeBanner />

      {/* ── 2. Quick Booking ── */}
      <QuickBooking />

      {/* ── 3. Ongoing Events / Banners ── */}
      {banners.length > 0 && (
        <div style={{ background: "#f4f7ff", padding: "0 0 32px" }}>
          <Container>
            <Row className="pt-4">
              <Col xs={12}>
                <OngoingEvents banners={banners} />
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {/* ── 4. Book Venues ── */}
      <BookVenues />

      {/* ── 5. Book Run ── */}
      <BookRun />

      {/* ── 6. Book Coach ── */}
      <BookCoach />

      {/* ── 7. Danta Stats ── */}
      <div style={{ padding: "64px 0", background: "#f4f7ff" }}>
        <Container>
          <DantaStats />
        </Container>
      </div>

      {/* ── 8. Book Events ── */}
      <BookEvents />

      {/* ── 9. Book Gym ── */}
      <BookGym />

      {/* ── 10. Play & Host ── */}
      <PlayHost />

      {/* ── 11. Culture & Values ── */}
      <CultureValues />

      {/* ── 12. Download App ── */}
      <DownloadAppSection />

    </div>
  );
};

export default Home;
