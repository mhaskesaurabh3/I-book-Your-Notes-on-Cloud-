import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "" });
 const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {name, email, password} = credentials;
    const response = await fetch("/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:credentials.name , email:credentials.email, password:credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/"); 
      props.showAlert("Logged In Successfully: Welcome to I-book", "success")
    }
    else {
     props.showAlert("Please enter valid credentials", "danger")
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }



  return <div className='container my-4'>
       <h2 className='my-2'>Create an account to add notes to your i-Book</h2>
    <form onSubmit={handleSubmit}  >
      <div className="form-group" >
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" aria-describedby="name" name='name' value={credentials.name}  onChange={onChange}  placeholder="Enter name"  required/>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} placeholder="Enter email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={credentials.password}  onChange={onChange} minLength={5}  />
      </div>
      <div className="form-group">
        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" placeholder="Confirm Password" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} required />
      </div>
      <button type="submit" className="btn btn-primary my-2">Submit</button>
    </form>
  </div>;
};

export default Signup;
