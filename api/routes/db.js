import express from "express";
import { populateDoctors, populatePatients, populatePred } from "../controlls/dbC.js";

const router = express.Router()

router.post('/patients',populatePatients)
router.post('/docs',populateDoctors)
router.post('/preds',populatePred)
export default router;