function DashboardStats({ jobs }) {
    const totalJobs = jobs.length;

    const appliedJobs = jobs.filter(job => job.status === "Applied").length;
    const interviewJobs = jobs.filter(job => job.status === "Interview").length;
    const offerJobs = jobs.filter(job => job.status === "Offer").length;
    const rejectedJobs = jobs.filter(job => job.status === "Rejected").length;

    return (
        <div>
            <h2>Dashboard Stats</h2>

            <p>Total Jobs: {totalJobs}</p>
            <p>Applied: {appliedJobs}</p>
            <p>Interview: {interviewJobs}</p>
            <p>Offer: {offerJobs}</p>
            <p>Rejected: {rejectedJobs}</p>
        </div>
    );
}

export default DashboardStats;