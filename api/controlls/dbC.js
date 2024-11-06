import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import Predictions from "../models/predictions.js";
import bcrypt from "bcrypt";

export const populatePatients = async (req, res, next) => {
    const patients = req.body;  // Assuming the patients are inside `patients` array
    try {
        // Iterate over the array of patients
        for (const element of patients) {
            const doctorID = element.doctor;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(element.password, salt);

            try {
                const doctor = await Doctor.findOne({ id: doctorID });
                if (!doctor) {
                    return res.status(404).json({ message: "Invalid Doctor ID" });
                }

                const newPatient = new Patient({
                    name: element.name,
                    username: element.username,
                    email: element.email,
                    address: element.address,
                    idNumber: element.idNumber,
                    gender: element.gender,
                    bday: element.bday,
                    password: hash,
                    medicalHistory: element.medicalHistory,
                    doctor: element.doctor,
                    district: element.district,
                });

                const savedPatient = await newPatient.save();
                doctor.patients.push(savedPatient.id);
                await doctor.save();
            } catch (err) {
                console.log(`Error saving patient with ID ${element.idNumber}:`, err);
                // Optionally, you can return a specific error here to stop the process
            }
        }

        // After processing all patients, send a success response
        res.status(200).json({ message: "Patients populated successfully" });
    } catch (err) {
        next(err);  // Let the main error handler catch any unforeseen errors
    }
};

export const populateDoctors =async (req,res,next)=>{
    const doctors =req.body
    for (const element of doctors){
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(element.password, salt)
            const newDoctor = new Doctor({
                name:element.name,
                username : element.username,
                email: element.email,
                address: element.address,
                id: element.id,
                bday: element.bday,
                password: hash,
           })
           await newDoctor.save();
        }
        catch(err){
            console.log(err)
        }
    }
    res.status(200).json({ message: "doctors populated successfully" });
}

export const populatePred = async (req,res,next)=>{
    const preds =req.body
    for (const e of preds){
        try {
            const newPrediction = new Predictions({
                prediction:e.prediction,
                date: e.date,
                gender:e.gender,
                district:e.district,
                patientBday:e.patientBday
            })
            await newPrediction.save()
        }
        catch(err){
            console.log(err)
        }
    }
    res.status(200).json({ message: "preds populated successfully" });
}