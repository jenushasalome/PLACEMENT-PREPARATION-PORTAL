import express from "express";
import { getDashboard, saveTestResult } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/:id", getDashboard);


router.post("/save-result", saveTestResult);

export default router;