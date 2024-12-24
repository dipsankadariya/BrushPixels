import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
dotenv.config();
const  app= express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log( `Connected to database`)
}).catch((error)=>{
      console.log(error);
})
app.listen(3000,()=>{
    console.log( `Server listening at port 3000`);
})

//routes
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

//middle wares
app.use((err,req,res,next)=>{
const statusCode = errr.statusCode || 500 ;
const message = err.message || 'Internal Server error';
return res.status(statusCode).json({
    sucess:false,
    error:message,
    statusCode:statusCode,
})
})