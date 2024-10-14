import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.js";
import { registerDoctor, loginDoctor, getAllDoctors } from "../controlls/doctorC.js";

describe("Doctor Controller", function() {

    // Test for registerDoctor
    describe("registerDoctor", function() {
        it("should register a doctor and return success", async function() {
            const req = {
                body: {
                    name: "Dr. John",
                    username: "drjohn",
                    email: "dr.john@example.com",
                    address: "123 Main St",
                    id: "123456",
                    bday: "1980-01-01",
                    password: "password123"
                }
            };
            const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };
            const next = sinon.spy();

            // Mocking the Doctor model's save method
            sinon.stub(Doctor.prototype, "save").resolves();

            await registerDoctor(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.send.calledWith("DOctor has been registered")).to.be.true;

            // Restore the original method
            Doctor.prototype.save.restore();
        });

        it("should handle errors during registration", async function() {
            const req = {
                body: {
                    name: "Dr. John",
                    username: "drjohn",
                    email: "dr.john@example.com",
                    password: "password123"
                }
            };
            const res = {};
            const next = sinon.spy();

            // Mocking bcrypt.hashSync to throw an error
            sinon.stub(bcrypt, "hashSync").throws(new Error("Hash error"));

            await registerDoctor(req, res, next);

            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].message).to.equal("Hash error");

            bcrypt.hashSync.restore();
        });
    });

    // Test for loginDoctor
    describe("loginDoctor", function() {
        it("should log in a doctor with correct credentials and return a token", async function() {
            const req = {
                body: { username: "drjohn", password: "password123" }
            };
            const res = {
                cookie: sinon.stub().returnsThis(),
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            const next = sinon.spy();

            // Mock the Doctor model's findOne method
            const doctor = {
                _doc: { username: "drjohn", email: "dr.john@example.com", password: "hashed_password" },
                password: "hashed_password"
            };
            sinon.stub(Doctor, "findOne").resolves(doctor);

            // Mock bcrypt.compare to simulate password comparison
            sinon.stub(bcrypt, "compare").resolves(true);

            // Mock jwt.sign to simulate token creation
            const token = "jwt_token";
            sinon.stub(jwt, "sign").returns(token);

            await loginDoctor(req, res, next);

            expect(res.cookie.calledWith("access_token", token)).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ username: doctor._doc.username, email: doctor._doc.email })).to.be.true;

            // Restore stubs
            Doctor.findOne.restore();
            bcrypt.compare.restore();
            jwt.sign.restore();
        });

        it("should return an error if the username is not found", async function() {
            const req = { body: { username: "wrongusername", password: "password123" } };
            const res = {};
            const next = sinon.spy();

            // Mock Doctor.findOne to return null
            sinon.stub(Doctor, "findOne").resolves(null);

            await loginDoctor(req, res, next);

            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].message).to.equal("User not found!");
            expect(next.firstCall.args[0].status).to.equal(404);

            Doctor.findOne.restore();
        });

        it("should return an error if the password is incorrect", async function() {
            const req = { body: { username: "drjohn", password: "wrongpassword" } };
            const res = {};
            const next = sinon.spy();

            const doctor = {
                _doc: { username: "drjohn", email: "dr.john@example.com", password: "hashed_password" },
                password: "hashed_password"
            };
            sinon.stub(Doctor, "findOne").resolves(doctor);

            // Mock bcrypt.compare to return false
            sinon.stub(bcrypt, "compare").resolves(false);

            await loginDoctor(req, res, next);

            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].message).to.equal("Wrong password or username...");
            expect(next.firstCall.args[0].status).to.equal(404);

            Doctor.findOne.restore();
            bcrypt.compare.restore();
        });
    });

    // Test for getAllDoctors
    describe("getAllDoctors", function() {
        it("should return all doctors", async function() {
            const req = {};
            const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
            const next = sinon.spy();

            // Mock Doctor.find to return a list of doctors
            const doctors = [{ name: "Dr. John", username: "drjohn", email: "dr.john@example.com" }];
            sinon.stub(Doctor, "find").resolves(doctors);

            await getAllDoctors(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(doctors)).to.be.true;

            Doctor.find.restore();
        });
    });
});
