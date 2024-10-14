import { expect } from "chai";
import sinon from "sinon";
import logOut from "../controlls/authC.js";  // Adjust the import path based on your file structure

describe('Admin Controller - logOut', function() {
    it('should clear the access token cookie and redirect to the homepage', function() {
        const req = {};
        const res = {
            clearCookie: sinon.spy(),
            redirect: sinon.spy()
        };
        const next = sinon.spy();

        logOut(req, res, next);

        // Check if the clearCookie method was called with "access_token"
        expect(res.clearCookie.calledWith("access_token")).to.be.true;

        // Check if the redirect method was called with "/"
        expect(res.redirect.calledWith('/')).to.be.true;
    });
});
