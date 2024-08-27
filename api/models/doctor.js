import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    username:{
        type: String,
        required : true,
        unique:true,
    },
    password:{
        type: String,
        required : true,
    },
    id:{
        type:String,
        required:true,
    },
    address:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    patients:{
        type: [String]
    }

} )

export default mongoose.model("Doctor" , DoctorSchema)