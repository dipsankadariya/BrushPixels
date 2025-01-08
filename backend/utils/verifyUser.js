import jwt from 'jsonwebtoken';
import { error } from './error.js';
import User from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(error(401, "You're not authenticated!"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        const userExists = await User.findById(decoded.id);
        if (!userExists) {
            res.clearCookie('token');
            return next(error(401, "User not found"));
        }

        req.user = decoded;
        next();
    } catch (err) {
        next(error(403, "Token is not valid!"));
    }
};