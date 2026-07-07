import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  codingSolved: {
    type: Number,
    default: 0,
  },

  solvedProblems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodingProblem",
    },
  ],
});

export default mongoose.model("UserProgress", userProgressSchema);