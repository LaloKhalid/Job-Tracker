import React, { useState } from "react";
import "./App.css";

import JobForm from "./Job_Form";
import Job_List from "./Job_List";
import Status_Filter from "./Status_Filter";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  // ADD JOB
  const addJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  // DELETE JOB
  const deleteJob = (indexToDelete) => {
    setJobs((prevJobs) =>
      prevJobs.filter((_, index) => index !== indexToDelete)
    );
  };

  // UPDATE STATUS
  const updateStatus = (indexToUpdate, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job, index) =>
        index === indexToUpdate
          ? { ...job, status: newStatus }
          : job
      )
    );
  };

  // FILTER LOGIC (derived state)
  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter((job) => job.status === filter);

  return (
    <div className="app">
      <h1>Job Tracker</h1>

      {/* Job Form */}
      <JobForm addJob={addJob} />

      {/* Filter */}
      <Status_Filter filter={filter} setFilter={setFilter} />

      {/* Job List (IMPORTANT: use filteredJobs) */}
      <Job_List
        jobs={filteredJobs}
        deleteJob={deleteJob}
        updateStatus={updateStatus}
      />
    </div>
  );
}

export default App;