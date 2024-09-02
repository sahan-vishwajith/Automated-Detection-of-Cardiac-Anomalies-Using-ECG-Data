import express from "express"
import { editPatient, loginPatient } from "../controlls/patientC.js"

const router= express.Router()

//create

router.post('/login',loginPatient)
router.post('/edit', editPatient)
export default router;