import React, {useState} from "react";
import axios from 'axios'
import {sha256} from 'js-sha256'
import { useCookies } from 'react-cookie'
import '../style/login.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { hostname } from "../utils/constants";
import { Button, Form, Nav } from "react-bootstrap";

/**
 * Login component for the Sticky Notes App that allows a user to login
 * @returns React Login Component
 */
export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["todo-sso"])
    const [errMsg, setErrMsg] = useState({msg: "", flag: false})
    const location = useLocation();
    const navigate = useNavigate();
    
    /**
     * OnSubmit function for the login component. Calls the /login
     * endpoint of the api to get a token before saving it into a cookie
     * for future use.
     * 
     * @todo add redirect to dashboard
     * @param {Event} e Submittion Event
     */
    const onSubmit = e => {
        e.preventDefault();
        const new_user = {
            email: username,
            pass: sha256.create().update(password).hex()
        }
        axios.post(hostname + "users/login", new_user)
            .then(res => {
                setCookie('todo-sso', res.data)
                axios.get(hostname + "todos/" + cookies["todo-sso"].userId, {
                    headers:{
                        Authorization: "Bearer " + cookies["todo-sso"].token
                    }
                }).then(res => {
                    console.log(res)
                    navigate("/dashboard", {state: res.data})

                })
                .catch (err => {
                    console.log(err)
                    setErrMsg({msg: err.response.data, flag: true})
                })
            })
            .catch(err => {
                console.error(err)
                setErrMsg({msg: err.response.data, flag: true})
            })
    }
    const htmlMsg = (location.state !== null) ? location.state.msg : ""
    const errorMsg = (errMsg !== "") ? errMsg.msg: ""

    /**
     * React render function to render the login component
     */
    return (
        <div className="dashboard-page">
            <Form noValidate validated={(errMsg.flag)} onSubmit={onSubmit} className="login-container login-width border border-primary rounded shadow">
                <h2 className="form-headers">Sticky Notes!</h2>
                <h3 className="form-headers">Login</h3>
                <p className="form-headers">{htmlMsg}</p>
                <p className="form-headers">{errorMsg}</p>
                <Form.Group className="mb-3 form-item" controlId="formUsername">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email..." onChange={e => {setUsername(e.target.value)}} value={username}/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 form-item" controlId="formPassword" >
                    <Form.Label>Password: </Form.Label>
                    <Form.Control required type="password" placeholder="Enter Password..." onChange={e => {setPassword(e.target.value)}} value={password}/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter the password linked to your account
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3  form-item" controlId="formRememberMe">
                    <Form.Check type="checkbox" label="Remeber Me"/>
                </Form.Group>
                <Button variant="primary" type="submit" className="form-button">
                    Submit
                </Button>
                <div className="flex-child form-links">
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/signup">SignUp</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/forgot">Forgot Credentials</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </Form>
        </div>
    )
}