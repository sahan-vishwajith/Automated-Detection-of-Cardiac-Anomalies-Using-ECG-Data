import express from "express"
import { getPatientsForDashBoard } from "../controlls/patientC.js";
import logOut from "../controlls/authC.js";
import cookieAuth from "../utils/verifyJwt.js";


const router= express.Router()

router.get('/dashboard', cookieAuth, getPatientsForDashBoard)
router.post('/logout', logOut)
export default router;