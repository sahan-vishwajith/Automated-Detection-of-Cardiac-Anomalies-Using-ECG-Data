import mongoose from "mongoose";

const PredictionsSchema = new mongoose.Schema({
    prediction:{
        type: String,
        required : true,
    },
    date:{
        type:String,
        required:true
    },
    gender:{
        type: String,
        required : true,
    },
    district:{
        type:String,
        required:true
    },
    patientBday:{
        type:Date,
        required:true,
    }

} )

export default mongoose.model("Predictions" , PredictionsSchema)