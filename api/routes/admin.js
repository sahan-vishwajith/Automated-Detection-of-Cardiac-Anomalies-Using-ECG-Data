import express from "express"
import cookieAuth from "../utils/verifyJwt.js"
import { registerDoctor } from "../controlls/doctorC.js"
import { loginAdmin, registerAdmin } from "../controlls/adminC.js"
import { getAllDoctors } from "../controlls/doctorC.js"

const router= express.Router()

//create
router.post('/', registerAdmin)
router.post('/createD',cookieAuth,registerDoctor)
router.post('/login', loginAdmin)

router.get('/Doctors',cookieAuth,getAllDoctors)

export default router;