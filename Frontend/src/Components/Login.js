import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const context = useContext(noteContext)
    const { getNotes } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', JSON.stringify(json.authToken));
            props.showAlert("Logged in successfully", "success")
            navigate('/');
            getNotes();
        }
        else {
            props.showAlert("Please enter valid credentials", "danger")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h3>Login to your I-book account </h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email mt-3">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />

                </div>
                <div className="form-group my-2">
                    <label htmlFor="Password">Password</label>
                    <input type="password" className="form-control" id="Password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
};

export default Login;
