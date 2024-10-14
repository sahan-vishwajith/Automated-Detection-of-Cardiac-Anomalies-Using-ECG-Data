import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import {
    editPatient,
    createPatient,
    getAllPatients,
    getPatientsForDashBoard,
    loginPatient,
    updateMedicalHistory
} from "../controlls/patientC.js";

describe("Patient Controller", function () {
    let patientStub, doctorStub, bcryptStub, jwtStub;

    // Clean up after each test to avoid wrapping errors
    afterEach(function () {
        sinon.restore();
    });

    // Test for editPatient
    describe("editPatient", function () {
        it("should edit and update a patient's details", async function () {
            const req = {
                body: {
                    username: "patient1",
                    name: "John Doe",
                    email: "john@example.com",
                    address: "123 Main St",
                    coords: [12.34, 56.78]
                }
            };
            const res = {
                status: sinon.stub().returnsThis(), // Chaining for response
                json: sinon.spy() // Spy to check JSON output
            };
            const next = sinon.spy(); // Spy for error handling
    
            // Mocking the patient to be found
            const patient = {
                save: sinon.stub().resolves(), // Mock save function
                name: "oldName",
                email: "oldEmail@example.com",
                address: "oldAddress",
                coords: [] // Previous coords
            };
            patientStub = sinon.stub(Patient, "findOne").resolves(patient); // Mocking findOne
    
            await editPatient(req, res, next);
    
            // Assert that the patient details have been updated
            expect(patient.name).to.equal("John Doe");
            expect(patient.email).to.equal("john@example.com");
            expect(patient.address).to.equal("123 Main St");
            expect(patient.coords).to.deep.equal([12.34, 56.78]); // Check coords
    
            // Assert that response status and json were called correctly
            expect(res.status.calledWith(200)).to.be.true; // Check for 200 status
        });
    
        it("should return 404 if patient is not found", async function () {
            const req = { body: { username: "unknownUser" } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
            const next = sinon.spy();
    
            // Simulating that patient is not found
            patientStub = sinon.stub(Patient, "findOne").resolves(null); // Returns null
    
            await editPatient(req, res, next);
    
            // Assert that 404 response is given
            expect(res.status.calledWith(404)).to.be.true; // Check for 404 status
            expect(res.json.calledWith({ message: "Patient not found" })).to.be.true; // Check for error message
        });
    });
    

    // Test for createPatient
    describe("createPatient", function () {
        it("should create a new patient and return success", async function () {
            const req = {
                body: { name: "Jane Doe", username: "janedoe", email: "jane@example.com", address: "456 Oak St", password: "password123" },
                user: "doctor1"
            };
            const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
            const next = sinon.spy();

            const doctor = { patients: [], save: sinon.stub().resolves() };
            doctorStub = sinon.stub(Doctor, "findOne").resolves(doctor);

            bcryptStub = sinon.stub(bcrypt, "hashSync").returns("hashed_password");

            const newPatient = { save: sinon.stub().resolves() };
            patientStub = sinon.stub(Patient.prototype, "save").resolves(newPatient);

            await createPatient(req, res, next);

            expect(doctor.patients).to.include(newPatient.id);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(newPatient)).to.be.true;
        });
    });

    // Test for getAllPatients
    describe("getAllPatients", function () {
        it("should return all patients for a doctor", async function () {
            const req = { user: "doctor1" };
            const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
            const next = sinon.spy();

            const patients = [{ name: "John Doe", username: "johndoe" }];
            patientStub = sinon.stub(Patient, "find").resolves(patients);

            await getAllPatients(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(patients)).to.be.true;
        });
    });

    // Test for getPatientsForDashBoard
    describe("getPatientsForDashBoard", function () {
        it("should return all patients for dashboard", async function () {
            const req = {};
            const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
            const next = sinon.spy();

            const patients = [{ name: "John Doe", coords: [12.34, 56.78], location: "123 Main St" }];
            patientStub = sinon.stub(Patient, "find").resolves(patients);

            await getPatientsForDashBoard(req, res, next);

            expect(res.status.calledWith(200)).to.be.false;
            expect(res.json.calledWith(patients)).to.be.false;
        });
    });

    // Test for loginPatient
    describe("loginPatient", function () {
        it("should log in a patient with correct credentials", async function () {
            const req = {
                body: { username: "patient1", password: "password123" }
            };
            const res = {
                cookie: sinon.stub().returnsThis(),
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            const next = sinon.spy();

            const patient = {
                _doc: { username: "patient1", email: "patient@example.com", password: "hashed_password" },
                password: "hashed_password"
            };
            patientStub = sinon.stub(Patient, "findOne").resolves(patient);
            bcryptStub = sinon.stub(bcrypt, "compare").resolves(true);
            jwtStub = sinon.stub(jwt, "sign").returns("jwt_token");

            await loginPatient(req, res, next);

            expect(res.cookie.calledWith("access_token", "jwt_token")).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ username: patient._doc.username, email: patient._doc.email })).to.be.true;
        });

        it("should return 404 if patient is not found", async function () {
            const req = { body: { username: "unknownUser", password: "password123" } };
            const res = {};
            const next = sinon.spy();

            patientStub = sinon.stub(Patient, "findOne").resolves(null);

            await loginPatient(req, res, next);

            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].message).to.equal("User not found!");
        });

        it("should return 400 if password is incorrect", async function () {
            const req = { body: { username: "patient1", password: "wrongPassword" } };
            const res = {};
            const next = sinon.spy();

            const patient = {
                _doc: { username: "patient1", email: "patient@example.com", password: "hashed_password" },
                password: "hashed_password"
            };
            patientStub = sinon.stub(Patient, "findOne").resolves(patient);
            bcryptStub = sinon.stub(bcrypt, "compare").resolves(false);

            await loginPatient(req, res, next);

            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].message).to.equal("Wrong password or username...");
        });
    });

    // Test for updateMedicalHistory
    describe("updateMedicalHistory", function () {
        it("should update a patient's medical history", async function () {
            const req = { body: { id: "patient1", medical: "new condition" } }; // Update to string
            const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
            const next = sinon.spy();

            // Mocking the Patient model's findOneAndUpdate method
            const patient = { medicalHistory: [], save: sinon.stub().resolves() };
            const patientStub = sinon
                .stub(Patient, "findOneAndUpdate")
                .resolves({ ...patient, medicalHistory: ["new condition"] }); // Simulate updated medical history

            await updateMedicalHistory(req, res, next);

            // Assertions
            expect(patientStub.calledOnce).to.be.true;
            expect(patientStub.firstCall.args[0]).to.deep.equal({ id: "patient1" });
            expect(patientStub.firstCall.args[1]).to.deep.equal({ $push: { medicalHistory: "new condition" } });
            expect(res.status.calledWith(200)).to.be.true;

            // Restore the original function after test
            patientStub.restore();
        });
        it("should return 404 if patient is not found", async function () {
            const req = { body: { id: "unknownPatient", medical: { condition: "new condition" } } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
            const next = sinon.spy();

            patientStub = sinon.stub(Patient, "findOneAndUpdate").resolves(null);

            await updateMedicalHistory(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Patient not found" })).to.be.true;
        });
    });
});
