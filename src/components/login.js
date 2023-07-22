import React, {useState} from "react";
import axios from 'axios'
import {sha256} from 'js-sha256'
import { useCookies } from 'react-cookie'
import '../style/login.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { hostname } from "../utils/constants";

/**
 * Login component for the Sticky Notes App that allows a user to login
 * @returns React Login Component
 */
export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["todo-sso"])
    const [errMsg, setErrMsg] = useState("")
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
                    setErrMsg(err.response.data)
                })
            })
            .catch(err => {
                console.error(err)
                setErrMsg(err.response.data)
            })
    }
    const htmlMsg = (location.state !== null) ? <h3>{location.state.msg}</h3> : <h3></h3>
    const errorMsg = (errMsg !== "") ? <h3 style={{color: "red"}}>{errMsg}</h3>: <h3></h3>

    /**
     * React render function to render the login component
     */
    return (
        <div>
            <form onSubmit={onSubmit} className="login-container">
                <h1>Sticky Notes!</h1>
                <h2>Login</h2>
                {htmlMsg}
                {errMsg}
                <div className="flex-child">
                    <label>Username: </label>
                    <input 
                        type="text"
                        value={username}
                        onChange={e => {setUsername(e.target.value)}}
                    />
                </div>
                <div className="flex-child">
                    <label>Password: </label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                </div>
                <div className="flex-child">
                    <input 
                        type="submit"
                    />
                </div>
                <div className="flex-child">
                    <div>
                        <label>Dont have an account: </label>
                        <Link to={"/signup"}>
                            Signup
                        </Link>
                    </div>
                    <div>
                        <label>Forgot credentials: </label>
                        <Link to={"/forgot"}>
                            Recover Credentials
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}