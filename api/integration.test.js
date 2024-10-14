const chai = require('chai');
const chaiHttp = require('chai-http');

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../api/index.js'; // Import your Express app from index.js
import Doctor from '../api/models/doctor.js'; // Ensure the path is correct

chai.use(chaiHttp);
const { expect } = chai;

describe("Doctor API Integration Tests", function () {
  let mongoServer;

  // Setup in-memory MongoDB before all tests
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // Cleanup after tests
  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Clear Doctor collection after each test
  afterEach(async () => {
    await Doctor.deleteMany({});
  });

  // Test case 1: Create a new doctor via API
  it("should create a doctor with valid fields", async function () {
    const doctorData = {
      name: "Dr. John Doe",
      username: "drjohndoe",
      password: "strongpassword",
      bday: new Date("1980-05-01"),
      id: "DR12345",
      address: "123 Medical Street",
      email: "drjohn@example.com",
      patients: ["PatientA", "PatientB"]
    };

    const res = await chai.request(app).post('/api/doctors').send(doctorData); // Adjust the endpoint if necessary
    expect(res).to.have.status(201); // Check for success status
    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal("Dr. John Doe");
  });

  // Additional test cases for validation errors, uniqueness, etc.
});
