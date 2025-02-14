import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(4500);
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

  const submitForm = async (e) => {
    e.preventDefault();

    if (!title || !description || !companyName || !contactEmail || !location || !salary) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (!validateEmail(contactEmail)) {
      setMessage("Invalid email format.");
      setMessageType("error");
      return;
    }

    if (!validatePhone(contactPhone)) {
      setMessage("Invalid phone number.");
      setMessageType("error");
      return;
    }

    const salaryValue = parseFloat(salary);
    if (isNaN(salaryValue) || salaryValue <= 0) {
      setMessage("Please enter a valid salary.");
      setMessageType("error");
      return;
    }

    const newJob = {
      title,
      type,
      location,
      description,
      salary: salaryValue,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };

    try {
      const response = await fetch("http://localhost:4000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (response.ok) {
        setMessage("Job added successfully!");
        setMessageType("success");
        setTimeout(() => setMessage(""), 5000);
        navigate("/");
      } else {
        const errorDetails = await response.json();
        console.error("Error details:", errorDetails);
        setMessage("Failed to add job. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while adding the job.");
      setMessageType("error");
    }
  };

  return (
    <div className="create">
      <h2>Add New Job</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Job Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="type">Job Type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="" disabled>Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>
        <label htmlFor="description">Job Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label htmlFor="contactEmail">Contact Email:</label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label htmlFor="contactPhone">Contact Phone:</label>
        <input
          id="contactPhone"
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <button type="submit">Add Job</button>
      </form>
      {message && (
        <p className={messageType === "success" ? "success-message" : "error-message"}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddJobPage;
