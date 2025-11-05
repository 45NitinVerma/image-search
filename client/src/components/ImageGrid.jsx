import React from 'react';

const ImageGrid = ({ images, selectedImages, onSelectImage }) => {
  return (
    <div className="image-grid">
      {images.map((image) => {
        const isSelected = selectedImages.includes(image.id);
        return (
          <div
            key={image.id}
            className={`image-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelectImage(image.id)}
          >
            <img src={image.urls.small} alt={image.alt_description} />
            <div className="checkbox"></div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;