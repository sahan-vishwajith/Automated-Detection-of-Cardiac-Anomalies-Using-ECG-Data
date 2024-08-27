import Doctor from "../models/doctor.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const registerDoctor = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newDoctor = new Doctor({
        name:req.body.name,
        username : req.body.username,
        email: req.body.email,
        address: req.body.address,
        id: req.body.id,
        password: hash,
       })
       await newDoctor.save()
       res.status(200).send("DOctor has been registered")
    }catch(err){
        next(err)
    }
}

export const loginDoctor = async (req,res,next)=>{
    try {
        const doctor =await Doctor.findOne({username:req.body.username})
        if(!doctor) return next(createError(404,"User not found!"))
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, doctor.password)
        if(!isPasswordCorrect) 
            return next(createError(404,"Wrong password or username..."))

        const token = jwt.sign({id:doctor._id }, process.env.JWT)
        const {password, ...otherdetails} = doctor._doc;

        res.cookie("access_token", token,{
            httpOnly : true,
        })
        .status(200).json({...otherdetails});
    } catch (err) {
        next(err)
    }
}

export const getAllDoctors = async (req,res,next)=>{
    try{
        const doctors = await Doctor.find()
        return res.status(200).json(doctors)
    }catch(err){
        next(err)
    }
}

