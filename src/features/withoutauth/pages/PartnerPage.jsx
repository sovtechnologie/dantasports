import React, { useEffect, useState } from 'react'
import "../Stylesheets/PartnerPage.css";
import caroselImage from "../assets/carousel-image1.png";
import caroselImage2 from "../assets/carousel-image2.png";
import ZeroCommissionBanner from '../components/ZeroCommissionBanner';
import BenefitCard from '../components/BenefitCard';
import partnerData from "../StaticData/PartnerData.js";
import FacilityManagement from '../components/FacilityManagement.jsx';
import AnalyticsCapabilities from '../components/AnalyticsCapabilities.jsx';
import PaymentSolutions from '../components/PaymentSolutions.jsx';
import PaymentFeatures from '../components/PaymentFeatures.jsx';
import OnboardingSupport from '../components/OnboardingSupport.jsx';


const images = [
    caroselImage,
    caroselImage2,
    caroselImage,
    caroselImage2,
];

function PartnerPage() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="Partner-main-Container">
            <div className="Partner-header">
                <div className="header-left">
                    <h1>
                        Transform Your Sports <br />
                        <span>Club Digitally at Danta</span>
                    </h1>
                    <p>Join the 3,000+ facilities nationwide using Dantasports.com
                        Do you operate sports facilities or events? Click Become A Partner or Book a Call to find out how Dantasports can help you</p>
                    <div className="button-group">
                        <button className="primary-btn-one">Request a Demo</button>
                        <button className="secondary-btn-two">Book a Call With Us</button>
                    </div>
                </div>

                <div className="header-right">
                    <img src={images[currentImage]} alt="Corporate Wellness" className="carousel-img" />
                    <div className="pagination-dots">
                        {images.map((_, i) => (
                            <span key={i} className={`dot ${i === currentImage ? 'active' : ''}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="zero-banner-wrapper">
                <ZeroCommissionBanner />
            </div>

            <div className='partner-carousel'>
                <BenefitCard benefits={partnerData}/>
            </div>
            <div className='partner-facility'>
                <FacilityManagement />
            </div>
             <div className='partner-Analytics'>
                <AnalyticsCapabilities />
            </div>
            <div className='partner-payment'>
                <PaymentSolutions />
            </div>
            <div className='partner-payment'>
                <PaymentFeatures />
            </div>
            <div className='partner-facility'>
                <OnboardingSupport />
            </div>
        </div>
    )
}

export default PartnerPage