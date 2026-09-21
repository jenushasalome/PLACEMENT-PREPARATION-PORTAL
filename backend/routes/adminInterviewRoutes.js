import express from "express";

import {
  getAllInterviews,
  addInterview,
  updateInterview,
  deleteInterview,
} from "../controllers/adminInterviewController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminAuth, getAllInterviews);

router.post("/", adminAuth, addInterview);

router.put("/:id", adminAuth, updateInterview);

router.delete("/:id", adminAuth, deleteInterview);

export default router;