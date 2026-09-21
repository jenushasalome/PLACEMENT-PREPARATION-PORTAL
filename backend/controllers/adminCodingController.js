import CodingProblem from "../models/CodingProblem.js";

// Get all coding questions
export const getAllCodingQuestions = async (req, res) => {
  try {
    const questions = await CodingProblem.find().sort({ _id: -1 });

    res.json(questions);
  } catch (error) {
    console.error("Get coding questions error:", error);
    res.status(500).json({
      message: "Error fetching coding questions",
    });
  }
};

// Add coding question
export const addCodingQuestion = async (req, res) => {
  try {
    const question = new CodingProblem(req.body);

    await question.save();

    res.status(201).json({
      message: "Coding question added successfully",
      question,
    });
  } catch (error) {
    console.error("Add coding question error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update coding question
export const updateCodingQuestion = async (req, res) => {
  try {
    const question = await CodingProblem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!question) {
      return res.status(404).json({
        message: "Coding question not found",
      });
    }

    res.json({
      message: "Coding question updated successfully",
      question,
    });
  } catch (error) {
    console.error("Update coding question error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete coding question
export const deleteCodingQuestion = async (req, res) => {
  try {
    const question = await CodingProblem.findByIdAndDelete(
      req.params.id
    );

    if (!question) {
      return res.status(404).json({
        message: "Coding question not found",
      });
    }

    res.json({
      message: "Coding question deleted successfully",
    });
  } catch (error) {
    console.error("Delete coding question error:", error);

    res.status(500).json({
      message: "Error deleting coding question",
    });
  }
};