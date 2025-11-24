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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      { src: "https://picsum.photos/id/1019/600/400", alt: "Image 3" },
     { src: "https://picsum.photos/id/1015/600/400", alt: "Image 2" },
    { src: "https://picsum.photos/id/1019/600/400", alt: "Image 3" },
=======
=======
>>>>>>> Stashed changes
     { src: "https://picsum.photos/id/1018/600/400", alt: "Image 1" },
    { src: "https://picsum.photos/id/1015/600/400", alt: "Image 2" },
    { src: "https://picsum.photos/id/1019/600/400", alt: "Image 3" },
     { src: "https://picsum.photos/id/1015/600/400", alt: "Image 2" },
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              style={{ width: "180px", margin: "5px", borderRadius: "8px" }}
=======
              style={{ width: "200px", margin: "5px", borderRadius: "8px" }}
>>>>>>> Stashed changes
=======
              style={{ width: "200px", margin: "5px", borderRadius: "8px" }}
>>>>>>> Stashed changes
            />
          </a>
        ))}
      </LightGallery>
    </div>
   </>
  );
};

export default GalleryComponent;
