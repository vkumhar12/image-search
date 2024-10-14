import React from "react";

const DownloadButton = ({ canvas }) => {
  const handleDownload = () => {
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    link.click();
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleDownload}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
      >
        Download Image
      </button>
    </div>
  );
};

export default DownloadButton;
