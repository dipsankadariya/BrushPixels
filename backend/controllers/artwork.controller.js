import express from "express";
import Artwork  from '../models/artwork.model.js'
import multer from "multer";

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Files will be stored in 'uploads' folder
  },
  filename: function(req, file, cb) {
    // Create unique filename using timestamp
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Create multer upload instance
const upload = multer({ 
  storage: storage,
  // Only allow image files
  fileFilter: function(req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only images are allowed!'))
    }
  }
}).single('artwork');

  export const uploadArt=(req,res,next)=>{
    upload(req,res,async function (error) {
      if(error){
        return res.status(400).json({message:error.message});
      }

      if(!req.file){
        return res.status(400).json({message:"Please upload an image"});
      }

      try{
        const newArtwork = new Artwork({
          userId:req.user.id,
          imgTitle:req.body.imgTitle,
          imgDescription:req.body.imgDescription,
        });

        await  newArtwork.save();
        res.status(200).json({message:'Upload Successfull'});
      }
      catch(error){
        res.status(500).json({message:"Error saving artwork"});
     }
    });
}