import Patient from "../models/patient.js"
import Doctor from "../models/doctor.js"

export const createPatient = async (req,res,next)=>{
    const doctorID = req.body.doctor 
    console.log(doctorID)
    try{
        const doctor = await Doctor.findOne({id:doctorID})
        if(!doctor){
            return res.status(404).json({messege:"Invalid Doctor ID"})
        }
        const newPatient = new Patient(req.body) 
        const savedPatient = await newPatient.save()
        res.status(200).json(savedPatient)
    }catch(err){
        next(err)
    }
}

export const getAllPatients = async (req,res,next)=>{
    const doctorID = req.user
    try{
        const patients = await Patient.find({doctor:doctorID})
        return res.status(200).json(patients)
    }catch(err){
        next(err)
    }
}

