import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import artworkRoutes from './routes/artwork.routes.js';
import followerRoutes from './routes/userfollow.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.log(error);
});

app.listen(3000, () => {
    console.log('Server listening at port 3000');
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/user/followers',followerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/artwork', artworkRoutes);

// Middleware for error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
        success: false,    
        error: message,
        statusCode: statusCode,
    });
});
