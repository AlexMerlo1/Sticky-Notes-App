import { useState, useRef } from "react";

const StickyNote = ({ mouseX, mouseY }) => {
  const [note, setNote] = useState("");
  const posX = useRef(0);
  const posY = useRef(0);
  const [mouseHold, setMouseHold] = useState(false);

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
    //garbage bug fix
    posX.current = mouseX - 10;
    posY.current = mouseY - 10;
  }

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className="sticky-note"
      style={{
        left: posX.current + "px",
        top: posY.current + "px",
        position: mouseHold ? "absolute" : "",
      }}
    >
      <p>note</p>
    </div>
  );
};

export default StickyNote;
