import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"


const RegisterUser = asyncHandler(async (req,res)=>{
    //get details from frontend
    //validation-not empty
    //check if user already exist:check username,email
    //check images,check for avatar
    //if avil upload to cloudinary,avatar check
    //create userobject - create entry in db .create
    //remove password and refresh token
    //check for user createion 
    //return response
    const {fullname,email,password,username}=req.body
    console.log('email: ',email)

    if([fullname,email,password,username].some((field)=>
        field?.trim===""

    )){
        throw new ApiError(400,"all field are required")
    }

    const existedUser= User.findOne({
        $on: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user with email or username exist")
    }

    const avatarlocalpath = req.files?.avatar[0]?.path ;
    const coverImagelocalpath=req.file?.coverImage[0]?.path ;

    if(!avatarlocalpath){
        throw new ApiError(400,"avatar required")
    }
    const avatar= await uploadOnCloudinary(avatarlocalpath)
    const coverImage= await uploadOnCloudinary(coverImagelocalpath)

    if(!avatar){
        throw new ApiError(400,"avatar required")

    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || ""
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )


    })

export default RegisterUser