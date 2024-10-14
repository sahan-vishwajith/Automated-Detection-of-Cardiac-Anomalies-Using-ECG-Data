import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Admin from "./admin.js";  // Ensure this path is correct

describe("Admin Schema Test", function () {
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
    // Clear the Admin collection after each test
    await Admin.deleteMany({});
  });

  // Test case 1: Valid Admin creation
  it("should create an admin with valid fields", async function () {
    const admin = new Admin({
      username: "admin1",
      password: "securePassword",
      email: "admin1@example.com",
    });

    const savedAdmin = await admin.save();
    expect(savedAdmin._id).to.exist;
    expect(savedAdmin.username).to.equal("admin1");
  });

  // Test case 2: Missing required fields
  it("should throw validation error if required fields are missing", async function () {
    const admin = new Admin({
      password: "securePassword",  // Missing 'username' and 'email'
    });

    try {
      await admin.save();
    } catch (error) {
      expect(error.errors.username).to.exist;
      expect(error.errors.email).to.exist;
    }
  });

  // Test case 3: Unique username and email
  it("should throw a validation error if username or email is not unique", async function () {
    const admin1 = new Admin({
      username: "admin1",
      password: "securePassword",
      email: "admin1@example.com",
    });
    const admin2 = new Admin({
      username: "admin1",  // Same username
      password: "anotherPassword",
      email: "admin2@example.com",
    });

    await admin1.save();
    
    try {
      await admin2.save();
    } catch (error) {
      expect(error.code).to.equal(11000);  // Duplicate key error code
    }
  });

  // Test case 4: Invalid email format
  it("should throw a validation error if email format is invalid", async function () {
    const admin = new Admin({
      username: "admin1",
      password: "securePassword",
      email: "invalid-email-format",  // Invalid email
    });

    try {
      await admin.save();
    } catch (error) {
      expect(error.errors.email).to.exist;
    }
  });

  // Test case 5: Successful admin deletion
  it("should delete an admin successfully", async function () {
    const admin = new Admin({
      username: "admin1",
      password: "securePassword",
      email: "admin1@example.com",
    });

    const savedAdmin = await admin.save();
    await Admin.findByIdAndDelete(savedAdmin._id);
    const deletedAdmin = await Admin.findById(savedAdmin._id);
    expect(deletedAdmin).to.be.null;
  });

  // Test case 6: Duplicate admin insertion
  it("should not allow insertion of an admin with a duplicate email", async function () {
    const admin1 = new Admin({
      username: "admin1",
      password: "securePassword",
      email: "admin1@example.com",
    });
    const admin2 = new Admin({
      username: "admin2",
      password: "securePassword",
      email: "admin1@example.com",  // Duplicate email
    });

    await admin1.save();

    try {
      await admin2.save();
    } catch (error) {
      expect(error.code).to.equal(11000);  // Duplicate key error
    }
  });
});
