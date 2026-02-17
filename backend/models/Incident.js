const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: String,
      enum: ["SEV1", "SEV2", "SEV3", "SEV4"],
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "MITIGATED", "RESOLVED"],
      default: "OPEN",
    },
    owner: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better filtering & sorting
incidentSchema.index({ severity: 1 });
incidentSchema.index({ status: 1 });
incidentSchema.index({ createdAt: -1 });
incidentSchema.index({ service: 1 });

module.exports = mongoose.model("Incident", incidentSchema);
