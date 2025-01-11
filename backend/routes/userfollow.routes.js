import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {followUser} from '../controllers/followers.controller.js'
import {unfollowUser} from '../controllers/followers.controller.js'
import { getFollowCounts } from '../controllers/followers.controller.js';
const router= express.Router();

router.post('/follow/:id',verifyToken,followUser);
router.post('/unfollow/:id',verifyToken,unfollowUser);
router.get('/count/:id', verifyToken, getFollowCounts);

export default router;