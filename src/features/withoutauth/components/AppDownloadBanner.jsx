import React from 'react';
// import './Stylesheets/AppDownloadBanner.module.css'; 
import styled from './Stylesheets/AppDownloadBanner.module.css';
import waveImage from '../assets/WaveLogo.png'; // Adjust the path as needed
import appleicon from '../../../assets/appleicon.png';
import googleplaystoreicon from '../../../assets/Icon.png';


const AppDownloadBanner = () => {
    return (
        <div className={styled.appbanner}>
            <div className={styled.bannercontent}>
                <div   className={styled.bannertext}>
                    <h2>Get the Danta app for a  seamless experience!</h2>
                </div>
                <div className={styled.bannerbuttons}>
                    <a href='https://play.google.com/store/apps'  className={styled.storebutton}>
                         <img src={googleplaystoreicon} alt="Google Play" />
                        Google Play
                    </a>
                    <a href='https://apps.apple.com/apps'  className={styled.storebutton}>
                        <img src={appleicon} alt="Apple Store" />
                        Apple Store
                    </a>
                </div>
            </div>
            <img src={waveImage} alt="Decoration"  className={styled.bannerbg}/>
        </div>
    );
};

export default AppDownloadBanner;
