import React from "react";

const ImageGallery = ({ images, addImageToCanvas }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
      {images.map((img) => (
        <div key={img.id} className="relative group">
          <img
            src={img.urls.small}
            alt={img.alt_description}
            className="w-full h-48 object-cover rounded-md shadow-sm"
          />
          <button
            onClick={() => {
              addImageToCanvas(img.urls.full);
            }}
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md"
          >
            <span className="px-4 py-2 bg-blue-600 rounded-md shadow-md">
              Add Image
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
