import jwt from 'jsonwebtoken';
import {error} from './error.js'
export const verifyToken =(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return next(error(401," Youre not authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET,(err, user)=>{
        if(err) return next(error(403,"Token is not valid !"));

        req.user= user;
        next();
    })
}