import { expect } from "chai";
import sinon from "sinon";
import Admin from "../models/admin.js";
import { registerAdmin } from "../controlls/adminC.js";

describe('Admin Controller - registerAdmin', function() {
    it('should register an admin and return success', async function() {
        const req = { body: { username: "adminuser", email: "admin@example.com", password: "password123" }};
        const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

        // Mocking Admin model's save method to simulate database interaction
        sinon.stub(Admin.prototype, 'save').resolves();

        await registerAdmin(req, res, () => {});

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.send.calledWith("Admin has been registered")).to.be.true;

        Admin.prototype.save.restore();  // Restore original method
    });
    
});
