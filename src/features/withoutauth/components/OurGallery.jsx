import React, { useState } from 'react';
import './Stylesheets/OurGallery.css';
import galleryImg from '../assets/OurGalleryImage.png'; // Replace with your actual image

const galleryData = Array(30).fill({
    title: 'SRV Media Sports Event',
    location: 'Bangalore, India',
    image: galleryImg,
});

const OurGallery = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;
    const totalPages = Math.ceil(galleryData.length / cardsPerPage);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCards = galleryData.slice(startIndex, startIndex + cardsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="gallery-container">
            <h2 className="gallery-heading">
                Our <span>Gallery</span>
            </h2>

            <div className="gallery-cards">
                {currentCards.map((item, index) => (
                    <div
                        className="gallery-card"
                        style={{ backgroundImage: `url(${item.image})` }}
                        key={index}
                    >
                        <div className="gallery-overlay">
                            <h3>{item.title}</h3>
                            <p>{item.location}</p>
                        </div>
                    </div>

                ))}
            </div>

            <hr />
            <div className="gallery-footer">
                <div className="gallery-page-indicator">
                    <span className="page-number">{String(currentPage).padStart(2, '0')}</span> of {totalPages}
                </div>
                <div className="gallery-buttons">
                    <button onClick={handlePrev} className="nav-btn">{'←'}</button>
                    <button onClick={handleNext} className="nav-btn">{'→'}</button>
                </div>
            </div>
        </div>
    );
};

export default OurGallery;
