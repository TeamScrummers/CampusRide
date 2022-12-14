import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import { useEffect } from "react";

const Landing = () => {
  const [account, setAccount] = useState([]);

  // Renders a list of all accounts w/ mutation options. 
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
      await axios.delete(`http://localhost:8800/Landing/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>CampusRide<br></br>Logged In</h1>
      <img src ="images\logo.png" alt="CampusRide Logo" width="250" height="250"></img>
      <div className="acccount">
        {account.map((account) => (
          <div key={account.id} className="Landing">
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
        <Link to="/MapView" style={{ color: "inherit", textDecoration: "none" }}>
          Go to Map View
        </Link>
      </button>
    </div>
  );
};

export default Landing;
