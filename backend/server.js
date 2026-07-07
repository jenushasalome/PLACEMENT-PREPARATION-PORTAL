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

app.get("/", (req, res) => {
    res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});