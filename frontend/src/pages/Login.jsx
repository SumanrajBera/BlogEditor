import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";

export default function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate()

    const { login } = userStore()

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
        let res = await login(credentials)
        if(res){
            navigate('/')
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Log in</h2>
            <form onSubmit={handleSubmit} className="row col-lg-5 mx-auto">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" id="username" placeholder="Enter Username" value={credentials.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" placeholder="Enter Password" value={credentials.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}