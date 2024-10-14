/* eslint-disable no-undef */
import axios from "axios";
import { Canvas, FabricImage } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import CanvasEditor from "./components/CanvasEditor";
import DownloadButton from "./components/DownloadButton";
import ImageGallery from "./components/ImageGallery";
import SearchBar from "./components/SearchBar";
import ShapeControls from "./components/ShapeControls";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const canvasInstance = useRef(null);

  useEffect(() => {
    const initCanvas = new Canvas(canvasRef.current, {
      // Set the canvas reference correctly
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });
    canvasInstance.current = initCanvas; // Store the canvas instance
    setCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
  }, []);

  const fetchImages = async (query) => {
    if (!query) {
      alert("Please enter a search term");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: query,
          client_id: "Ch_nKJ99dXh9yDoNhpr-agTvCE3IyOTJb3yrHwxbdks",
          per_page: 20,
        },
      });

      setImages(res.data.results);
    } catch (error) {
      console.error("Error fetching images:", error.response || error.message);
      alert("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        Image Editor with Shapes
      </h1>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchImages={fetchImages}
      />
      {loading && <div className="loader">Loading...</div>}

      <ImageGallery
        images={images}
        addImageToCanvas={(url) => {
          console.log("Clicked");
          FabricImage.fromURL(
            url,
            (img) => {
              // Set image properties
              img.set({
                left: 0, // Set desired left position
                top: 0, // Set desired top position
                selectable: false, // Make the image non-selectable
                evented: false, // Disable events for the image
              });

              // Scale the image to fit the canvas dimensions
              const canvasWidth = canvasInstance.current.width; // Get canvas width
              const canvasHeight = canvasInstance.current.height; // Get canvas height
              img.scaleToWidth(canvasWidth); // Scale image width
              img.scaleToHeight(canvasHeight); // Scale image height

              // Set the image as the background image of the canvas
              canvasInstance.current.setBackgroundImage(
                img,
                canvasInstance.current.renderAll.bind(canvasInstance.current)
              );
            },
            { crossOrigin: "anonymous" }
          ); // Allow cross-origin images
        }}
      />

      <CanvasEditor canvasRef={canvasRef} />
      <ShapeControls canvas={canvas} />
      <DownloadButton canvas={canvas} />
    </div>
  );
};

export default App;
