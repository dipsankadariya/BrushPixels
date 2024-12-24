
import User from '../models/user.model.js'
import bcrpytjs from 'bcryptjs';

export const signup=async (req,res,next)=>{
    //console.log(req.body)
  const {username, email,password}=req.body;
  const hashedPassword= bcrpytjs.hashSync(password,10);
  const newUser = User({username, email,password: hashedPassword});
  try{
   await newUser.save();
   res.status(201).json({message:"New user Created successfully"});
  }
  catch(error){
      next(error);
  }
}