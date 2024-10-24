import jwt from 'jsonwebtoken'

const cookieAuth = (req,res,next)=>{
    
    try{
        const token = req.cookies.access_token
        const user = jwt.verify(token, process.env.JWT)
        req.user = user.id
        next()
    }catch(err){
        res.clearCookie("access_token");
        // return res.redirect('/')
        return res.status(401)
    }
}
export default cookieAuth