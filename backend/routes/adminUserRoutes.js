import express from "express";

import {
  getAllUsers,
  deleteUser,
} from "../controllers/adminUserController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Get all registered users
router.get("/", adminAuth, getAllUsers);

// Delete a user
router.delete("/:id", adminAuth, deleteUser);

export default router;