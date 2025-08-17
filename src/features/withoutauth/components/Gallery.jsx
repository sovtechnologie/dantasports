import React from 'react';
import './Stylesheets/Gallery.css';
import Masonry from "react-masonry-css";
import eventImage from '../assets/EventImage2.svg';


const images = [
  { id: 1, src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
  { id: 2, src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg" },
  { id: 3, src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
  { id: 4, src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg" },
  { id: 5, src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
  { id: 6, src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg" },
  { id: 7, src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg" },
  { id: 8, src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
  { id: 9, src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg" },
  { id: 10, src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
  { id: 11, src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg" },
  { id: 12, src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
];

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
