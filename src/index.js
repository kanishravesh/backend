// require('dotenv').config({path: './.env'})
import dotenv from 'dotenv'
import ConnectDB from './db/index.js'
import app from './app.js'

dotenv.config({ path: './.env' })


ConnectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`app listening on ${process.env.PORT}`)
    }).on("error", (error) => {
        console.error("error....", error)
        throw error

    })
    

}).catch((error) => {
    console.log("error: ", error)
})







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