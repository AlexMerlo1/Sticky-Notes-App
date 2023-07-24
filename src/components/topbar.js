import React from "react"
import {Link} from "react-router-dom"
import { Nav } from "react-bootstrap"
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
        <div className="top-bar bg-dark">
            <Nav>
                <Nav.Item>
                    <Nav.Link href="/dashboard">Dashboard View</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/list">List View</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/about">About Us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">Logout</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}