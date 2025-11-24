import React from "react";
import LightGallery from "lightgallery/react";
// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import "../../withoutauth/Stylesheets/CustomGallery.css";

// Styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";

const GalleryComponent = () => {
  const images = [
    { src: "https://picsum.photos/id/1018/600/400", alt: "Image 1" },
    { src: "https://picsum.photos/id/1015/600/400", alt: "Image 2" },
    { src: "https://picsum.photos/id/1019/600/400", alt: "Image 3" },
     { src: "https://picsum.photos/id/1018/600/400", alt: "Image 1" },
    { src: "https://picsum.photos/id/1015/600/400", alt: "Image 2" },
    { src: "https://picsum.photos/id/1019/600/400", alt: "Image 3" },
     { src: "https://picsum.photos/id/1015/600/400", alt: "Image 2" },
    { src: "https://picsum.photos/id/1019/600/400", alt: "Image 3" },
    
  ];

  return (
   <>
    <h2 className="mb-3 mb-lg-4 details_page_heading ">Gallery</h2>

    <div className="gallery-container">
     
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgFullscreen]}
      >
        {images.map((img, index) => (
          <a href={img.src} key={index}>
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: "200px", margin: "10px", borderRadius: "8px" }}
            />
          </a>
        ))}
      </LightGallery>
    </div>
   </>
  );
};

export default GalleryComponent;
