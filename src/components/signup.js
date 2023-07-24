import React, {useState} from "react";
import axios from "axios";
import { sha256 } from "js-sha256";
import { Link,useNavigate} from "react-router-dom";
import '../style/login.css'
import { months, days, years } from "../utils/constants";
import { hostname } from "../utils/constants";
import { Button, Form, Nav, Stack } from "react-bootstrap";

/**
 * Signup component for the Sticky Notes App that allows a user to signup
 * with an email and password
 * @returns React Signup Component
 */
export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [name, setName] = useState("")
    const [month, setMonth] = useState(1)
    const [day, setDay] = useState(-1)
    const [year, setYear] = useState(-1)
    const [date, setDate] = useState(new Date().toISOString().substring(0,10))
    const [errMsg, setErrMsg] = useState({msg: "", flag: false})
    const [isSignedUp, setSignedUp] = useState(false)
    const navigate = useNavigate();

    /**
     * Form submission function for handling signing up a user
     * @param {Event} e 
     * @returns {@link useNavigate} to the login page on success for the user to login
     */
    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPass) {
            setErrMsg({msg: "Passwords do not match", flag: true})
            return
        }

        // let date = new Date()
        // date.setMonth(month-1)
        // date.setDate(day)
        // date.setFullYear(year)

        const newUser = {
            email: username,
            pass: sha256.create().update(password).hex(),
            name: name,
            dob: date,
            is_verified: true
        }

        axios.post(hostname + "users/signup", newUser)
            .then(res => {
                console.log(res)
                navigate("/", {state: {msg: "Signup Successful! Please Login"}})
            })
            .catch(err => {
                console.error(err)
                setErrMsg({msg: err.response.data, flag: true})
            })
    }

    // Array used for holing the number of days in a current month for use in the date picker
    const daysArr = Array.from(Array(days[month] + 1).keys()).slice(1)

    /**
     * React render function to render the {@link Signup} Componenet
     */
    return (
        <div className="dashboard-page">
            <Form noValidate validated={(errMsg.flag)} onSubmit={onSubmit} className="login-container signup-width border border-primary rounded shadow">
                <h2 className="form-headers">Sticky Notes!</h2>
                <h3 className="form-headers">Login</h3>
                <p style={{color: "red"}}>{errMsg.msg}</p>
                <Form.Group className="mb-3 form-item" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email..." onChange={e => {setUsername(e.target.value)}} value={username}/>
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email
                    </Form.Control.Feedback>
                </Form.Group>
                <Stack direction="horizontal" gap={1} className="stack-margin">
                    <Form.Group className="mb-3 form-item" controlId="formPass">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Enter Password..." onChange={e => {setPassword(e.target.value)}} value={password}/>
                        <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid password
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3 form-item" controlId="formConfirmPass">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" placeholder="Confirm Password..." onChange={e => {setConfirmPass(e.target.value)}} value={confirmPass}/>
                        <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Passwords do not match
                        </Form.Control.Feedback>
                    </Form.Group>
                </Stack>
                <Stack direction="horizontal" gap={1} className="stack-margin">
                    <Form.Group className="mb-3 form-item" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Name..." onChange={e => {setName(e.target.value)}} value={name}/>
                        <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please enter a name
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{marginBottom: "15px"}}>
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control required type="date" onChange={e => {
                                console.log(e.target.value)
                                setDate(e.target.value)
                            }} value={date}/>
                    </Form.Group>
                </Stack>
                <Stack direction="horizontal" gap={1} style={{alignSelf: "center"}}>
                    <Button variant="primary" type="submit" className="form-button">
                        Submit
                    </Button>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/">Back</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Stack>
            </Form>
        </div>
    )

}