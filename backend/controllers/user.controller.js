import { error } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';
import { getNotifications, deleteNotification } from './notification.controller.js';

export const test = (req,res)=>{
    res.json({
        message:"Hella working",
    })
}

export const updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(error(401, "You can only update your account!"));
    } 
    try {
        if (req.body.password) {
          req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
    
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
            },
          },
          { new: true }
        );
    
        const { password, ...rest } = updatedUser._doc;
    
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req,res,next)=>{
    if (req.user.id !== req.params.id) {
        return next(error(401, "You can only delete your account!"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        // Also delete all notifications related to this user
        await Notification.deleteMany({ 
          $or: [
            { recipient: req.params.id },
            { sender: req.params.id }
          ]
        });
        res.clearCookie('token');
        res.status(200).json("User has been deleted and logged out");
    } catch(error) {
        next(error);
    }
}

//notificaiton functionss
export const followUser = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        return next(error(400, "You cannot follow yourself"));
    }
    
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToFollow) {
            return next(error(404, "User not found"));
        }

        if (userToFollow.followers.includes(req.user.id)) {
            return next(error(400, "You already follow this user"));
        }

        // Update both users
        await User.findByIdAndUpdate(req.params.id, {
            $push: { followers: req.user.id }
        });
        await User.findByIdAndUpdate(req.user.id, {
            $push: { following: req.params.id }
        });

        // Create notification
        const notification = new Notification({
            recipient: req.params.id,
            sender: req.user.id,
            type: 'follow'
        });
        await notification.save();

        res.status(200).json("User has been followed");
    } catch (error) {
        next(error);
    }
}

export const unfollowUser = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        return next(error(400, "You cannot unfollow yourself"));
    }
    
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToUnfollow) {
            return next(error(404, "User not found"));
        }

        if (!userToUnfollow.followers.includes(req.user.id)) {
            return next(error(400, "You don't follow this user"));
        }

        // Update both users
        await User.findByIdAndUpdate(req.params.id, {
            $pull: { followers: req.user.id }
        });
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { following: req.params.id }
        });

        // Create notification
        const notification = new Notification({
            recipient: req.params.id,
            sender: req.user.id,
            type: 'unfollow'
        });
        await notification.save();

        res.status(200).json("User has been unfollowed");
    } catch (error) {
        next(error);
    }
}
