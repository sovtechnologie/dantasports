import React from 'react';
import './Stylesheets/OurGallery.css';
import galleryImg from '../assets/Gallery/gallery.jpeg'; // Replace with your actual image

const OurGallery = () => {
    return (
        <div className="gallery-container">
            <h2 className="gallery-heading">
                Our <span>Gallery</span>
            </h2>

            <div className="gallery-cards">
               <img className='w-100 rounded-3' src={galleryImg} alt="" />
            </div>

            {/* <hr style={{width:"100%" }} /> */}
            {/* <div className="gallery-footer">
                <div className="gallery-page-indicator">
                    <span className="page-number">{String(currentPage).padStart(2, '0')}</span> of {totalPages}
                </div>
                <div className="gallery-buttons">
                    <button onClick={handlePrev} className="nav-btn">{'←'}</button>
                    <button onClick={handleNext} className="nav-btn">{'→'}</button>
                </div>
            </div> */}
        </div>
    );
};

export default OurGallery;
