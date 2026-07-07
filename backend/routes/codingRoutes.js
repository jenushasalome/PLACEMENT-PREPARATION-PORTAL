import express from "express";
import {
  getProblems,
  getProblem,
  runCode,
  submitCode
} from "../controllers/codingController.js";

const router = express.Router();

router.get("/", getProblems);
router.get("/:id", getProblem);
router.post("/run", runCode);
router.post("/submit", submitCode);
export default router;