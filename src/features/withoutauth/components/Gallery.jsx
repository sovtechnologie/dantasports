import React from 'react';
import './Stylesheets/Gallery.css';
import Masonry from "react-masonry-css";

const breakpoints = {
  default: 6,
  1100: 4,
  700: 3,
  500: 2,
};

export default function Gallery({gallery = []}) {
  const sortedGallery = [...gallery].sort((a, b) => a.display_order - b.display_order);
  return (
    <div className="gallery-wrapper">
      <h2 className="gallery-title">Gallery</h2>
      <Masonry
        breakpointCols={breakpoints}
        className="gallery-masonry"
        columnClassName="gallery-column"
      > 
        {sortedGallery.map((img) => (
          <img
            key={img.id}
            src={img.image_url}
            alt={`img-${img.id}`}
            className="gallery-img"
          />
        ))}
      </Masonry>
    </div>
  );
}
