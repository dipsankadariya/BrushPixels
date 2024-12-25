import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { error } from '../utils/error.js';

export const signup=async (req,res,next)=>{
    //console.log(req.body)
  const {username, email,password}=req.body;
  const hashedPassword= bcryptjs.hashSync(password,10);
  const newUser = User({username, email,password: hashedPassword});
  try{
   await newUser.save();
   res.status(201).json({message:"New user Created successfully"});
  }
  catch(error){
      next(error);
  }
}

export const  signin=async(req,res,next)=>{
  const {email,password}=req.body;

  try{
    const validUser= await User.findOne({email});
    if(!validUser){
      return next(error(404,'User not found'));
    }
    const validPassword  = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(error(403,'Wrong Credentials'));
    }

    const token = jwt.sign({id:validUser._id} ,process.env.JWT_SECRET);
    const {password:hashedPassword,...rest} = validUser._doc;

    res.cookie('token',token,{
      httpOnly: true,
      expires: new Date(Date.now() +7* 24 * 60 * 60 * 1000) // 7 days
    }).status(200).json(rest);
  }
  catch(error)
    {
  next(error);
    }
}