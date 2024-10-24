import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    bday: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    medicalHistory: {
        type: [String]
    },
    doctor: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    district: {
        type: String,
    },
    coords: {
        type: [Number], // Array of numbers to store latitude and longitude
        index: '2dsphere' // Indexing for geospatial queries
    }
});

export default mongoose.model("Patient", PatientSchema);
