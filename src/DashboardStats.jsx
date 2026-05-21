function DashboardStats({ jobs }) {
    const totalJobs = jobs.length;

    const appliedJobs = jobs.filter(job => job.status === "Applied").length;
    const interviewJobs = jobs.filter(job => job.status === "Interview").length;
    const offerJobs = jobs.filter(job => job.status === "Offer").length;
    const rejectedJobs = jobs.filter(job => job.status === "Rejected").length;

    return (
        <div>

            <h2>Dashboard Stats</h2>

            <p>TEST CHANGE</p>

            {/* Cards */}
            <div>

                <div>
                    <p>Total Jobs</p>
                    <p>{totalJobs}</p>
                </div>

                <div>
                    <p>Applied</p>
                    <p>{appliedJobs}</p>
                </div>

                <div>
                    <p>Interview</p>
                    <p>{interviewJobs}</p>
                </div>

                <div>
                    <p>Offer</p>
                    <p>{offerJobs}</p>
                </div>

                <div>
                    <p>Rejected</p>
                    <p>{rejectedJobs}</p>
                </div>

            </div>
        </div>
    );
}

export default DashboardStats;
