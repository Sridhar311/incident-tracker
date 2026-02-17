const express = require("express");
const router = express.Router();
const {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident, // import updateIncident
} = require("../controllers/incidentController");

// Routes
router.post("/", createIncident);       // Create a new incident
router.get("/", getIncidents);          // Get all incidents with pagination/filtering
router.get("/:id", getIncidentById);    // Get a single incident by its ID
router.patch("/:id", updateIncident);   // Update an existing incident

module.exports = router;
