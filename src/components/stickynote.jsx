import { useState, useRef } from "react";
import "../style/stickynote.css";
import HeaderArea from "./header-area";

const getStartingType = (posx, windowWidth) => {
  if (posx < windowWidth.current / 3) {
    return "todo"
  } else if (posx < (windowWidth.current / 3) * 2) {
    return "inProgress"
  } else {
    return "done"
  }
}

const StickyNote = ({ mouseX, mouseY, id, getId, posx, posy, content }) => {
  const [note, setNote] = useState(content);
  const [type, setType] = useState(getStartingType(posx, useRef(window.innerWidth)));
  const posX = useRef((posx !== undefined) ? posx : 0);
  const posY = useRef((posy !== undefined) ? posy : 0);
  const [mouseHold, setMouseHold] = useState(false);
  const windowWidth = useRef(window.innerWidth);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleHeaderChange = (event) => {
    setNote(event.target.value)
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
  <textarea
    value={note}
    onChange={handleHeaderChange}
    placeholder="Enter your header text"
  ></textarea>
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
      <HeaderArea value={note} onChange={handleHeaderChange} />
      <textarea value={note} onChange={handleNoteChange} />
    </div>
  );
};

export default StickyNote;
