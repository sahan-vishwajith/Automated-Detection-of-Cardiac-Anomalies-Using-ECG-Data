import express from "express"
import { getPatientsForDashBoard } from "../controlls/patientC.js";


const router= express.Router()

router.get('/dashboard', getPatientsForDashBoard)

export default router;