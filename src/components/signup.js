import React, {useState} from "react";
import axios from "axios";
import { sha256 } from "js-sha256";
import { Link,useNavigate} from "react-router-dom";
import '../style/login.css'
import { months, days, years } from "../utils/constants";
import { hostname } from "../utils/constants";

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
    const [errMsg, setError] = useState("")
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
            setError("Passwords do not match")
            return
        }

        let date = new Date()
        date.setMonth(month-1)
        date.setDate(day)
        date.setFullYear(year)

        const newUser = {
            email: username,
            pass: sha256.create().update(password).hex(),
            name: name,
            dob: date.toISOString().substring(0,10),
            is_verified: true
        }

        axios.post(hostname + "users/signup", newUser)
            .then(res => {
                console.log(res)
                navigate("/", {state: {msg: "Signup Successful! Please Login"}})
            })
            .catch(err => {
                console.error(err)
            })
    }

    // Array used for holing the number of days in a current month for use in the date picker
    const daysArr = Array.from(Array(days[month] + 1).keys()).slice(1)

    /**
     * React render function to render the {@link Signup} Componenet
     */
    return (
        <div>
            <form onSubmit={onSubmit} className="login-container">
                <h1>Sicky Notes!</h1>
                <h2>Signup</h2>
                <h3 style={{color: "red"}}>{errMsg}</h3>
                <div className="flex-child">
                    <label>Email: </label>
                    <input 
                        type="text"
                        value={username}
                        onChange={e => {setUsername(e.target.value)}}
                    />
                    <label style={{marginLeft: '20px'}}>Password: </label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                </div>
                <div className="flex-child">
                    <label>Confirm Password: </label>
                    <input 
                        type="password"
                        value={confirmPass}
                        onChange={e => {setConfirmPass(e.target.value)}}
                    />
                    <label style={{marginLeft: "20px"}}>Name: </label>
                    <input 
                        type="text"
                        value={name}
                        onChange={e => {setName(e.target.value)}}
                    />
                </div>
                <div className="flex-child">
                    <h3>Date of Birth: </h3>
                    <label>Month: </label>
                    <select value={month}
                        onChange={e => {setMonth(e.target.value)}}>
                        {months.map((m) => {
                            return <option key={m} value={m}>
                                {m}
                            </option>
                        })}
                    </select>
                    <label style={{marginLeft: "20px"}}>Day: </label>
                    <select value={day}
                        onChange={e => {setDay(e.target.value)}}>
                            {daysArr.map((d) => {
                                return <option key={d} value={d}>
                                    {d}
                                </option>
                            })}
                    </select>
                    <label style={{marginLeft: "20px"}}> Year: </label>
                    <select value={year}
                        onChange={e => {setYear(e.target.value)}}>
                            {years.map(y => {
                                return <option key={y} value={y}>
                                    {y}
                                </option>
                            })}
                    </select>
                </div>
                <div className="flex-child">
                    <input 
                        type="submit"
                    />
                    <Link to={"/"}>
                            Back
                    </Link>
                </div>
            </form>
        </div>
    )

}