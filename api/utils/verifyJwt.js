import jwt from 'jsonwebtoken'

const cookieAuth = (req,res,next)=>{
    const token = req.cookies.access_token
    try{
        const user = jwt.verify(token, process.env.JWT)
        req.user = user
        next()
    }catch(err){
        res.clearCookie("access_token");
        return res.redirect('/')
    }
}
export default cookieAuth