import * as chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../routes/admin.js'; // Import your Express app
import Doctor from '../models/doctor.js'; // Import your Doctor model
import Admin from '../models/admin.js'; // Import your Admin model

chai.use(chaiHttp);
const { expect } = chai;

describe("API Integration Tests", function () {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Doctor.deleteMany({});
    await Admin.deleteMany({});
  });

  // Test case 1: Register an admin
  it("should register an admin", async function () {
    const adminData = {
      username: "adminUser",
      password: "adminPassword",
      // Add other required fields as per your Admin model
    };

    const res = await chai.request(app).post('/').send(adminData);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.username).to.equal(adminData.username);
  });

  // Test case 2: Register a doctor
  it("should register a doctor", async function () {
    // First, create an admin and log in to get a cookie or token
    const adminData = {
      username: "adminUser",
      password: "adminPassword",
    };
    
    await chai.request(app).post('/api/registerAdmin').send(adminData);

    const loginRes = await chai.request(app).post('/api/login').send(adminData);
    const token = loginRes.body.token; // Assuming you return a token on successful login

    const doctorData = {
      name: "Dr. John Doe",
      username: "drjohndoe",
      password: "doctorPassword",
      bday: new Date("1980-05-01"),
      id: "DR12345",
      address: "123 Medical Street",
      email: "drjohn@example.com",
    };

    const res = await chai.request(app)
      .post('/api/createD') // Adjust this route according to your setup
      .set('Authorization', `Bearer ${token}`) // Assuming you use Bearer token
      .send(doctorData);
    
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal(doctorData.name);
  });

  // Test case 3: Get all doctors
  it("should retrieve all doctors", async function () {
    // Ensure there is at least one doctor in the database
    const doctor = new Doctor({
      name: "Dr. Jane Smith",
      username: "drjanesmith",
      password: "doctorPassword",
      bday: new Date("1985-06-10"),
      id: "DR54321",
      address: "456 Health Avenue",
      email: "drjane@example.com",
    });
    await doctor.save();

    const res = await chai.request(app).get('/api/Doctors').set('Authorization', `Bearer tokenHere`); // Set token if required
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  // Test case 4: Admin login
  it("should log in an admin", async function () {
    const adminData = {
      username: "adminUser",
      password: "adminPassword",
    };

    const res = await chai.request(app).post('/api/login').send(adminData);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token'); // Assuming you return a token
  });
});
