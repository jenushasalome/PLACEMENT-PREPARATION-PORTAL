import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aptitudeRoutes from "./routes/aptitudeRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import scheduleRoutes from "./routes/scheduleRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { startReminderScheduler } from "./reminderScheduler.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import adminAptitudeRoutes from "./routes/adminAptitudeRoutes.js";
import adminCodingRoutes from "./routes/adminCodingRoutes.js";
import adminTestRoutes from "./routes/adminTestRoutes.js";
import adminInterviewRoutes from "./routes/adminInterviewRoutes.js";
import adminReminderRoutes from "./routes/adminReminderRoutes.js";


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api", scheduleRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use(
  "/api/admin/dashboard",
  adminDashboardRoutes
);
app.use(
  "/api/admin/aptitude",
  adminAptitudeRoutes
);
app.use("/api/admin/coding", adminCodingRoutes);
app.use("/api/admin/tests", adminTestRoutes);
app.use("/api/admin/interviews", adminInterviewRoutes);
app.use("/api/admin/reminders", adminReminderRoutes);


app.get("/", (req, res) => {
    res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  startReminderScheduler();
});