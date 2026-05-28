import { useState, useEffect } from "react";

function JobForm({ addJob, updateJob, editingJob }) {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [notes, setNotes] = useState("");

  // 🔥 Fill form when editingJob changes
  useEffect(() => {
    if (editingJob) {
      setCompanyName(editingJob.companyName || "");
      setRole(editingJob.role || "");
      setStatus(editingJob.status || "Applied");
      setDateApplied(editingJob.dateApplied || "");
      setNotes(editingJob.notes || "");
    } else {
      // reset form when switching back to "create mode"
      setCompanyName("");
      setRole("");
      setStatus("Applied");
      setDateApplied("");
      setNotes("");
    }
  }, [editingJob]);

  function handleSubmit(e) {
    e.preventDefault();

    const jobData = {
      companyName,
      role,
      status,
      dateApplied,
      notes,
    };

    // 🔥 EDIT MODE (UPDATE)
    if (editingJob) {
      updateJob({
        ...jobData,
        id: editingJob.id,
      });
    }
    // 🔥 CREATE MODE (POST)
    else {
      addJob(jobData);
    }

    // clear form after submit
    setCompanyName("");
    setRole("");
    setStatus("Applied");
    setDateApplied("");
    setNotes("");
  }

  return (
    <div className="job-form">
      <h1>{editingJob ? "Edit Job" : "Add Job"}</h1>

      <form onSubmit={handleSubmit}>
        {/* Company Name */}
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        {/* Role */}
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        {/* Status */}
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label>Date Applied:</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Button */}
        <button type="submit">
          {editingJob ? "Update Job" : "Add Job"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;