import express from "express";

import {
  getAllReminders,
} from "../controllers/adminReminderController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminAuth, getAllReminders);

export default router;