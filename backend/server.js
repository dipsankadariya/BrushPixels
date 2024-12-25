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
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;  // Fixed typo from 'errr' to 'err'
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
      success: false,    // Also fixed typo in 'success'
      error: message,
      statusCode: statusCode,
    })
  });