console.log("Connecting to:", process.env.MONGO_URI);

const mongoose = require("mongoose");
require("dotenv").config();
const Incident = require("../models/Incident");

const services = ["Billing", "Auth", "Payments", "Search", "Notifications"];
const severities = ["SEV1", "SEV2", "SEV3", "SEV4"];
const statuses = ["OPEN", "MITIGATED", "RESOLVED"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected for seeding");

    await Incident.deleteMany();

    const incidents = [];

    for (let i = 1; i <= 200; i++) {
      incidents.push({
        title: `Incident ${i}`,
        service: randomItem(services),
        severity: randomItem(severities),
        status: randomItem(statuses),
        owner: `Engineer ${Math.ceil(Math.random() * 10)}`,
        summary: `This is a sample summary for incident ${i}`,
        createdAt: new Date(Date.now() - Math.random() * 1000000000),
        updatedAt: new Date(),
      });
    }

    await Incident.insertMany(incidents);

    console.log("200 incidents seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();
