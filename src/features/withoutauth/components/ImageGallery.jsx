
// import React, { useState, useEffect } from 'react';
// import './Stylesheets/EnhancedGallery.css';

// const EnhancedGallery = ({ images, layout = 'grid' }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Get unique categories from images
//   const categories = ['all', ...new Set(images.map(img => img.category).filter(Boolean))];

//   // Filter images based on category and search
//   const filteredImages = images.filter(image => {
//     const matchesCategory = filter === 'all' || image.category === filter;
//     const matchesSearch = image.alt.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const openModal = (image, index) => {
//     setSelectedImage(image);
//     setCurrentIndex(index);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   const nextImage = () => {
//     const nextIndex = (currentIndex + 1) % filteredImages.length;
//     setCurrentIndex(nextIndex);
//     setSelectedImage(filteredImages[nextIndex]);
//   };

//   const prevImage = () => {
//     const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
//     setCurrentIndex(prevIndex);
//     setSelectedImage(filteredImages[prevIndex]);
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (!selectedImage) return;

//       switch(e.key) {
//         case 'Escape':
//           closeModal();
//           break;
//         case 'ArrowLeft':
//           prevImage();
//           break;
//         case 'ArrowRight':
//           nextImage();
//           break;
//         default:
//           break;
//       }
//     };

//     document.addEventListener('keydown', handleKeyPress);
//     return () => document.removeEventListener('keydown', handleKeyPress);
//   }, [selectedImage, currentIndex]);

//   return (
//     <div className="enhanced-gallery">
//       {/* Header */}
//       <div className="gallery-header">
//         <h1 className="gallery-title">Gallery</h1>

//         {/* Search and Filter */}
//         <div className="gallery-controls">
//           <input
//             type="text"
//             placeholder="Search images..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />

//           <div className="filter-buttons">
//             {categories?.map(category => (
//               <button
//                 key={category}
//                 className={`filter-btn \${filter === category ? 'active' : ''}`}
//                 onClick={() => setFilter(category)}
//               >
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Gallery Grid */}
//       <div className={`gallery-content layout-${layout}`}>
//         {filteredImages.map((image, index) => (
//           <div 
//             key={index} 
//             className="gallery-card"
//             onClick={() => openModal(image, index)}
//           >
//             <div className="image-container">
//               <img 
//                 src={image.src} 
//                 alt={image.alt} 
//                 loading="lazy"
//               />
//               <div className="image-overlay">
//                 <div className="overlay-content">
//                   <span className="view-icon">👁️</span>
//                   <h3 className="image-title">{image.alt}</h3>
//                   {image.category && (
//                     <span className="image-category">{image.category}</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Results count */}
//       <div className="results-count">
//         Showing {filteredImages.length} of {images.length} images
//       </div>

//       {/* Modal */}
//       {selectedImage && (
//         <div className="modal-backdrop" onClick={closeModal}>
//           <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>{selectedImage.alt}</h2>
//               <button className="close-btn" onClick={closeModal}>
//                 ✕
//               </button>
//             </div>

//             <div className="modal-body">
//               <button className="nav-btn prev-btn" onClick={prevImage}>
//                 ⬅️
//               </button>

//               <div className="modal-image-container">
//                 <img 
//                   src={selectedImage.src} 
//                   alt={selectedImage.alt} 
//                   className="modal-image"
//                 />
//               </div>

//               <button className="nav-btn next-btn" onClick={nextImage}>
//                 ➡️
//               </button>
//             </div>

//             <div className="modal-footer">
//               <div className="image-info">
//                 {selectedImage.category && (
//                   <span className="category-tag">{selectedImage.category}</span>
//                 )}
//                 <span className="image-counter">
//                   {currentIndex + 1} / {filteredImages.length}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnhancedGallery;


import React, { useState } from 'react';
import './Stylesheets/EnhancedGallery.css';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery</h1>

      <div className="gallery-grid">
        {images?.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => openModal(image, index)}
          >
            <img 
              src={image.image_url} 
              alt={image.alt} 
              loading="lazy"
            />
            <div className="gallery-overlay">
              <span className="view-icon">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <button className="modal-prev" onClick={prevImage}>
              &#8249;
            </button>
            <img 
              src={selectedImage.image_url} 
              alt={selectedImage.alt} 
              className="modal-image"
            />
            <button className="modal-next" onClick={nextImage}>
              &#8250;
            </button>
            <div className="modal-info">
              <p>{selectedImage.alt}</p>
              <span>{currentIndex + 1} / {images.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

