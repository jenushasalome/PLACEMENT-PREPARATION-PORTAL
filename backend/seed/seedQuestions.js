import mongoose from "mongoose";
import dotenv from "dotenv";

import AptitudeQuestion from "../models/AptitudeQuestion.js";

import quantitative from "./quantitative.js";
import logical from "./logical.js";
import verbal from "./verbal.js";

dotenv.config();

async function seedDB() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    
    await AptitudeQuestion.deleteMany();
    console.log("🗑️ Existing questions deleted");

    
    const data = [...quantitative, ...logical, ...verbal];

    
    const invalid = data.filter(
      (q) => !q.question || q.answer === undefined || !q.category
    );

    if (invalid.length > 0) {
      console.log("❌ Invalid entries found:");
      console.log(invalid);
      throw new Error("Seed data validation failed");
    }

   
    await AptitudeQuestion.insertMany(data);
    console.log("✅ Questions inserted successfully");

  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
  } finally {
    
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedDB();