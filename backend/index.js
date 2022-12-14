import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// mySQL datbase connection info
// If there is an auth problem/error
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123'

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "CampusRide",
});

// Needs explanation
app.get("/", (req, res) => {
  res.json("hello");
});

// Returns entire table
app.get("/home", (req, res) => {
  const q = "SELECT * FROM account";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Create CRUD functionality otherwise known as register account
app.post("/home", (req, res) => {
  const q = "INSERT INTO account (`email`, `name`, `password`) VALUES (?)";
  
  const values = [
    req.body.email,
    req.body.name,
    req.body.password,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Delete CRUD functionality
app.delete("/home/:id", (req, res) => {
  const accountId = req.params.id;
  const q = " DELETE FROM account WHERE id = ? ";

  db.query(q, [accountId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Update CRUD functionality
app.put("/home/:id", (req, res) => {
  const accountId = req.params.id;
  const q = "UPDATE account SET `email`= ?, `name`= ?, `password`= ? WHERE id = ?";

  const values = [
    req.body.email,
    req.body.name,
    req.body.password,
  ];

  db.query(q, [...values,accountId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


// Basic Auth
// Unfinished, does not do anything meaningful when there is a combination match. 
// Just outputs the data of the login match to console.
app.post("/login", (req, res) => {
  const q = "SELECT * FROM account WHERE `email` = ? AND `password` = ?";
  
  const values = [
    req.body.email,
    req.body.password,
  ];

  // passes values as ?s in q query
  db.query(q, [...values],(err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data);
    return res.json(data);
  });
});

// Listen to server and posts status message.
app.listen(8800, () => {
  console.log("Connected to backend.");
});
