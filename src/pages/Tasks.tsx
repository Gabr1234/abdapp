import { useState, useEffect } from "react";

interface Job {
  id: number;
  description: string;
}

const DATA_SOURCE = "https://jsonplaceholder.typicode.com/todos?_limit=5";

const JobManager = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    fetch(DATA_SOURCE)
      .then((response) => response.json())
      .then((data) => setJobs(data));
  }, []);

  const addJob = () => {
    if (jobDescription.trim() !== "") {
      const newJob: Job = { id: Date.now(), description: jobDescription };
      setJobs([...jobs, newJob]);
      setJobDescription("");
    }
  };

  const openUpdateModal = (job: Job) => {
    setActiveJob(job);
    setUpdatedDescription(job.description);
    setIsUpdating(true);
  };

  const updateJob = () => {
    if (activeJob) {
      setJobs(
        jobs.map((job) =>
          job.id === activeJob.id ? { ...job, description: updatedDescription } : job
        )
      );
      setIsUpdating(false);
      setActiveJob(null);
    }
  };

  const deleteJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="job-container">
      <h1>Task Manager</h1>

      <div className="job-input">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button onClick={addJob}>Add Task</button>
      </div>

      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <span>{job.description}</span>
            <div>
              <button className="update-btn" onClick={() => openUpdateModal(job)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteJob(job.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {isUpdating && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Task</h2>
            <input
              type="text"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <button onClick={updateJob}>💾 Save</button>
            <button onClick={() => setIsUpdating(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManager;
