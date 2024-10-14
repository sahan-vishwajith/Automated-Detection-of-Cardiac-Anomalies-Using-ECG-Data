import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Patient from "./patient.js"; // Ensure this path is correct

describe("Patient Schema Test", function () {
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
    // Clear the Patient collection after each test
    await Patient.deleteMany({});
  });

  // Test case 1: Valid Patient creation
  it("should create a patient with valid fields", async function () {
    const patient = new Patient({
      name: "John Doe",
      idNumber: "123456789",
      address: "123 Main St",
      bday: new Date("1990-01-01"),
      gender: "Male",
      email: "john.doe@example.com",
      medicalHistory: ["Asthma", "Allergy"],
      doctor: "Dr. Smith",
      password: "securePassword",
      username: "johndoe",
      location: ["City", "Country"],
      coords: [40.7128, -74.0060] // Example coordinates
    });

    const savedPatient = await patient.save();
    expect(savedPatient._id).to.exist;
    expect(savedPatient.name).to.equal("John Doe");
  });

  // Test case 2: Missing required fields
  it("should throw validation error if required fields are missing", async function () {
    const patient = new Patient({
      address: "123 Main St",  // Missing 'name', 'idNumber', etc.
    });

    try {
      await patient.save();
    } catch (error) {
      expect(error.errors.name).to.exist;
      expect(error.errors.idNumber).to.exist;
    }
  });

  // Test case 3: Unique idNumber and email
  it("should throw a validation error if idNumber or email is not unique", async function () {
    const patient1 = new Patient({
      name: "Jane Doe",
      idNumber: "123456789",
      address: "123 Main St",
      bday: new Date("1990-01-01"),
      gender: "Female",
      email: "jane.doe@example.com",
      doctor: "Dr. Smith",
      password: "securePassword",
      username: "janedoe",
    });

    const patient2 = new Patient({
      name: "Jake Doe",
      idNumber: "123456789",  // Same idNumber
      address: "456 Elm St",
      bday: new Date("1992-01-01"),
      gender: "Male",
      email: "jake.doe@example.com",
      doctor: "Dr. Jones",
      password: "securePassword",
      username: "jakedoe",
    });

    await patient1.save();

    try {
      await patient2.save();
    } catch (error) {
      expect(error.code).to.equal(11000);  // Duplicate key error code
    }
  });

  // Test case 4: Successful patient deletion
  it("should delete a patient successfully", async function () {
    const patient = new Patient({
      name: "John Doe",
      idNumber: "123456789",
      address: "123 Main St",
      bday: new Date("1990-01-01"),
      gender: "Male",
      email: "john.doe@example.com",
      doctor: "Dr. Smith",
      password: "securePassword",
      username: "johndoe",
    });

    const savedPatient = await patient.save();
    await Patient.findByIdAndDelete(savedPatient._id);
    const deletedPatient = await Patient.findById(savedPatient._id);
    expect(deletedPatient).to.be.null;
  });

  // Test case 5: Unique username
  it("should throw a validation error if username is not unique", async function () {
    const patient1 = new Patient({
      name: "John Doe",
      idNumber: "123456789",
      address: "123 Main St",
      bday: new Date("1990-01-01"),
      gender: "Male",
      email: "john.doe@example.com",
      doctor: "Dr. Smith",
      password: "securePassword",
      username: "johndoe",
    });

    const patient2 = new Patient({
      name: "Jane Smith",
      idNumber: "987654321",
      address: "456 Elm St",
      bday: new Date("1992-01-01"),
      gender: "Female",
      email: "jane.smith@example.com",
      doctor: "Dr. Jones",
      password: "anotherPassword",
      username: "johndoe",  // Same username
    });

    await patient1.save();

    try {
      await patient2.save();
    } catch (error) {
      expect(error.code).to.equal(11000);  // Duplicate key error
    }
  });
});
