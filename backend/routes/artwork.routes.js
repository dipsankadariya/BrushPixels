import express from "express";
const router= express.Router();
import { uploadArt } from "../controllers/artwork.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post('/uploadart',verifyToken,uploadArt)
export  default router ;
