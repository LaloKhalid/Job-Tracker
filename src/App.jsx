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
    <div className="app">

       <div className="p-6 bg-blue-500 text-white rounded-lg text-xl mt-4">
  Tailwind is working 🚀
</div>
      <h1>Job Tracker</h1>

      {/* FORM */}
      <JobForm addJob={addJob} />

      {/* FILTER */}
      <Status_Filter filter={filter} setFilter={setFilter} />

      {/* LIST */}
      <Job_List
        jobs={filteredJobs}
        deleteJob={deleteJob}
        statusUpdate={statusUpdate}
      />

      <DashboardStats jobs={jobs} />
    </div>

   
  );
}

export default App;