import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Basic Auth
    // Unfinished, does not do anything when there is a combination match. 
    try {
      axios.post(`http://localhost:8800/login`, account);
      navigate("/Landing");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>CampusRide Login</h1>
      <img src ="images\logo.png" alt="CampusRide Logo" width="250" height="250"></img>
      <input
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Login</button>
      {error && "Something went wrong!"}
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default Login;
