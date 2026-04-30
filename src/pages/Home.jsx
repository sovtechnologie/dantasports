import "../stylesheets/layouts/Home.css";
import "../stylesheets/layouts/Global.css";
import DownloadAppSection from "../components/DownloadAppSection";
import HomeBanner from "../components/HomeBanner";
import QuickBooking from "../components/QuickBooking";
import BookVenues from "../components/BookVenues";
import BookRun from "../components/BookRun";
import BookEvents from "../components/BookEvents";
import PlayHost from "../components/PlayHost";
import BookGym from "../components/BookGym";
import BookCoach from "../components/BookCoach";
import OngoingEvents from "../features/withoutauth/components/OngoingEvents";
import { useBanner } from "../hooks/useBanner.js";
import { Row, Col, Container } from "react-bootstrap";

const Home = () => {
  const { data: bannerData } = useBanner(1);
  const banners = bannerData?.result || [];

  return (
    <div className="main-Home-container">
      <HomeBanner />
      <QuickBooking />
      <Container>
        <Row className="onging_title_hid mt-lg-5 mt-4">
          <Col className="col-12">
            <OngoingEvents banners={banners} />
          </Col>
        </Row>
      </Container>
      <BookVenues />
      <BookRun />
      <BookCoach />
      <BookEvents />
      <BookGym />
      <PlayHost />
      <DownloadAppSection />
    </div>
  );
};

export default Home;
