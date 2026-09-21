import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["test", "interview", "general"],
      default: "general",
    },

    // ID of the Test or Interview
    reminderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Which reminder notification this is
    // 30min = 30 minutes before
    // now = when the test/interview starts
    reminderStage: {
      type: String,
      enum: ["30min", "now"],
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;