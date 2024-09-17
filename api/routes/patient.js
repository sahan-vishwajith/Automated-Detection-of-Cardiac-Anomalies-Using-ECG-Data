import express from "express"
import { editPatient, loginPatient } from "../controlls/patientC.js"
import cookieAuth from "../utils/verifyJwt.js"

const router= express.Router()

//create

router.post('/login',loginPatient)
router.post('/edit',cookieAuth, editPatient)
export default router;