import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateIncident() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    service: "",
    severity: "SEV3",
    status: "OPEN",
    owner: "",
    summary: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/incidents",
        formData
      );

      alert("Incident created successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Create New Incident</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div>
          <label>Title</label><br />
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Service</label><br />
          <input
            type="text"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Severity</label><br />
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          >
            <option>SEV1</option>
            <option>SEV2</option>
            <option>SEV3</option>
            <option>SEV4</option>
          </select>
        </div>

        <div>
          <label>Status</label><br />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>OPEN</option>
            <option>MITIGATED</option>
            <option>RESOLVED</option>
          </select>
        </div>

        <div>
          <label>Owner</label><br />
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Summary</label><br />
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">Create Incident</button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateIncident;
