import jwt from 'jsonwebtoken'

const logOut = (req,res,next)=>{
    res.clearCookie("access_token");
    return res.redirect('/')
}
export default logOut
