import mongoose from "mongoose";

const aptitudeQuestionSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        enum: ["quantitative", "logical", "verbal"]
    },

    difficulty: {
        type: String,
        default: "easy",
        enum: ["easy", "medium", "hard"]
    },

    question: {
        type: String,
        required: true
    },

    options: [{
        type: String
    }],

    answer: {
        type: Number,
        required: true
    },

    explanation: {
        type: String
    }

});

export default mongoose.model(
    "AptitudeQuestion",
    aptitudeQuestionSchema
);