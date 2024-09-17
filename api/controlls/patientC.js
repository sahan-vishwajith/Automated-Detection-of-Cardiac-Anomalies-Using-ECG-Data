import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Edit Patient
export const editPatient = async (req, res, next) => {
    try {
        const { username, name, email, address, coords } = req.body;
        const patient = await Patient.findOne({ username });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Update patient details
        patient.name = name;
        patient.email = email;
        patient.address = address;
        if (coords) {
            patient.coords = coords; // Update coords if provided
        }

        const savedPatient = await patient.save();
        return res.status(200).json(savedPatient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error });
    }
};

// Create Patient
export const createPatient = async (req, res, next) => {
    const doctorID = req.user;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const doctor = await Doctor.findOne({ id: doctorID });
        if (!doctor) {
            return res.status(404).json({ message: "Invalid Doctor ID" });
        }

        const newPatient = new Patient({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            idNumber: req.body.idNumber,
            gender: req.body.gender,
            bday: req.body.bday,
            password: hash,
            medicalHistory: req.body.medicalHistory,
            doctor: req.body.doctor,
            coords: req.body.coords, // Save coords during patient creation
        });

        const savedPatient = await newPatient.save();
        doctor.patients.push(savedPatient.id);
        await doctor.save();
        res.status(200).json(savedPatient);
    } catch (err) {
        next(err);
    }
};

// Get All Patients for a Doctor
export const getAllPatients = async (req, res, next) => {
    const doctorID = req.user;
    try {
        const patients = await Patient.find({ doctor: doctorID });
        return res.status(200).json(patients);
    } catch (err) {
        next(err);
    }
};

// Get Patients for Dashboard
export const getPatientsForDashBoard = async (req, res, next) => {
    try {
        const patients = await Patient.find().select('location coords name bday gender doctor id');
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};

// Patient Login
export const loginPatient = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ username: req.body.username });
        if (!patient) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, patient.password);
        if (!isPasswordCorrect) 
            return next(createError(400, "Wrong password or username..."));

        const token = jwt.sign({ id: patient.id }, process.env.JWT, {expiresIn:'1h'});
        const { password, ...otherdetails } = patient._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200).json({ ...otherdetails });
    } catch (err) {
        next(err);
    }
};

export const updateMedicalHistory = async (req,res,next)=>{
    const pid =  req.body.id
    const newDetails = req.body.medical
    try{
        const patient = await Patient.findOneAndUpdate({id:pid},{ $push: { medicalHistory: newDetails } })
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
          }
          res.status(200).json(patient);
        } catch (error) {
            next(error); 
        }    
    }
