import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Quantitative Aptitude",
        "Logical Reasoning",
        "Verbal Ability",
        "Coding",
      ],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default: 60,
    },

    status: {
      type: String,
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Test", testSchema);