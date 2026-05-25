const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

//temporary database

let job = [];

//test route
app.get("/", (req,res) => {
    res.send("Backend is running! ")
});

//get all jobs
app.get ("/jobs", (req,res)=> {
    res.json(jobs);
});

//add a job
app.post("/jobs", (req,res) => {
    const newJob = req.body;
    jobs.push(newJob);
    res.status(201).json(newJob);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});