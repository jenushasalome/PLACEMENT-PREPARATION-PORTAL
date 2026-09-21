import Notification from "../models/Notification.js";


// =====================================================
// GET NOTIFICATIONS FOR A USER
// =====================================================

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.json(notifications);

  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      message: "Error fetching notifications",
    });
  }
};


// =====================================================
// MARK ONE NOTIFICATION AS READ
// =====================================================

export const markAsRead = async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json(notification);

  } catch (error) {
    console.error("Mark notification error:", error);

    res.status(500).json({
      message: "Error updating notification",
    });
  }
};


// =====================================================
// MARK ALL NOTIFICATIONS AS READ
// =====================================================

export const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.updateMany(
      {
        userId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json({
      message: "All notifications marked as read",
    });

  } catch (error) {
    console.error(
      "Mark all notifications error:",
      error
    );

    res.status(500).json({
      message: "Error updating notifications",
    });
  }
};