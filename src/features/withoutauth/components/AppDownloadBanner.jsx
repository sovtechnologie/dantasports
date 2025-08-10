import React from 'react';
import './Stylesheets/AppDownloadBanner.css'; // Adjust the path as needed
import waveImage from '../assets/WaveLogo.png'; // Adjust the path as needed
import appleicon from '../../../assets/appleicon.png';
import googleplaystoreicon from '../../../assets/Icon.png';


const AppDownloadBanner = () => {
    return (
        <div className="app-banner">
            <div className="banner-content">
                <div className="banner-text">
                    <h2>Get the Danta app for a seamless experience!</h2>
                </div>
                <div className="banner-buttons">
                    <a href='https://play.google.com/store/apps' className="store-button">
                         <img src={googleplaystoreicon} alt="Google Play" />
                        Google Play
                    </a>
                    <a href='https://apps.apple.com/apps' className="store-button">
                        <img src={appleicon} alt="Apple Store" />
                        Apple Store
                    </a>
                </div>
            </div>
            <img src={waveImage} alt="Decoration" className="banner-bg" />
        </div>
    );
};

export default AppDownloadBanner;
