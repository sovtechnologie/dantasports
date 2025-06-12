import React from 'react';
import './Stylesheets/AppDownloadBanner.css'; // Adjust the path as needed
import waveImage from '../assets/WaveLogo.png'; // Adjust the path as needed

const AppDownloadBanner = () => {
    return (
        <div className="app-banner">
            <div className="banner-content">
                <div className="banner-text">
                    <h2>Get the Danta app for a seamless experience!</h2>
                </div>
                <div className="banner-buttons">
                    <button className="store-button">
                        <img src="https://img.icons8.com/color/48/000000/google-play.png" alt="Google Play" />
                        Google Play
                    </button>
                    <button className="store-button">
                        <img src="https://img.icons8.com/ios-filled/30/000000/mac-os.png" alt="Apple Store" />
                        Apple Store
                    </button>
                </div>
            </div>
            <img src={waveImage} alt="Decoration" className="banner-bg" />
        </div>
    );
};

export default AppDownloadBanner;
