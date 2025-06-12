import React from "react";
import "../stylesheets/layouts/Home.css"; // Assuming you have a CSS file for styling
import Hero from "../components/Hero";
import PopularSports from "../components/PopularSports";
import EventCarousel from "../components/EventCarousel";
import VenueCarousel from "../components/VenueCarousel";
import DownloadAppSection from "../components/DownloadAppSection";  



const Home = () =>{
    return(
        <div className="main-container">
            <Hero />
            <PopularSports />
            <EventCarousel/>
            <VenueCarousel />
            <DownloadAppSection />
        </div>
    )
}

export default Home;