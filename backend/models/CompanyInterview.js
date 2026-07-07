import mongoose from "mongoose";

const companyInterviewSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
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

    location: {
      type: String,
      default: "Online",
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

export default mongoose.model(
  "CompanyInterview",
  companyInterviewSchema
);