import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import artworkRoutes from './routes/artwork.routes.js';

dotenv.config();
const  app= express();
app.use(express.json());
app.use(cookieParser());

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
app.use('/api/artwork',artworkRoutes)


//middle wares
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
      success: false,    
      error: message,
      statusCode: statusCode,
    })
  });