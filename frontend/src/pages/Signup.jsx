import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";
import "./Signup.css"


export default function Signup() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate()

    const { signup } = userStore()

    const handleChange = (e) => {
        if (e.target.name === "username") {
            setCredentials((prevDets) => (
                { ...prevDets, username: e.target.value }
            ))
        }
        if (e.target.name === "password") {
            setCredentials((prevDets) => (
                { ...prevDets, password: e.target.value }
            ))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await signup(credentials)
        if (res) {
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="row col-lg-5 mx-auto">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" id="username" placeholder="Enter Username" aria-describedby="usernameHelp" value={credentials.username} onChange={handleChange} required />
                    <div id="usernameHelp" className="form-text">*Username should be of length 6-10</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" placeholder="Enter Password" aria-describedby="passwordHelp" value={credentials.password} onChange={handleChange} required/>
                    <div id="passwordHelp" className="form-text">*Password should be of length 6-8</div>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}
