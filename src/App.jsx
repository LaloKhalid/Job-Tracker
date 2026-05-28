import React, { useState, useEffect } from "react";
import "./App.css";

import JobForm from "./Job_Form";
import Job_List from "./Job_List";
import Status_Filter from "./Status_Filter";
import DashboardStats from "./DashboardStats";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  // 👇 job currently being edited
  const [editingJob, setEditingJob] = useState(null);

  // LOAD JOBS (READ)
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log("Error fetching jobs:", err));
  }, []);

  // CREATE JOB (POST)
  const addJob = (newJob) => {
    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs((prev) => [...prev, { ...newJob, id: data.id }]);
      })
      .catch((err) => console.log("Error adding job:", err));
  };

  // UPDATE JOB (PUT)
  const updateJob = (updatedJob) => {
    fetch(`http://localhost:3000/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    })
      .then((res) => res.json())
      .then(() => {
        setJobs((prev) =>
          prev.map((job) =>
            job.id === updatedJob.id ? updatedJob : job
          )
        );

        // reset edit mode
        setEditingJob(null);
      })
      .catch((err) => console.log("Error updating job:", err));
  };

  // DELETE JOB
  const deleteJob = (id) => {
    fetch(`http://localhost:3000/jobs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setJobs((prev) => prev.filter((job) => job.id !== id));
      })
      .catch((err) => console.log("Error deleting job:", err));
  };

  // STATUS UPDATE (uses updateJob)
  const statusUpdate = (index, newStatus) => {
    const jobToUpdate = filteredJobs[index];

    const updatedJob = {
      ...jobToUpdate,
      status: newStatus,
    };

    updateJob(updatedJob);
  };

  // FILTER LOGIC
  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter((job) => job.status === filter);

  return (
    <div className="app">
      <main>
        <h1>Job Tracker</h1>

        {/* Dashboard */}
        <DashboardStats jobs={jobs} />

        {/* FORM (create OR edit) */}
        <JobForm
          addJob={addJob}
          updateJob={updateJob}
          editingJob={editingJob}
        />

        {/* FILTER */}
        <Status_Filter
          filter={filter}
          setFilter={setFilter}
        />

        {/* LIST */}
        <Job_List
          jobs={filteredJobs}
          deleteJob={deleteJob}
          statusUpdate={statusUpdate}
          setEditingJob={setEditingJob}
        />
      </main>
    </div>
  );
}

export default App;