const Incident = require("../models/Incident");

// Create Incident
const createIncident = async (req, res) => {
  try {
    const { title, service, severity, status, owner, summary } = req.body;

    if (!title || !service || !severity) {
      return res.status(400).json({
        success: false,
        message: "Title, service and severity are required",
      });
    }

    const incident = await Incident.create({
      title,
      service,
      severity,
      status,
      owner,
      summary,
    });

    res.status(201).json({ success: true, data: incident });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Incidents with pagination, filtering, sorting
const getIncidents = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      severity,
      status,
      service,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filters = {};

    if (severity) filters.severity = severity;
    if (status) filters.status = status;
    if (service) filters.service = service;

    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
      ];
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const incidents = await Incident.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Incident.countDocuments(filters);

    res.status(200).json({
      success: true,
      data: incidents,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Incident by ID
const getIncidentById = async (req, res) => {
  try {
    const { id } = req.params;

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.status(200).json({
      success: true,
      data: incident,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, owner, summary } = req.body;

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    // Only update allowed fields
    if (status) incident.status = status;
    if (owner) incident.owner = owner;
    if (summary) incident.summary = summary;

    await incident.save();

    res.status(200).json({
      success: true,
      data: incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Export all four functions
module.exports = { createIncident, getIncidents, getIncidentById, updateIncident };
