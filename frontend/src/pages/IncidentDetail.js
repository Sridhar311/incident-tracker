import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIncident = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/incidents/${id}`
      );

      // assuming backend returns { data: incident }
      setIncident(res.data.data);
    } catch (err) {
      console.error("Error fetching incident:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchIncident();
  }, [fetchIncident]);

  const updateIncident = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/incidents/${id}`,
        {
          status: incident.status,
          severity: incident.severity,
        }
      );

      alert("Updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Error updating incident:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!incident) return <p>Incident not found</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Incident Tracker</h2>
      <h3>{incident.title}</h3>

      <div style={{ marginTop: "20px" }}>
        <p><b>Service:</b> {incident.service}</p>

        <p>
          <b>Severity:</b>{" "}
          <select
            value={incident.severity}
            onChange={(e) =>
              setIncident({ ...incident, severity: e.target.value })
            }
          >
            <option value="SEV1">SEV1</option>
            <option value="SEV2">SEV2</option>
            <option value="SEV3">SEV3</option>
            <option value="SEV4">SEV4</option>
          </select>
        </p>

        <p>
          <b>Status:</b>{" "}
          <select
            value={incident.status}
            onChange={(e) =>
              setIncident({ ...incident, status: e.target.value })
            }
          >
            <option value="OPEN">OPEN</option>
            <option value="MITIGATED">MITIGATED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </p>

        <p><b>Owner:</b> {incident.owner || "Not Assigned"}</p>

        <p><b>Summary:</b></p>
        <p>{incident.summary || "No summary available"}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={updateIncident}>Save Changes</button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default IncidentDetail;
