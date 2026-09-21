import User from "../models/User.js";
import AptitudeQuestion from "../models/AptitudeQuestion.js";
import Test from "../models/Test.js";
import CodingProblem from "../models/CodingProblem.js";
import CompanyInterview from "../models/CompanyInterview.js";
// =========================
// ADMIN DASHBOARD STATISTICS
// =========================

export const getAdminDashboardStats = async (req, res) => {
  try {
    const [
  registeredUsers,
  aptitudeQuestions,
  codingQuestions,
  upcomingTests,
  upcomingInterviews
] = await Promise.all([
  User.countDocuments(),
  AptitudeQuestion.countDocuments(),
  CodingProblem.countDocuments(),
  Test.countDocuments({ date: { $gte: new Date() } }),
  CompanyInterview.countDocuments({ date: { $gte: new Date() } })
]);

   res.json({
  registeredUsers,
  aptitudeQuestions,
  codingQuestions,
  upcomingTests,
  upcomingInterviews
});
  } catch (error) {
    console.error(
      "Admin dashboard statistics error:",
      error
    );

    res.status(500).json({
      message: "Error fetching dashboard statistics",
    });
  }
};