import {
  Circle,
  Ellipse,
  Line,
  Polygon,
  Polyline,
  Rect,
  Triangle,
} from "fabric";
import React from "react";
import { FaDrawPolygon, FaShapes, FaSlash } from "react-icons/fa";
import {
  FaCircle,
  FaEllipsis,
  FaRectangleAd,
  FaTriangleExclamation,
} from "react-icons/fa6";

const ShapeControls = ({ canvas }) => {
  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case "rectangle":
        shape = new Rect({
          left: 100,
          top: 100,
          fill: "rgba(255,0,0,0.5)",
          width: 100,
          height: 60,
        });
        console.log("rectangle");
        break;
      case "circle":
        shape = new Circle({
          left: 150,
          top: 150,
          fill: "rgba(0,255,0,0.5)",
          radius: 50,
        });
        break;
      case "triangle":
        shape = new Triangle({
          left: 200,
          top: 200,
          fill: "rgba(0,0,255,0.5)",
          width: 100,
          height: 100,
        });
        break;
      case "ellipse":
        shape = new Ellipse({
          left: 250,
          top: 250,
          fill: "rgba(255,255,0,0.5)",
          rx: 80,
          ry: 40,
        });
        break;
      case "line":
        shape = new Line([50, 100, 200, 200], {
          left: 300,
          top: 300,
          stroke: "black",
          strokeWidth: 5,
        });
        break;
      case "polygon":
        shape = new Polygon(
          [
            { x: 10, y: 10 },
            { x: 100, y: 10 },
            { x: 50, y: 80 },
          ],
          {
            left: 350,
            top: 350,
            fill: "rgba(0,255,255,0.5)",
          }
        );
        break;
      case "polyline":
        shape = new Polyline(
          [
            { x: 10, y: 10 },
            { x: 100, y: 10 },
            { x: 50, y: 80 },
          ],
          {
            left: 400,
            top: 400,
            fill: "rgba(255,0,255,0.5)",
            stroke: "purple",
            strokeWidth: 2,
          }
        );
        break;
      default:
        alert("Shape type not supported.");
        return;
    }

    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    }
  };

  return (
    <div className="flex space-x-2 justify-center mb-5">
      <button
        onClick={() => addShape("rectangle")}
        className="bg-red-500 p-2 rounded-full shadow-md text-white hover:bg-red-600 transition"
      >
        <FaRectangleAd />
      </button>
      <button
        onClick={() => addShape("circle")}
        className="bg-green-500 p-2 rounded-full shadow-md text-white hover:bg-green-600 transition"
      >
        <FaCircle />
      </button>
      <button
        onClick={() => addShape("triangle")}
        className="bg-blue-500 p-2 rounded-full shadow-md text-white hover:bg-blue-600 transition"
      >
        <FaTriangleExclamation />
      </button>
      <button
        onClick={() => addShape("ellipse")}
        className="bg-yellow-500 p-2 rounded-full shadow-md text-white hover:bg-yellow-600 transition"
      >
        <FaEllipsis />
      </button>
      <button
        onClick={() => addShape("line")}
        className="bg-black p-2 rounded-full shadow-md text-white hover:bg-gray-800 transition"
      >
        <FaSlash />
      </button>
      <button
        onClick={() => addShape("polygon")}
        className="bg-teal-500 p-2 rounded-full shadow-md text-white hover:bg-teal-600 transition"
      >
        <FaDrawPolygon />
      </button>
      <button
        onClick={() => addShape("polyline")}
        className="bg-purple-500 p-2 rounded-full shadow-md text-white hover:bg-purple-600 transition"
      >
        <FaShapes />
      </button>
    </div>
  );
};

export default ShapeControls;
