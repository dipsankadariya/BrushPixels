import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const  app= express();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log( `Connected to database`)
}).catch((error)=>{
      console.log(error);
})
app.listen(3000,()=>{
    console.log( `Server listening at port 3000`);
})