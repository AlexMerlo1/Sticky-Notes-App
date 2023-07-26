import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

import StickyNote from "./stickynote";
import TopBar from "./topbar";
import "../style/dashboard.css";

/**
 * Main Dashboard for the Sticky Notes App that allows a user to manager their
 * current collection of sticky notes
 * @returns DashBoard React Component
 */
export default function DashBoard() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [currentDraggedNote, setCurrentDraggedNote] = useState(null);
  const location = useLocation();
  const [todos, setTodos] = useState(location.state);
  const [cookies, setCookie] = useCookies(["todo-sso"]);
  const [notes, setNotes] = useState([]);

  /**
   * Event listener for handling mouse movement across the entire dashboard
   */
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

  const addNote = () => {
    setNotes([...notes, { id: notes.length, text: "" }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getNoteId = (id) => {
    setCurrentDraggedNote(id);
    console.log(id);
  };
  /**
   * React render function to render the {@link DashBoard} Componenet
   */
  return (
    <div className="dashboard">
      <TopBar />
      <button className="add-note-button" onClick={addNote}>
        Add Note
      </button>
      <div className="heading-container">
        <h1>To Do</h1>
        <h1>In Progress</h1>
        <h1>Complete</h1>
      </div>
      <div className="sticky-note-container">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            mouseX={mouseX}
            mouseY={mouseY}
            id={note.id}
            getId={getNoteId}
          />
        ))}
        <div
          className="delete"
          onMouseOver={() => deleteNote(currentDraggedNote)}
        >
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
        </div>
      </div>
      <div class="vl">
      </div>
      <div className="vl2">
        </div>
    </div>
  );
}
