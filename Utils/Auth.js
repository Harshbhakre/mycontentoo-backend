export const AuthUser = (req,res,next)=>{
    if(!req.session.userId){
       return res.status(400).end("please login")
    }
    next()
}