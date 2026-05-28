const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect DB
db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// AUTH MIDDLEWARE
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token",
      });
    }

    req.user = user;
    next();
  });
}

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// REGISTER USER
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const checkUserSql = "SELECT * FROM users WHERE email = ?";

  db.query(checkUserSql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error hashing password");
      }

      const insertUserSql =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      db.query(insertUserSql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error creating user");
        }

        res.status(201).json({
          message: "User registered successfully",
        });
      });
    });
  });
});

// LOGIN USER
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const findUserSql = "SELECT * FROM users WHERE email = ?";

  db.query(findUserSql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    if (result.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error checking password");
      }

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });
  });
});

// GET ONLY LOGGED-IN USER'S JOBS
app.get("/jobs", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM job_applications WHERE user_id = ?";

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching jobs");
    }

    res.json(result);
  });
});

// ADD JOB FOR LOGGED-IN USER
app.post("/jobs", authenticateToken, (req, res) => {
  const { companyName, role, status, dateApplied, notes } = req.body;

  const sql = `
    INSERT INTO job_applications
    (companyName, role, status, dateApplied, notes, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [companyName, role, status, dateApplied, notes, req.user.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error adding job");
      }

      res.status(201).json({
        message: "Job added successfully",
        jobId: result.insertId,
      });
    }
  );
});

// UPDATE JOB STATUS FOR LOGGED-IN USER
app.patch("/jobs/:id/status", authenticateToken, (req, res) => {
  const jobId = req.params.id;
  const { status } = req.body;

  const sql =
    "UPDATE job_applications SET status = ? WHERE id = ? AND user_id = ?";

  db.query(sql, [status, jobId, req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating status");
    }

    res.json({
      message: "Status updated successfully",
    });
  });
});

// DELETE JOB FOR LOGGED-IN USER
app.delete("/jobs/:id", authenticateToken, (req, res) => {
  const jobId = req.params.id;

  const sql = "DELETE FROM job_applications WHERE id = ? AND user_id = ?";

  db.query(sql, [jobId, req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting job");
    }

    res.json({
      message: "Job deleted successfully",
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});