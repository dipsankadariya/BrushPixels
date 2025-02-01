import express from 'express';
import { 
    test, 
    updateUser, 
    deleteUser,
    followUser,
    unfollowUser,
} from '../controllers/user.controller.js';
import { getNotifications, deleteNotification } from '../controllers/notification.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Existing routes
router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

// New routes for follow/unfollow
router.post('/follow/:id', verifyToken, followUser);
router.post('/unfollow/:id', verifyToken, unfollowUser);

export default router;