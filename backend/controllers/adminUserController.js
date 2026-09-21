import User from "../models/User.js";

// =========================
// GET ALL USERS
// =========================

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -resetPasswordToken")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);

    res.status(500).json({
      message: "Error fetching users",
    });
  }
};

// =========================
// DELETE USER
// =========================

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    res.status(500).json({
      message: "Error deleting user",
    });
  }
};