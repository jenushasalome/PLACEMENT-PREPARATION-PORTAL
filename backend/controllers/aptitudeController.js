import AptitudeQuestion from "../models/AptitudeQuestion.js";

export const getQuestions = async (req, res) => {
  try {
    const { category } = req.params;

    const questions = await AptitudeQuestion.aggregate([
      {
        $match: { category }
      },
      {
        $sample: { size: 20 }
      }
    ]);

    res.json(questions);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};