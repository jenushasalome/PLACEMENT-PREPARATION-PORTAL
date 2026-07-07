import User from "../models/User.js";
import Test from "../models/Test.js";
import CompanyInterview from "../models/CompanyInterview.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const averageScore =
      user.testsTaken === 0
        ? 0
        : Math.round(user.totalScore / user.testsTaken);

    
const upcomingTests = await Test.find({
  status: "Upcoming",
})
  .sort({ date: 1 })
  .limit(5);


const upcomingInterviews =
  await CompanyInterview.find({
    status: "Upcoming",
  })
    .sort({ date: 1 })
    .limit(5);

res.json({
  testsTaken: user.testsTaken || 0,
  averageScore,
  codingSolved: user.codingSolved || 0,
  mockInterviews: user.mockInterviews || 0,

  upcomingTests,
  upcomingInterviews,
});

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const saveTestResult = async (req, res) => {
  try {
    const { userId, score } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    
    user.testsTaken += 1;
    user.totalScore = (user.totalScore || 0) + score;

    await user.save();

    res.json({
      message: "Test result saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving test result",
    });
  }
};