function Job_Item({ job, deleteJob, index, statusUpdate }) {
  return (
    <div className="job-card">
      <h3>{job.role}</h3>

      <p>
        <strong>Company:</strong> {job.companyName}
      </p>

      <p>
        <strong>Applied On:</strong> {job.dateApplied}
      </p>

      <p>
        <strong>Notes:</strong> {job.notes}
      </p>

      {/* STATUS BADGE */}
      <span className={`status ${job.status.toLowerCase()}`}>
        {job.status}
      </span>

      <br />
      <br />

      {/* STATUS CONTROL */}
      <select
        value={job.status || "Applied"}
        onChange={(e) => statusUpdate(index, e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button onClick={() => deleteJob(index)}>
        Delete
      </button>
    </div>
  );
}

export default Job_Item;