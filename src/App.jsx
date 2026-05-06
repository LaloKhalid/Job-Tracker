import { useState } from "react";
import "./App.css";

import JobForm from "./Job_Form";
import Job_List from "./Job_List";
import Status_Filter from "./Status_Filter";

function App() {
  const [count, setCount] = useState(0);
  const [jobs, setJobs] = useState([]);

  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);


    const addJob = (newJob) => {
  setJobs([...jobs, newJob]);
  console.log("Jobs array:", [...jobs, newJob]);
};
  };

  return (
    <div className="app">
      <h1>Job Tracker</h1>

      {/* Job Form */}
      <JobForm addJob={addJob} />

      {/* Filter */}
      <Status_Filter />

      {/* Job List */}
      <Job_List jobs={jobs} />

      {/* Counter (optional - keep for practice) */}
      <button onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>

      <ul>
  {jobs.map((job, index) => (
    <li key={index}>
      {job.title} - {job.company}
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;