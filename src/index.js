// require('dotenv').config({path: './.env'})
import dotenv from 'dotenv'
import ConnectDB from './db/index.js'

dotenv.config({path: './.env'})


ConnectDB()







/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";

const app=express()

//immediately excecute ife
(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.error("hmm err",error)
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`app is listening on ${process.env.PORT} `)
       })

    }catch(error){
        console.error("ERROR:",error)
        throw error
    }
})()
    */