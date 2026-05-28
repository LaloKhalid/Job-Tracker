import Job_Item from "./Job_Item";

function Job_List({ jobs, deleteJob, statusUpdate, setEditingJob }) {
  return (
    <div className="job-list">
      <h2>Job List</h2>

      <div className="job-list">
        {jobs.map((job, index) => (
          <Job_Item
            key={job.id || index}
            job={job}
            deleteJob={deleteJob}
            statusUpdate={statusUpdate}
            setEditingJob={setEditingJob}
          />
        ))}
      </div>
    </div>
  );
}

export default Job_List;