import JobListing from "../components/JobListing";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetch('http://localhost:4000/api/jobs') 
      .then((response) => response.json())
      .then((data) => setJobs(data)) 
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []); 



  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;
