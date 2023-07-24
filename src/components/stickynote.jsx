import { useState, useRef } from "react";
import "../style/stickynote.css";

const StickyNote = ({ mouseX, mouseY }) => {
  const [note, setNote] = useState("");
  const posX = useRef(0);
  const posY = useRef(0);
  const [mouseHold, setMouseHold] = useState(false);
  const windowWidth = useRef(window.innerWidth);
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const onMouseDown = () => {
    setMouseHold(true);
    console.log("mouse down");
  };

  const onMouseUp = () => {
    if (mouseHold) {
      setMouseHold(false);
      console.log("mouse up");
    }
  };

  if (mouseHold) {
    posX.current = mouseX;
    posY.current = mouseY;
  }

  return (
    <div
      className="sticky-note"
      onMouseUp={onMouseUp}
      style={{
        left: posX.current + "px",
        top: posY.current + "px",
        position: mouseHold ? "absolute" : "",
        backgroundColor:
          posX.current < windowWidth.current / 3
            ? "#f5f5f5"
            : posX.current < (windowWidth.current / 3) * 2
            ? "orange"
            : "green",
      }}
    >
      <div
        className="pushpin"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      ></div>
      <textarea value={note} onChange={handleNoteChange} />
    </div>
  );
};

export default StickyNote;
