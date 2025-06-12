import React, { useEffect, useState } from 'react';
import './StyleSheets/DownloadAppSection.css'; // Assuming you have a CSS file for styling
import iphoneImage from '../assets/downloadAppLogo/iPhone 15.png'; // adjust the path as needed


const subtexts = [
    "For seamless bookings and exclusive access to top sports venues near you.",
    "To Connect. Host. Play!",
    "To Join the Run Club!",
    "To Find the Right Coach for You!",
    "Discover Gyms Around You!"
];

const DownloadAppSection = () => {
    const [subtextIndex, setSubtextIndex] = useState(0);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setSubtextIndex((prev) => (prev + 1) % subtexts.length);
                setAnimate(false);
            }, 400); // Animation duration
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="download-app-section">

            {/* Decorative shapes */}
            <div className="shape big-blob"></div>
            <div className="shape small-dot"></div>
            <div className="shape middle-dot"></div>
            <div className="shape bottom-dot"></div>


            <div className="text-content">
                <p className="tagline">#It's Not About Skills It's About You!</p>
                <h2 className="heading">
                    Get the Danta Sports App now!
                </h2>
                <p className={`subtext ${animate ? "subtext-animate" : ""}`}>
                    {subtexts[subtextIndex]}
                </p>
                <div className="store-buttons">
                    <a href="#" className="google-btn">
                          <img src="https://img.icons8.com/color/48/000000/google-play.png" alt="Google Play" />
                        Google Play
                    </a>
                    <a href="#" className="apple-btn">
                        <img src="https://img.icons8.com/ios-filled/30/000000/mac-os.png" alt="Apple Store" />
                        Apple Store
                    </a>
                </div>
            </div>
            <div className="image-container">
                <img src={iphoneImage} alt="Danta App" className="iphone-image" />
            </div>
        </section>
    );
};

export default DownloadAppSection;
