import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [account, setAccount] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/home", account);
      console.log(account);
      console.log("Navigating...");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };
  
  return (
    <div className="form">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email Address"
        name="email"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Full Name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Register</button>
      {error && "Something went wrong!"}
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Register;
