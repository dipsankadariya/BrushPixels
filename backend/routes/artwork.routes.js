import express from "express";
const router = express.Router();


import { uploadArt } from "../controllers/artwork.controller.js";
import { getuserArtwork } from "../controllers/artwork.controller.js";


import { verifyToken } from "../utils/verifyUser.js";


router.post('/uploadart', verifyToken, uploadArt);


router.get('/getuserart', verifyToken, getuserArtwork);


export default router;
