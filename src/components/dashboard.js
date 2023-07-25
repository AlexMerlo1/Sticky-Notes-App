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
          <StickyNote key={note.id} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>
      <div class="vl">
      </div>
      <div className="vl2">
        </div>
    </div>
  );
}
