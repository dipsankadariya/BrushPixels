import express from "express";
import { deleteNotification, getNotifications } from "../controllers/notification.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router= express.Router();

router.get('/',verifyToken,getNotifications);
router.delete('/deleteNotification',verifyToken,deleteNotification);
export default router