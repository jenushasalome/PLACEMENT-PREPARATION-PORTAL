import express from "express";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

// Get notifications for a user
router.get("/:userId", getNotifications);

// Mark one notification as read
router.put("/:id/read", markAsRead);

// Mark all notifications as read
router.put("/:userId/read-all", markAllAsRead);

export default router;
