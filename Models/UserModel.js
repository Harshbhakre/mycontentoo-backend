import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contentAccessRequest:{
        require:true,
        type: Array,
    }
})

export const UserModel = mongoose.model('UsersforContentoo', userModel)