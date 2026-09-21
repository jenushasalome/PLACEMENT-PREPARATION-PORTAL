import AptitudeQuestion from "../models/AptitudeQuestion.js";

// =========================
// GET ALL APTITUDE QUESTIONS
// =========================

export const getAllAptitudeQuestions = async (req, res) => {
  try {
    const questions = await AptitudeQuestion.find().sort({
      createdAt: -1,
    });

    res.json(questions);
  } catch (error) {
    console.error("Get aptitude questions error:", error);

    res.status(500).json({
      message: "Error fetching aptitude questions",
    });
  }
};

// =========================
// ADD APTITUDE QUESTION
// =========================

export const addAptitudeQuestion = async (req, res) => {
  try {
    const question = new AptitudeQuestion(req.body);

    await question.save();

    res.status(201).json({
      message: "Aptitude question added successfully",
      question,
    });
  } catch (error) {
    console.error("Add aptitude question error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// UPDATE APTITUDE QUESTION
// =========================

export const updateAptitudeQuestion = async (req, res) => {
  try {
    const question =
      await AptitudeQuestion.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!question) {
      return res.status(404).json({
        message: "Aptitude question not found",
      });
    }

    res.json({
      message: "Aptitude question updated successfully",
      question,
    });
  } catch (error) {
    console.error(
      "Update aptitude question error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// DELETE APTITUDE QUESTION
// =========================

export const deleteAptitudeQuestion = async (req, res) => {
  try {
    const question =
      await AptitudeQuestion.findByIdAndDelete(
        req.params.id
      );

    if (!question) {
      return res.status(404).json({
        message: "Aptitude question not found",
      });
    }

    res.json({
      message: "Aptitude question deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete aptitude question error:",
      error
    );

    res.status(500).json({
      message: "Error deleting aptitude question",
    });
  }
};