import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import { useEffect } from "react";

const Home = () => {
  const [account, setAccount] = useState([]);

  // Below code renders a list of all accounts w/ mutation (CRUD) options. 

  // useEffect(() => {
  //   const fetchAllAccounts = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8800/Home");
  //       setAccount(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllAccounts();
  // }, []);

  console.log(account);

  // Sends promise for delete CRUD
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/Home/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Welcome to <br></br>CampusRide</h1>
      <img src ="images\logo.png" alt="CampusRide Logo" width="250" height="250"></img>
      <div className="acccount">
        {account.map((account) => (
          <div key={account.id} className="Home">
            <h2>{account.email}</h2>
            <p>{account.name}</p>
            <span>{account.password}<br></br> </span>
            <button className="delete" onClick={() => handleDelete(account.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${account.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button className="addHome">
        <Link to="/Login" style={{ color: "inherit", textDecoration: "none" }}>
          Login
        </Link>
      </button>
      {/* <button className="addHome">
        <Link to="/MapView" style={{ color: "inherit", textDecoration: "none" }}>
          Go to Map View
        </Link>
      </button> */}
      <button className="addHome">
        <Link to="/Register" style={{ color: "inherit", textDecoration: "none" }}>
          Register
        </Link>
      </button>
    </div>
  );
};

export default Home;
