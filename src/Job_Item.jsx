function Job_Item({ job, deleteJob, index, statusUpdate }) {
    return (
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h3>{job.role}</h3>
            <p>{job.companyName}</p>
            <p>{job.status}</p>
            <p>{job.dateApplied}</p>


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

