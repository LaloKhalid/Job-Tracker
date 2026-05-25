const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
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
    port: process.env.DB_PORT
});

// Connect DB
db.connect((err) => {
    if (err) {
        console.log("DB connection failed:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});