import { useState, useRef } from "react";
import "../style/stickynote.css";

const StickyNote = ({ mouseX, mouseY, id, getId }) => {
  const [note, setNote] = useState("");
  const [type, setType] = useState("todo");
  const posX = useRef(0);
  const posY = useRef(0);
  const [mouseHold, setMouseHold] = useState(false);
  const windowWidth = useRef(window.innerWidth);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const sendId = () => {
    getId(id);
  };

  const onMouseDown = () => {
    setMouseHold(true);
    sendId();
    console.log("mouse down");
  };

  const onMouseUp = () => {
    setMouseHold(false);
    console.log("mouse up");
  };

  if (mouseHold) {
    if (mouseX < windowWidth.current - 200) {
      posX.current = mouseX;
      posY.current = mouseY;
    } else {
      posX.current = windowWidth.current - 200;
      posY.current = mouseY;
    }
    if (posX.current < windowWidth.current / 3) {
      if (type !== "todo") {
        setType("todo");
      }
    } else if (posX.current < (windowWidth.current / 3) * 2) {
      if (type !== "inProgress") {
        setType("inProgress");
      }
    } else {
      if (type !== "done") {
        setType("done");
      }
    }
  }

  return (
    <div
      className="sticky-note"
      onMouseUp={onMouseUp}
      onMouseLeave={() => {
        console.log("mouse leave note");
      }}
      style={{
        left: posX.current + "px",
        top: posY.current + "px",
        backgroundColor:
          type === "todo"
            ? "white"
            : type === "inProgress"
            ? "orange"
            : "green",
      }}
    >
      <div
        className="pushpin"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={() => {
          console.log("mouse leave pin");
        }}
      >
        <div className="pin-child"></div>
      </div>
      <textarea value={note} onChange={handleNoteChange} />
    </div>
  );
};

export default StickyNote;
