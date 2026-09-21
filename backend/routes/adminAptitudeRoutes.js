import express from "express";

import {
  getAllAptitudeQuestions,
  addAptitudeQuestion,
  updateAptitudeQuestion,
  deleteAptitudeQuestion,
} from "../controllers/adminAptitudeController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminAuth, getAllAptitudeQuestions);

router.post("/", adminAuth, addAptitudeQuestion);

router.put("/:id", adminAuth, updateAptitudeQuestion);

router.delete("/:id", adminAuth, deleteAptitudeQuestion);

export default router;