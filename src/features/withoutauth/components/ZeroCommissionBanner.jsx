import React from 'react';
import './Stylesheets/ZeroCommissionBanner.css';
import leftsectionBanner from '../assets/BannerPattern.png'; // Ensure the image is in your src/assets folder or correct relative path
import rightsectionBanner from "../assets/rightBannerPattern.png";
const ZeroCommissionBanner = () => {
  return (
    <div
      className="zero-banner container"
    //   style={{ backgroundImage: `url(${sectionBanner})` }}
    >
        {/* <img src={leftsectionBanner} alt='banner' style={{marginLeft:"185px",width:"494px"}}/> */}
      <div className="zero-banner-content">
        <h2>
          Why Pay Heavy Commissions? <span>Go Zero</span>
        </h2>
        <p>Transform Your Booking Experience with Danta</p>
      </div>
      {/* <img src={rightsectionBanner} alt='banner'/> */}
    </div>
  );
};

export default ZeroCommissionBanner;
