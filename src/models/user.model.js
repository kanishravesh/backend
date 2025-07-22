import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    avatar:{
        type:String , //cloudnaryurl
        required:true
    },
    coverImage:{
        type:String  //cloudnaryurl

    },
    watchHistory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

UserSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10)
    next()
    
})

UserSchema.methods.ispasswordcorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}
UserSchema.methods.generateAccessToken= function (){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN
    }

)
}
UserSchema.methods.generateRefreshToken= function (){
    jwt.sign({
        _id:this._id

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN
    }

)
}

export const User = mongoose.model("User", UserSchema)