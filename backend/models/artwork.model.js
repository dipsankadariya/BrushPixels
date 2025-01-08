import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
   },
   imgTitle:{
    type:String,
    required:true,
   },
   imgDescription:{
   type:String,
   required:true,
   },
},
{timestamps:true});
const Artwork = mongoose.model('Artwork',artworkSchema);
export default Artwork;