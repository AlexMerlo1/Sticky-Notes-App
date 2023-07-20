import React from "react";
import { useState, useEffect } from "react";

import StickyNote from "./stickynote";

const App = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <StickyNote mouseX={mouseX} mouseY={mouseY} />
    </div>
  );
};

export default App;
