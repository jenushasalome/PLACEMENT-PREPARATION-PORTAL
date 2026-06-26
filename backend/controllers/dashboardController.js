import User from "../models/User.js";

export const getDashboard = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const averageScore =
      user.testsTaken === 0
        ? 0
        : Math.round(
            user.totalScore /
              user.testsTaken
          );

    res.json({
      testsTaken:
        user.testsTaken,

      averageScore,

      codingSolved:
        user.codingSolved,

      mockInterviews:
        user.mockInterviews,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};