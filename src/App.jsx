import React, { useState, useEffect } from "react";
import "./App.css";

import JobForm from "./Job_Form";
import Job_List from "./Job_List";
import Status_Filter from "./Status_Filter";
import DashboardStats from "./DashboardStats";

function App() {
  // Load from localStorage OR start empty
    const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [filter, setFilter] = useState("All");

  // ADD JOB
  const addJob = (newJob) => {
    setJobs((prevJobs) => {
      const updated = [...prevJobs, newJob];
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
  };

  // DELETE JOB
  const deleteJob = (indexToDelete) => {
    setJobs((prevJobs) => {
      const updated = prevJobs.filter(
        (_, index) => index !== indexToDelete
      );
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
  };

  // UPDATE STATUS
  const statusUpdate = (indexToUpdate, newStatus) => {
    setJobs((prevJobs) => {
      const updated = prevJobs.map((job, index) =>
        index === indexToUpdate
          ? { ...job, status: newStatus }
          : job
      );

      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
  };

  // FILTER LOGIC
  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter((job) => job.status === filter);

 return (
  <div>

    {/* MAIN AREA */}
    <main>

      <h1>Job Tracker</h1>

      {/* Stats */}
      <DashboardStats jobs={jobs} />

      {/* Form */}
      <JobForm addJob={addJob} />

      {/* Filter */}
      <Status_Filter filter={filter} setFilter={setFilter} />

      {/* List */}
      <Job_List
        jobs={filteredJobs}
        deleteJob={deleteJob}
        statusUpdate={statusUpdate}
      />

    </main>
  </div>
);
}

export default App;