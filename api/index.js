import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import doctorRoute from "./routes/doctor.js"
import adminRoute from "./routes/admin.js"
import patientRoute from "./routes/patient.js"
import cookieParser from "cookie-parser"
import generalRoute from "./routes/general.js"


const app = express()
dotenv.config()

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongoDB')
    } catch (error){
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disocnnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB cnnected")
})

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
  }));

app.use('/Doc',doctorRoute)
app.use('/Admin', adminRoute)
app.use('/Patient',patientRoute)
app.use('',generalRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong! "
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    })
})


app.listen(3000, ()=>{
    connect()
    console.log('connected to backend')
})

export default app;
