import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({

    input: String,

    output: String

});

const codingProblemSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        enum: ["Easy","Medium","Hard"]
    },

    topic: String,

    points: Number,

    description: String,

    inputFormat: String,

    outputFormat: String,

    constraints: String,

    sampleInput: String,

    sampleOutput: String,

    explanation: String,

    starterCode:{

        java:String,
        python:String,
        cpp:String,
        c:String

    },

    hiddenTestCases:[testCaseSchema]

});

export default mongoose.model(
    "CodingProblem",
    codingProblemSchema
);