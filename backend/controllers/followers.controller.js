import { error } from '../utils/error.js';

import User from '../models/user.model.js';


export const followUser = async (req, res, next) => {
    try {
      const currentUser = await User.findById(req.user.id);
      const userToFollow = await User.findById(req.params.id);
  
      if (!userToFollow) return next(error(404, "User not found"));
  
      if (userToFollow.followers.includes(req.user.id)) {
        return next(error(400, "Already following this user"));
      }
  
      userToFollow.followers.push(req.user.id);
      currentUser.following.push(req.params.id);
  
      await userToFollow.save();
      await currentUser.save();
  
      res.status(200).json("User followed successfully");
    } catch (err) {
      next(err);
    }
  };


export const unfollowUser = async (req, res, next) => {
    try {
      const currentUser = await User.findById(req.user.id);
      const userToUnfollow = await User.findById(req.params.id);
  
      if (!userToUnfollow) return next(error(404, "User not found"));
  
      if (!userToUnfollow.followers.includes(req.user.id)) {
        return next(error(400, "You are not following this user"));
      }
  
      // Remove current user from the target user's followers
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (followerId) => followerId.toString() !== req.user.id
      );
  
      // Remove target user from current user's following list
      currentUser.following = currentUser.following.filter(
        (followingId) => followingId.toString() !== req.params.id
      );
  
      await userToUnfollow.save();
      await currentUser.save();
  
      res.status(200).json("User unfollowed successfully");
    } catch (err) {
      next(err);
    }
  };
  

  export const getFollowCounts = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) return next(error(404, "User not found"));
  
      res.status(200).json({
        success: true,
        followersCount: user.followers.length,
        followingCount: user.following.length
      });
    } catch (err) {
      next(err);
    }
  };