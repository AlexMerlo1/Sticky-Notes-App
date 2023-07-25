import { useState } from "react";
import "../style/dashboard.css";
import NotePopup from "./notePopup";

function Note({ note, bg, onDelete, onEdit }) {
  const [popup, setPopup] = useState(false);

  function handleDelete(e) {
    e.stopPropagation();
    onDelete(note.id);
  }
  function handleNoteOpen() {
    setPopup(true);
  }

  function handleUpdate(id, text) {
    if (!text) {
      onDelete(id);
      setPopup(false);
      return;
    }
    console.log(id);
    setPopup(false);
    onEdit(id, text);
  }

  return (
    <>
      <div className={`note ${bg}`} onClick={handleNoteOpen}>
        <p className={"note-text"}> {note.text} </p>
        <div className="note-flex">
          <p className="not-date">date</p>
          <div className="icon-action">
            <button onClick={handleDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <NotePopup close={popup} onUpdate={handleUpdate} note={note} />
    </>
  );
}

export default Note;
