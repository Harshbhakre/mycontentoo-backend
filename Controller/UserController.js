import { UserModel } from "../Models/UserModel.js";

export const signup =async (req,res)=>{
    try {
    const {email,name,password} = req.body
    if(email.length<6 || name.length<2 || password.length<5 ){
        return res.status(400).end("please fill the credentials properly")
    }
    let existingUser =await  UserModel.findOne({email:email})
      if(!existingUser){
        return res.status(400).end('User already register, please user different email')
    }
    const newUser = new UserModel({
        name:name,
        email:email,
        password:password
    })
    newUser.save().then(response=>{
        res.status(200).end('User created, now you can login')
        
    }).catch(err=> res.status(400).end('User not created, please try later'+ err))
} catch (error) {res.status(500).end('User not created, please try later'+error)}
}

export const login =async (req,res)=>{
    try {
    const {email,password} = req.body
    let existingUser =await  UserModel.findOne({email:email})
    if(!existingUser){
        return res.status(400).end('User not Found, please fill credentials properly')
    }
    
    if(password==existingUser.password){
        req.session.userId = existingUser.password
        res.status(200).json({ message: 'Login successful', userId: existingUser._id });
    }else{
        return res.status(400).end('User not Found, please fill credentials properly')
    }
} catch (error) {res.status(500).end('User login failed, please try later'+error)}
}