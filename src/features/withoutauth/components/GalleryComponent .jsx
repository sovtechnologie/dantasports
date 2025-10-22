import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../withoutauth/Stylesheets/CustomGallery.css";

import img1 from "../../withoutauth/assets/Gallery/img1.png";
import img2 from "../../withoutauth/assets/Gallery/img2.png";
import img3 from "../../withoutauth/assets/Gallery/img3.png";

const GalleryComponent = () => {
  const images = [img1, img2, img3, img1, img2, img3, img1, img2, img3];

  return (
    <div className="container my-4">
      <div className="cards">
        <h5 className="mb-3 fw-semibold text-secondary mb-4">Gallery</h5>

        <div className="d-flex overflow-auto gallery-scroll">
          {images.map((img, index) => (
            <div key={index} className="gallery-item me-3">
              <img src={img} alt={`Gallery ${index}`} className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryComponent;
