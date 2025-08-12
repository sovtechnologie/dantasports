import React from "react";
import "../stylesheets/layouts/Home.css"; // Assuming you have a CSS file for styling
import Hero from "../components/Hero";
import PopularSports from "../components/PopularSports";
import BannerCarousel from "../components/BannerCarousel";
import VenueCarousel from "../components/VenueCarousel";
import DownloadAppSection from "../components/DownloadAppSection";
import EventCarousel from "../components/EventCarousal";



const Home = () => {
    return (
        <div className="main-Home-container">
            <Hero />
            <PopularSports />
            <BannerCarousel />
            <VenueCarousel />
            <EventCarousel />
            {/*
                <RunCarousal />
                <CoachCarousal />
                <GymCarousal />
            */}
            <DownloadAppSection />
        </div>
    )
}

export default Home;