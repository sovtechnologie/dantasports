import "../stylesheets/layouts/Home.css"; // Assuming you have a CSS file for styling
import Hero from "../components/Hero";
import PopularSports from "../components/PopularSports";
import BannerCarousel from "../components/BannerCarousel";
import VenueCarousel from "../components/VenueCarousel";
import DownloadAppSection from "../components/DownloadAppSection";
import EventCarousel from "../components/EventCarousal";
import RunCarousel from "../components/RunCarousal";
import { UpcommingVenues } from "../components/UpcommingVenue";
import CoachCarousel from "../components/CoachCarousal";
import HostCarousel from "../components/HostCarousel";
import GymCarousal from "../components/GymCarousal"
import HomeBanner from "../components/HomeBanner";
import QuickBooking from "../components/QuickBooking";
import BookVenues from "../components/BookVenues";
import BookRun from "../components/BookRun";
import BookEvents from "../components/BookEvents";
import PlayHost from "../components/PlayHost";
import BookGym from "../components/BookGym";



const Home = () => {
    return (
        <div className="main-Home-container">
            {/* <Hero /> */}
            <HomeBanner />
            <QuickBooking/>
            {/* <PopularSports /> */}
            {/* <BannerCarousel /> */}
            {/* <UpcommingVenues /> */}
            {/* <VenueCarousel /> */}
            <BookVenues />
            <BookRun />
            {/* <RunCarousel /> */}
            <BookEvents />
            <BookGym />
            {/* <HostCarousel /> */}
            {/* <CoachCarousel /> */}
            {/* <GymCarousal /> */}
            <PlayHost/>

            <DownloadAppSection />
        </div>
    )
}

export default Home;