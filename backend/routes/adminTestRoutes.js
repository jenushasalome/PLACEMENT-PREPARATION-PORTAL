import express from "express";

import {
  getAllTests,
  addTest,
  updateTest,
  deleteTest,
} from "../controllers/adminTestController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminAuth, getAllTests);

router.post("/", adminAuth, addTest);

router.put("/:id", adminAuth, updateTest);

router.delete("/:id", adminAuth, deleteTest);

export default router;