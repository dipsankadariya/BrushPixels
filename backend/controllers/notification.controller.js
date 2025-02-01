import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';


export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .populate('sender', 'username profilePicture')
            .sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
}

export const deleteNotification = async (req, res, next) => {
    try {
        const notificationId = req.params.id;

        // Check if notification exists
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        // Check if the user requesting deletion is the recipient
        if (notification.recipient.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own notifications"
            });
        }

        // Delete the notification
        await Notification.findByIdAndDelete(notificationId);

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

// export const markNotificationAsRead = async (req, res, next) => {
//     try {
//         const notification = await Notification.findById(req.params.notificationId);
        
//         if (!notification) {
//             return next(error(404, "Notification not found"));
//         }
        
//         if (notification.recipient.toString() !== req.user.id) {
//             return next(error(403, "You can only mark your own notifications as read"));
//         }

//         notification.isRead = true;
//         await notification.save();

//         res.status(200).json("Notification marked as read");
//     } catch (error) {
//         next(error);
//     }
// }

// export const markAllNotificationsAsRead = async (req, res, next) => {
//     try {
//         await Notification.updateMany(
//             { recipient: req.user.id },
//             { isRead: true }
//         );
//         res.status(200).json("All notifications marked as read");
//     } catch (error) {
//         next(error);
//     }
// }