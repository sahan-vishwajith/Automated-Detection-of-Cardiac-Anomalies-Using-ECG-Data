import express from "express"
import { getPatientsForDashBoard } from "../controlls/patientC.js";
import logOut from "../controlls/authC.js";
import cookieAuth from "../utils/verifyJwt.js";
import { getGenderComposition, getPredictionComposition, getTotalDocCount, getTotalPatientCount } from "../controlls/utilC.js";


const router= express.Router()

router.get('/dashboard', cookieAuth, getPatientsForDashBoard)
router.post('/logout', logOut)
router.get('/predComp',getPredictionComposition)
router.get('/docCount',getTotalDocCount)
router.get('/patientCount', getTotalPatientCount)
router.get('/genderCount', getGenderComposition)
export default router;