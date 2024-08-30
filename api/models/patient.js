import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    idNumber:{
        type: String,
        required : true,
        unique:true,
    },
    address:{
        type: String,
        required : true,
    },
    bday:{
        type: Date,
        required : true,
    },
    gender:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    medicalHistory:{
        type:[String]
    },
    doctor:{
        type:String,
        required :true
    }
} )

export default mongoose.model("Patient" , PatientSchema)