import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie'
import { useLocation } from 'react-router-dom'

import StickyNote from "./stickynote";
import TopBar from "./topbar";

/**
 * Main Dashboard for the Sticky Notes App that allows a user to manager their
 * current collection of sticky notes
 * @returns DashBoard React Component
 */
export default function DashBoard() {

    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const location = useLocation()
    const [todos, setTodos] = useState(location.state)
    const [cookies, setCookie] = useCookies(["todo-sso"])
  
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

    /**
     * React render function to render the {@link DashBoard} Componenet
     */
    return (
        <div>
            <TopBar />
            <StickyNote mouseX={mouseX} mouseY={mouseY} />
        </div>
    )
}