
import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
    category: String,
    score: Number,
    total: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("TestResult", testResultSchema);