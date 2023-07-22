import React from "react"
import {Link} from "react-router-dom"
import '../style/top-bar.css'

/**
 * Simple TopBar for the Sticky Notes App that allows a user to navigate to different
 * pages of the site as well as logout of the site
 * @returns TopBar React Component
 */
export default function TopBar() {

    /**
     * React render function to render the {@link DashBoard} Componenet
     */
    return (
        <div className="top-bar">
            <Link to={"/"} className="link-item">Logout</Link>
        </div>
    )
}