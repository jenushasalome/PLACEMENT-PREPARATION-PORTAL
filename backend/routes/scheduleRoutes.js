import express from "express";

import {
  getTests,
  addTest,
  updateTest,
  deleteTest,
  getInterviews,
  addInterview,
  updateInterview,
  deleteInterview,
} from "../controllers/scheduleController.js";

const router = express.Router();


router.get("/tests", getTests);
router.post("/tests", addTest);
router.put("/tests/:id", updateTest);
router.delete("/tests/:id", deleteTest);


router.get("/interviews", getInterviews);
router.post("/interviews", addInterview);
router.put("/interviews/:id", updateInterview);
router.delete("/interviews/:id", deleteInterview);

export default router;