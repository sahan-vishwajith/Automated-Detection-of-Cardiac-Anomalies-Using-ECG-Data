import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Doctor from "./doctor.js";  // Ensure the path is correct

describe("Doctor Schema Test", function () {
  let mongoServer;

  // Setup an in-memory MongoDB server before all tests
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // Disconnect and stop the in-memory server after all tests
  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Clear the Doctor collection after each test to avoid interference
  afterEach(async () => {
    await Doctor.deleteMany({});
  });

  // Test case 1: Valid Doctor creation
  it("should create a doctor with valid fields", async function () {
    const doctor = new Doctor({
      name: "Dr. John Doe",
      username: "drjohndoe",
      password: "strongpassword",
      bday: new Date("1980-05-01"),
      id: "DR12345",
      address: "123 Medical Street",
      email: "drjohn@example.com",
      patients: ["PatientA", "PatientB"]
    });

    const savedDoctor = await doctor.save();
    expect(savedDoctor._id).to.exist;
    expect(savedDoctor.name).to.equal("Dr. John Doe");
    expect(savedDoctor.username).to.equal("drjohndoe");
  });

  // Test case 2: Missing required fields
  it("should throw a validation error if required fields are missing", async function () {
    const doctor = new Doctor({
      name: "Dr. John Doe",
      bday: new Date("1980-05-01"),
      patients: ["PatientA"]  // Missing required fields like 'username', 'password', etc.
    });

    try {
      await doctor.save();
    } catch (error) {
      expect(error.errors.username).to.exist;
      expect(error.errors.password).to.exist;
      expect(error.errors.id).to.exist;
      expect(error.errors.address).to.exist;
      expect(error.errors.email).to.exist;
    }
  });

  // Test case 3: Unique username and email
  it("should throw a validation error if username or email is not unique", async function () {
    const doctor1 = new Doctor({
      name: "Dr. John Doe",
      username: "drjohndoe",
      password: "password123",
      bday: new Date("1980-05-01"),
      id: "DR12345",
      address: "123 Medical Street",
      email: "drjohn@example.com",
    });

    const doctor2 = new Doctor({
      name: "Dr. Jane Smith",
      username: "drjohndoe",  // Same username
      password: "password321",
      bday: new Date("1985-06-10"),
      id: "DR54321",
      address: "456 Health Avenue",
      email: "drjane@example.com",
    });

    await doctor1.save();

    try {
      await doctor2.save();
    } catch (error) {
      expect(error.code).to.equal(11000);  // Duplicate key error
    }
  });

  // Test case 4: Invalid email format
  it("should throw a validation error if email format is invalid", async function () {
    const doctor = new Doctor({
      name: "Dr. John Doe",
      username: "drjohndoe",
      password: "securePassword",
      bday: new Date("1980-05-01"),
      id: "DR12345",
      address: "123 Medical Street",
      email: "invalid-email",  // Invalid email format
    });

    try {
      await doctor.save();
    } catch (error) {
      expect(error.errors.email).to.exist;
    }
  });

  // Test case 5: Successful doctor deletion
  it("should delete a doctor successfully", async function () {
    const doctor = new Doctor({
      name: "Dr. John Doe",
      username: "drjohndoe",
      password: "securePassword",
      bday: new Date("1980-05-01"),
      id: "DR12345",
      address: "123 Medical Street",
      email: "drjohn@example.com",
    });

    const savedDoctor = await doctor.save();
    await Doctor.findByIdAndDelete(savedDoctor._id);
    const deletedDoctor = await Doctor.findById(savedDoctor._id);
    expect(deletedDoctor).to.be.null;
  });

  // Test case 6: Duplicate doctor email insertion
  it("should not allow insertion of a doctor with a duplicate email", async function () {
    const doctor1 = new Doctor({
      name: "Dr. John Doe",
      username: "drjohndoe",
      password: "securePassword",
      bday: new Date("1980-05-01"),
      id: "DR12345",
      address: "123 Medical Street",
      email: "drjohn@example.com",
    });

    const doctor2 = new Doctor({
      name: "Dr. Jane Smith",
      username: "drjanesmith",
      password: "anotherPassword",
      bday: new Date("1985-06-10"),
      id: "DR54321",
      address: "456 Health Avenue",
      email: "drjohn@example.com",  // Duplicate email
    });

    await doctor1.save();

    try {
      await doctor2.save();
    } catch (error) {
      expect(error.code).to.equal(11000);  // Duplicate key error
    }
  });
});
