import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Full-Time",
    location: "",
    description: "",
    salary: 4500,
    companyName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const navigate = useNavigate();


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job data.");
        }
        const jobData = await response.json();
        setJob(jobData);
        setFormData({
          title: jobData.title,
          type: jobData.type,
          location: jobData.location,
          description: jobData.description,
          salary: jobData.salary,
          companyName: jobData.company.name,
          contactEmail: jobData.company.contactEmail,
          contactPhone: jobData.company.contactPhone,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const updateJob = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          company: {
            name: formData.companyName,
            contactEmail: formData.contactEmail,
            contactPhone: formData.contactPhone,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job.");
      }

      // Revert to view mode after updating
      setIsEditing(false);
      navigate("/"); // Redirect to the homepage after updating
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete job from the server
  const deleteJob = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete job.");
      }
      navigate("/"); // Redirect to the homepage after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  // Show confirmation modal for deletion
  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  // Cancel the deletion
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="job-details">
      {isEditing ? (
        <div>
          <h2>Edit Job</h2>
          <form onSubmit={updateJob}>
            <label htmlFor="title">Job Title:</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="type">Job Type:</label>
            <select
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
            <label htmlFor="description">Job Description:</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="companyName">Company Name:</label>
            <input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
            />
            <label htmlFor="contactEmail">Contact Email:</label>
            <input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
            />
            <label htmlFor="contactPhone">Contact Phone:</label>
            <input
              id="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={handleChange}
            />
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
            />
            <label htmlFor="salary">Salary:</label>
            <input
              id="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
            />
            <button type="submit">Update Job</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <p>Contact Email: {job.company.contactEmail}</p>
          <p>Contact Phone: {job.company.contactPhone}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Posted Date: {job.postedDate}</p>
          <button onClick={() => setIsEditing(true)}>Edit Job</button>
          <button onClick={confirmDelete}>Delete Job</button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this job?</p>
          <button onClick={deleteJob}>Yes, Delete</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default JobPage;
