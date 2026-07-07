import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    academic: {
      college: {
        type: String,
        default: "",
      },

      degree: {
        type: String,
        default: "",
      },

      branch: {
        type: String,
        default: "",
      },

      year: {
        type: String,
        default: "",
      },

      cgpa: {
        type: String,
        default: "",
      },
    },

    skills: {
      type: [String],
      default: [],
    },

    selectedCompanies: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);