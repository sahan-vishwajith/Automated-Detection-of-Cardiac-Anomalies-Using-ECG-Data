import express from "express"
import { loginDoctor, registerDoctor } from "../controlls/doctorC.js"
import cookieAuth from "../utils/verifyJwt.js"
import { createPatient, getAllPatients } from "../controlls/patientC.js"

const router= express.Router()

//create
router.post('/',registerDoctor)
router.post('/login',loginDoctor)
router.post('/createP',cookieAuth, createPatient)

router.get('/patients', cookieAuth , getAllPatients)
export default router;