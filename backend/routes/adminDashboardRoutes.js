import express from "express";

import {
  getAdminDashboardStats,
} from "../controllers/adminDashboardController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get(
  "/stats",
  adminAuth,
  getAdminDashboardStats
);

export default router;