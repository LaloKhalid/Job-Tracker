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

    return (
        <div className="job-form">

            <div>

                <h1>Job Form</h1>

                <form onSubmit={handleSubmit}>

                    {/* Company Name */}
                    <div>
                        <label>
                            Company Name:
                        </label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label>
                            Role:
                        </label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label>
                            Status:
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Date Applied */}
                    <div>
                        <label>
                            Date Applied:
                        </label>
                        <input
                            type="date"
                            value={dateApplied}
                            onChange={(e) => setDateApplied(e.target.value)}
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label>
                            Notes:
                        </label>
                       <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                    </div>

                    {/* Button */}
                    <button type="submit">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
}

export default JobForm;
