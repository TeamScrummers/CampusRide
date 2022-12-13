import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "CampusRide",
});

//If there is a auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123'

// Register CRUD
app.get("/", (req, res) => {
  res.json("hello");
});

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

app.delete("/home/:id", (req, res) => {
  const accountId = req.params.id;
  const q = " DELETE FROM account WHERE id = ? ";

  db.query(q, [accountId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

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
// Unfinished, does not do anything when there is a combination match. 
app.post("/login", (req, res) => {
  const q = "SELECT * FROM account WHERE `email` = ? AND `password` = ?";
  
  const values = [
    req.body.email,
    req.body.password,
  ];

  db.query(q, [...values],(err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data);
    return res.json(data);
  });
});

// app.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   db.query("",
//     [email, password])
//   if (result) {
//         res.send(result);
//       } else {
//         res.send({ message: "Wrong Email or Password Combination"});
//       }
//     }
//   );






app.listen(8800, () => {
  console.log("Connected to backend.");
});
