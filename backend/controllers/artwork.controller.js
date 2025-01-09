import Artwork from '../models/artwork.model.js';
import cloudinary from '../utils/cloudinary.js';
import multer from 'multer';

// Setup multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Please upload only images!'));
    }
  }
}).single('artwork');

// Handle image upload
export const uploadArt = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ 
        success: false, 
        message: err.message 
      });
    }

    try {
      // Check if file exists
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please select an image to upload'
        });
      }

      // Convert buffer to base64
      const fileBuffer = req.file.buffer;
      const fileStr = `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`;

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
        folder: 'artworks',
        resource_type: 'auto',
      });

      // Save artwork details in the database
      const newArtwork = new Artwork({
        userId: req.user.id,  // User ID from JWT authentication
        imgTitle: req.body.imgTitle,
        imgDescription: req.body.imgDescription,
        imgUrl: uploadResponse.secure_url
      });

      await newArtwork.save();

      // Respond with success
      res.status(200).json({
        success: true,
        message: 'Artwork uploaded successfully!',
        artwork: {
          title: newArtwork.imgTitle,
          url: newArtwork.imgUrl
        }
      });

    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading artwork. Please try again.'
      });
    }
  });
};

export const getuserArtwork =async (req,res)=>{
  try{
    const userartworks =await Artwork.find({userId:req.user.id});

    //check if there is  artwork or  not
    if(!userartworks.length )
      {
     return  res.status(404).json({
       success:false,
       message:"No artworks  found for this user",
     });
    }
     //if there are artworks
     return res.status(200).json({
       success:true,
       message:"Artwork fetched sucessfully",
       userartworks,
     });
  
  }catch(error){
    console.error('Error fetching user artworks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching artworks. Please try again later.',
    });
  }
}