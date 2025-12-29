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
import PartnerWithUs from '../components/PartnerWithUs.jsx';
import Ready from '../components/Ready.jsx';
import CoachSection from '../components/CoachSection.jsx';


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
        <>
            <section>
                <div className="container">
                    <div className="Partner-header">
                        <div className="header-left">
                            <h1>
                                Grow Your Sports Business. <br />
                                <span>Zero Heavy Commissions.</span>
                            </h1>
                            <p className='pt-lg-5'>Transform how you manage bookings, clients, and revenue with India’s fastest-growing sports &
                                fitness platform.
                            </p>
                            <p>DantaSports is built for sports venue owners, gym operators, coaches, trainers, and event
                                organizers who want to grow digitally without losing margins to high commissions. We provide
                                powerful SaaS tools, discovery visibility, and a community-driven marketplace-so you stay in
                                control while scaling faster.</p>
                            <div className="button-group pt-lg-4">
                                <button className="primary-btn-one">Request a Demo</button>
                                <button className="secondary-btn-two">Book a Call With Us</button>
                            </div>
                        </div>

                    
                    </div>
                </div>
                <section style={{ background: "#F1F3F2" }} className='pt-4 pt-lg-5 pb-lg-5 pb-4'>
                    <div className="zero-banner-wrapper">
                        <ZeroCommissionBanner />
                    </div>
                    <div className='partner-carousel'>
                        <BenefitCard benefits={partnerData} />
                    </div>
                </section>

                <div className="container">
                    <div className='partner-facility'>
                        <FacilityManagement />
                    </div>
                </div>
                <div className="container">
                    <div className='row'>
                        <div className="col-12">
                            <AnalyticsCapabilities />
                        </div>
                    </div>
                    <div className="row my-lg-5 my-4">
                        <div className="col-12">
                            <CoachSection/>
                        </div>
                    </div>
                </div>

                <section style={{ background: "#F1F3F2" }} className='my-lg-5 my-4 py-lg-5 py-4'>
                    <div className="container">
                        <div className='partner-payment'>
                            <PaymentSolutions />
                        </div>
                        <div className='partner-payment'>
                            <PaymentFeatures />
                        </div>
                    </div>
                </section>
                <div className='container'>
                    <OnboardingSupport />
                </div>
                <PartnerWithUs/>
                <Ready/>
            </section>
        </>
    )
}

export default PartnerPage