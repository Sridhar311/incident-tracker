import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const fetchIncidents = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/incidents", {
        params: {
          page,
          limit: 5,
          search,
          severity,
          status,
          sortBy,
          order,
        },
      });

      setIncidents(res.data.data);
    } catch (err) {
      console.error("Error fetching incidents:", err);
    }
  }, [page, search, severity, status, sortBy, order]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
    setPage(1);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Incident Tracker</h2>

      {/* Controls */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          placeholder="Search title..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={severity}
          onChange={(e) => {
            setPage(1);
            setSeverity(e.target.value);
          }}
        >
          <option value="">All Severity</option>
          <option value="SEV1">SEV1</option>
          <option value="SEV2">SEV2</option>
          <option value="SEV3">SEV3</option>
          <option value="SEV4">SEV4</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="MITIGATED">MITIGATED</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>

        <Link to="/create">
          <button>New Incident</button>
        </Link>
      </div>

      {/* Table */}
      <table width="100%" border="1" cellPadding="10">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
              Title {sortBy === "title" && (order === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("service")} style={{ cursor: "pointer" }}>
              Service {sortBy === "service" && (order === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("severity")} style={{ cursor: "pointer" }}>
              Severity {sortBy === "severity" && (order === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
              Status {sortBy === "status" && (order === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("createdAt")} style={{ cursor: "pointer" }}>
              Created At {sortBy === "createdAt" && (order === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>

        <tbody>
          {incidents.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">
                No incidents found
              </td>
            </tr>
          ) : (
            incidents.map((incident) => (
              <tr key={incident._id}>
                <td>
                  <Link to={`/incidents/${incident._id}`}>
                    {incident.title}
                  </Link>
                </td>
                <td>{incident.service}</td>
                <td>{incident.severity}</td>
                <td>{incident.status}</td>
                <td>
                  {new Date(incident.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default IncidentList;
