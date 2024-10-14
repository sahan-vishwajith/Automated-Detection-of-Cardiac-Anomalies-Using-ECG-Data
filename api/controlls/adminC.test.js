import { expect } from "chai";
import sinon from "sinon";
import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerAdmin, loginAdmin } from "../controlls/adminC.js";

describe('Admin Controller', function() {

    // Use afterEach to restore all sinon stubs after each test
    afterEach(() => {
        sinon.restore(); // Restores all stubs, mocks, etc.
    });

    describe('registerAdmin', function() {
        it('should register an admin and return success', async function() {
            const req = { body: { username: "adminuser", email: "admin@example.com", password: "password123" } };
            const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

            // Mocking Admin model's save method to simulate database interaction
            sinon.stub(Admin.prototype, 'save').resolves();

            await registerAdmin(req, res, () => {});

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.send.calledWith("Admin has been registered")).to.be.true;
        });
    });

    describe('loginAdmin', function() {
        it('should log in an admin with correct credentials and return a token', async function() {
            const req = {
                body: { username: "adminuser", password: "password123" }
            };
            const res = {
                cookie: sinon.stub().returnsThis(),
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            const next = sinon.spy();

            // Mock the Admin model's findOne method
            const admin = {
                _doc: { username: "adminuser", email: "admin@example.com", password: "hashed_password" },
                password: "hashed_password"
            };
            sinon.stub(Admin, 'findOne').resolves(admin);

            // Mock bcrypt.compare to simulate password comparison
            sinon.stub(bcrypt, 'compare').resolves(true);

            // Mock jwt.sign to simulate token creation
            const token = "jwt_token";
            sinon.stub(jwt, 'sign').returns(token);

            await loginAdmin(req, res, next);

            // Verify the response
            expect(res.cookie.calledWith("access_token", token)).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ username: admin._doc.username, email: admin._doc.email })).to.be.true;
        });

        it('should return an error if the username is not found', async function() {
            const req = {
                body: { username: "nonexistentuser", password: "password123" }
            };
            const res = {};
            const next = sinon.spy();

            // Mock Admin.findOne to return null
            sinon.stub(Admin, 'findOne').resolves(null);

            await loginAdmin(req, res, next);

            // Verify the error passed to next()
            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].message).to.equal("User not found!");
            expect(next.firstCall.args[0].status).to.equal(404);
        });

        it('should return an error if the password is incorrect', async function() {
            const req = {
                body: { username: "adminuser", password: "wrongpassword" }
            };
            const res = {};
            const next = sinon.spy();

            // Mock Admin.findOne to return a user
            const admin = {
                _doc: { username: "adminuser", email: "admin@example.com", password: "hashed_password" },
                password: "hashed_password"
            };
            sinon.stub(Admin, 'findOne').resolves(admin);

            // Mock bcrypt.compare to simulate incorrect password comparison
            sinon.stub(bcrypt, 'compare').resolves(false);

            await loginAdmin(req, res, next);

            // Verify the error passed to next()
            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].message).to.equal("Wrong password or username...");
            expect(next.firstCall.args[0].status).to.equal(404);
        });
    });
});
