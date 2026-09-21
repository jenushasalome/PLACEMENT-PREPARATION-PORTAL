import express from "express";

import {
  getAllCodingQuestions,
  addCodingQuestion,
  updateCodingQuestion,
  deleteCodingQuestion,
} from "../controllers/adminCodingController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminAuth, getAllCodingQuestions);

router.post("/", adminAuth, addCodingQuestion);

router.put("/:id", adminAuth, updateCodingQuestion);

router.delete("/:id", adminAuth, deleteCodingQuestion);

export default router;