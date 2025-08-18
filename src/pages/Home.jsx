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



const Home = () => {
    return (
        <div className="main-Home-container">
            <Hero />
            <PopularSports />
            <BannerCarousel />
            <UpcommingVenues />
            <VenueCarousel />
            <HostCarousel />
            <EventCarousel/>
            <RunCarousel />
            <CoachCarousel/>
            
            {/*
                <GymCarousal />
            */}
            <DownloadAppSection />
        </div>
    )
}

export default Home;