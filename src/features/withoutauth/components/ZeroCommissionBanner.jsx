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
      <div className="zero-banner-content row justify-content-center ">
       <div className="col-lg-8 col-12 m-auto py-3 ">
         <h2 className='text-center'>
          Why Partner With DantaSports? <br/> <span>Go Digital Without Losing Control
          </span>
        </h2>
        <p className='text-center'>Most platforms charge high commissions and lock you into rigid systems. DantaSports offers a
          vendor-first, commission-light model designed to maximize your earnings and operational
          efficiency.
        </p>
       </div>
      </div>
      {/* <img src={rightsectionBanner} alt='banner'/> */}
    </div>
  );
};

export default ZeroCommissionBanner;
