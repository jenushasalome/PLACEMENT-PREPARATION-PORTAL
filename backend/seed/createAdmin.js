import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne({
      email: "admin@placementportal.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    const admin = new Admin({
      name: "Placement Portal Admin",
      email: "admin@placementportal.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("=================================");
    console.log("Admin created successfully");
    console.log("Email: admin@placementportal.com");
    console.log("Password: Admin@123");
    console.log("=================================");

    process.exit(0);
  } catch (error) {
    console.error("Admin creation error:", error);
    process.exit(1);
  }
};

createAdmin();