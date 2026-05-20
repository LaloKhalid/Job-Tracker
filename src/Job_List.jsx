import Job_Item from "./Job_Item";

function Job_List({ jobs, deleteJob, statusUpdate }) {
  return (
    <div>
      <h2>Job List</h2>

      {jobs.map((job, index) => (
        <Job_Item
          key={index}
          job={job}
          deleteJob={deleteJob}
          statusUpdate={statusUpdate}
          index={index}
        />
      ))}
    </div>
  );
}

export default Job_List;