import { useState } from "react";

function JobForm({ addJob }) {

    const [companyName , setCompanyName] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");
    const [dateApplied, setDateApplied] = useState("");
    const [notes, setNotes] = useState("");

    function handleSubmit(e) {
  e.preventDefault();

  const newJob = {
    companyName,
    role,
    status,
    dateApplied,
    notes,
  };

   console.log(newJob);


    addJob(newJob);
}


    return <div>JOB FORM
        <form onSubmit={handleSubmit}>
            <label>Company Name:</label>
            <input type ="text"  value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
             <label>Role:</label>
            <input type ="text" value={role} onChange={(e) => setRole(e.target.value)}/>
             <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
            </select>
                <label>Date Applied:</label>
            <input type ="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)}/>
                <label>Notes:</label>
            <input type ="text" value={notes} onChange={(e) => setNotes(e.target.value)}/>
                <button type="submit">Submit</button>

            </form>

            
    </div>
}

export default JobForm;

