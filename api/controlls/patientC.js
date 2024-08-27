import Patient from "../models/patient.js"

export const createPatient = async (req,res,next)=>{
    const doctorID = req.user._id
    const newPatient = new Patient({...req.body, doctor:doctorID})  
    try{
        const savedPatient = await newPatient.save()
        res.status(200).json(savedPatient)
    }catch(err){
        next(err)
    }
}

export const getAllPatients = async (req,res,next)=>{
    const doctorID = req.user._id
    try{
        const patients = await Patient.find({doctor:doctorID})
        return res.status(200).json(patients)
    }catch(err){
        next(err)
    }
}

