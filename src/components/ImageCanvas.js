import { Circle, Rect, Textbox } from "fabric";
import React, { useEffect, useRef } from "react";

const ImageCanvas = ({ selectedImage }) => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);

  useEffect(() => {
    // Dynamically import Fabric.js
    const loadFabric = async () => {
      const { fabric } = await import("fabric");

      // Initialize Fabric.js canvas
      canvasInstance.current = new fabric.Canvas(canvasRef.current);

      // Load the selected image as background
      fabric.Image.fromURL(selectedImage, (img) => {
        img.set({
          scaleX: canvasInstance.current.width / img.width,
          scaleY: canvasInstance.current.height / img.height,
        });
        canvasInstance.current.setBackgroundImage(
          img,
          canvasInstance.current.renderAll.bind(canvasInstance.current)
        );
      });

      // Clean up the canvas on unmount
      return () => {
        canvasInstance.current.dispose();
      };
    };

    loadFabric();
  }, [selectedImage]);

  // Function to add text to the canvas
  const addText = () => {
    if (!canvasInstance.current) return; // Check if canvas is initialized
    const text = new Textbox("Edit me", {
      left: 100,
      top: 100,
      fontSize: 20,
      editable: true,
    });
    canvasInstance.current.add(text);
  };

  // Function to add shapes to the canvas
  const addShape = (shapeType) => {
    if (!canvasInstance.current) return; // Check if canvas is initialized
    let shape;
    switch (shapeType) {
      case "circle":
        shape = new Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: "red",
        });
        break;
      case "rectangle":
        shape = new Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 50,
          fill: "blue",
        });
        break;
      default:
        return; // Exit if no valid shapeType
    }
    canvasInstance.current.add(shape);
  };

  // Function to download the canvas image
  const downloadImage = () => {
    if (!canvasInstance.current) return; // Check if canvas is initialized
    const link = document.createElement("a");
    link.href = canvasInstance.current.toDataURL({
      format: "png",
      quality: 1,
    });
    link.download = "download.png"; // Name of the downloaded file
    link.click();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid #000" }}
      />
      <div>
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
};

export default ImageCanvas;
