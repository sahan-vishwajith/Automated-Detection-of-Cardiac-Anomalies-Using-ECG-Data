import Admin from "../models/admin.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"


export const loginAdmin = async (req,res,next)=>{
    try {
        const admin =await Admin.findOne({username:req.body.username})
        if(!admin) return next(createError(404,"User not found!"))
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password)
        if(!isPasswordCorrect) 
            return next(createError(404,"Wrong password or username..."))

        const token = jwt.sign({id:admin.id }, process.env.JWT, {expiresIn:'1h'})
        const {password, ...otherdetails} = admin._doc;

        res.cookie("access_token", token,{
            httpOnly : true,
        })
        .status(200).json({...otherdetails});
    } catch (err) {
        next(err)
    }
}

export const registerAdmin= async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newAdmin = new Admin({
        username : req.body.username,
        email: req.body.email,
        password: hash,
       })
       await newAdmin.save()
       res.status(200).send("Admin has been registered")
    }catch(err){
        next(err)
    }
}
