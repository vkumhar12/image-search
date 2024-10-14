import React from "react";

const CanvasEditor = ({ canvasRef }) => {
  return (
    <div className="flex justify-center mb-5">
      <canvas
        ref={canvasRef}
        id="canvas"
        className="border border-gray-300 shadow-lg bg-black"
      ></canvas>
    </div>
  );
};

export default CanvasEditor;
